import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import type { PortableTextBlock } from "~/types/sanity"
import { LogoBar } from "~/components/ui/LogoBar"

const components: PortableTextComponents = {
  types: {
    logoBar: () => <LogoBar />,
  },
  block: {
    normal: ({ children }) => <p className="pb-4 last:pb-0 type-base text-pretty">{children}</p>,
    h2: ({ children }) => <h2 className="pb-6 mt-10 type-3xl first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="pb-5 mt-8 type-2xl first:mt-0">{children}</h3>,
    h4: ({ children }) => <h4 className="pb-4 mt-6 type-xl first:mt-0">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-surface pl-6 italic color-primary-muted">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 pb-4 last:pb-0">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 pb-4 last:pb-0">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="type-base">{children}</li>,
    number: ({ children }) => <li className="type-base">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? "_blank" : undefined}
        rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
        className="text-link text-primary"
      >
        {children}
      </a>
    ),
  },
}

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value as any} components={components} />
}
