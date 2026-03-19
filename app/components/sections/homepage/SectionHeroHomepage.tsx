import type { SectionHeroHomepage } from "~/types/sanity"
import { Button } from "../../ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"

export function SectionHeroHomepage({ heading, subheading, item, primaryLink, secondaryLink, anchorId }: SectionHeroHomepage) {
  return (
    <Section id={anchorId ?? undefined}>
      <FadeInGroup stagger={0.25}>
        <FadeIn direction="up">
          <h1 className="type-3xl md:type-4xl text-center text-balance max-w-175 mx-auto pb-4 md:pb-8">{heading}</h1>

          {subheading && (
            <p className="type-base-plus text-center color-primary-muted max-w-187.5 text-balance mx-auto pb-6 md:pb-8">
              {subheading}
            </p>
          )}
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
        <FadeIn direction="up">
          {item && (
            <div className="mx-auto overflow-hidden rounded-4xl max-w-lg">
              <div className="aspect-9/16 w-full bg-surface/65 rounded-custom">
                <MediaItem
                  item={item}
                  widths={[400, 800, 1200]}
                  loading="eager"
                  className="h-full w-[calc(100%+2px)] max-w-none object-cover -left-px -right-px"
                />
              </div>
            </div>
          )}
        </FadeIn>
      </FadeInGroup>
    </Section>
  )
}
