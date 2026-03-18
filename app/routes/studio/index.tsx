import { createFileRoute } from "@tanstack/react-router"
import { Studio } from "sanity"
import config from "../../../sanity.config"

export const Route = createFileRoute("/studio/")({
  component: StudioPage,
})

function StudioPage() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      <Studio config={config} />
    </div>
  )
}
