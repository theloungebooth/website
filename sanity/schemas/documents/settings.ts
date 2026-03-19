import type { DocumentDefinition } from "@sanity/types"
import { CogIcon } from "@sanity/icons"

// Singleton document — controls header and footer navigation.
// To restrict this to one document in Sanity Studio v3, configure it as a
// singleton in your studio's structure builder (desk.ts / structure.ts).
export const settings = {
  name: "settings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    {
      name: "defaultSeo",
      title: "Default SEO",
      type: "object",
      description: "Fallback SEO values used on any page that has no specific SEO settings configured.",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "siteTitle",
          title: "Site title",
          type: "string",
          description: "Brand name shown in browser tabs and as the fallback page title (e.g. \"The Lounge Booth\").",
        },
        {
          name: "description",
          title: "Default meta description",
          type: "text",
          rows: 3,
          description: "Fallback description for pages without their own. Aim for 150–160 characters.",
        },
        {
          name: "ogImage",
          title: "Default social share image",
          type: "image",
          description: "Fallback image when sharing pages on social media. Recommended size: 1200×630px.",
          options: { hotspot: true },
        },
      ],
    },
    {
      name: "headerNav",
      title: "Header navigation",
      type: "array",
      of: [{ type: "link" }],
      description: "Links shown in the site header (desktop).",
    },
    {
      name: "headerCta",
      title: "Header CTA button",
      type: "link",
      description: "Optional call-to-action button shown in the header (desktop) and mobile menu.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "secondaryNav",
      title: "Secondary navigation",
      type: "array",
      of: [{ type: "link" }],
      description: "Used in the footer and mobile nav. Falls back to Header navigation in the mobile menu if left empty.",
    },
    {
      name: "legalLinks",
      title: "Legal links",
      type: "array",
      of: [{ type: "link" }],
      description: "Legal page links shown next to the copyright (e.g. Privacy Policy, Terms & Conditions).",
    },
    {
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "link" }],
      description: "Social links shown in the site footer. Email addresses (e.g. info@example.com) are automatically linked as mailto.",
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' }
    },
  },
} satisfies DocumentDefinition
