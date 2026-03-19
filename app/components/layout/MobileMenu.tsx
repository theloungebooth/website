import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import type { SettingsData } from "~/types/sanity"
import { SiteLink } from "./SiteLink"
import { Button } from "../ui/Button"
import MenuIcon from "../icons/ui/menu.svg?react"
import CloseIcon from "../icons/ui/close.svg?react"

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" as const, staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
}

export function MobileMenu({ settings }: { settings: SettingsData | null }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen])

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex flex-col gap-y-10 bg-secondary px-5 pt-4 pb-12 md:hidden"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <nav className="flex flex-col gap-y-3 pt-32" aria-label="Mobile navigation">
            {(settings?.secondaryNav?.length ? settings.secondaryNav : settings?.headerNav)?.map((link) => (
              <motion.div key={link.label} variants={itemVariants}>
                <SiteLink link={link} className="type-xl" onClick={() => setIsOpen(false)} />
              </motion.div>
            ))}
          </nav>

          <nav className="flex flex-col gap-y-2.5" aria-label="Mobile navigation">
            {(settings?.socialLinks?.length ? settings.socialLinks : settings?.headerNav)?.map((link) => (
              <motion.div key={link.label} variants={itemVariants}>
                <SiteLink link={link} className="type-lg" onClick={() => setIsOpen(false)} />
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        className="md:hidden flex items-center text-primary justify-center w-8.5 h-8.5 -mr-1 cursor-pointer"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <CloseIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
      </button>

      {typeof document !== "undefined" && createPortal(overlay, document.body)}
    </>
  )
}
