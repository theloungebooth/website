import type { ObjectDefinition } from '@sanity/types'
import { OlistIcon, PlayIcon, ImageIcon } from '@sanity/icons'

export const sectionExplainer = {
  name: 'sectionExplainer',
  title: 'Explainer',
  type: 'object',
  icon: OlistIcon,
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
      name: 'subheading',
      title: 'Section subheading',
      description: 'Short line shown below the step titles in the sticky nav (desktop).',
      type: 'string',
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
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
                direction: 'horizontal',
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
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
              options: { hotspot: true },
              hidden: ({ parent }: any) => parent?.mediaType !== 'video',
            },
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'title', description: 'description', media: 'image', thumbnail: 'thumbnailImage', mediaType: 'mediaType' },
            prepare({ title, description, media, thumbnail, mediaType }: any) {
              return {
                title: title ?? description ?? 'Step',
                media: mediaType === 'video' ? (thumbnail ?? PlayIcon) : (media ?? ImageIcon),
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
      description: 'Optional HTML id for anchor links (e.g. "how-it-works"). Lowercase letters, numbers, and hyphens only.',
      validation: (Rule: any) => Rule.regex(/^[a-z0-9-]*$/).error('Use lowercase letters, numbers, and hyphens only'),
    },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: any) {
      return { title: 'Explainer', subtitle: heading, media: OlistIcon }
    },
  },
} satisfies ObjectDefinition
