import React from 'react'

export type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label' | 'meta'

export interface TypographyProps {
  variant?: TypographyVariant
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  /** Accent coloring for the text element. */
  accent?: boolean
}

const defaultTags: Record<TypographyVariant, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  small: 'p',
  label: 'span',
  meta: 'span',
}

/**
 * Typography primitive for consistent light editorial text rendering.
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className = '',
  as,
  accent = false,
}) => {
  const Tag = as || defaultTags[variant]

  return (
    <Tag
      className={[
        `type-${variant}`,
        accent ? 'text-accent' : '',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}

/**
 * Display heading for hero and splash sections.
 */
export const DisplayHeading: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <Typography variant="display" className={`text-fg ${className}`}>
    {children}
  </Typography>
)

/**
 * Section heading with optional index label.
 */
export const SectionHeading: React.FC<{
  children: React.ReactNode
  index?: string
  label?: string
  className?: string
}> = ({ children, index, label, className = '' }) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    {(index || label) && (
      <div className="flex items-center gap-3">
        {index && (
          <span className="type-label text-accent font-semibold">{index}</span>
        )}
        {label && <span className="type-label text-fg-muted">{label}</span>}
      </div>
    )}
    <Typography variant="h2" className="text-fg">
      {children}
    </Typography>
  </div>
)

/**
 * Technical label with optional dot indicator.
 */
export const TechLabel: React.FC<{
  children: React.ReactNode
  dot?: boolean
  className?: string
}> = ({ children, dot = false, className = '' }) => (
  <span className={`type-label inline-flex items-center gap-2 ${className}`}>
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />}
    {children}
  </span>
)
