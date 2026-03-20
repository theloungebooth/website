import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Section } from "~/components/ui/Section"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import type { FaqItem, SectionFaq } from "~/types/sanity"
import AddIcon from "~/components/icons/ui/add.svg?react"
import RemoveIcon from "~/components/icons/ui/remove.svg?react"

const spring = { type: "spring" as const, stiffness: 400, damping: 40 }

function AccordionItem({ _key, question, answer }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `faq-panel-${_key}`

  return (
    <div className="border-b border-primary-muted/20 group-last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 md:py-5 text-left gap-6 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="type-base text-primary">{question}</span>
        <span className="shrink-0 size-4.5 md:size-5 text-primary" aria-hidden>
          {isOpen ? <RemoveIcon /> : <AddIcon />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={question}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="overflow-hidden"
          >
            <p className="pb-5 md:pb-6 text-pretty type-base-minus">{answer}</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 md:gap-y-8 lg:gap-y-16">
        {heading && (
          <FadeIn direction="up">
            <h2 className="type-xl font-semibold md:type-2xl text-balance">{heading}</h2>
          </FadeIn>
        )}
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
