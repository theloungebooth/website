/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"
import type { QueryClient } from "@tanstack/react-query"
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary"
import { NotFound } from "~/components/NotFound"
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
    ],
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
