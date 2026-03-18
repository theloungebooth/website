/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router"
import type { QueryClient } from "@tanstack/react-query"
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary"
import { NotFound } from "~/components/NotFound"
import globalStyles from "~/styles/globals.css?url"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: globalStyles },
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
