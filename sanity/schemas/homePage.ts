import type { DocumentDefinition } from '@sanity/types'

export const homePage = {
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      of: [
        { type: 'sectionHeroHomepage' },
        { type: 'sectionContent' },
        { type: 'sectionGallery' },
        { type: 'sectionMedia' },
        { type: 'sectionCta' },
        { type: 'sectionSplit' },
      ],
    },
  ],
} satisfies DocumentDefinition
