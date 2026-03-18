import type { ObjectDefinition } from '@sanity/types'
import { HomeIcon } from '@sanity/icons'

export const sectionHeroContact = {
  name: 'sectionHeroContact',
  title: 'Contact',
  type: 'object',
  icon: HomeIcon,
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
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    },
    {
      name: 'items',
      title: 'Feature image/video',
      type: 'array',
      validation: (Rule: any) => Rule.max(1),
      of: [
        {
          name: 'galleryItem',
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
      name: 'formFields',
      title: 'Form fields',
      type: 'array',
      description: 'Add, remove, or reorder the fields shown in the contact form.',
      of: [
        {
          type: 'object',
          name: 'formField',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Used as the field label and as the key in the submitted data.',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'fieldType',
              title: 'Field type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Dropdown', value: 'select' },
                  { title: 'Long text', value: 'textarea' },
                ],
                layout: 'radio',
              },
              initialValue: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'placeholder',
              title: 'Placeholder text',
              type: 'string',
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'options',
              title: 'Options',
              description: 'One option per line. Only used when Field type is Dropdown.',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }: any) => parent?.fieldType !== 'select',
            },
          ],
          preview: {
            select: { label: 'label', fieldType: 'fieldType' },
            prepare({ label, fieldType }: any) {
              return { title: label, subtitle: fieldType }
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
      return { title: 'Contact', subtitle: heading, media: HomeIcon }
    },
  },
} satisfies ObjectDefinition
