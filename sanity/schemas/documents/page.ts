import type { DocumentDefinition } from '@sanity/types'
import React from 'react'
import { DocumentIcon, HomeIcon, UsersIcon, StarIcon, EnvelopeIcon, BookIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

const TEMPLATE_LABELS: Record<string, string> = {
  homepage:  'Homepage',
  about:     'About',
  service:   'Service',
  contact:   'Contact',
  caseStudy: 'Case study',
  legal:     'Legal',
}

const TEMPLATE_ICONS: Record<string, React.ComponentType> = {
  homepage:  HomeIcon,
  about:     UsersIcon,
  service:   StarIcon,
  contact:   EnvelopeIcon,
  caseStudy: DocumentIcon,
  legal:     BookIcon,
}

export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'page' }),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL path for this page. Use "home" for the homepage (maps to /). All others become /slug.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'template',
      title: 'Template',
      type: 'string',
      description: 'Determines which section types are available on this page.',
      options: {
        list: [
          { title: 'Homepage',   value: 'homepage'  },
          { title: 'About',      value: 'about'     },
          { title: 'Service',    value: 'service'   },
          { title: 'Contact',    value: 'contact'   },
          { title: 'Case study', value: 'caseStudy' },
          { title: 'Legal',      value: 'legal'     },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'sectionsHomepage',
      title: 'Page sections',
      type: 'array',
      hidden: ({ document }: any) => document?.template !== 'homepage',
      of: [
        { type: 'sectionHeroHomepage' },
        { type: 'sectionSocialHomepage' },
        { type: 'sectionServicesHomepage' },
        { type: 'sectionNarrative' },
        { type: 'sectionQuote' },
        { type: 'sectionFaq' },
        { type: 'sectionExplainer' },
      ],
    },
    {
      name: 'sectionsAbout',
      title: 'Page sections',
      type: 'array',
      hidden: ({ document }: any) => document?.template !== 'about',
      of: [
        { type: 'sectionHeroAbout' },
        { type: 'sectionNarrative' },
        { type: 'sectionTeamAbout' },
        { type: 'sectionPressAbout' },
        { type: 'sectionQuote' },
        { type: 'sectionFaq' },
        { type: 'sectionExplainer' },
      ],
    },
    {
      name: 'sectionsService',
      title: 'Page sections',
      type: 'array',
      hidden: ({ document }: any) => document?.template !== 'service',
      of: [
        { type: 'sectionHeroServices' },
        { type: 'sectionIntroServices' },
        { type: 'sectionGalleryServices' },
        { type: 'sectionQuote' },
        { type: 'sectionFaq' },
        { type: 'sectionExplainer' },
      ],
    },
    {
      name: 'sectionsContact',
      title: 'Page sections',
      type: 'array',
      hidden: ({ document }: any) => document?.template !== 'contact',
      of: [
        { type: 'sectionHeroContact' },
        { type: 'sectionFaq' },
        { type: 'sectionExplainer' },
      ],
    },
    {
      name: 'sectionsLegal',
      title: 'Page sections',
      type: 'array',
      hidden: ({ document }: any) => document?.template !== 'legal',
      of: [
        { type: 'sectionLegalText' },
        { type: 'sectionFaq' },
        { type: 'sectionExplainer' },
      ],
    },
    {
      name: 'footerCta',
      title: 'Footer CTA',
      description: 'Optional call-to-action shown in the footer above the nav. Leave empty to hide it.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fieldsets: [
        { name: 'cta', title: 'Call to action', options: { collapsible: true, collapsed: true } },
      ],
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button',
          type: 'link',
          fieldset: 'cta',
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', template: 'template' },
    prepare({ title, slug, template }: any) {
      const path = slug === 'home' ? '/ (home)' : slug ? `/${slug}` : 'No slug'
      const label = template ? TEMPLATE_LABELS[template] ?? template : 'No template'
      const Icon = template ? TEMPLATE_ICONS[template] : undefined
      return {
        title: title ?? 'Untitled page',
        subtitle: `${label} · ${path}`,
        media: Icon ? React.createElement(Icon) : undefined,
      }
    },
  },
} satisfies DocumentDefinition
