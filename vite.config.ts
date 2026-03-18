import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import svgr from "vite-plugin-svgr"
import { nitro } from "nitro/vite"

export default defineConfig({
  ssr: {
    noExternal: ["sanity", "sanity-plugin-media", "@sanity/ui", "@sanity/icons", "react-dropzone"],
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      // Routes and routeTree.gen.ts resolve relative to srcDirectory,
      // so defaults ('routes' and 'routeTree.gen.ts') point to app/routes
      // and app/routeTree.gen.ts automatically.
      srcDirectory: "app",
    }),
    nitro({
      alias: {
        "readable-stream": "node:stream",
      },
    }),
    viteReact(),
    svgr(),
  ],
})
