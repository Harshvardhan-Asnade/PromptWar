import React from 'react'

export type InputVariant = 'default' | 'search'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input visual variant: default text or search-style */
  variant?: InputVariant
  /** Input label. */
  label?: string
  /** Helper/error text below the input. */
  hint?: string
  /** Whether the input is in an error state. */
  error?: boolean
  /** Visual size variant. */
  size?: 'sm' | 'md'
  /** Optional icon to render inside the left edge. */
  icon?: React.ReactNode
  /** Clear callback for search inputs */
  onClear?: () => void
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  hint,
  error = false,
  size = 'md',
  icon,
  onClear,
  className = '',
  id,
  value,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  const isSearch = variant === 'search'

  const displayIcon = icon || (isSearch ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ) : null)

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="type-label text-fg-secondary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {displayIcon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none">
            {displayIcon}
          </span>
        )}
        <input
          id={inputId}
          value={value}
          type={isSearch ? 'search' : props.type || 'text'}
          className={[
            'w-full bg-surface border font-sans text-fg placeholder:text-fg-faint shadow-2xs rounded-none',
            'transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
            'outline-none',
            'focus:border-accent focus:ring-2 focus:ring-accent/20',
            error
              ? 'border-error/60 focus:border-error focus:ring-error/20'
              : 'border-border hover:border-border-hover',
            size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm',
            displayIcon ? 'pl-10' : '',
            isSearch && value && onClear ? 'pr-10' : '',
          ].join(' ')}
          {...props}
        />
        {isSearch && value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"
            aria-label="Clear input"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {hint && (
        <span
          className={`text-xs font-sans ${
            error ? 'text-error' : 'text-fg-muted'
          }`}
        >
          {hint}
        </span>
      )}
    </div>
  )
}
