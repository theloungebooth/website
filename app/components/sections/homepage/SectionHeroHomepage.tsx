import type { SectionHeroHomepage } from "~/types/sanity"
import { Button } from "../../ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"
import LocationIcon from "~/components/icons/ui/location.svg?react"

export function SectionHeroHomepage({ heading, subheading, item, primaryLink, secondaryLink, anchorId }: SectionHeroHomepage) {
  return (
    <Section id={anchorId ?? undefined}>
      <FadeInGroup stagger={0.25}>
        <FadeIn direction="up">
          <h1 className="pb-5 md:pb-7 type-base tracking-wide text-center text-primary-muted md:text-left mx-auto w-fit">
            Event photography & videography
          </h1>
          <h2 className="type-3xl md:type-4xl text-center text-balance max-w-175 mx-auto pb-4 md:pb-8">{heading}</h2>
          {subheading && <p className="type-base-plus text-center max-w-187.5 text-balance mx-auto pb-6 md:pb-8">{subheading}</p>}
          <div className="flex items-center justify-center gap-x-3 pb-10 md:pb-16">
            {primaryLink && (
              <Button variant="primary" href={primaryLink.href}>
                {primaryLink.label}
              </Button>
            )}
            {secondaryLink && (
              <Button variant="outline" arrow href={secondaryLink.href}>
                {secondaryLink.label}
              </Button>
            )}
          </div>
        </FadeIn>
        {item && (
          <FadeIn direction="up">
            <div className="mx-auto overflow-hidden rounded-custom md:max-w-lg">
              <div className="aspect-9/16 w-full bg-surface/65 rounded-custom">
                <MediaItem
                  item={item}
                  sizes="(max-width: 768px) 90vw, 512px"
                  widths={[400, 800, 1200]}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </FadeIn>
        )}
      </FadeInGroup>
    </Section>
  )
}
