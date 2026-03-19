import type { FooterCta, SettingsData } from "~/types/sanity"
import { SiteLink } from "./SiteLink"
import { Button } from "../ui/Button"
import { Fragment } from "react"
import { cn } from "~/lib/cn"
import { useIsMd } from "~/hooks/useBreakpoint"

export function Footer({
  settings,
  footerCta,
  slug,
}: {
  settings: SettingsData | null
  footerCta?: FooterCta | null
  slug?: string | null
}) {
  const isMd = useIsMd()

  return (
    <footer className={cn("bg-primary text-secondary-muted", isMd && "sticky bottom-0 z-0")}>
      {footerCta?.title && (
        <div className="py-20 pb-10 md:py-24 xl:py-32 px-5 sm:px-8 text-center">
          <h2 className="type-xl md:type-2xl text-secondary text-balance pb-5">{footerCta.title}</h2>
          {slug === "contact" ? (
            <>
              <p className="type-base-plus mx-auto max-w-[60ch] text-balance">
                Email us at{" "}
                <a href="mailto:info@theloungebooth.com" className="text-secondary font-medium text-link">
                  info@theloungebooth.com
                </a>
                , call{" "}
                <a href="tel:+17604580079" className="text-secondary font-medium text-link">
                  1.760.458.0079
                </a>
                , or find us on social.
              </p>
              <p className="type-base-plus mx-auto max-w-[60ch] text-balance pb-6">Based in LA. We travel.</p>
            </>
          ) : footerCta.subheading ? (
            <h3 className="type-base-plus mx-auto max-w-[60ch] text-balance pb-6">{footerCta.subheading}</h3>
          ) : null}
          {footerCta.link && (
            <Button variant="secondary" arrow href={footerCta.link.href} className="mx-auto mb-8">
              {footerCta.link.label}
            </Button>
          )}

          <nav className="flex gap-x-2.5 items-center justify-center" aria-label="Social navigation">
            {settings?.footerNavSocial?.map((link, index) => (
              <Fragment key={link.label}>
                <SiteLink link={link} className="type-nav text-link" />
                {index < (settings?.footerNavSocial?.length || 0) - 1 && (
                  <span className="text-xs" aria-hidden="true">
                    •
                  </span>
                )}
              </Fragment>
            ))}
          </nav>
        </div>
      )}

      <div className="p-5 pb-10 sm:p-8 max-w-355 mx-auto flex text-primary-muted flex-row gap-x-6 justify-between items-start">
        {/* Left: copyright + legal links */}
        <div className="flex flex-wrap justify-between w-full flex-col md:flex-row md:w-auto md:justify-start items-center md:items-start gap-y-1">
          <p className="type-base-minus pr-4">© {new Date().getFullYear()} The Lounge Booth</p>
          <div className="flex gap-x-1 md:gap-x-1.5">
            {settings?.footerNavLegal?.map((link, index) => (
              <Fragment key={link.label}>
                <SiteLink link={link} className="type-base-minus text-link" />
                {(settings?.footerNavLegal?.length || 0) === 2 && index === 0 && (
                  <span aria-hidden="true" className="type-base-minus">
                    &
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Right: site nav + contact */}
        {isMd && (
          <nav className="flex items-center justify-center gap-x-5 gap-y-1" aria-label="Footer navigation">
            {settings?.footerNavSite?.map((link, index) => (
              <SiteLink key={link.label} link={link} className="type-base-minus text-link" />
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}
