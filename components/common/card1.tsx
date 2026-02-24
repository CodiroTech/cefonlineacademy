//Resuable card we use this card where we have images only
'use client'

import Image from 'next/image'

type CardVariant = 'default' | 'light'
type CardLayout = 'row' | 'column'

type CardImage =
  | string
  | {
      src: string
      width?: number
      height?: number
      alt?: string
    }

type CardProps = {
  image?: string
  images?: CardImage[]
  alt?: string
  variant?: CardVariant
  padding?: string
  className?: string
  defaultImageWidth?: number
  defaultImageHeight?: number
  layout?: CardLayout
}

const bgVariants: Record<CardVariant, string> = {
  default: 'bg-[#EAF4F6]',
  light: 'bg-[#EAF7E5]',
}

export const Card1 = ({
  image,
  images = [],
  alt = 'card image',
  variant = 'default',
  padding = 'px-6 py-6',
  className = '',
  defaultImageWidth = 220,
  defaultImageHeight = 220,
  layout = 'row',
}: CardProps) => {
  const finalImages = images.length ? images : image ? [image] : []

  return (
    <div
      className={`
        ${bgVariants[variant]}
        ${padding}
        rounded-tr-[60px] rounded-bl-[60px]
        inline-block
        ${className}
      `}
    >
      <div
        className={`
          flex flex-wrap
          ${layout === 'column' ? 'flex-col items-center gap-6' : 'flex-row items-center gap-2'}
          justify-center
        `}
      >
        {finalImages.slice(0, 3).map((img, index) => {
          const isObject = typeof img !== 'string'

          // Responsive width/height for different screens
          const width = isObject ? img.width ?? defaultImageWidth : defaultImageWidth
          const height = isObject ? img.height ?? defaultImageHeight : defaultImageHeight

          return (
            <div
              key={index}
              className={`
                w-full sm:w-[calc(50%-0.5rem)] md:w-auto
                flex justify-center
                mb-2
              `}
            >
              <Image
                src={isObject ? img.src : img}
                alt={isObject ? img.alt ?? alt : alt}
                width={width}
                height={height}
                className="object-contain max-w-full h-auto"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
