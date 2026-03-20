import type { SectionTeamAbout, TeamMember } from "~/types/sanity"
import { MediaItem } from "~/components/ui/MediaItem"
import { PortableTextRenderer } from "~/components/ui/PortableText"
import { Section } from "~/components/ui/Section"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { cn } from "~/lib/cn"

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="aspect-4/5 overflow-hidden relative rounded-custom bg-primary-muted">
      <MediaItem
        item={{
          mediaType: "image",
          imageUrl: member.imageUrl,
          imageFilename: member.imageFilename,
          imageWidth: member.imageWidth,
          imageHeight: member.imageHeight,
          imageCrop: member.imageCrop,
          imageHotspot: member.imageHotspot,
          alt: member.alt ?? member.name,
        }}
        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 48vw, 33vw"
        widths={[300, 600, 900, 1200]}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1/4",
          member.imageUrl && "bg-linear-to-t from-primary/70 via-primary/20 to-transparent",
        )}
      >
        <div className="gap-x-2 flex pb-4 items-end h-full justify-center z-10">
          <p className="type-base font-medium text-secondary">{member.name}</p>
          <p className="type-base text-secondary-muted/90">{member.role}</p>
        </div>
      </div>
    </div>
  )
}

export function SectionTeamAbout({ heading, body, members, anchorId }: SectionTeamAbout) {
  return (
    <Section id={anchorId ?? undefined}>
      <FadeIn direction="up" className="max-w-2xl text-center text-balance mx-auto pb-8 md:pb-12">
        {heading && <h2 className="type-xl font-semibold md:type-2xl text-balance pb-3.5 md:pb-5">{heading}</h2>}
        {body && <PortableTextRenderer value={body} />}
      </FadeIn>

      {members && members.length > 0 && (
        <FadeInGroup className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6" stagger={0.25}>
          {members.map((member) => (
            <FadeIn key={member._key} direction="up">
              <TeamMemberCard member={member} />
            </FadeIn>
          ))}
        </FadeInGroup>
      )}
    </Section>
  )
}
