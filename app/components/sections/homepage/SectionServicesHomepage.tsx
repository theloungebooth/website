import { useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "motion/react"
import type { SectionServicesHomepage } from "~/types/sanity"
import { Button } from "~/components/ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { FadeIn } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"
import { useIsSm } from "~/hooks/useBreakpoint"

const ITEM_W = "calc((100vw - 3rem) / 4)"
const HALF_ITEM = "calc((100vw - 3rem) / 8)"
const SPRING = { type: "spring", stiffness: 400, damping: 40, mass: 0.8 } as const

type Service = NonNullable<SectionServicesHomepage["services"]>[number]

function StickyScrollLayout({
  heading,
  items,
  anchorId,
}: {
  heading?: string | null
  items: Service[]
  anchorId?: string | null
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLUListElement>(null)
  const [maxScroll, setMaxScroll] = useState(0)
  const n = items.length

  const isInView = useInView(wrapperRef, { once: true, margin: "-10% 0px" })

  useLayoutEffect(() => {
    function measure() {
      if (contentRef.current) setMaxScroll(Math.max(0, contentRef.current.offsetWidth - window.innerWidth))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [n])

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll])

  const wrapperHeight = n > 0 ? `calc(100vh + 2.5 * (${n + 1} * (100vw - 3rem) / 4 + ${n - 1} * 2rem - 100vw))` : "auto"

  return (
    <div ref={wrapperRef} id={anchorId ?? undefined} style={{ height: wrapperHeight }}>
      <section className="sticky top-0 h-screen overflow-x-clip flex flex-col justify-center">
        {heading && (
          <FadeIn direction="up">
            <h2 className="type-2xl text-center text-balance pb-16 flex-none">{heading}</h2>
          </FadeIn>
        )}

        <motion.ul
          ref={contentRef}
          className="flex gap-6 list-none"
          style={{ x, width: "max-content", paddingLeft: HALF_ITEM, paddingRight: HALF_ITEM }}
        >
          {items.map((service, i) => (
            <li key={`${service._key}-${i}`} data-card className="flex-none flex flex-col items-start" style={{ width: ITEM_W }}>
              <FadeIn direction="up" className="flex pb-3 items-center w-full justify-between gap-3">
                <h3 className="type-md 3xl:text-lg leading-none text-primary font-medium">{service.heading}</h3>
                {service.cta && (
                  <Button variant="outline" arrow href={service.cta.href} aria-label={service.cta.label}>
                    {service.cta.label}
                  </Button>
                )}
              </FadeIn>
              <motion.div
                className="aspect-4/5 w-full overflow-hidden rounded-custom bg-surface/65"
                initial={{ opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...SPRING, delay: i * 0.32 }}
              >
                <MediaItem
                  item={service}
                  sizes="25vw"
                  widths={[400, 800, 1200]}
                  className="h-full w-full max-w-none object-cover"
                  draggable={false}
                />
              </motion.div>
              <motion.div
                className="py-4 text-left"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...SPRING, delay: i * 0.32 + 0.14 }}
              >
                {service.description && <p className="type-base pr-2.5 text-pretty">{service.description}</p>}
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </section>
    </div>
  )
}

function isSticky() {
  return typeof window !== "undefined" ? window.innerHeight >= 1000 && window.innerWidth >= 1500 : true
}

export function SectionServicesHomepage({ heading, services, anchorId }: SectionServicesHomepage) {
  const [useSticky, setUseSticky] = useState(isSticky)

  const items = services ?? []

  const isSm = useIsSm()

  useLayoutEffect(() => {
    function onResize() {
      setUseSticky(isSticky())
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  if (useSticky) {
    return <StickyScrollLayout heading={heading} items={items} anchorId={anchorId} />
  }

  return (
    <Section id={anchorId ?? undefined}>
      {heading && (
        <FadeIn direction="up">
          <h2 className="type-xl font-semibold md:type-2xl text-center text-balance pb-6 sm:pb-8 md:pb-10 lg:pb-16">{heading}</h2>
        </FadeIn>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none">
        {items.map((service, i) => (
          <li key={`${service._key}-${i}`} className="flex flex-col items-start">
            {isSm && (
              <FadeIn direction="up" className="flex pb-3 justify-center sm:items-baseline w-full sm:justify-between gap-3">
                <h3 className="type-md xl:text-lg leading-none text-primary font-medium">{service.heading}</h3>
                {service.cta && (
                  <Button variant="outline" arrow href={service.cta.href} aria-label={service.cta.label}>
                    {service.cta.label}
                  </Button>
                )}
              </FadeIn>
            )}
            <motion.div
              className="aspect-7/8 w-full overflow-hidden rounded-custom bg-surface/65"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ ...SPRING, delay: (i % 2) * 0.16 }}
            >
              <MediaItem
                item={service}
                sizes="(max-width: 768px) 90vw, 50vw"
                widths={[400, 800, 1200]}
                className="h-full w-full max-w-none object-cover"
                draggable={false}
              />
            </motion.div>
            <motion.div
              className="py-6 flex flex-col gap-y-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ ...SPRING, delay: (i % 2) * 0.16 + 0.14 }}
            >
              {!isSm && <h3 className="type-lg leading-none text-primary font-medium">{service.heading}</h3>}
              {service.description && <p className="type-base">{service.description}</p>}
              {!isSm && service.cta && (
                <Button variant="outline" arrow href={service.cta.href} aria-label={service.cta.label} className="">
                  {isSm ? service.cta.label : "Learn more"}
                </Button>
              )}
            </motion.div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
