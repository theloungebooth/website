import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { sendContactEmail } from '@lib/resend'
import { sanityClient } from '@sanity/lib/client'

const contactPageFieldsQuery = `
  *[_type == "page" && template == "contact"][0] {
    "fields": sectionsContact[_type == "sectionHeroContact"][0].formFields[].label,
    "emailField": sectionsContact[_type == "sectionHeroContact"][0].formFields[fieldType == "email"][0].label
  }
`

const bodySchema = z.object({
  fields: z.record(z.string(), z.string()),
})

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const raw = await request.json()
          const { fields } = bodySchema.parse(raw)

          // Validate submitted field names against Sanity-defined fields
          const page = await sanityClient.fetch<{ fields: string[]; emailField?: string }>(
            contactPageFieldsQuery,
          )

          if (page?.fields?.length) {
            const allowedKeys = new Set(page.fields)
            const unknownKeys = Object.keys(fields).filter(
              (k) => !allowedKeys.has(k),
            )
            if (unknownKeys.length) {
              return Response.json(
                { error: `Unknown fields: ${unknownKeys.join(', ')}` },
                { status: 400 },
              )
            }
          }

          if (Object.keys(fields).length === 0) {
            return Response.json(
              { error: 'No fields submitted' },
              { status: 400 },
            )
          }

          // Re-order fields to match the canonical Sanity field order so the
          // email body is always in the same sequence regardless of submission order.
          const orderedFields = page?.fields?.length
            ? Object.fromEntries(
                page.fields
                  .filter((k) => k in fields)
                  .map((k) => [k, fields[k]]),
              )
            : fields

          const replyTo = page?.emailField ? orderedFields[page.emailField] : undefined

          const { error } = await sendContactEmail({ fields: orderedFields, replyTo })

          if (error) {
            console.error('[contact] Resend error:', error)
            return Response.json(
              { error: 'Failed to send email. Please try again.' },
              { status: 500 },
            )
          }

          return Response.json({ success: true })
        } catch (err) {
          if (err instanceof z.ZodError) {
            return Response.json({ error: err.issues }, { status: 400 })
          }
          console.error('[contact] Unexpected error:', err)
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          )
        }
      },
    },
  },
})
