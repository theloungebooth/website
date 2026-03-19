"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion } from "motion/react"
import type { SectionSocialHomepage } from "~/types/sanity"
import { cn } from "~/lib/cn"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { FadeInScatter } from "~/components/ui/FadeInScatter"

// Splits a stat string like "180K", "50M", or "650" into its numeric
// part and trailing suffix so we can animate the number independently.
function parseStatValue(raw: string) {
  const match = raw.match(/^([\d.]+)([^\d.]*)$/)
  if (!match) return { num: 0, suffix: raw }
  return { num: parseFloat(match[1]), suffix: match[2] }
}

// Counts up from 0 to the target value when it scrolls into view,
// mirroring the same viewport margin used by FadeIn/FadeInGroup so
// the count starts the moment the number begins to appear.
function StatCounter({ value }: { value: string }) {
  const shouldReduceMotion = useReducedMotion()
  const { num, suffix } = parseStatValue(value)
  const count = useMotionValue(0)
  const ref = useRef<HTMLSpanElement>(null)

  // Once: true — count only fires once, same as the FadeIn reveal.
  // Margin matches FadeInGroup so they're perfectly in sync.
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  // Transform the raw float into a formatted display string.
  // All current values are whole numbers, so Math.round is correct;
  // preserving this as a transform keeps it reactive with no re-renders.
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return

    const controls = animate(count, num, {
      // Deceleration curve: rockets off the start, eases into the final value.
      // This makes the ending feel intentional rather than mechanical.
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // expo-out feel
    })

    return controls.stop
  }, [isInView, shouldReduceMotion, count, num])

  // Reduced-motion: skip the animation entirely, just render the value.
  if (shouldReduceMotion) return <span>{value}</span>

  return <motion.span ref={ref}>{display}</motion.span>
}

// Phase offsets stay within ~20% of the cycle (≤2s of 10s) so all images
// remain in the same arc at any moment — same direction, subtle variance.
// Slightly different durations add organic character without breaking unity.
const POSITIONS = [
  { top: "6%", left: "48.9%", phase: 0, duration: 10.0 },
  { top: "11.4%", left: "89.1%", phase: -0.4, duration: 9.4 },
  { top: "84.6%", left: "74.5%", phase: -1.1, duration: 10.6 },
  { top: "14.3%", left: "0.4%", phase: -0.7, duration: 9.1 },
  { top: "10.1%", left: "20.9%", phase: -1.6, duration: 10.3, mobileHidden: true },
  { top: "20%", left: "68.6%", phase: -0.7, duration: 11, mobileHidden: true },
  { top: "42.3%", left: "5.6%", phase: -1.3, duration: 10.8 },
  { top: "40.7%", left: "87.1%", phase: -0.9, duration: 9.2 },
  { top: "66.6%", left: "0%", phase: -1.8, duration: 10.1 },
  { top: "82.7%", left: "22.6%", phase: -0.5, duration: 9.6 },
  { top: "74.3%", left: "48%", phase: -1.4, duration: 10.4, mobileHidden: true },
  { top: "66.6%", left: "93.7%", phase: -0.8, duration: 9.9 },
]


// Pre-compute per-image scatter offsets: a unit vector from each image's position
// toward the container center (50%, 50%), scaled to SCATTER_RADIUS px.
// Items start displaced toward center, then spring outward to their natural positions.
const SCATTER_RADIUS = 56
const scatterOffsets = POSITIONS.map((pos) => {
  const dx = 50 - parseFloat(pos.left)
  const dy = 50 - parseFloat(pos.top)
  const len = Math.sqrt(dx * dx + dy * dy)
  return {
    x: len > 0 ? (dx / len) * SCATTER_RADIUS : 0,
    y: len > 0 ? (dy / len) * SCATTER_RADIUS : 0,
  }
})

export function SectionSocialHomepage({ heading, stats, photos, anchorId }: SectionSocialHomepage) {
  const uploadedPhotos = photos?.slice(0, 12) ?? []
  const [poppingIndex, setPoppingIndex] = useState<number | null>(null)

  return (
    <section
      id={anchorId ?? undefined}
      className="relative min-h-175 md:min-h-screen flex items-center justify-center overflow-hidden py-18 md:py-24"
    >
      {/* Floating images — absoluteWrappers fills each motion.div to container size so
          child top/left percentages resolve correctly despite the scatter transforms. */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <FadeInScatter absoluteWrappers scatterOffsets={scatterOffsets} className="relative w-full h-175 md:h-[85vh] max-w-355">
          {POSITIONS.map((pos, i) => {
            const photo = uploadedPhotos[i]
            return (
              // Outer div: absolute position + continuous CSS orbit transform.
              // Isolated from the scatter motion.div so the two transforms don't conflict.
              <div
                key={i}
                className={cn(
                  `absolute social-photo-${i} w-15 xs:w-18 sm:w-22 md:w-24 xl:w-32 aspect-square`,
                  pos.mobileHidden && "hidden md:block",
                )}
                style={{
                  animation: `social-orbit ${pos.duration}s linear ${pos.phase}s infinite`,
                }}
              >
                <div
                  className="w-full h-full rounded-2xl md:rounded-custom overflow-hidden cursor-pointer pointer-events-auto select-none"
                  style={poppingIndex === i ? { animation: "social-pop 0.45s ease-out" } : undefined}
                  onClick={() => setPoppingIndex(i)}
                  onAnimationEnd={() => setPoppingIndex(null)}
                  aria-hidden="true"
                >
                  {photo?.imageUrl || photo?.videoUrl ? (
                    <MediaItem
                      item={{
                        mediaType: photo.mediaType ?? "image",
                        imageUrl: photo.imageUrl,
                        videoUrl: photo.videoUrl,
                        thumbnailUrl: photo.thumbnailUrl,
                        alt: photo.alt,
                      }}
                      sizes="128px"
                      widths={[128, 256]}
                      nonInteractive
                    />
                  ) : (
                    <div className="w-full h-full bg-surface/65" />
                  )}
                </div>
              </div>
            )
          })}
        </FadeInScatter>
      </div>

      {/* Centered stats */}
      <FadeInGroup className="relative z-10 text-center" stagger={0.25}>
        {heading && (
          <FadeIn direction="up">
            <h2 className="type-md md:type-lg font-medium text-primary pb-6 md:pb-8">{heading}</h2>
          </FadeIn>
        )}

        {stats && stats?.length > 0 && (
          <dl className="flex gap-x-12 lg:gap-x-16 gap-y-8 md:gap-y-10 flex-col md:flex-row items-center justify-center">
            {stats.map((stat) => (
              <FadeIn direction="up" key={stat._key}>
                <div className="flex flex-col items-center">
                  <dd className="type-3xl md:type-4xl text-primary">
                    <StatCounter value={stat.value} />
                  </dd>
                  <dt className="type-base md:type-base-plus">{stat.label}</dt>
                </div>
              </FadeIn>
            ))}
          </dl>
        )}
      </FadeInGroup>
    </section>
  )
}
