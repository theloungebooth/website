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
  fetchPriority?: "high" | "low" | "auto"
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
  fetchPriority,
  className = "h-full w-full object-cover",
  draggable,
  nonInteractive,
}: MediaItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  function triggerButtonShow() {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    setShowButton(true)
    hideTimeoutRef.current = setTimeout(() => setShowButton(false), 2000)
  }

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
    triggerButtonShow()
  }

  function handleContainerTouchStart(e: React.TouchEvent) {
    touchStartYRef.current = e.touches[0].clientY
  }

  function handleContainerTouchEnd(e: React.TouchEvent) {
    const startY = touchStartYRef.current
    if (startY === null) return
    const deltaY = Math.abs(e.changedTouches[0].clientY - startY)
    touchStartYRef.current = null
    if (deltaY > 10) return // scroll gesture, not a tap
    e.preventDefault()
    togglePlay()
  }

  if (item.mediaType === "video" && item.videoUrl) {
    return (
      <div
        className={cn("relative h-full w-full group", nonInteractive && "pointer-events-none")}
        onTouchStart={nonInteractive ? undefined : handleContainerTouchStart}
        onTouchEnd={nonInteractive ? undefined : handleContainerTouchEnd}
      >
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
        {!nonInteractive && (
          <button
            onClick={togglePlay}
            onTouchEnd={(e) => e.stopPropagation()}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={cn(
              "absolute cursor-pointer flex bottom-6 left-6 h-12 w-12 items-center justify-center rounded-full bg-primary-muted/60 text-white transition-all ease-linear hover:bg-primary-muted",
              showButton ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
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
          </button>
        )}
      </div>
    )
  }

  if (item.imageUrl) {
    // Compute post-crop dimensions so the browser can reserve the correct
    // aspect ratio before the image loads, preventing layout shift (CLS).
    let intrinsicWidth = item.imageWidth ?? undefined
    let intrinsicHeight = item.imageHeight ?? undefined
    if (item.imageCrop && intrinsicWidth && intrinsicHeight) {
      const { top, bottom, left, right } = item.imageCrop
      intrinsicWidth = Math.round(intrinsicWidth * (1 - left - right))
      intrinsicHeight = Math.round(intrinsicHeight * (1 - top - bottom))
    }

    return (
      <img
        src={imgUrl(item.imageUrl, {
          w: stepWidth(widths[widths.length - 1]),
          filename: item.imageFilename,
          sanityCrop: item.imageCrop,
          sanityHotspot: item.imageHotspot,
          imageWidth: item.imageWidth,
          imageHeight: item.imageHeight,
        })}
        srcSet={widths
          .map(
            (w) =>
              `${imgUrl(item.imageUrl, { w: stepWidth(w), filename: item.imageFilename, sanityCrop: item.imageCrop, sanityHotspot: item.imageHotspot, imageWidth: item.imageWidth, imageHeight: item.imageHeight })} ${w}w`,
          )
          .join(", ")}
        sizes={sizes}
        alt={item.alt ?? ""}
        width={intrinsicWidth}
        height={intrinsicHeight}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        draggable={nonInteractive ? false : draggable}
        style={{
          objectPosition: hotspotObjectPosition(item.imageHotspot, item.imageCrop),
          color: "transparent",
          ...(nonInteractive ? { pointerEvents: "none", userSelect: "none" } : {}),
        }}
      />
    )
  }

  return null
}
