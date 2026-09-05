import React from 'react'

export interface DividerProps {
  className?: string
  /** Orientation: horizontal (default) or vertical */
  orientation?: 'horizontal' | 'vertical'
  /** Use accent gradient variant */
  accent?: boolean
  /** Optional label centered on the divider (horizontal only) */
  label?: string
}

/**
 * Divider component with horizontal, vertical, labeled, and accent gradient variants.
 */
export const Divider: React.FC<DividerProps> = ({
  className = '',
  orientation = 'horizontal',
  accent = false,
  label,
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={[
          'w-px self-stretch',
          accent
            ? 'bg-gradient-to-b from-accent/60 via-accent/20 to-transparent'
            : 'bg-border',
          className,
        ].join(' ')}
        role="separator"
        aria-orientation="vertical"
      />
    )
  }

  if (label) {
    return (
      <div className={`flex items-center gap-4 ${className}`} role="separator">
        <div className={`flex-1 h-px ${accent ? 'bg-gradient-to-r from-accent/60 to-transparent' : 'bg-border'}`} />
        <span className="type-meta text-fg-muted flex-shrink-0">{label}</span>
        <div className={`flex-1 h-px ${accent ? 'bg-gradient-to-l from-accent/60 to-transparent' : 'bg-border'}`} />
      </div>
    )
  }

  return (
    <hr
      className={[
        accent ? 'divider-accent' : 'divider-h',
        className,
      ].join(' ')}
    />
  )
}
