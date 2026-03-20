// ─── Sanity image crop/hotspot ────────────────────────────────────────────────

export type SanityCrop = {
  top: number
  bottom: number
  left: number
  right: number
}

export type SanityHotspot = {
  x: number
  y: number
  width?: number
  height?: number
}

// ─── Primitives ───────────────────────────────────────────────────────────────

export type PortableTextBlock = {
  _key: string
  _type: string
  style?: string
  children?: Array<{ _key: string; _type: string; marks: string[]; text: string }>
  markDefs?: Array<{ _key: string; _type: string; href?: string; openInNewTab?: boolean }>
}

export type SanityLink = {
  label: string
  href: string
}

export type SeoData = {
  title?: string | null
  description?: string | null
  ogImageUrl?: string | null
  ogImageFilename?: string | null
  ogImageWidth?: number | null
  ogImageHeight?: number | null
  noIndex?: boolean | null
}

// ─── Sections ─────────────────────────────────────────────────────────────────

export type SectionGalleryItem = {
  _key: string
  mediaType: 'image' | 'video'
  imageUrl?: string | null
  imageFilename?: string | null
  imageWidth?: number | null
  imageHeight?: number | null
  imageCrop?: SanityCrop | null
  imageHotspot?: SanityHotspot | null
  videoUrl?: string | null
  videoFilename?: string | null
  thumbnailUrl?: string | null
  thumbnailFilename?: string | null
  alt?: string | null
}

export type SectionHeroHomepage = {
  _type: 'sectionHeroHomepage'
  _key: string
  heading: string
  subheading?: string | null
  item?: SectionGalleryItem | null
  primaryLink?: SanityLink | null
  secondaryLink?: SanityLink | null
  anchorId?: string | null
}

export type Stat = {
  _key: string
  value: string
  label: string
}

export type SocialPhoto = {
  _key: string
  mediaType?: 'image' | 'video' | null
  imageUrl?: string | null
  imageFilename?: string | null
  imageWidth?: number | null
  imageHeight?: number | null
  imageCrop?: SanityCrop | null
  imageHotspot?: SanityHotspot | null
  videoUrl?: string | null
  videoFilename?: string | null
  thumbnailUrl?: string | null
  thumbnailFilename?: string | null
  alt?: string | null
}

export type SectionSocialHomepage = {
  _type: 'sectionSocialHomepage'
  _key: string
  heading?: string | null
  stats?: Stat[] | null
  photos?: SocialPhoto[] | null
  anchorId?: string | null
}

export type ServiceItem = {
  _key: string
  heading: string
  description?: string | null
  cta?: SanityLink | null
  mediaType: 'image' | 'video'
  imageUrl?: string | null
  imageFilename?: string | null
  imageWidth?: number | null
  imageHeight?: number | null
  imageCrop?: SanityCrop | null
  imageHotspot?: SanityHotspot | null
  videoUrl?: string | null
  videoFilename?: string | null
  thumbnailUrl?: string | null
  thumbnailFilename?: string | null
  alt?: string | null
}

export type SectionServicesHomepage = {
  _type: 'sectionServicesHomepage'
  _key: string
  heading?: string | null
  services?: ServiceItem[] | null
  anchorId?: string | null
}

export type ExplainerStep = {
  _key: string
  title?: string | null
  description: string
  mediaType?: 'image' | 'video' | null
  imageUrl?: string | null
  imageFilename?: string | null
  imageWidth?: number | null
  imageHeight?: number | null
  imageCrop?: SanityCrop | null
  imageHotspot?: SanityHotspot | null
  videoUrl?: string | null
  videoFilename?: string | null
  thumbnailUrl?: string | null
  thumbnailFilename?: string | null
  alt?: string | null
}

export type SectionExplainer = {
  _type: 'sectionExplainer'
  _key: string
  heading?: string | null
  subheading?: string | null
  steps?: ExplainerStep[] | null
  anchorId?: string | null
}

export type FormField = {
  _key: string
  label: string
  fieldType: 'text' | 'email' | 'select' | 'textarea'
  placeholder?: string | null
  required?: boolean | null
  options?: string[] | null
}

export type SectionHeroContact = {
  _type: 'sectionHeroContact'
  _key: string
  heading: string
  subheading?: string | null
  items?: SectionGalleryItem[] | null
  formFields?: FormField[] | null
  anchorId?: string | null
}

export type SectionHeroAbout = {
  _type: 'sectionHeroAbout'
  _key: string
  heading: string
  subheading?: string | null
  primaryLink?: SanityLink | null
  item?: SectionGalleryItem | null
  anchorId?: string | null
}

export type SectionHeroServices = {
  _type: 'sectionHeroServices'
  _key: string
  serviceType?: string | null
  heading: string
  subheading?: string | null
  primaryLink?: SanityLink | null
  item?: SectionGalleryItem | null
  anchorId?: string | null
}

export type SectionGalleryServices = {
  _type: 'sectionGalleryServices'
  _key: string
  heading?: string | null
  items?: SectionGalleryItem[] | null
  anchorId?: string | null
}

export type SectionSplit = {
  _type: 'sectionNarrative'
  _key: string
  layout?: 'text-left' | 'text-right' | null
  invertOnMobile?: boolean | null
  heading?: string | null
  body?: PortableTextBlock[] | null
  media?: {
    mediaType: 'image' | 'video'
    imageUrl?: string | null
    imageFilename?: string | null
    imageWidth?: number | null
    imageHeight?: number | null
    imageCrop?: SanityCrop | null
    imageHotspot?: SanityHotspot | null
    videoUrl?: string | null
    videoFilename?: string | null
    thumbnailUrl?: string | null
    thumbnailFilename?: string | null
    alt?: string | null
  } | null
  anchorId?: string | null
}

export type TeamMember = {
  _key: string
  imageUrl?: string | null
  imageFilename?: string | null
  imageWidth?: number | null
  imageHeight?: number | null
  imageCrop?: SanityCrop | null
  imageHotspot?: SanityHotspot | null
  alt?: string | null
  name: string
  role: string
}

export type SectionTeamAbout = {
  _type: 'sectionTeamAbout'
  _key: string
  heading?: string | null
  body?: PortableTextBlock[] | null
  members?: TeamMember[] | null
  anchorId?: string | null
}

export type LegalSection = {
  _key: string
  heading: string
  body?: PortableTextBlock[] | null
}

export type SectionQuote = {
  _type: 'sectionQuote'
  _key: string
  quote: string
  authorName?: string | null
  authorTitle?: string | null
  anchorId?: string | null
}

export type SectionIntroServices = {
  _type: 'sectionIntroServices'
  _key: string
  heading: string
  items?: SectionGalleryItem[] | null
  body?: PortableTextBlock[] | null
  anchorId?: string | null
}

export type SectionLegalText = {
  _type: 'sectionLegalText'
  _key: string
  pageTitle: string
  intro?: PortableTextBlock[] | null
  sections?: LegalSection[] | null
  anchorId?: string | null
}

export type PressItem = {
  _key: string
  title: string
  author?: string | null
  media?: string | null
  sourceUrl?: string | null
  publishedDate?: string | null
}

export type SectionPressAbout = {
  _type: 'sectionPressAbout'
  _key: string
  heading?: string | null
  pressItems?: PressItem[] | null
  anchorId?: string | null
}

export type FaqItem = {
  _key: string
  question: string
  answer: string
}

export type SectionFaq = {
  _type: 'sectionFaq'
  _key: string
  heading?: string | null
  items?: FaqItem[] | null
  anchorId?: string | null
}

export type Section =
  | SectionHeroHomepage
  | SectionSocialHomepage
  | SectionServicesHomepage
  | SectionExplainer
  | SectionHeroContact
  | SectionHeroAbout
  | SectionHeroServices
  | SectionGalleryServices
  | SectionIntroServices
  | SectionSplit
  | SectionTeamAbout
  | SectionQuote
  | SectionLegalText
  | SectionFaq
  | SectionPressAbout

// ─── Page ─────────────────────────────────────────────────────────────────────

export type FooterCta = {
  title: string
  subheading?: string | null
  link?: SanityLink | null
}

export type PageTemplate = 'homepage' | 'about' | 'service' | 'contact' | 'caseStudy' | 'legal'

export type PageData = {
  title: string
  slug: string
  template: PageTemplate
  _updatedAt?: string | null
  seo?: SeoData | null
  sections: Section[]
  footerCta?: FooterCta | null
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export type SettingsData = {
  defaultSeo?: {
    siteTitle?: string | null
    description?: string | null
    ogImageUrl?: string | null
    ogImageFilename?: string | null
    ogImageWidth?: number | null
    ogImageHeight?: number | null
  } | null
  headerNav?: SanityLink[] | null
  headerCta?: SanityLink | null
  secondaryNav?: SanityLink[] | null
  legalLinks?: SanityLink[] | null
  socialLinks: SanityLink[]
}
