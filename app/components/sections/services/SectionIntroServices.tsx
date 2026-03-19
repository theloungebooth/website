import type { SectionIntroServices } from "~/types/sanity"
import { PortableTextRenderer } from "~/components/ui/PortableText"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"

export function SectionIntroServices({ heading, items, body, anchorId }: SectionIntroServices) {
  const [itemA, itemB] = items ?? []

  return (
    <Section id={anchorId ?? undefined}>
      <FadeInGroup stagger={0.2} className="flex flex-col items-center">
        <FadeIn direction="up" className="w-full text-center">
          <h2 className="type-xl font-semibold md:type-2xl text-balance max-w-200 pb-3.5 md:pb-5 mx-auto">{heading}</h2>
          {body && (
            <div className="md:max-w-187.5 text-balance mx-auto color-primary-muted text-center">
              <PortableTextRenderer value={body} />
            </div>
          )}
        </FadeIn>

        {(itemA || itemB) && (
          <div className="w-full pt-10 lg:pt-14 grid grid-cols-12 gap-4 lg:gap-6 items-start">
            {itemA && (
              <FadeIn direction="down" className="aspect-4/5 col-span-5 overflow-hidden rounded-custom bg-surface/65">
                <MediaItem item={itemA} sizes="40vw" widths={[400, 700, 1200]} />
              </FadeIn>
            )}
            {itemB && (
              <FadeIn direction="up" className="aspect-4/5 col-span-7 overflow-hidden rounded-custom bg-surface/65">
                <MediaItem item={itemB} sizes="55vw" widths={[500, 900, 1200, 1600]} />
              </FadeIn>
            )}
          </div>
        )}
      </FadeInGroup>
    </Section>
  )
}
