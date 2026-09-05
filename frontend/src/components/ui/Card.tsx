import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  /** Whether the card is in a selected/active state. */
  selected?: boolean
  /** Whether the card is interactive (hover states). */
  interactive?: boolean
  /** Optional click handler. */
  onClick?: () => void
  /** HTML tag for the card container. */
  as?: React.ElementType
}

/**
 * Base card component with light editorial aesthetic.
 * Clean pure white background, subtle border, and interactive states.
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  selected = false,
  interactive = false,
  onClick,
  as: Tag = 'div',
}) => {
  const isClickable = interactive || !!onClick

  return (
    <Tag
      className={[
        'border bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.02)]',
        'transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
        selected
          ? 'border-accent bg-accent-light/30 shadow-[0_4px_20px_rgba(255,90,31,0.08)]'
          : 'border-border',
        isClickable
          ? 'cursor-pointer hover:border-border-hover hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.995] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
          : '',
        className,
      ].join(' ')}
      onClick={onClick}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      onKeyDown={
        isClickable
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
    >
      {children}
    </Tag>
  )
}

/**
 * Project card foundation with structured editorial layout.
 */
export const ProjectCard: React.FC<CardProps & {
  index?: string
  title?: string
  tagline?: string
}> = ({
  index,
  title,
  tagline,
  children,
  className = '',
  selected,
  onClick,
}) => {
  return (
    <Card
      selected={selected}
      interactive
      onClick={onClick}
      className={`p-0 overflow-hidden group ${className}`}
    >
      <div className="p-6 lg:p-8 flex flex-col gap-5">
        {/* Header row */}
        {(index || title) && (
          <div className="flex items-start justify-between gap-4">
            {index && (
              <span className="type-label text-accent font-semibold">{index}</span>
            )}
          </div>
        )}

        {title && (
          <h3 className="type-h3 text-fg group-hover:text-accent transition-colors duration-[var(--duration-base)]">
            {title}
          </h3>
        )}

        {tagline && (
          <p className="type-body text-fg-secondary">{tagline}</p>
        )}

        {children}
      </div>

      {/* Bottom accent bar on hover/selection */}
      <div
        className={[
          'h-1 w-full transition-all duration-300',
          selected ? 'bg-accent' : 'bg-transparent group-hover:bg-accent/40',
        ].join(' ')}
      />
    </Card>
  )
}
