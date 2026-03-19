"use client"

import { motion, useReducedMotion } from "motion/react"
import type { SectionGalleryItem, SectionGalleryServices } from "~/types/sanity"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeIn } from "~/components/ui/FadeIn"
import { Section, SectionClasses } from "~/components/ui/Section"
import { useIsMd } from "~/hooks/useBreakpoint"
import { cn } from "~/lib/cn"

const ITEM_W_SM = 220 // px — below md
const ITEM_W_MD = 420 // px — md and above
const GAP_SM = 16 // px — below md
const GAP_MD = 24 // px — md and above
const SPEED = 60 // px/s

export function SectionGalleryServices({ heading, items, anchorId }: SectionGalleryServices) {
  const shouldReduceMotion = useReducedMotion()
  const isMd = useIsMd()
  const hasItems = items && items.length > 0
  const itemW = isMd ? ITEM_W_MD : ITEM_W_SM
  const gapPx = isMd ? GAP_MD : GAP_SM

  // Triple the track so we can start centered (middle of copy 2) and animate
  // rightward by exactly one copy width — seamless because all copies are identical.
  const track = hasItems ? [...items, ...items, ...items] : []

  const totalSingleWidth = (items?.length ?? 0) * (itemW + gapPx)
  const duration = totalSingleWidth / SPEED

  // Start: center of copy 2 = -(1.5 × totalSingleWidth)
  // End:   center of copy 1 = -(0.5 × totalSingleWidth)
  // Loop jump: end → start shows identical content — seamless.
  const startX = -(totalSingleWidth * 1.5)
  const endX = -(totalSingleWidth * 0.5)

  return (
    <Section id={anchorId ?? undefined} className="overflow-hidden max-w-none px-0!">
      {heading && (
        <FadeIn direction="up" className={cn(SectionClasses, "text-left pb-8 lg:pb-14")}>
          <h2 className="type-xl font-semibold md:type-2xl text-balance md:max-w-150">{heading}</h2>
        </FadeIn>
      )}

      {hasItems && (
        <div aria-hidden="true" className="w-full overflow-hidden">
          {shouldReduceMotion ? (
            <div className="flex" style={{ gap: `${gapPx}px`, transform: `translateX(${startX}px)` }}>
              {track.map((item, i) => (
                <GalleryItem key={`${item._key}-${i}`} item={item} itemW={itemW} />
              ))}
            </div>
          ) : (
            <motion.div
              key={String(isMd)}
              className="flex"
              style={{ gap: `${gapPx}px` }}
              initial={{ x: startX }}
              animate={{ x: endX }}
              transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {track.map((item, i) => (
                <GalleryItem key={`${item._key}-${i}`} item={item} itemW={itemW} />
              ))}
            </motion.div>
          )}
        </div>
      )}
    </Section>
  )
}

function GalleryItem({ item, itemW }: { item: SectionGalleryItem; itemW: number }) {
  return (
    <div className="shrink-0 overflow-hidden rounded-custom bg-surface/65 aspect-9/16" style={{ width: `${itemW}px` }}>
      <MediaItem item={item} sizes={`${itemW}px`} widths={[itemW, itemW * 2]} nonInteractive />
    </div>
  )
}
