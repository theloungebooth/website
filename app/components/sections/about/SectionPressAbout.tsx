import type { PressItem, SectionPressAbout } from "~/types/sanity"
import { Section } from "~/components/ui/Section"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { SiteLink } from "~/components/layout/SiteLink"
import { cn } from "~/lib/cn"

const ROW_COLS = "grid grid-cols-1 md:grid-cols-[1fr_10rem_12rem_7rem] xl:grid-cols-[1fr_12rem_14rem_8rem] gap-x-6 md:gap-x-8"

function PressItemRow({ title, author, media, sourceUrl, publishedDate }: PressItem) {
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null

  const inner = (
    <div className={cn(ROW_COLS, "gap-y-1 py-4 md:py-5 items-baseline")}>
      <span className="type-base-minus group-hover:text-primary ease-linear transition-colors pr-4">{title}</span>
      <span className="type-base-minus">{author}</span>
      <span className="type-base-minus">{media}</span>
      {formattedDate ? (
        <time className="type-base-minus whitespace-nowrap" dateTime={publishedDate ?? undefined}>
          {formattedDate}
        </time>
      ) : (
        <span className="hidden md:block" />
      )}
    </div>
  )

  if (sourceUrl) {
    return (
      <SiteLink link={{ label: title, href: sourceUrl }} className="group block">
        {inner}
      </SiteLink>
    )
  }

  return <div className="group">{inner}</div>
}

export function SectionPressAbout({ heading, pressItems, anchorId }: SectionPressAbout) {
  if (!pressItems?.length) return null

  return (
    <Section id={anchorId ?? undefined}>
      {heading && (
        <FadeIn direction="up" className="pb-4 md:pb-12">
          <h2 className="type-xl font-semibold text-center md:type-2xl text-balance">{heading}</h2>
        </FadeIn>
      )}

      <FadeIn direction="up" className={cn(ROW_COLS, "hidden md:grid pb-3")}>
        <span className="type-base-minus font-medium text-primary">Title</span>
        <span className="type-base-minus font-medium text-primary">Author</span>
        <span className="type-base-minus font-medium text-primary">Media</span>
        <span className="type-base-minus font-medium text-primary">Date</span>
      </FadeIn>
      <FadeInGroup stagger={0.07}>
        {pressItems.map((item) => (
          <FadeIn key={item._key} direction="up" className="border-t  first:border-t-0 md:first:border-t border-primary-muted/20">
            <PressItemRow {...item} />
          </FadeIn>
        ))}
      </FadeInGroup>
    </Section>
  )
}
