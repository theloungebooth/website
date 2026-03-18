import { useEffect, useState } from "react"
import type { SectionExplainer, ExplainerStep } from "~/types/sanity"
import { FadeIn } from "~/components/ui/FadeIn"
import { Section } from "~/components/ui/Section"
import { MediaItem } from "~/components/ui/MediaItem"
import { cn } from "~/lib/cn"
import { useIsMd } from "~/hooks/useBreakpoint"

function StepItem({ step, isMd, index }: { step: ExplainerStep; index: number; isMd: boolean }) {
  const hasMedia = step.mediaType === "video" ? !!step.videoUrl : !!step.imageUrl

  return (
    <li id={`step-${step._key}`} className="flex w-full scroll-mt-24 flex-col gap-y-4 md:gap-y-6">
      <div className="flex flex-col gap-y-2.5">
        {!isMd && (
          <h3 className="type-lg font-medium text-primary">
            {index + 1}. {step.title}
          </h3>
        )}
        <p className="type-base md:max-w-[90%]">{step.description}</p>
      </div>
      {hasMedia && (
        <div className="aspect-4/5 w-full overflow-hidden rounded-custom bg-surface">
          <MediaItem
            item={{
              mediaType: step.mediaType ?? "image",
              imageUrl: step.imageUrl,
              videoUrl: step.videoUrl,
              thumbnailUrl: step.thumbnailUrl,
              alt: step.alt,
            }}
            sizes="(max-width: 768px) 90vw, 50vw"
            widths={[400, 800, 1200]}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </li>
  )
}

export function SectionExplainer({ heading, subheading, steps, anchorId }: SectionExplainer) {
  const items = steps ?? []
  const [activeKey, setActiveKey] = useState<string>(items[0]?._key ?? "")
  const isMd = useIsMd()

  useEffect(() => {
    if (items.length === 0) return

    const observers: IntersectionObserver[] = []

    items.forEach((step) => {
      const el = document.getElementById(`step-${step._key}`)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveKey(step._key)
        },
        { rootMargin: "-35% 0px -55% 0px" },
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  return (
    <Section id={anchorId ?? undefined} className="pt-32 pb-32">
      {heading && (
        <FadeIn direction="up">
          <h2 className="type-2xl text-center text-balance pb-16 md:pb-32 md:max-w-200 mx-auto">{heading}</h2>
        </FadeIn>
      )}

      <div className="grid grid-cols-1 gap-x-16 md:grid-cols-12">
        {/* Sticky left nav — desktop only */}
        <div className="hidden md:block w-full col-span-4">
          <nav className="sticky w-full top-[45%] flex flex-col gap-1">
            {items.map((step, i) => (
              <button
                key={step._key}
                onClick={() =>
                  document.getElementById(`step-${step._key}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className={cn(
                  "type-lg font-medium text-left cursor-pointer transition-colors ease-linear",
                  activeKey === step._key ? "text-primary" : "text-primary-muted/65 hover:text-primary-muted",
                )}
              >
                {step.title ?? `Step ${i + 1}`}
              </button>
            ))}
            {subheading && <p className="type-base pt-20 text-primary-muted">{subheading}</p>}
          </nav>
        </div>

        {/* Scrollable right content */}
        <ul className="flex flex-col gap-y-20 md:gap-y-20 md:col-span-6 md:col-end-13">
          {items.map((step, i) => (
            <StepItem key={step._key} step={step} index={i} isMd={isMd} />
          ))}
        </ul>
      </div>
    </Section>
  )
}
