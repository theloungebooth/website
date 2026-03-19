import { Outlet, createFileRoute, useMatches } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import globalStyles from "~/styles/globals.css?url"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { publicSanityClient } from "@sanity/lib/client"
import { settingsQuery } from "@sanity/lib/queries"
import type { PageData, SettingsData } from "~/types/sanity"
import { Header } from "~/components/layout/Header"
import { Footer } from "~/components/layout/Footer"
import { seo } from "~/utils/seo"
import { withFilename } from "~/lib/imgUrl"
import { deepSmartify } from "~/utils/smartQuotes"
import { useIsMd, useIsSm } from "~/hooks/useBreakpoint"
import { cn } from "~/lib/cn"

const fetchSettings = createServerFn({ method: "GET" }).handler(async () => {
  const data = await publicSanityClient.fetch<SettingsData>(settingsQuery)
  return data ? deepSmartify(data) : null
})

export const settingsQueryOptions = () =>
  queryOptions({
    queryKey: ["settings"],
    queryFn: () => fetchSettings(),
    staleTime: 5 * 60 * 1000,
  })

export const Route = createFileRoute("/_layout")({
  loader: async ({ context: { queryClient } }) => queryClient.ensureQueryData(settingsQueryOptions()),
  head: ({ loaderData: settings }) => ({
    links: [{ rel: "stylesheet", href: globalStyles }],
    meta: seo({
      title: settings?.defaultSeo?.siteTitle ?? "The Lounge Booth",
      description: settings?.defaultSeo?.description ?? undefined,
      image: withFilename(settings?.defaultSeo?.ogImageUrl, settings?.defaultSeo?.ogImageFilename) || undefined,
      imageWidth: settings?.defaultSeo?.ogImageWidth ?? undefined,
      imageHeight: settings?.defaultSeo?.ogImageHeight ?? undefined,
    }),
  }),
  component: SiteLayout,
})

function SiteLayout() {
  const { data: settings } = useSuspenseQuery(settingsQueryOptions())
  const matches = useMatches()
  const pageData = matches.map((m) => m.loaderData as PageData | null).find((d) => !!d?.slug) ?? null
  const footerCta = pageData?.footerCta ?? null
  const slug = pageData?.slug ?? null
  const isSm = useIsMd()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "The Lounge Booth",
    url: import.meta.env.VITE_SITE_URL ?? "https://www.theloungebooth.com",
    logo: `${import.meta.env.VITE_SITE_URL ?? "https://www.theloungebooth.com"}/icon.svg`,
    image: withFilename(settings?.defaultSeo?.ogImageUrl, settings?.defaultSeo?.ogImageFilename) || undefined,
    telephone: "+17604580079",
    email: "info@theloungebooth.com",
    description:
      settings?.defaultSeo?.description ?? "Premium photo booth hire for weddings, corporate events and social occasions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "18575 Jamboree Rd",
      addressLocality: "Irvine",
      addressRegion: "CA",
      postalCode: "92612",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    priceRange: "$$$",
    makesOffer: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      description: "Available by appointment only",
    },
    sameAs: settings?.socialLinks?.map((l) => l.href).filter(Boolean) ?? [],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-secondary focus:text-primary focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Header settings={settings} />
      <main id="main-content" className={cn("relative z-10 bg-secondary lg:py-8", isSm && "rounded-b-custom overflow-clip")}>
        <Outlet />
      </main>
      {isSm && <div className="relative z-0 -mt-6 h-6 bg-primary" aria-hidden="true" />}
      <Footer settings={settings} footerCta={footerCta} slug={slug} />
    </>
  )
}
