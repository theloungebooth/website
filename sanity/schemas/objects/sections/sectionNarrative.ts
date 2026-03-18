import type { ObjectDefinition } from '@sanity/types'
import { InlineIcon } from '@sanity/icons'

const mediaFields = [
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
]

export const sectionNarrative = {
  name: 'sectionNarrative',
  title: 'Split',
  type: 'object',
  icon: InlineIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text left, media right', value: 'text-left' },
          { title: 'Text right, media left', value: 'text-right' },
        ],
        layout: 'radio',
      },
      initialValue: 'text-left',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'logoBar' }],
    },
    {
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: mediaFields,
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
    select: { title: 'heading', media: 'media.image', thumbnail: 'media.thumbnailImage', mediaType: 'media.mediaType' },
    prepare({ title, media, thumbnail, mediaType }: any) {
      return {
        title: title ?? 'Split',
        media: mediaType === 'video' ? thumbnail : (media ?? InlineIcon),
      }
    },
  },
} satisfies ObjectDefinition
