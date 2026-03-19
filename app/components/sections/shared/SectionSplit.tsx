import type { SectionSplit } from "~/types/sanity"
import { MediaItem } from "~/components/ui/MediaItem"
import { PortableTextRenderer } from "~/components/ui/PortableText"
import { FadeIn } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"
import { cn } from "~/lib/cn"

export function SectionSplit({ heading, body, media, layout, anchorId }: SectionSplit) {
  const mediaRight = layout !== "text-right"

  const textCol = (
    <FadeIn direction="up" className="md:max-w-xl">
      {heading && (
        <h2 className="type-xl font-semibold md:type-2xl text-balance text-center md:text-left pb-3.5 md:pb-5">{heading}</h2>
      )}
      {body && <PortableTextRenderer value={body} />}
    </FadeIn>
  )

  const mediaCol = media ? (
    <FadeIn direction={mediaRight ? "left" : "right"} className="aspect-4/5 overflow-hidden rounded-custom bg-surface/65">
      <MediaItem item={media} sizes="(max-width: 1024px) 100vw, 50vw" widths={[400, 640, 900, 1280]} />
    </FadeIn>
  ) : null

  return (
    <Section
      id={anchorId ?? undefined}
      className="grid grid-cols-1 md:grid-cols-2 gap-y-10 sm:gap-y-12 gap-x-12 xl:gap-x-16 items-center"
    >
      <div className={cn("order-1", !mediaRight && "md:order-2")}>{textCol}</div>
      <div className={cn("order-2", !mediaRight && "md:order-1")}>{mediaCol}</div>
    </Section>
  )
}
