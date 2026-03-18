"use client"

import { createContext, useContext } from "react"
import { motion, useReducedMotion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"

// Offset distance for directional fades — subtle enough to feel polished,
// clear enough to communicate directionality.
const OFFSET = 12

const directionOffset = {
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  right: { x: -OFFSET },
} satisfies Record<string, { x?: number; y?: number }>

// Spring tuned for content reveals: snappy entry, no bounce.
const spring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 30,
  mass: 1.2,
}

const variants = {
  hidden: (direction: Direction) => ({
    opacity: 0,
    ...directionOffset[direction],
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: spring,
  },
}

export type Direction = keyof typeof directionOffset

// Context flag: when FadeIn is inside a FadeInGroup, the group owns
// the whileInView trigger. FadeIn children just supply variants + custom.
const FadeInGroupContext = createContext(false)

export interface FadeInProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  direction?: Direction
  /** Delay in seconds. Only applies when used standalone (not inside FadeInGroup). */
  delay?: number
  /** Override the default div with any HTML tag */
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * FadeIn — a directional fade-in wrapper.
 *
 * Standalone: triggers on scroll via whileInView.
 * Inside FadeInGroup: parent drives timing; stagger is applied automatically.
 *
 * Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   <FadeIn direction="up">…</FadeIn>
 *   <FadeIn direction="left" delay={0.1}>…</FadeIn>
 */
export function FadeIn({ direction = "up", delay = 0.1, as = "div", children, ...props }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()
  const isGrouped = useContext(FadeInGroupContext)
  const Tag = motion[as as keyof typeof motion] as typeof motion.div

  if (shouldReduceMotion) {
    const StaticTag = as as React.ElementType
    return <StaticTag {...(props as React.HTMLAttributes<HTMLElement>)}>{children}</StaticTag>
  }

  if (isGrouped) {
    // Parent FadeInGroup owns initial/whileInView — we only supply variants + custom
    // so that staggerChildren can orchestrate the sequence.
    return (
      <Tag variants={variants} custom={direction} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
      custom={direction}
      transition={{ ...spring, delay }}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * FadeInGroup — wraps children and staggers their FadeIn animations.
 *
 * Usage:
 *   <FadeInGroup stagger={0.1}>
 *     <FadeIn direction="up">First</FadeIn>
 *     <FadeIn direction="up">Second</FadeIn>
 *   </FadeInGroup>
 */
export interface FadeInGroupProps {
  children: React.ReactNode
  /** Seconds between each child's animation start. Default: 0.1 */
  stagger?: number
  className?: string
}

export function FadeInGroup({ children, stagger = 0.1, className }: FadeInGroupProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <FadeInGroupContext.Provider value={true}>
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
        {children}
      </motion.div>
    </FadeInGroupContext.Provider>
  )
}
