"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
import type { SectionAboutServices } from "~/types/sanity"
import { MediaItem } from "~/components/ui/MediaItem"
import { Section } from "~/components/ui/Section"

// ─── Layout constants ──────────────────────────────────────────────────────────
const TEXT_RESERVE = 160 // space below the card reserved for text
// py-16 (64×2=128) + gap-8 (32) between heading and card area
const CHROME_H = 128 + 32

// ─── Spring ────────────────────────────────────────────────────────────────────
const SPRING = { type: "spring", stiffness: 150, damping: 30, mass: 1.2 } as const

export function SectionAboutServices({ heading, items, anchorId }: SectionAboutServices) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: true, margin: "-5% 0px" })
  const list = items ?? []
  const n = list.length

  // Track active index and scroll direction
  const activeIndexRef = useRef(0)
  const directionRef = useRef<1 | -1>(1)
  const [activeIndex, setActiveIndex] = useState(0)

  // Measure heading to derive how much vertical space the card can use
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [cardLong, setCardLong] = useState(600)
  useEffect(() => {
    const update = () => {
      const headingH = headingRef.current?.offsetHeight ?? 80
      // Reserve an extra 80px (2×40) so justify-center has room to breathe
      setCardLong(Math.round(window.innerHeight - CHROME_H - headingH - TEXT_RESERVE - 80))
    }
    update()
    const ro = new ResizeObserver(update)
    if (headingRef.current) ro.observe(headingRef.current)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  // Both orientations fill the same height (cardLong). Widths differ by aspect ratio.
  const PORTRAIT_W = Math.round((cardLong * 3) / 4)
  const PORTRAIT_H = cardLong
  const LANDSCAPE_W = Math.round((cardLong * 4) / 3)
  const LANDSCAPE_H = cardLong

  const cooldownRef = useRef(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleWheel = (e: WheelEvent) => {
      const rect = wrapper.getBoundingClientRect()
      // Only intercept while the sticky is active
      if (rect.top > 1 || rect.bottom < window.innerHeight - 1) return

      const dir = e.deltaY > 0 ? 1 : -1
      const nextIdx = activeIndexRef.current + dir

      // At the boundaries, let the page scroll through naturally
      if (nextIdx < 0 || nextIdx >= n) return

      e.preventDefault()
      if (cooldownRef.current) return
      cooldownRef.current = true

      directionRef.current = dir as 1 | -1
      activeIndexRef.current = nextIdx
      setActiveIndex(nextIdx)

      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: wrapperTop + nextIdx * window.innerHeight })

      setTimeout(() => {
        cooldownRef.current = false
      }, 600)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [n])

  if (n === 0) {
    return (
      <Section id={anchorId ?? undefined}>
        <h2 className="type-2xl text-balance text-center max-w-200 mx-auto">{heading}</h2>
      </Section>
    )
  }

  const transition = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const }

  const cardVariants = {
    enter: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const textVariants = {
    enter: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const activeItem = list[activeIndex]
  const landscape =
    activeItem?.imageWidth != null && activeItem?.imageHeight != null && activeItem.imageWidth > activeItem.imageHeight
  const cardW = landscape ? LANDSCAPE_W : PORTRAIT_W
  const cardH = landscape ? LANDSCAPE_H : PORTRAIT_H

  // Container is always the max footprint (landscape width × portrait height + text)
  const containerW = LANDSCAPE_W
  const containerH = PORTRAIT_H + TEXT_RESERVE

  return (
    <Section id={anchorId ?? undefined} className="max-w-none">
      <div ref={wrapperRef} style={{ height: `calc(${n} * 100vh)` }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 py-16 md:px-14 gap-8">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.12 }}
            className="type-2xl text-balance text-center max-w-200 flex-none pb-2"
          >
            {heading}
          </motion.h2>

          {/* Container holds max possible footprint; cards center within it */}
          <div className="relative flex-none" style={{ width: containerW, height: containerH }}>
            <div className="absolute inset-0 flex justify-center">
              {/* ── Card ── */}
              <motion.div
                animate={{ width: cardW, height: cardH }}
                initial={false}
                transition={transition}
                className="relative self-start overflow-hidden bg-surface rounded-custom"
              >
                <AnimatePresence>
                  <motion.div
                    key={activeItem._key}
                    variants={cardVariants}
                    initial="enter"
                    animate={isInView ? "visible" : "enter"}
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0"
                  >
                    {(activeItem.mediaType === "video" ? !!activeItem.videoUrl : !!activeItem.imageUrl) ? (
                      <MediaItem
                        item={{ ...activeItem, mediaType: activeItem.mediaType ?? "image" }}
                        sizes={`${cardW}px`}
                        widths={[cardW, cardW * 2]}
                        className="h-full w-full object-cover"
                        nonInteractive
                      />
                    ) : (
                      <div className="h-full w-full bg-surface" />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, transparent 50%)" }}
                />
              </motion.div>

              {/* ── Text ── */}
              <motion.div
                animate={{ top: cardH + 16, width: cardW }}
                initial={false}
                transition={transition}
                className="absolute text-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${activeIndex}`}
                    variants={textVariants}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                    transition={transition}
                  >
                    <h3 className="type-lg font-medium text-primary leading-tight text-balance tracking-tight pt-4">
                      {activeItem.subheading}
                    </h3>
                    {activeItem.body && (
                      <p className="type-base text-balance color-primary-muted leading-relaxed pt-2">{activeItem.body}</p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
