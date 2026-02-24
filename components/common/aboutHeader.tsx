'use client'

import Image from 'next/image'
import { Heading } from '../common/heading'

interface AboutHeaderProps {
  title: string
  imageSrc: string
  imageAlt?: string

  /**
   * Default heading offset (mobile + xl)
   * Example: "15%", "20%", "200px"
   */
  headingOffset?: string

  /**
   * Push heading direction
   * left  → closer to left
   * right → closer to image
   */
  align?: 'left' | 'right'
}

export const AboutHeader = ({
  title,
  imageSrc,
  imageAlt = title,
  headingOffset = '20%',
  align = 'right',
}: AboutHeaderProps) => {
  return (
    <section className="w-full px-4 lg:px-12 pb-1">
      <div
        className="relative -z-6 container mx-auto bg-[#EAF7E5] rounded-[20px] px-6 lg:px-14 pt-12 pb-12 overflow-hidden"
        style={{ ['--heading-offset' as any]: headingOffset }}
      >
        {/* Decorative Circles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute bottom-[20%] right-[39%] w-5 h-5 rounded-full bg-[#8BC34A] opacity-40" />
          <div className="absolute bottom-[5%] right-[33%] w-6 h-6 rounded-full bg-[#8BC34A] opacity-25" />
          <div className="absolute top-1/5 right-[42%] w-5 h-5 rounded-full bg-[#21515a] opacity-15" />
          <div className="absolute top-[15%] right-[15%] w-5 h-5 rounded-full bg-[#8BC34A] opacity-30" />
          <div className="absolute top-[65%] right-[15%] w-7 h-7 rounded-full bg-[#8BC34A] opacity-35" />
          <div className="absolute top-[17%] right-[21%] w-9 h-9 rounded-full bg-[#0B5C6B] opacity-20" />
          <div className="absolute top-[20%] right-[32%] w-7 h-7 rounded-full bg-[#8BC34A] opacity-35" />
          <div className="absolute bottom-[30%] right-[27%] w-5 h-5 rounded-full bg-[#B8E6D5] opacity-40" />
          <div className="absolute top-[70%] right-[22%] w-5 h-5 rounded-full bg-[#8BC34A] opacity-25" />
        </div>

        {/* Heading */}
        <div className="relative z-20 flex items-center">
          {align === 'right' && (
            <div
              className="
                shrink-0
                w-(--heading-offset)
                lg:w-[7%]
                xl:w-(--heading-offset)
              "
            />
          )}

          <div className="flex-1 ml-2 sm:ml-3 lg:ml-0">
            <Heading
              textSize="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-[42px]"
              leading="leading-tight"
            >
              {title}
            </Heading>
          </div>

          {align === 'left' && (
            <div
              className="
                shrink-0
                w-(--heading-offset)
                lg:w-[10%]
                xl:w-(--heading-offset)
              "
            />
          )}
        </div>

        {/* Right Image */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-fill rounded-l-full"
              priority
            />
          </div>
        </div>

        {/* Right Strip */}
        <div className="absolute top-0 right-0 h-full w-3 sm:w-3 bg-[#bccea4] z-0" />
      </div>
    </section>
  )
}
