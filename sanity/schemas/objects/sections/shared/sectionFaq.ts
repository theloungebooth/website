import type { ObjectDefinition } from '@sanity/types'
import { OlistIcon } from '@sanity/icons'

export const sectionFaq = {
  name: 'sectionFaq',
  title: 'FAQ',
  type: 'object',
  icon: OlistIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: OlistIcon,
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }: any) {
              return { title: question ?? 'Untitled question' }
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
      description: 'Optional HTML id for anchor links (e.g. "faq"). Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) => Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { heading: 'heading', items: 'items' },
    prepare({ heading, items }: any) {
      const count = items?.length ?? 0
      return {
        title: heading ?? 'FAQ',
        subtitle: count ? `${count} question${count === 1 ? '' : 's'}` : 'No questions yet',
        media: OlistIcon,
      }
    },
  },
} satisfies ObjectDefinition
