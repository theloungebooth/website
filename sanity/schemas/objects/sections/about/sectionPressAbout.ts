import type { ObjectDefinition } from '@sanity/types'
import { DocumentTextIcon } from '@sanity/icons'

export const sectionPressAbout = {
  name: 'sectionPressAbout',
  title: 'Press',
  type: 'object',
  icon: DocumentTextIcon,
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
      title: 'Press items',
      type: 'array',
      options: { sortable: true },
      of: [
        {
          name: 'pressItem',
          title: 'Press item',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'media',
              title: 'Media',
              description: 'The publication or outlet name (e.g. "The New York Times")',
              type: 'string',
            },
            {
              name: 'sourceUrl',
              title: 'Source URL',
              type: 'url',
              validation: (Rule: any) =>
                Rule.uri({ scheme: ['http', 'https'] }).error('Must be a valid URL'),
            },
            {
              name: 'publishedDate',
              title: 'Published date',
              type: 'date',
              options: { dateFormat: 'MMMM D, YYYY' },
            },
          ],
          preview: {
            select: { title: 'title', author: 'author', date: 'publishedDate', media: 'media' },
            prepare({ title, author, date, media }: any) {
              const formattedDate = date
                ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : null
              return {
                title: title ?? 'Untitled',
                subtitle: [formattedDate, media, author].filter(Boolean).join(' · '),
              }
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
      description:
        'Optional HTML id for anchor links (e.g. "press"). Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) =>
        Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: any) {
      return { title: 'Press', subtitle: heading, media: DocumentTextIcon }
    },
  },
} satisfies ObjectDefinition
