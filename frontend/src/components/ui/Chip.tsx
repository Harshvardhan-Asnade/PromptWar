import React from 'react'

export interface ChipProps {
  children: React.ReactNode
  /** Whether the chip is in selected state. */
  selected?: boolean
  /** Called when the chip is clicked. */
  onToggle?: () => void
  /** Whether interaction is disabled. */
  disabled?: boolean
  className?: string
}

/**
 * Selectable chip for tags, skills, and interests.
 * Light editorial styling with signature orange highlight.
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  onToggle,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      disabled={disabled}
      className={[
        'inline-flex items-center gap-1.5 px-3.5 py-1.5',
        'font-mono text-[0.6875rem] uppercase tracking-wider',
        'transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
        'cursor-pointer select-none outline-none rounded-none',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        selected
          ? 'border border-accent bg-accent-light text-accent font-medium shadow-sm'
          : 'border border-border bg-surface text-fg-secondary hover:border-border-hover hover:text-fg shadow-2xs',
        disabled ? 'opacity-40 pointer-events-none' : '',
        className,
      ].join(' ')}
    >
      {selected && (
        <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
      )}
      <span>{children}</span>
    </button>
  )
}
