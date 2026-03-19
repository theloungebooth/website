import { createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { publicSanityClient } from "@sanity/lib/client"
import { pageBySlugQuery } from "@sanity/lib/queries"
import type { PageData } from "~/types/sanity"
import { SectionRenderer } from "~/components/sections/SectionRenderer"
import { seo } from "~/utils/seo"
import { withFilename } from "~/lib/imgUrl"
import { deepSmartify } from "~/utils/smartQuotes"

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://www.theloungebooth.com"

const fetchHomePage = createServerFn({ method: "GET" }).handler(async () => {
  const data = await publicSanityClient.fetch<PageData>(pageBySlugQuery, { slug: "home" })
  return data ? deepSmartify(data) : null
})

const homePageQueryOptions = () =>
  queryOptions({
    queryKey: ["page", "home"],
    queryFn: () => fetchHomePage(),
  })

export const Route = createFileRoute("/_layout/")({
  loader: async ({ context: { queryClient } }) => queryClient.ensureQueryData(homePageQueryOptions()),
  head: ({ loaderData: page }) => {
    const url = `${SITE_URL}`
    return {
      meta: seo({
        title: page?.seo?.title ?? "The Lounge Booth",
        description: page?.seo?.description ?? undefined,
        image: withFilename(page?.seo?.ogImageUrl, page?.seo?.ogImageFilename) || undefined,
        imageWidth: page?.seo?.ogImageWidth ?? undefined,
        imageHeight: page?.seo?.ogImageHeight ?? undefined,
        url,
        noIndex: page?.seo?.noIndex ?? undefined,
      }),
      links: [{ rel: "canonical", href: url }],
    }
  },
  component: HomePage,
})

function HomePage() {
  const { data: page } = useSuspenseQuery(homePageQueryOptions())

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="type-base text-primary">No home page yet — create a page with slug "home" in Sanity Studio.</p>
      </div>
    )
  }

  return <SectionRenderer sections={page.sections ?? []} />
}
