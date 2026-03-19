import { Link } from "@tanstack/react-router"
import type { SettingsData } from "~/types/sanity"
import { SiteLink } from "./SiteLink"
import Logo from "../icons/logo"
import { Button } from "../ui/Button"
import { MobileMenu } from "./MobileMenu"
import { useIsMd } from "~/hooks/useBreakpoint"

export function Header({ settings }: { settings: SettingsData | null }) {
  const isMd = useIsMd()

  return (
    <header className="relative z-51 bg-secondary">
      <div className="flex max-w-355 mx-auto items-center gap-x-6 justify-between p-5 sm:p-8">
        <Link to="/" className="type-nav text-primary" aria-label="The Lounge Booth – Home">
          <Logo className="h-12 xs:h-14 md:h-16 lg:h-18 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="group/nav hidden md:flex ml-auto gap-x-8 items-center text-primary" aria-label="Main navigation">
          {settings?.headerNav?.map((link) => (
            <SiteLink
              key={link.label}
              link={link}
              className="type-nav text-link group-has-[.active]/nav:text-primary-muted [&.active]:text-primary!"
            />
          ))}
        </nav>

        {isMd && settings?.headerCta && (
          <Button variant="primary" href={settings.headerCta.href} className="ml-1.5">
            {settings.headerCta.label}
          </Button>
        )}

        <MobileMenu settings={settings} />
      </div>
    </header>
  )
}
