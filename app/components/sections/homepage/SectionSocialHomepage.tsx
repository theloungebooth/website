"use client"

import { useState } from "react"
import type { SectionSocialHomepage } from "~/types/sanity"
import { cn } from "~/lib/cn"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { FadeInScatter } from "~/components/ui/FadeInScatter"

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
      {/* Smooth circular path sampled every 36° */}
      <style>{`
        @keyframes social-orbit {
          0%   { transform: translate(0px, -25px) }
          10%  { transform: translate(-14.7px, -20.2px) }
          20%  { transform: translate(-23.8px, -7.7px) }
          30%  { transform: translate(-23.8px, 7.7px) }
          40%  { transform: translate(-14.7px, 20.2px) }
          50%  { transform: translate(0px, 25px) }
          60%  { transform: translate(14.7px, 20.2px) }
          70%  { transform: translate(23.8px, 7.7px) }
          80%  { transform: translate(23.8px, -7.7px) }
          90%  { transform: translate(14.7px, -20.2px) }
          100% { transform: translate(0px, -25px) }
        }
        @media (max-width: 767px) {
          @keyframes social-orbit {
            0%   { transform: translate(0px, -12px) }
            10%  { transform: translate(-7px, -9.7px) }
            20%  { transform: translate(-11.4px, -3.7px) }
            30%  { transform: translate(-11.4px, 3.7px) }
            40%  { transform: translate(-7px, 9.7px) }
            50%  { transform: translate(0px, 12px) }
            60%  { transform: translate(7px, 9.7px) }
            70%  { transform: translate(11.4px, 3.7px) }
            80%  { transform: translate(11.4px, -3.7px) }
            90%  { transform: translate(7px, -9.7px) }
            100% { transform: translate(0px, -12px) }
          }
        }
        @keyframes social-pop {
          0%   { transform: scale(1)    }
          35%  { transform: scale(1.35) }
          65%  { transform: scale(0.92) }
          85%  { transform: scale(1.06) }
          100% { transform: scale(1)    }
        }
      `}</style>

      {/* Floating images — absoluteWrappers fills each motion.div to container size so
          child top/left percentages resolve correctly despite the scatter transforms. */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <FadeInScatter absoluteWrappers scatterOffsets={scatterOffsets} className="relative w-full h-175 md:h-[85vh] max-w-355">
          {POSITIONS.map((pos, i) => {
            const photo = uploadedPhotos[i]
            return (
              // Outer div: absolute position + continuous CSS orbit transform.
              // Isolated from the scatter motion.div so the two transforms don't conflict.
              <div
                key={i}
                className={cn("absolute w-20 sm:w-24 md:w-26 xl:w-32 aspect-square", pos.mobileHidden && "hidden md:block")}
                style={{
                  top: pos.top,
                  left: pos.left,
                  animation: `social-orbit ${pos.duration}s linear infinite`,
                  animationDelay: `${pos.phase}s`,
                }}
              >
                <div
                  className="w-full h-full rounded-3xl md:rounded-custom overflow-hidden cursor-pointer pointer-events-auto select-none"
                  style={poppingIndex === i ? { animation: "social-pop 0.45s ease-out" } : undefined}
                  onClick={() => setPoppingIndex(i)}
                  onAnimationEnd={() => setPoppingIndex(null)}
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
                    <div className="w-full h-full bg-surface" />
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
          <div className="flex gap-x-12 lg:gap-x-16 gap-y-8 md:gap-y-10 flex-col md:flex-row items-center justify-center">
            {stats.map((stat) => (
              <FadeIn direction="up" key={stat._key}>
                <div className="flex flex-col items-center">
                  <p className="type-4xl text-primary">{stat.value}</p>
                  <p className="type-base md:type-base-plus">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </FadeInGroup>
    </section>
  )
}
