import { createFileRoute, notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { z } from "zod"
import { publicSanityClient } from "@sanity/lib/client"
import { pageBySlugQuery } from "@sanity/lib/queries"
import type { PageData } from "~/types/sanity"
import { SectionRenderer } from "~/components/sections/SectionRenderer"
import { NotFound } from "~/components/NotFound"
import { seo } from "~/utils/seo"
import { withFilename } from "~/lib/imgUrl"
import { deepSmartify } from "~/utils/smartQuotes"

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://www.theloungebooth.com"

const fetchPage = createServerFn({ method: "GET" })
  .inputValidator(z.string())
  .handler(async ({ data: slug }) => {
    // "home" slug is reserved for the index route
    if (slug === "home") throw notFound()
    const data = await publicSanityClient.fetch<PageData>(pageBySlugQuery, { slug })
    if (!data) throw notFound()
    return deepSmartify(data)
  })

const pageQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["page", slug],
    queryFn: () => fetchPage({ data: slug }),
  })

export const Route = createFileRoute("/_layout/$slug")({
  loader: async ({ params, context: { queryClient } }) => queryClient.ensureQueryData(pageQueryOptions(params.slug)),
  head: ({ loaderData: page, params }) => {
    const url = `${SITE_URL}/${params.slug}`
    let description = page?.seo?.description ?? undefined
    if (page?.template === "legal" && page?._updatedAt) {
      const formatted = new Date(page._updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      description = description ? `${description} Last updated ${formatted}.` : `Last updated ${formatted}.`
    }
    return {
      meta: seo({
        title: page?.seo?.title ?? page?.title ?? "The Lounge Booth",
        description,
        image: withFilename(page?.seo?.ogImageUrl, page?.seo?.ogImageFilename) || undefined,
        url,
        noIndex: page?.seo?.noIndex ?? undefined,
      }),
      links: [{ rel: "canonical", href: url }],
    }
  },
  notFoundComponent: () => <NotFound />,
  component: SlugPage,
})

function SlugPage() {
  const { data: page } = useSuspenseQuery(pageQueryOptions(Route.useParams().slug))
  return <SectionRenderer sections={page.sections ?? []} updatedAt={page._updatedAt} />
}
