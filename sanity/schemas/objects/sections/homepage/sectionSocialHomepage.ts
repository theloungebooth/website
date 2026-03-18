import type { ObjectDefinition } from "@sanity/types"
import { TrendUpwardIcon } from "@sanity/icons"

export const sectionSocialHomepage = {
  name: "sectionSocialHomepage",
  title: "Social proof",
  type: "object",
  icon: TrendUpwardIcon,
  fieldsets: [
    { name: 'advanced', title: 'Advanced', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      placeholder: "Trusted since 2022.",
    },
    {
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g. 180K+",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. Guests Photographed",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(3),
    },
    {
      name: "photos",
      title: "Floating Media",
      description: "Images or videos that float around the section (up to 12)",
      type: "array",
      of: [
        {
          name: "socialPhoto",
          type: "object",
          fields: [
            {
              name: "mediaType",
              title: "Media type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video", value: "video" },
                ],
                layout: "radio",
              },
              initialValue: "image",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }: any) => parent?.mediaType !== "image",
            },
            {
              name: "videoUrl",
              title: "Video",
              type: "file",
              options: { accept: "video/*" },
              hidden: ({ parent }: any) => parent?.mediaType !== "video",
            },
            {
              name: "thumbnailImage",
              title: "Thumbnail (for video)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }: any) => parent?.mediaType !== "video",
            },
            {
              name: "alt",
              title: "Alt text",
              type: "string",
            },
          ],
          preview: {
            select: { media: "image", thumbnail: "thumbnailImage", alt: "alt", mediaType: "mediaType" },
            prepare({ media, thumbnail, alt, mediaType }: any) {
              return {
                title: alt ?? (mediaType === "video" ? "Video" : "Image"),
                media: mediaType === "video" ? thumbnail : media,
              }
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(12),
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
    select: { heading: "heading" },
    prepare({ heading }: any) {
      return { title: "Social proof", subtitle: heading, media: TrendUpwardIcon }
    },
  },
} satisfies ObjectDefinition
