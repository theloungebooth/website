import type { ObjectDefinition } from '@sanity/types'

export const seo = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Overrides the page title in search results (50–60 chars recommended)',
      validation: (Rule: any) => Rule.max(60).warning('Meta title should be 60 characters or fewer'),
    },
    {
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown in search results (150–160 chars recommended)',
      validation: (Rule: any) => Rule.max(160).warning('Meta description should be 160 characters or fewer'),
    },
    {
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Recommended: 1200 × 630 px',
      options: { hotspot: true },
    },
    {
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    },
  ],
} satisfies ObjectDefinition
