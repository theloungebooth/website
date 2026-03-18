"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Section } from "~/components/ui/Section"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import type { FaqItem, SectionFaq } from "~/types/sanity"
import AddIcon from "~/components/icons/ui/add.svg?react"
import RemoveIcon from "~/components/icons/ui/remove.svg?react"

const spring = { type: "spring" as const, stiffness: 400, damping: 40 }

function AccordionItem({ question, answer }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-primary-muted/20 group-last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left gap-6 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="type-base-plus text-primary">{question}</span>
        <span className="shrink-0 size-5 text-primary" aria-hidden>
          {isOpen ? <RemoveIcon /> : <AddIcon />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="overflow-hidden"
          >
            <p className="pb-6 color-primary-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SectionFaq({ heading, items, anchorId }: SectionFaq) {
  if (!items?.length) return null

  return (
    <Section id={anchorId ?? undefined}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <FadeIn direction="up">{heading && <h2 className="type-2xl text-balance">{heading}</h2>}</FadeIn>
        <FadeInGroup>
          {items.map((item) => (
            <FadeIn key={item._key} direction="up" className="group">
              <AccordionItem {...item} />
            </FadeIn>
          ))}
        </FadeInGroup>
      </div>
    </Section>
  )
}
