interface SeoOptions {
  title: string
  description?: string
  image?: string
  imageWidth?: number | null
  imageHeight?: number | null
  url?: string
  noIndex?: boolean
}

export function seo({ title, description, image, imageWidth, imageHeight, url, noIndex }: SeoOptions) {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: noIndex ? 'noindex, nofollow' : undefined },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'The Lounge Booth' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:site', content: '@theloungebooth' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(image
      ? [
          { property: 'og:image', content: image },
          ...(imageWidth ? [{ property: 'og:image:width', content: String(imageWidth) }] : []),
          ...(imageHeight ? [{ property: 'og:image:height', content: String(imageHeight) }] : []),
          { name: 'twitter:image', content: image },
        ]
      : []),
  ].filter((tag) => Object.values(tag).every(Boolean))
}
