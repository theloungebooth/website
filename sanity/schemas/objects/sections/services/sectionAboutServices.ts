import type { ObjectDefinition } from '@sanity/types'
import { ImagesIcon } from '@sanity/icons'

export const sectionAboutServices = {
  name: 'sectionAboutServices',
  title: 'About',
  type: 'object',
  icon: ImagesIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'aboutServicesItem',
          type: 'object',
          fields: [
            {
              name: 'subheading',
              title: 'Subheading',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
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
              options: { accept: 'video/mp4,video/webm,video/quicktime' },
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
            select: { title: 'subheading', subtitle: 'body', media: 'image', thumbnail: 'thumbnailImage', mediaType: 'mediaType' },
            prepare({ title, subtitle, media, thumbnail, mediaType }: any) {
              return { title, subtitle, media: mediaType === 'video' ? thumbnail : media }
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
      description: 'Optional HTML id for anchor links (e.g. "about"). Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) => Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: any) {
      return { title: 'About', subtitle: heading, media: ImagesIcon }
    },
  },
} satisfies ObjectDefinition
