'use client'

export const Heading = ({
  textSize = 'text-7xl',
  leading = 'snug',
  children,
  className = '',
}: {
  textSize?: string
  leading?: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={`${textSize} ${leading} font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  )
}
