//Resuable card we use this card where we have image+heading + description
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Text } from './text'

type CardVariant = 'default' | 'light'

type CardProps = {
  image: string
  title: string
  subTitle?: string
  description: string
  link?: string  // optional
  variant?: CardVariant
  imageWidth?: number  // optional
  imageHeight?: number // optional
  paddingX?: string    // optional Tailwind class e.g. "px-10"
  paddingY?: string    // optional Tailwind class e.g. "py-6"
  growFullWidth?: boolean  // when true, card grows to fill flex container (no max-w-sm)
  imageSquare?: boolean    // when true, image container is square (aspect-square)
}

/* background styles for each variant */
const bgVariants: Record<CardVariant, string> = {
  default: 'bg-[#EAF4F6]',
  light: 'bg-[#EAF7E5]',
}

export const Card = ({
  image,
  title,
  subTitle,
  description,
  link,
  variant = 'default',
  imageWidth,
  imageHeight,
  paddingX = 'px-10',
  paddingY = 'py-6',
  growFullWidth = false,
  imageSquare = false,
}: CardProps) => {
  return (
    <div
      className={`flex-1 mx-auto lg:mx-0
                  ${growFullWidth ? 'min-w-0' : 'max-w-sm'}
                  ${bgVariants[variant]}
                  rounded-tr-[60px] rounded-bl-[60px]
                  ${paddingX} ${paddingY} min-h-130 flex flex-col`}
    >
      {/* IMAGE */}
      <div className="w-full flex items-center justify-center mb-6">
        <div
          className={`relative w-full ${imageSquare ? 'aspect-square max-w-[240px] mx-auto' : ''}`}
          style={!imageSquare ? { height: imageHeight ? `${imageHeight}px` : '18rem' } : undefined}
        >
          <Image
            src={image}
            alt={title}
            fill
            className={imageSquare ? 'object-cover' : 'object-fill'}
            style={imageWidth && !imageSquare ? { width: `${imageWidth}px` } : {}}
          />
        </div>
      </div>

      {/* TITLES */}
      <div className="mb-4 text-center">
        <h3 className="text-lg sm:text-[1.3rem] font-bold text-[#0B5C6B]">
          {title}
        </h3>

        {subTitle && (
          <p className="text-[#0B5C6B] font-semibold text-sm">
            {subTitle}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <Text className="px-2 text-justify mb-4">
        {description}
      </Text>

      {/* LINK - render only if provided */}
      {link && (
        <div className="text-center mt-auto">
          <Link
            href={link}
            className="inline-block text-[#8DC63F] font-semibold text-sm
                       hover:text-[#7CB342] transition-colors underline"
          >
            Learn More
          </Link>
        </div>
      )}
    </div>
  )
}
