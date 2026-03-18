import { Link } from '@tanstack/react-router'
import type { SanityLink } from '~/types/sanity'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeHref(href: string): string {
  if (EMAIL_RE.test(href)) return `mailto:${href}`
  return href
}

function detectType(href: string): 'anchor' | 'external' | 'internal' {
  if (href.startsWith('#')) return 'anchor'
  if (/^(https?:|mailto:|tel:)/.test(href)) return 'external'
  return 'internal'
}

function normalizePath(href: string): string {
  if (!href || href === 'home') return '/'
  return href.startsWith('/') ? href : `/${href}`
}

type SiteLinkProps = {
  link: SanityLink
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export function SiteLink({ link, className, children, onClick }: SiteLinkProps) {
  const label = children ?? link.label
  const href = normalizeHref(link.href ?? '#')
  const type = detectType(href)

  if (type === 'anchor') {
    return (
      <a href={href} className={className} onClick={onClick}>
        {label}
      </a>
    )
  }

  if (type === 'internal') {
    return (
      <Link to={normalizePath(href)} className={className} onClick={onClick}>
        {label}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {label}
    </a>
  )
}
