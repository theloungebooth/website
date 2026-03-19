// Keys that hold URLs, IDs, or technical values — skip smart quote processing
const SKIP_KEYS = new Set([
  "href",
  "imageUrl",
  "videoUrl",
  "thumbnailUrl",
  "ogImageUrl",
  "slug",
  "template",
  "fieldType",
  "mediaType",
  "galleryType",
  "aspectRatio",
  "alignment",
  "layout",
  "mediaPosition",
  "anchorId",
  "style",
  "seo",
  "defaultSeo",
])

function smartifyString(str: string): string {
  return str
    // Double quotes: opening after space/start/opening punctuation → "
    .replace(/(^|[\s([{,])"(?=\S)/g, "$1\u201C")
    // Double quotes: remaining → "
    .replace(/"/g, "\u201D")
    // Single quotes: contractions between word chars → '
    .replace(/(\w)'(\w)/g, "$1\u2019$2")
    // Single quotes: opening after space/start/opening punctuation → '
    .replace(/(^|[\s([{,])'(?=\S)/g, "$1\u2018")
    // Single quotes: remaining → ' (possessives, closing)
    .replace(/'/g, "\u2019")
}

export function deepSmartify<T>(value: T): T {
  if (typeof value === "string") return smartifyString(value) as T
  if (Array.isArray(value)) return value.map(deepSmartify) as T
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        k,
        k.startsWith("_") || SKIP_KEYS.has(k) ? v : deepSmartify(v),
      ])
    ) as T
  }
  return value
}
