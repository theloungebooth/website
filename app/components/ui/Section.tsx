import { forwardRef } from "react"
import { cn } from "~/lib/cn"

interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  children: React.ReactNode
}

export const Section = forwardRef<HTMLElement, SectionProps>(({ className, children, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("px-5 sm:px-8 mx-auto max-w-355 py-10 lg:py-20 last:pb-12 first:pt-12 first:md:pt-16", className)}
      {...props}
    >
      {children}
    </section>
  )
})

Section.displayName = "Section"
