interface SeoOptions {
  title: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

export function seo({ title, description, image, url, noIndex }: SeoOptions) {
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
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(image
      ? [
          { property: 'og:image', content: image },
          { name: 'twitter:image', content: image },
        ]
      : []),
  ].filter((tag) => Object.values(tag).every(Boolean))
}
