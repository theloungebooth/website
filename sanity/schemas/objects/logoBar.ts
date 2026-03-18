import type { ObjectDefinition } from '@sanity/types'
import { ImagesIcon } from '@sanity/icons'

export const logoBar = {
  name: 'logoBar',
  title: 'Logo Bar',
  type: 'object',
  icon: ImagesIcon,
  fields: [{ name: 'placeholder', type: 'string', hidden: true }],
  preview: {
    prepare() {
      return { title: 'Logo Bar' }
    },
  },
} satisfies ObjectDefinition
