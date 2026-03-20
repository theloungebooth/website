import type { SectionHeroServices } from "~/types/sanity"
import { Button } from "~/components/ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { Section } from "~/components/ui/Section"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"

export function SectionHeroServices({ serviceType, heading, subheading, item, primaryLink, anchorId }: SectionHeroServices) {
  return (
    <Section id={anchorId ?? undefined}>
      <FadeInGroup stagger={0.25} className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-16 items-center">
        <FadeIn direction="up">
          {serviceType && (
            <p className="mb-4 md:mb-6 type-base md:text-base-plus text-primary text-center md:text-left border-b border-primary mx-auto md:mx-0 w-fit">
              {serviceType}
            </p>
          )}
          <h1 className="type-2xl md:type-3xl text-center md:text-left text-balance">{heading}</h1>
          {subheading && (
            <p className="type-base md:type-base-plus color-primary-muted  text-center md:text-left text-balance pt-5 md:pt-6">
              {subheading}
            </p>
          )}

          {primaryLink && (
            <Button variant="primary" href={primaryLink.href}>
              {primaryLink.label}
            </Button>
          )}
        </FadeIn>
        <FadeIn direction="up">
          <div className="aspect-4/5 w-full overflow-hidden bg-surface/65 rounded-custom">
            {item && (
              <MediaItem
                item={item}
                sizes="(max-width: 1024px) 90vw, 50vw"
                widths={[400, 640, 900, 1280]}
                loading="eager"
                fetchPriority="high"
              />
            )}
          </div>
        </FadeIn>
      </FadeInGroup>
    </Section>
  )
}
