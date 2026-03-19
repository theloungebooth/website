import { createFileRoute } from '@tanstack/react-router'
import { publicSanityClient } from '@sanity/lib/client'

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://www.theloungebooth.com'

type SitemapPage = {
  slug: string
  _updatedAt: string
  noIndex?: boolean | null
}

const pagesQuery = /* groq */ `
  *[_type == "page" && defined(slug.current) && slug.current != "home"] {
    "slug": slug.current,
    _updatedAt,
    "noIndex": seo.noIndex,
  }
`

function formatDate(iso: string) {
  return new Date(iso).toISOString().split('T')[0]
}

function buildXml(pages: SitemapPage[]) {
  const indexable = pages.filter((p) => !p.noIndex)

  const urls = [
    `<url>
      <loc>${SITE_URL}/</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>`,
    ...indexable.map(
      (page) => `<url>
      <loc>${SITE_URL}/${page.slug}</loc>
      <lastmod>${formatDate(page._updatedAt)}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`,
    ),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n  ')}
</urlset>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const pages = await publicSanityClient.fetch<SitemapPage[]>(pagesQuery)

        return new Response(buildXml(pages ?? []), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        })
      },
    },
  },
})
