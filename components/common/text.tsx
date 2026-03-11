import { twMerge } from 'tailwind-merge'

type TextProps = {
  className?: string
  children?: React.ReactNode
  html?: string
  style?: React.CSSProperties
}

export const Text = ({ className = '', children, html, style }: TextProps) => {
  const baseStyles =
    'font-poppins text-[16px] font-normal text-[#414141] tracking-[0.5px] leading-snug'

  const mergedClassName = twMerge(baseStyles, className)

  if (html) {
    return (
      <p
        className={mergedClassName}
        style={style}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <p className={mergedClassName} style={style}>
      {children}
    </p>
  )
}