import React from 'react'

type ContainerVariant = 'page' | 'narrow' | 'reading'

interface ContainerProps {
  children: React.ReactNode
  variant?: ContainerVariant
  className?: string
  as?: React.ElementType
}

/**
 * Responsive container constraining content to the editorial grid width.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'page',
  className = '',
  as: Tag = 'div',
}) => {
  return (
    <Tag className={`container-${variant} ${className}`}>
      {children}
    </Tag>
  )
}
