import type { ObjectDefinition } from '@sanity/types'
import { DocumentTextIcon } from '@sanity/icons'

export const sectionLegalText = {
  name: 'sectionLegalText',
  title: 'Legal text',
  type: 'object',
  icon: DocumentTextIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'pageTitle',
      title: 'Page title',
      type: 'string',
      description: 'e.g. "THE LOUNGE BOOTH — PRIVACY POLICY"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Introduction',
      description: 'Optional paragraph shown between the title and the numbered sections.',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          name: 'legalSection',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'e.g. "1. WHO WE ARE"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: { heading: 'heading' },
            prepare({ heading }: any) {
              return { title: heading }
            },
          },
        },
      ],
    },
    {
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
      fieldset: 'advanced',
      description: 'Optional HTML id for anchor links. Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) => Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { title: 'pageTitle' },
    prepare({ title }: any) {
      return { title: title ?? 'Legal text', media: DocumentTextIcon }
    },
  },
} satisfies ObjectDefinition
