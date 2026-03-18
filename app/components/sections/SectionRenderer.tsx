import React from "react"
import type { Section } from "~/types/sanity"
import { SectionHeroHomepage } from "./homepage/SectionHeroHomepage"
import { SectionSocialHomepage } from "./homepage/SectionSocialHomepage"
import { SectionServicesHomepage } from "./homepage/SectionServicesHomepage"
import { SectionContact } from "./contact/SectionContact"
import { SectionHeroAbout } from "./about/SectionHeroAbout"
import { SectionSplit } from "./shared/SectionSplit"
import { SectionTeamAbout } from "./about/SectionTeamAbout"
import { SectionHeroServices } from "./services/SectionHeroServices"
import { SectionGalleryServices } from "./services/SectionGalleryServices"
import { SectionIntroServices } from "./services/SectionIntroServices"
import { SectionLegalText } from "./legal/SectionLegalText"
import { SectionQuote } from "./shared/SectionQuote"
import { SectionFaq } from "./shared/SectionFaq"
import { SectionExplainer } from "./shared/SectionExplainer"
import { SectionAboutServices } from "./services/SectionAboutServices"
function renderSection(section: Section, updatedAt?: string | null) {
  switch (section._type) {
    case "sectionHeroHomepage":
      return <SectionHeroHomepage {...section} />
    case "sectionSocialHomepage":
      return <SectionSocialHomepage {...section} />
    case "sectionServicesHomepage":
      return <SectionServicesHomepage {...section} />
    case "sectionHeroContact":
      return <SectionContact {...section} />
    case "sectionHeroAbout":
      return <SectionHeroAbout {...section} />
    case "sectionNarrative":
      return <SectionSplit {...section} />
    case "sectionTeamAbout":
      return <SectionTeamAbout {...section} />
    case "sectionHeroServices":
      return <SectionHeroServices {...section} />
    case "sectionGalleryServices":
      return <SectionGalleryServices {...section} />
    case "sectionIntroServices":
      return <SectionIntroServices {...section} />
    case "sectionQuote":
      return <SectionQuote {...section} />
    case "sectionLegalText":
      return <SectionLegalText {...section} updatedAt={updatedAt} />
    case "sectionExplainer":
      return <SectionExplainer {...section} />
    case "sectionFaq":
      return <SectionFaq {...section} />
    case "sectionAboutServices":
      return <SectionAboutServices {...section} />
    default:
      return null
  }
}

export function SectionRenderer({ sections, updatedAt }: { sections: Section[]; updatedAt?: string | null }) {
  return (
    <>
      {sections.map((section) => {
        const el = renderSection(section, updatedAt)
        if (!el) return null
        return <React.Fragment key={section._key}>{el}</React.Fragment>
      })}
    </>
  )
}
