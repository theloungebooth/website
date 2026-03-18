import type { SectionHeroAbout } from "~/types/sanity"
import { Button } from "~/components/ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeInGroup, FadeIn } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"

export function SectionHeroAbout({ heading, subheading, item, primaryLink, anchorId }: SectionHeroAbout) {
  return (
    <Section id={anchorId ?? undefined}>
      <FadeInGroup className="text-center" stagger={0.25}>
        <FadeIn direction="up">
          <h1 className="type-2xl md:type-3xl text-balance">{heading}</h1>
          {subheading && (
            <p className="type-base-plus color-primary-muted text-balance pt-4 md:pt-6 max-w-prose mx-auto">{subheading}</p>
          )}
          {primaryLink && (
            <div className="pt-8 flex justify-center">
              <Button variant="primary" href={primaryLink.href}>
                {primaryLink.label}
              </Button>
            </div>
          )}
        </FadeIn>
        <FadeIn
          direction="up"
          className="-left-5 -right-5 w-[calc(100%+2.5rem)] md:left-auto md:right-auto md:w-full relative mt-8 md:mt-12 aspect-5/4 md:aspect-video overflow-hidden md:rounded-custom bg-surface"
        >
          {item && <MediaItem item={item} sizes="100vw" widths={[800, 1200, 1600, 2400]} loading="eager" />}
        </FadeIn>
      </FadeInGroup>
    </Section>
  )
}
