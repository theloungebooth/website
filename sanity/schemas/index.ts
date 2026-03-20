// Object types
import { seo } from './objects/seo'
import { link } from './objects/link'
import { logoBar } from './objects/logoBar'

// Section types (used in page sections arrays)
import { sectionHeroHomepage } from './objects/sections/homepage/sectionHeroHomepage'
import { sectionSocialHomepage } from './objects/sections/homepage/sectionSocialHomepage'
import { sectionServicesHomepage } from './objects/sections/homepage/sectionServicesHomepage'
import { sectionHeroContact } from './objects/sections/contact/sectionHeroContact'
import { sectionNarrative } from './objects/sections/sectionNarrative'
import { sectionHeroAbout } from './objects/sections/about/sectionHeroAbout'
import { sectionTeamAbout } from './objects/sections/about/sectionTeamAbout'
import { sectionPressAbout } from './objects/sections/about/sectionPressAbout'
import { sectionHeroServices } from './objects/sections/services/sectionHeroServices'
import { sectionGalleryServices } from './objects/sections/services/sectionGalleryServices'
import { sectionIntroServices } from './objects/sections/services/sectionIntroServices'
import { sectionAboutServices } from './objects/sections/services/sectionAboutServices'
import { sectionLegalText } from './objects/sections/sectionLegalText'
import { sectionQuote } from './objects/sections/shared/sectionQuote'
import { sectionFaq } from './objects/sections/shared/sectionFaq'
import { sectionExplainer } from './objects/sections/shared/sectionExplainer'

// Document types
import { settings } from './documents/settings'
import { page } from './documents/page'
// Order matters: object/section types must be registered before document types
// that reference them.
export const schemaTypes = [
  // Objects
  seo,
  link,
  logoBar,
  // Sections
  sectionHeroHomepage,
  sectionSocialHomepage,
  sectionServicesHomepage,
  sectionHeroContact,
  sectionNarrative,
  sectionHeroAbout,
  sectionTeamAbout,
  sectionPressAbout,
  sectionHeroServices,
  sectionGalleryServices,
  sectionIntroServices,
  sectionAboutServices,
  sectionLegalText,
  sectionQuote,
  sectionFaq,
  sectionExplainer,
  // Documents
  settings,
  page,
]
