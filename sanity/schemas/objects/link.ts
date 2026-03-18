import type { ObjectDefinition } from '@sanity/types'

// Reusable link type — type is auto-detected from the href value:
//   #anchor    → same-page anchor
//   /path      → internal page (TanStack Router <Link>)
//   https://…  → external URL (opens in same or new tab)
export const link = {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Button text',
      description: 'The text shown on the button',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'href',
      title: 'Link destination',
      type: 'string',
      description: 'Where the button goes — internal page (e.g. /about), anchor (#contact), or full URL (https://…)',
      validation: (Rule: any) => Rule.required(),
    },

  ],
  preview: {
    select: {
      label: 'label',
      href: 'href',
    },
    prepare({ label, href }: any) {
      return {
        title: label ?? 'Untitled link',
        subtitle: href ?? '',
      }
    },
  },
} satisfies ObjectDefinition
