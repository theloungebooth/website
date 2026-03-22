import type { SectionHeroAbout } from "~/types/sanity"
import { Button } from "~/components/ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeInGroup, FadeIn } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"

export function SectionHeroAbout({ heading, subheading, item, primaryLink, anchorId }: SectionHeroAbout) {
  return (
    <Section id={anchorId ?? undefined}>
      <FadeInGroup className="text-center" stagger={0.25} immediate>
        <FadeIn direction="up" delay={0}>
          <h1 className="pb-4 md:pb-7 type-base tracking-wide text-center text-primary-muted md:text-left mx-auto w-fit">
            About us
          </h1>
          <h2 className="type-2xl md:type-3xl text-balance">{heading}</h2>
          {subheading && <p className="type-base-plus text-balance pt-4 md:pt-6 max-w-prose mx-auto">{subheading}</p>}
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
          delay={0}
          className="relative mt-8 md:mt-12 aspect-5/4 md:aspect-video overflow-hidden rounded-custom bg-surface/65"
        >
          {item && <MediaItem item={item} sizes="100vw" widths={[800, 1200, 1600, 2400]} loading="eager" fetchPriority="high" />}
        </FadeIn>
      </FadeInGroup>
    </Section>
  )
}
