import { Link } from "@tanstack/react-router"
import { Button } from "./ui/Button"

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <div className="text-center text-neutral-500">{children ?? <p>The page you are looking for does not exist.</p>}</div>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Button href="/">Home</Button>
      </div>
    </div>
  )
}
