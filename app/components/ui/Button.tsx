import { cn } from "~/lib/cn"
import ArrowIcon from "../icons/ui/arrow.svg?react"

type ButtonVariant = "primary" | "secondary" | "muted" | "outline"

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never
  variant?: ButtonVariant
  arrow?: boolean
}

type ButtonAsAnchor = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  openInNewTab?: boolean
  variant?: ButtonVariant
  arrow?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const baseClass =
  "px-4 leading-none w-fit h-11 type-base flex items-center justify-center font-medium rounded-full cursor-pointer whitespace-nowrap ease-linear transition-colors"

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-secondary hover:bg-primary/80",
  secondary: "bg-secondary text-primary hover:bg-secondary/80",
  muted: "bg-surface text-primary hover:bg-surface/65",
  outline: "bg-transparent border border-current/15 text-primary hover:bg-surface group",
}

function ArrowContent({ children, variant }: { children: React.ReactNode; variant: ButtonVariant }) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <div
        className={cn(
          "-mr-1 rounded-full bg-surface group-hover:bg-secondary ease-linear transition-colors p-1.25",
          variant === "primary" && "bg-secondary text-primary",
          variant === "secondary" && "bg-primary text-secondary",
          variant === "muted" && "bg-secondary text-primary",
          variant === "outline" && "bg-surface text-primary",
        )}
      >
        <div className="size-4">
          <ArrowIcon />
        </div>
      </div>
    </div>
  )
}

export function Button({ className, variant = "primary", arrow, ...props }: ButtonProps) {
  const cls = cn(baseClass, variantClasses[variant], className)

  if ("href" in props && props.href !== undefined) {
    const { openInNewTab, children, ...rest } = props as ButtonAsAnchor
    return (
      <a
        {...rest}
        className={cls}
        target={openInNewTab ? "_blank" : rest.target}
        rel={openInNewTab ? "noopener noreferrer" : rest.rel}
      >
        {arrow ? <ArrowContent variant={variant}>{children}</ArrowContent> : children}
      </a>
    )
  }

  const { children, ...buttonRest } = props as ButtonAsButton
  return (
    <button {...buttonRest} className={cls}>
      {arrow ? <ArrowContent variant={variant}>{children}</ArrowContent> : children}
    </button>
  )
}
