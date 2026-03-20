/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"
import type { QueryClient } from "@tanstack/react-query"
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary"
import { NotFound } from "~/components/NotFound"

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000000" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://cdn.sanity.io" },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
    ],
    scripts: GA_ID
      ? [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
            async: true,
          },
          {
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          },
        ]
      : [],
  }),
  errorComponent: (props) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <DefaultCatchBoundary {...props} />
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: () => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <NotFound />
        <Scripts />
      </body>
    </html>
  ),
  component: RootComponent,
})

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    if (GA_ID && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_location: window.location.href })
    }
  }, [pathname])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
