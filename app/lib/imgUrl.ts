// Append Sanity image transformation query params to a CDN URL.
// Sanity's image CDN accepts standard params: w, h, fit, auto, q, etc.
// https://www.sanity.io/docs/image-urls

// Standard step sizes — always round w up to the next step so the requested
// pixel width is always ≥ the rendered display width, improving CDN cache reuse.
const STEPS = [200, 400, 500, 640, 768, 900, 1080, 1280, 1440, 1600, 1920, 2400, 3200]

export function stepWidth(w: number): number {
  return STEPS.find((s) => s >= w) ?? STEPS[STEPS.length - 1]
}

// Sanity crop and hotspot types (values are 0–1 fractions of image dimensions).
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

type ImgUrlOpts = {
  w?: number
  h?: number
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  // CDN crop mode — distinct from Sanity's native crop data below
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint' | 'entropy'
  q?: number
  // Appends a vanity filename to the CDN URL path for SEO.
  // e.g. https://cdn.sanity.io/images/.../abc123.jpg/my-photo.jpg?w=800
  filename?: string | null
  // Sanity native crop/hotspot — used to compute rect and focal point params.
  // imageWidth/imageHeight are required for rect calculation.
  sanityCrop?: SanityCrop | null
  sanityHotspot?: SanityHotspot | null
  imageWidth?: number | null
  imageHeight?: number | null
}

export function imgUrl(url: string | null | undefined, opts: ImgUrlOpts = {}): string {
  if (!url) return ''
  const params = new URLSearchParams({ auto: 'format' })

  // Sanity crop → rect param (pixel coordinates)
  if (opts.sanityCrop && opts.imageWidth && opts.imageHeight) {
    const { top, bottom, left, right } = opts.sanityCrop
    const x = Math.round(left * opts.imageWidth)
    const y = Math.round(top * opts.imageHeight)
    const w = Math.round(opts.imageWidth * (1 - left - right))
    const h = Math.round(opts.imageHeight * (1 - top - bottom))
    params.set('rect', `${x},${y},${w},${h}`)
  }

  // Sanity hotspot → focal point params
  // Default fit=crop&crop=focalpoint when hotspot is active (can be overridden via opts.fit/opts.crop)
  if (opts.sanityHotspot) {
    params.set('fp-x', String(opts.sanityHotspot.x))
    params.set('fp-y', String(opts.sanityHotspot.y))
    if (!opts.fit) params.set('fit', 'crop')
    if (!opts.crop) params.set('crop', 'focalpoint')
  }

  if (opts.w) params.set('w', String(opts.w))
  if (opts.h) params.set('h', String(opts.h))
  if (opts.fit) params.set('fit', opts.fit)
  if (opts.crop) params.set('crop', opts.crop)
  if (opts.q) params.set('q', String(opts.q))
  const base = opts.filename ? `${url}/${opts.filename}` : url
  return `${base}?${params.toString()}`
}

// Appends a vanity filename to a raw CDN URL (e.g. video files) for SEO.
// Unlike imgUrl, this does not add image transformation params.
export function withFilename(url: string | null | undefined, filename: string | null | undefined): string {
  if (!url) return ''
  return filename ? `${url}/${filename}` : url
}

// Computes a CSS object-position value from a Sanity hotspot so that
// object-fit: cover anchors on the focal point instead of defaulting to center.
// When a crop is also present, the hotspot position is adjusted to be relative
// to the cropped region (since the CDN already applied the crop via rect=...).
export function hotspotObjectPosition(
  hotspot: SanityHotspot | null | undefined,
  crop: SanityCrop | null | undefined,
): string | undefined {
  if (!hotspot) return undefined
  let x = hotspot.x
  let y = hotspot.y
  if (crop) {
    const cropW = 1 - crop.left - crop.right
    const cropH = 1 - crop.top - crop.bottom
    if (cropW > 0 && cropH > 0) {
      x = (hotspot.x - crop.left) / cropW
      y = (hotspot.y - crop.top) / cropH
    }
  }
  return `${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`
}
