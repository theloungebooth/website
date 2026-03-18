import type { ObjectDefinition } from '@sanity/types'
import { UsersIcon } from '@sanity/icons'

export const sectionTeamAbout = {
  name: 'sectionTeamAbout',
  title: 'The Team',
  type: 'object',
  icon: UsersIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'members',
      title: 'Team members',
      type: 'array',
      of: [
        {
          name: 'teamMember',
          title: 'Team member',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true, accept: 'image/*' },
            },
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { media: 'image', name: 'name', role: 'role' },
            prepare({ media, name, role }: any) {
              return { title: name, subtitle: role, media }
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
      return { title: 'The Team', subtitle: heading, media: UsersIcon }
    },
  },
} satisfies ObjectDefinition
