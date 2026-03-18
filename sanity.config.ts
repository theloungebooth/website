import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"
import { media, mediaAssetSource } from "sanity-plugin-media"
import { CogIcon, DocumentIcon } from "@sanity/icons"
import { schemaTypes } from "./sanity/schemas"

// Settings is the only singleton — one document, fixed ID.
const singletonTypes = new Set(["settings"])

export default defineConfig({
  name: "theloungebooth",
  title: "The Lounge Booth",
  basePath: "/studio",

  // projectId and dataset are not secrets — you can also commit them directly.
  // Create a project at https://sanity.io/manage, then add these to your .env:
  //   SANITY_STUDIO_PROJECT_ID=your_project_id
  //   SANITY_STUDIO_DATASET=production
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            // ── Site settings (singleton) ────────────────────────────────────
            S.listItem()
              .title("Site settings")
              .icon(CogIcon)
              .child(S.document().schemaType("settings").documentId("settings")),

            S.divider(),

            // ── Pages — drag to reorder ──────────────────────────────────────
            orderableDocumentListDeskItem({ type: "page", title: "Pages", icon: DocumentIcon, S, context }),
          ]),
    }),

    // Media browser — auto-populates from all uploaded assets
    media(),

    // GROQ query explorer — useful during development
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating additional settings documents
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  form: {
    image: {
      assetSources: () => [mediaAssetSource],
    },
    file: {
      assetSources: () => [mediaAssetSource],
    },
  },

  document: {
    comments: {
      enabled: false,
    },
    // For settings: only allow publish, discard, restore (no delete/duplicate)
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action === "publish" || action === "discardChanges" || action === "restore")
        : input,
  },
})
