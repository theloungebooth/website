import type { ObjectDefinition } from '@sanity/types'
import { BlockquoteIcon } from '@sanity/icons'

export const sectionQuote = {
  name: 'sectionQuote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authorName',
      title: 'Author name',
      type: 'string',
    },
    {
      name: 'authorTitle',
      title: 'Author title / role',
      type: 'string',
    },
    {
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
      fieldset: 'advanced',
      description: 'Optional HTML id for anchor links (e.g. "testimonial"). Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) => Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { quote: 'quote', authorName: 'authorName' },
    prepare({ quote, authorName }: any) {
      return {
        title: quote ?? 'Quote',
        subtitle: authorName ?? undefined,
        media: BlockquoteIcon,
      }
    },
  },
} satisfies ObjectDefinition
