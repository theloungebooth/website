import type { SectionHeroServices } from "~/types/sanity"
import { Button } from "~/components/ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { Section } from "~/components/ui/Section"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"

export function SectionHeroServices({ heading, subheading, item, primaryLink, anchorId }: SectionHeroServices) {
  return (
    <Section id={anchorId ?? undefined} className="pt-0">
      <FadeInGroup stagger={0.25} className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 items-center">
        <FadeIn direction="up">
          <h1 className="type-3xl text-balance">{heading}</h1>
          {subheading && <p className="type-base-plus color-primary-muted text-balance pt-6">{subheading}</p>}
          <div className="pt-8">
            {primaryLink && (
              <Button variant="primary" href={primaryLink.href}>
                {primaryLink.label}
              </Button>
            )}
          </div>
        </FadeIn>
        <FadeIn direction="up">
          <div className="aspect-4/5 w-full overflow-hidden bg-surface rounded-custom">
            {item && (
              <MediaItem item={item} sizes="(max-width: 1024px) 90vw, 50vw" widths={[400, 640, 900, 1280]} loading="eager" />
            )}
          </div>
        </FadeIn>
      </FadeInGroup>
    </Section>
  )
}
