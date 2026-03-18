import type { ObjectDefinition } from '@sanity/types'

// Nav item — used in the header navigation.
// Can be a standalone link (label + href) or a dropdown parent (label + children).
// If children are provided, href is optional (the label acts as the dropdown trigger).
export const navItem = {
  name: 'navItem',
  title: 'Nav item',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'href',
      title: 'Link destination',
      type: 'string',
      description: 'Where this item links — leave blank if it is a dropdown-only trigger.',
    },
    {
      name: 'children',
      title: 'Dropdown items',
      type: 'array',
      of: [{ type: 'link' }],
      description: 'Add links here to make this item a dropdown. Leave empty for a plain link.',
    },
  ],
  preview: {
    select: {
      label: 'label',
      href: 'href',
      children: 'children',
    },
    prepare({ label, href, children }: any) {
      const hasChildren = Array.isArray(children) && children.length > 0
      return {
        title: label ?? 'Untitled',
        subtitle: hasChildren ? `Dropdown (${children.length} items)` : (href ?? ''),
      }
    },
  },
} satisfies ObjectDefinition
