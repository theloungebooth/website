export const sanityConfig = {
  projectId: process.env.VITE_SANITY_PROJECT_ID!,
  dataset: process.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2026-02-22",
  useCdn: process.env.NODE_ENV === "production",
}
