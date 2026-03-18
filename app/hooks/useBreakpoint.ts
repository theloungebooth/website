import { useMediaQuery } from "./useMediaQuery"

/**
 * Named breakpoints — mirrors the Tailwind config (xs is the custom
 * breakpoint defined in globals.css; the rest are TW v4 defaults).
 */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

/**
 * Returns true when the viewport is at or above the given breakpoint.
 *
 * Accepts either a named breakpoint or a raw pixel value for custom sizes.
 *
 * Usage:
 *   const isDesktop = useBreakpoint("lg")
 *   const isCustom  = useBreakpoint(900)
 */
export function useBreakpoint(bp: Breakpoint | number): boolean {
  const px = typeof bp === "number" ? bp : BREAKPOINTS[bp]
  return useMediaQuery(`(min-width: ${px}px)`)
}

// Convenience aliases for the most common checks
export const useIsXs  = () => useBreakpoint("xs")
export const useIsSm  = () => useBreakpoint("sm")
export const useIsMd  = () => useBreakpoint("md")
export const useIsLg  = () => useBreakpoint("lg")
export const useIsXl  = () => useBreakpoint("xl")
export const useIs2xl = () => useBreakpoint("2xl")
