import { useRef, useState } from "react"
import { cn } from "~/lib/cn"
import { imgUrl, stepWidth, withFilename, hotspotObjectPosition } from "~/lib/imgUrl"
import type { SanityCrop, SanityHotspot } from "~/lib/imgUrl"

type MediaSource = {
  mediaType: "image" | "video"
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

type MediaItemProps = {
  item: MediaSource
  sizes?: string
  widths?: number[]
  loading?: "eager" | "lazy"
  className?: string
  draggable?: boolean
  /** Disables pointer events, drag, and the play/pause button — use in non-interactive contexts like auto-scrolling galleries */
  nonInteractive?: boolean
}

export function MediaItem({
  item,
  sizes = "(max-width: 1024px) 90vw, 45vw",
  widths = [400, 800, 1200],
  loading = "lazy",
  className = "h-full w-full object-cover",
  draggable,
  nonInteractive,
}: MediaItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  if (item.mediaType === "video" && item.videoUrl) {
    return (
      <div className={cn("relative h-full w-full group", nonInteractive && "pointer-events-none")}>
        <video
          ref={videoRef}
          src={withFilename(item.videoUrl, item.videoFilename)}
          poster={imgUrl(item.thumbnailUrl, { filename: item.thumbnailFilename }) || undefined}
          muted
          loop
          playsInline
          autoPlay
          draggable={nonInteractive ? false : draggable}
          className={className}
          title={item.alt ?? undefined}
          aria-label={item.alt ?? undefined}
          aria-hidden={!item.alt ? true : undefined}
        />
        {!nonInteractive && <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="absolute cursor-pointer flex bottom-6 left-6 h-12 w-12 items-center justify-center rounded-full bg-primary-muted/60 text-white opacity-0 group-hover:opacity-100 transition-all ease-linear hover:bg-primary-muted"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 fill-current">
              <path d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 fill-current">
              <path d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z" />
            </svg>
          )}
        </button>}
      </div>
    )
  }

  if (item.imageUrl) {
    return (
      <img
        src={imgUrl(item.imageUrl, { w: stepWidth(widths[widths.length - 1]), filename: item.imageFilename, sanityCrop: item.imageCrop, sanityHotspot: item.imageHotspot, imageWidth: item.imageWidth, imageHeight: item.imageHeight })}
        srcSet={widths.map((w) => `${imgUrl(item.imageUrl, { w: stepWidth(w), filename: item.imageFilename, sanityCrop: item.imageCrop, sanityHotspot: item.imageHotspot, imageWidth: item.imageWidth, imageHeight: item.imageHeight })} ${w}w`).join(", ")}
        sizes={sizes}
        alt={item.alt ?? ""}
        className={className}
        loading={loading}
        draggable={nonInteractive ? false : draggable}
        style={{
          objectPosition: hotspotObjectPosition(item.imageHotspot, item.imageCrop),
          ...(nonInteractive ? { pointerEvents: "none", userSelect: "none" } : {}),
        }}
      />
    )
  }

  return null
}
