import type { SectionQuote } from "~/types/sanity"
import { Section } from "~/components/ui/Section"
import { FadeIn } from "~/components/ui/FadeIn"

export function SectionQuote({ quote, authorName, authorTitle, anchorId }: SectionQuote) {
  return (
    // "pt-0 sm:pt-0 md:pt-0 xl:pt-0 2xl:pt-0"
    <Section id={anchorId ?? undefined} className="pt-24! pb-12! md:pt-32! md:pb-18! xl:pt-48! xl:pb-34!">
      <FadeIn direction="up">
        <figure className="flex w-full flex-col items-center gap-y-4 md:gap-y-6">
          <blockquote className="relative flex flex-col items-center text-center max-w-290 pt-20 md:pt-24 xl:pt-28">
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 text-[8rem] md:text-[10rem] xl:text-[12rem] font-sans leading-none font-bold text-primary"
            >
              {"\u201C"}
            </div>
            <p className="type-xl text-balance leading-normal">{quote}</p>
          </blockquote>

          {(authorName || authorTitle) && (
            <figcaption className="text-center flex flex-col gap-y-0.5">
              {authorName && <span className="type-base font-medium">{authorName}</span>}
              {authorTitle && <span className="type-base">{authorTitle}</span>}
            </figcaption>
          )}
        </figure>
      </FadeIn>
    </Section>
  )
}
