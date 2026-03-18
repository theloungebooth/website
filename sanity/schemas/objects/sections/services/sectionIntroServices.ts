import type { ObjectDefinition } from '@sanity/types'
import { ImagesIcon } from '@sanity/icons'

export const sectionIntroServices = {
  name: 'sectionIntroServices',
  title: 'Intro',
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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'items',
      title: 'Media (max 2)',
      type: 'array',
      validation: (Rule: any) => Rule.max(2),
      of: [
        {
          name: 'introMediaItem',
          type: 'object',
          fields: [
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
            select: { media: 'image', thumbnail: 'thumbnailImage', alt: 'alt', mediaType: 'mediaType' },
            prepare({ media, thumbnail, alt, mediaType }: any) {
              return {
                title: alt ?? (mediaType === 'video' ? 'Video' : 'Image'),
                media: mediaType === 'video' ? thumbnail : media,
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
      description: 'Optional HTML id for anchor links (e.g. "intro"). Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) => Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: any) {
      return { title: 'Intro', subtitle: heading, media: ImagesIcon }
    },
  },
} satisfies ObjectDefinition
