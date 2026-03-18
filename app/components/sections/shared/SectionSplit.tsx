import type { SectionSplit } from "~/types/sanity"
import { MediaItem } from "~/components/ui/MediaItem"
import { PortableTextRenderer } from "~/components/ui/PortableText"
import { FadeIn } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"
import { cn } from "~/lib/cn"

export function SectionSplit({ heading, body, media, layout, anchorId }: SectionSplit) {
  const mediaRight = layout !== "text-right"

  const textCol = (
    <FadeIn direction="up" className="order-0 lg:order-0">
      <div className="max-w-xl">
        {heading && <h2 className="type-2xl text-balance pb-5">{heading}</h2>}
        {body && (
          <div className="color-primary-muted">
            <PortableTextRenderer value={body} />
          </div>
        )}
      </div>
    </FadeIn>
  )

  const mediaCol = media ? (
    <FadeIn
      direction={mediaRight ? "left" : "right"}
      className="aspect-4/5 overflow-hidden rounded-custom bg-surface order-1 lg:order-0"
    >
      <MediaItem item={media} sizes="(max-width: 1024px) 100vw, 50vw" widths={[400, 640, 900, 1280]} />
    </FadeIn>
  ) : null

  return (
    <Section id={anchorId ?? undefined}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {mediaRight ? textCol : mediaCol}
        {mediaRight ? mediaCol : textCol}
      </div>
    </Section>
  )
}
