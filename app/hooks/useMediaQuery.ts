import { useEffect, useState } from "react"

/**
 * Subscribes to a raw CSS media query string and returns whether it matches.
 *
 * Usage:
 *   const isLandscape = useMediaQuery("(orientation: landscape)")
 *   const isNarrow    = useMediaQuery("(max-width: 480px)")
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", handler)
    setMatches(mql.matches)
    return () => mql.removeEventListener("change", handler)
  }, [query])

  return matches
}
