import { Children } from "react"
import { motion, useReducedMotion } from "motion/react"

const spring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 1,
}

export interface FadeInScatterProps {
  children: React.ReactNode
  /** px distance each item travels from its start position (converged toward center) to its natural position */
  radius?: number
  /** seconds between each child's animation start */
  stagger?: number
  className?: string
  /**
   * When true, inner motion wrappers are rendered as `position: absolute; inset: 0`,
   * filling the container. Required when children use absolute positioning — ensures
   * their top/left percentages resolve against the container, not a zero-size wrapper.
   * The container must have `position: relative`.
   */
  absoluteWrappers?: boolean
  /**
   * Custom per-child scatter offsets `{ x, y }` in px.
   * Overrides the default evenly-distributed radial calculation.
   * Useful when items have known spatial positions (e.g. absolute-positioned layouts).
   */
  scatterOffsets?: Array<{ x: number; y: number }>
}

/**
 * FadeInScatter — items appear to scatter outward from a shared center point.
 *
 * Grid layout usage (default):
 *   <FadeInScatter className="grid grid-cols-3 gap-4">
 *     <Card />
 *     <Card />
 *     <Card />
 *   </FadeInScatter>
 *
 * Absolute layout usage:
 *   <FadeInScatter absoluteWrappers scatterOffsets={offsets} className="relative w-full h-[80vh]">
 *     <div className="absolute" style={{ top: '10%', left: '20%' }} />
 *     …
 *   </FadeInScatter>
 */
export function FadeInScatter({
  children,
  radius = 48,
  stagger = 0.055,
  className,
  absoluteWrappers = false,
  scatterOffsets,
}: FadeInScatterProps) {
  const shouldReduceMotion = useReducedMotion()
  const items = Children.toArray(children)
  const count = items.length

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {items.map((child, i) => {
        // Use a custom offset if provided, otherwise evenly distribute angles around a circle.
        // Each item starts displaced toward center, then springs to x:0 y:0 (natural position).
        let startX: number
        let startY: number

        if (scatterOffsets?.[i]) {
          startX = scatterOffsets[i].x
          startY = scatterOffsets[i].y
        } else {
          const angle = (i / count) * 2 * Math.PI
          startX = -Math.cos(angle) * radius
          startY = -Math.sin(angle) * radius
        }

        return (
          <motion.div
            key={i}
            style={absoluteWrappers ? { position: "absolute", inset: 0 } : undefined}
            variants={{
              hidden: { opacity: 0, x: startX, y: startY, scale: 0.82 },
              visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: spring },
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
