import type { SectionLegalText } from "~/types/sanity"
import { PortableTextRenderer } from "~/components/ui/PortableText"
import { Section } from "~/components/ui/Section"

export function SectionLegalText({
  pageTitle,
  intro,
  sections,
  anchorId,
  updatedAt,
}: SectionLegalText & { updatedAt?: string | null }) {
  const formattedDate = updatedAt ? new Date(updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : null

  return (
    <Section id={anchorId ?? undefined} className="max-w-prose">
      {pageTitle && <h1 className="type-2xl pb-5">{pageTitle}</h1>}
      {formattedDate && <p className="type-base-minus color-primary-muted pb-8">Last updated {formattedDate}</p>}
      {intro && (
        <div className="color-primary-muted pb-12">
          <PortableTextRenderer value={intro} />
        </div>
      )}
      {sections && sections.length > 0 && (
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s._key}>
              <h2 className="type-base font-semibold pb-4 text-primary">{s.heading}</h2>
              {s.body && (
                <div className="color-primary-muted">
                  <PortableTextRenderer value={s.body} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
