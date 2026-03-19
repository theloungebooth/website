import { forwardRef } from "react"
import { cn } from "~/lib/cn"

interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  children: React.ReactNode
}

export const Section = forwardRef<HTMLElement, SectionProps>(({ className, children, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        "px-5 xs:px-6 sm:px-8 mx-auto max-w-355 pt-7 xs:pt-8 pb-5 sm:pt-12 sm:pb-10 md:pt-16 md:pb-14 xl:pt-18 xl:pb-16 2xl:pt-20 2xl:pb-18 last:pb-12 first:pt-12 first:md:pt-16",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
})

Section.displayName = "Section"
