// ─── Reusable fragments ───────────────────────────────────────────────────────

const LINK_FIELDS = /* groq */ `
  label,
  href
`

const SEO_FRAGMENT = /* groq */ `
  seo {
    title,
    description,
    "ogImageUrl": ogImage.asset->url,
    "ogImageFilename": ogImage.asset->originalFilename,
    "ogImageWidth": ogImage.asset->metadata.dimensions.width,
    "ogImageHeight": ogImage.asset->metadata.dimensions.height,
    noIndex,
  }
`

// Grabs every possible section field in one pass.
// Components discriminate by _type — null fields for non-applicable types are ignored.
const SECTIONS_FRAGMENT = /* groq */ `
  "sections": select(
    template == "homepage" => sectionsHomepage,
    template == "contact" => sectionsContact,
    template == "about" => sectionsAbout,
    template == "service" => sectionsService,
    template == "legal" => sectionsLegal,
    []
  )[] {
    _key,
    _type,
    anchorId,

    // sectionHeroHomepage / sectionHeroContact
    heading,
    subheading,
    serviceType,

    // sectionHeroContact
    contactDetails,
    formBody,
    "formFields": formFields[] {
      _key,
      label,
      fieldType,
      placeholder,
      required,
      options,
    },

    // sectionSocialHomepage
    "stats": stats[] { _key, value, label },
    "photos": photos[] {
      _key,
      mediaType,
      "imageUrl": image.asset->url,
      "imageFilename": image.asset->originalFilename,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "imageCrop": image.crop,
      "imageHotspot": image.hotspot,
      "videoUrl": videoUrl.asset->url,
      "videoFilename": videoUrl.asset->originalFilename,
      "thumbnailUrl": thumbnailImage.asset->url,
      "thumbnailFilename": thumbnailImage.asset->originalFilename,
      alt,
    },

    // sectionHeroHomepage
    "item": items[0] {
      _key,
      mediaType,
      "imageUrl": image.asset->url,
      "imageFilename": image.asset->originalFilename,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "imageCrop": image.crop,
      "imageHotspot": image.hotspot,
      "videoUrl": videoUrl.asset->url,
      "videoFilename": videoUrl.asset->originalFilename,
      "thumbnailUrl": thumbnailImage.asset->url,
      "thumbnailFilename": thumbnailImage.asset->originalFilename,
      alt,
    },

    // sectionGallery
    galleryType,
    columns,
    "items": items[] {
      _key,
      mediaType,
      "imageUrl": image.asset->url,
      "imageFilename": image.asset->originalFilename,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "imageCrop": image.crop,
      "imageHotspot": image.hotspot,
      "videoUrl": videoUrl.asset->url,
      "videoFilename": videoUrl.asset->originalFilename,
      "thumbnailUrl": thumbnailImage.asset->url,
      "thumbnailFilename": thumbnailImage.asset->originalFilename,
      alt,
      caption,
      // sectionFaq
      question,
      answer,
      // sectionAboutServices
      subheading,
      body,
    },

    // sectionMedia + sectionSplit
    mediaType,
    "imageUrl": image.asset->url,
    "imageFilename": image.asset->originalFilename,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    "imageCrop": image.crop,
    "imageHotspot": image.hotspot,
    "videoUrl": videoUrl.asset->url,
    "videoFilename": videoUrl.asset->originalFilename,
    alt,
    caption,

    // sectionMedia
    aspectRatio,

    // sectionExplainer
    "steps": steps[] {
      _key,
      title,
      description,
      mediaType,
      "imageUrl": image.asset->url,
      "imageFilename": image.asset->originalFilename,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "imageCrop": image.crop,
      "imageHotspot": image.hotspot,
      "videoUrl": videoUrl.asset->url,
      "videoFilename": videoUrl.asset->originalFilename,
      "thumbnailUrl": thumbnailImage.asset->url,
      "thumbnailFilename": thumbnailImage.asset->originalFilename,
      alt,
    },

    // sectionServicesHomepage
    "services": services[] {
      _key,
      heading,
      description,
      "cta": cta { ${LINK_FIELDS} },
      mediaType,
      "imageUrl": image.asset->url,
      "imageFilename": image.asset->originalFilename,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "imageCrop": image.crop,
      "imageHotspot": image.hotspot,
      "videoUrl": videoUrl.asset->url,
      "videoFilename": videoUrl.asset->originalFilename,
      "thumbnailUrl": thumbnailImage.asset->url,
      "thumbnailFilename": thumbnailImage.asset->originalFilename,
      alt,
    },

    // sectionCta
    "primaryLink": primaryLink { ${LINK_FIELDS} },
    "secondaryLink": secondaryLink { ${LINK_FIELDS} },
    alignment,

    // sectionSplit
    mediaPosition,
    content,

    // sectionNarrative (Split)
    layout,
    invertOnMobile,
    heading,
    body,
    "media": media {
      mediaType,
      "imageUrl": image.asset->url,
      "imageFilename": image.asset->originalFilename,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "imageCrop": image.crop,
      "imageHotspot": image.hotspot,
      "videoUrl": videoUrl.asset->url,
      "videoFilename": videoUrl.asset->originalFilename,
      "thumbnailUrl": thumbnailImage.asset->url,
      "thumbnailFilename": thumbnailImage.asset->originalFilename,
      alt,
    },

    // sectionTeamAbout
    "members": members[] {
      _key,
      "imageUrl": image.asset->url,
      "imageFilename": image.asset->originalFilename,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "imageCrop": image.crop,
      "imageHotspot": image.hotspot,
      alt,
      name,
      role,
    },

    // sectionQuote
    quote,
    authorName,
    authorTitle,

    // sectionLegalText
    pageTitle,
    intro,
    "sections": sections[] {
      _key,
      heading,
      body,
    },
  }
`

// ─── Queries ──────────────────────────────────────────────────────────────────

export const settingsQuery = /* groq */ `
  *[_type == "settings"][0] {
    "defaultSeo": defaultSeo {
      siteTitle,
      description,
      "ogImageUrl": ogImage.asset->url,
      "ogImageFilename": ogImage.asset->originalFilename,
      "ogImageWidth": ogImage.asset->metadata.dimensions.width,
      "ogImageHeight": ogImage.asset->metadata.dimensions.height,
    },
    "headerNav": headerNav[] { ${LINK_FIELDS} },
    "headerCta": headerCta { ${LINK_FIELDS} },
    "secondaryNav": secondaryNav[] { ${LINK_FIELDS} },
    "legalLinks": legalLinks[] { ${LINK_FIELDS} },
    "socialLinks": socialLinks[] { ${LINK_FIELDS} },
  }
`

// $slug — pass the page slug (e.g. "home", "about", "contact", "weddings")
export const pageBySlugQuery = /* groq */ `
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    template,
    _updatedAt,
    ${SEO_FRAGMENT},
    ${SECTIONS_FRAGMENT},
    "footerCta": footerCta {
      title,
      subheading,
      "link": link { ${LINK_FIELDS} },
    },
  }
`
