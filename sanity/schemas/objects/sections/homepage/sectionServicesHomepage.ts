import type { ObjectDefinition } from '@sanity/types'
import { CaseIcon } from '@sanity/icons'

export const sectionServicesHomepage = {
  name: 'sectionServicesHomepage',
  title: 'Services',
  type: 'object',
  icon: CaseIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'heading',
      title: 'Section heading',
      type: 'string',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'cta',
              title: 'Button',
              type: 'link',
            },
            {
              name: 'mediaType',
              title: 'Media type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true, accept: 'image/*' },
              hidden: ({ parent }: any) => parent?.mediaType !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'Video',
              type: 'file',
              options: { accept: 'video/*' },
              hidden: ({ parent }: any) => parent?.mediaType !== 'video',
            },
            {
              name: 'thumbnailImage',
              title: 'Thumbnail (for video)',
              type: 'image',
              options: { hotspot: true, accept: 'image/*' },
              hidden: ({ parent }: any) => parent?.mediaType !== 'video',
            },
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'heading', media: 'image', thumbnail: 'thumbnailImage', mediaType: 'mediaType' },
            prepare({ title, media, thumbnail, mediaType }: any) {
              return {
                title: title ?? 'Service',
                media: mediaType === 'video' ? thumbnail : media,
                subtitle: mediaType === 'video' ? 'Video' : 'Image',
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
      description: 'Optional HTML id for anchor links (e.g. "packages"). Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) => Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: any) {
      return { title: 'Services', subtitle: heading, media: CaseIcon }
    },
  },
} satisfies ObjectDefinition
