import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from "@tanstack/react-router"
import type { ErrorComponentProps } from "@tanstack/react-router"
import { Button } from "./ui/Button"

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => router.invalidate()}>Try again</Button>
        {isRoot ? (
          <Button href="/">Home</Button>
        ) : (
          <Button
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go back
          </Button>
        )}
      </div>
    </div>
  )
}
