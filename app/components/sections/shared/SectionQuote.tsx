import type { SectionQuote } from "~/types/sanity"
import { Section } from "~/components/ui/Section"
import { FadeIn } from "~/components/ui/FadeIn"

export function SectionQuote({ quote, authorName, authorTitle, anchorId }: SectionQuote) {
  return (
    <Section id={anchorId ?? undefined} className="pt-48">
      <FadeIn direction="up">
        <figure className="flex w-full flex-col items-center gap-y-6">
          <blockquote className="relative flex flex-col items-center text-center max-w-290 pt-28">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[12rem] font-sans leading-none font-bold text-primary">
              {"\u201C"}
            </div>
            <p className="type-xl text-balance leading-normal">{quote}</p>
          </blockquote>

          {(authorName || authorTitle) && (
            <figcaption className="flex flex-col items-center gap-y-3 text-center">
              <div className="flex flex-col gap-y-0.5">
                {authorName && <span className="type-base font-medium">{authorName}</span>}
                {authorTitle && <span className="type-base color-primary-muted">{authorTitle}</span>}
              </div>
            </figcaption>
          )}
        </figure>
      </FadeIn>
    </Section>
  )
}
