import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Optional icon to render before the label. */
  icon?: React.ReactNode
  /** Optional icon to render after the label. */
  iconRight?: React.ReactNode
  /** Whether the button is in a loading state. */
  loading?: boolean
  /** Element type to render as, e.g. 'a' */
  as?: React.ElementType
  /** Optional href when used as a link */
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent text-white font-medium',
    'hover:bg-accent-hover shadow-[0_2px_10px_rgba(255,90,31,0.25)]',
    'active:scale-[0.98]',
    'disabled:opacity-40 disabled:pointer-events-none',
    'border border-accent',
  ].join(' '),
  secondary: [
    'bg-surface text-fg border border-border',
    'hover:border-border-hover hover:bg-surface-subtle shadow-sm',
    'active:scale-[0.98]',
    'disabled:opacity-40 disabled:pointer-events-none',
  ].join(' '),
  ghost: [
    'bg-transparent text-fg-secondary border border-transparent',
    'hover:text-fg hover:bg-surface-subtle',
    'active:scale-[0.98]',
    'disabled:opacity-40 disabled:pointer-events-none',
  ].join(' '),
  icon: [
    'bg-transparent text-fg-muted border border-transparent',
    'hover:text-fg hover:bg-surface-subtle',
    'active:scale-[0.98]',
    'disabled:opacity-40 disabled:pointer-events-none',
    'p-0',
  ].join(' '),
  link: [
    'bg-transparent text-accent border-b border-accent/40 rounded-none p-0 inline-flex items-center gap-1.5',
    'hover:border-accent hover:text-accent-hover',
    'active:opacity-80',
    'disabled:opacity-40 disabled:pointer-events-none',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-sm gap-2.5',
}

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  loading,
  children,
  className = '',
  disabled,
  as: Component = 'button',
  href,
  ...props
}) => {
  const isIcon = variant === 'icon'
  const isLink = variant === 'link'

  const Tag = href ? 'a' : Component

  return (
    <Tag
      href={href}
      className={[
        'inline-flex items-center justify-center font-mono text-[0.75rem] uppercase tracking-wider font-medium',
        'transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
        'cursor-pointer select-none outline-none rounded-none',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        variantStyles[variant],
        isIcon ? iconSizeStyles[size] : isLink ? '' : sizeStyles[size],
        className,
      ].join(' ')}
      disabled={Tag === 'button' ? disabled || loading : undefined}
      {...(props as any)}
    >
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children && <span>{children}</span>}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </Tag>
  )
}
