'use client'

import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Heading } from '../common/heading'
import { Button } from '../ui/button'

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

  /** When true, render only the green box (no outer section wrapper). Use when inside navbar so one wrapper controls left spacing. */
  embedded?: boolean

  /**
   * When set (e.g. navbar embedded header), mobile shows menu icon overlaid on top-right of the header image.
   */
  onMobileMenuOpen?: () => void
}

const GreenBannerInner = ({
  title,
  imageSrc,
  imageAlt = title,
  headingOffset = '5%',
  align = 'right',
  onMobileMenuOpen,
}: AboutHeaderProps) => (
  <div
    className="relative -z-6 w-full bg-[#EAF7E5] rounded-xl px-0 pt-0 pb-0 lg:px-14 lg:pt-12 lg:pb-12 overflow-hidden pointer-events-none"
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

    {/* Mobile: image anchored top–bottom of green box (no pt-6 gap); title padded separately */}
    <div className="pointer-events-none absolute inset-y-0 right-3 top-0 z-[5] w-[42%] max-w-[220px] overflow-hidden rounded-l-[2rem] sm:right-3 sm:rounded-l-[2.25rem] lg:hidden">
      <div className="relative h-full w-full min-h-[168px] sm:min-h-[188px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain object-right object-top sm:object-center pointer-events-none"
          sizes="(max-width: 1024px) 42vw, 220px"
          priority
        />
        {onMobileMenuOpen ? (
          <div className="pointer-events-auto absolute right-1.5 top-1.5 z-30 sm:right-2 sm:top-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 border-[#065D80] bg-white/95 text-[#065D80] shadow-md backdrop-blur-sm hover:bg-[#065D80] hover:text-white cursor-pointer"
              onClick={onMobileMenuOpen}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
    <div className="relative z-20 min-h-[168px] sm:min-h-[188px] lg:hidden">
      <div
        className="relative z-10 flex min-h-[168px] sm:min-h-[188px] w-[min(58%,calc(100%-11rem))] max-w-[62%] flex-col justify-end items-start px-3 pb-6 pr-2 pl-3 pt-2 sm:px-4 sm:pb-8"
      >
        <Heading
          textSize="!text-2xl sm:!text-3xl md:!text-4xl"
          leading="leading-tight"
        >
          {title}
        </Heading>
      </div>
    </div>

    {/* Desktop: heading row + absolute image */}
    <div className="relative z-20 hidden items-center lg:flex">
      {align === 'right' && (
        <div className="shrink-0 w-[19%] lg:w-[13%]" />
      )}

      <div className="flex-1 ml-2 sm:ml-4 lg:ml-6 pr-14 lg:pr-0">
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

    <div className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
      <div className="relative h-28 w-28 overflow-hidden sm:h-36 sm:w-36">
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
    <div className="absolute top-0 right-0 z-0 h-full w-3 bg-[#88bc44a1]" />
  </div>
)

export const AboutHeader = ({
  title,
  imageSrc,
  imageAlt = title,
  headingOffset = '20%',
  align = 'right',
  embedded = false,
  onMobileMenuOpen,
}: AboutHeaderProps) => {
  const inner = (
    <GreenBannerInner
      title={title}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      headingOffset={headingOffset}
      align={align}
      onMobileMenuOpen={onMobileMenuOpen}
    />
  )
  if (embedded) return inner
  return (
    <section className="w-full max-w-7xl mx-auto px-6 pb-1">
      {inner}
    </section>
  )
}
