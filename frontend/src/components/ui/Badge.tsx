import React from 'react'

export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'accent'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  /** Show a pulsing dot indicator. */
  dot?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface border-border text-fg-secondary',
  success: 'bg-success-muted border-success/30 text-success font-medium',
  error: 'bg-error-muted border-error/30 text-error font-medium',
  warning: 'bg-accent-light border-accent/30 text-accent font-medium',
  accent: 'bg-accent-light border-accent/30 text-accent font-medium',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-fg-muted',
  success: 'bg-success',
  error: 'bg-error',
  warning: 'bg-accent',
  accent: 'bg-accent',
}

/**
 * Status and technical badge component for light editorial design.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
  className = '',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 border px-2.5 py-0.5',
        'font-mono text-[0.6875rem] uppercase tracking-wider',
        variantStyles[variant],
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]} ${
            variant === 'success' || variant === 'accent' ? 'animate-pulse' : ''
          }`}
        />
      )}
      {children}
    </span>
  )
}
