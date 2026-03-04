import { twMerge } from 'tailwind-merge'

type TextProps = {
  className?: string
  children?: React.ReactNode
  html?: string
}

export const Text = ({ className = '', children, html }: TextProps) => {
  const baseStyles =
    'font-poppins text-[16px] font-normal text-[#414141] tracking-[0.5px] leading-snug'

  const mergedClassName = twMerge(baseStyles, className)

  if (html) {
    return (
      <p
        className={mergedClassName}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return <p className={mergedClassName}>{children}</p>
}