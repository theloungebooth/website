import { cn } from "~/lib/cn"
import { CLIENT_LOGOS } from "~/components/icons/clients"

const LOGO_SIZES: Record<string, string> = {
  Apple: "w-26 h-6.5 mb-1 ml-1 md:ml-0",
  Disney: "w-27 h-7",
  "Universal Pictures": "w-28 h-8",
  Spotify: "w-36 h-10",
}

export function LogoBar() {
  return (
    <div className="flex pt-2 md:pt-4 -ml-1.5 items-center justify-start gap-x-4 md:gap-x-2">
      {CLIENT_LOGOS.map((logo, index) => (
        <span
          key={logo.name}
          className={cn(
            "flex items-center justify-start text-primary-muted/45 [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:w-auto [&>svg]:h-auto",
            index >= 4 && "hidden md:flex",
            LOGO_SIZES[logo.name] ?? "w-28 h-7",
          )}
        >
          <logo.Icon />
        </span>
      ))}
    </div>
  )
}
