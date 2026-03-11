'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { BookshopSection } from '@/lib/api/homepage'
import { bookshopUrl } from '@/lib/config'
import { mediaUrl, stripHtml } from '@/lib/headless'

interface CEFBookshopSectionProps {
  data?: BookshopSection | null
}

export const CEFBookshopSection = ({ data }: CEFBookshopSectionProps) => {
  const title = data?.title ?? 'CEF Bookshop'
  const description = data?.description
    ? stripHtml(data.description)
    : 'Step into the CEF Bookshop—where learning comes alive! Discover inspiring curriculum book series on Nazirah, Fahm-ul-Quran, character building, Urdu, Islamiyat, and Early Childhood Education. From colorful storybooks and engaging activity packs to self-assessment diaries and career counselling books—there\'s something for everyone. Explore our full resource collection today!'
  const image = mediaUrl(data?.image, '/CEF Shop Book.png')

  return (
    <section className="w-full px-4 lg:px-10 py-12 overflow-visible">
      <div
        className="
          relative
          max-w-195 min-h-80 mx-auto
          bg-[#EAF4F6]
          rounded-tr-[48px] rounded-bl-[48px]
          px-2 sm:px-2 lg:px-2
          pt-8 pb-8 lg:pb-0
          overflow-visible
        "
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-end gap-3">

          <div className="lg:hidden w-full">
            <div className="relative h-84 w-full">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="hidden lg:block w-[42%] h-80" />

          <div
            className="
              w-full lg:w-[54%]
              text-center lg:text-left
              pt-8 lg:pt-12 pb-8 lg:pb-10
              pl-4 pr-4 lg:pl-10 lg:pr-8
            "
          >
            <Heading textSize="text-4xl lg:text-[2.5rem]">{title}</Heading>

            <Text className="text-justify leading-[1.3] mt-6 mb-8 max-w-xl mx-auto lg:mx-0 text-black">
              {description}
            </Text>

            <Link
              href={bookshopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                px-3
                text-sm
                text-white bg-[#065D80]
                border-2 border-[#065D80]
                rounded-full
                transition-all duration-300
                hover:bg-white hover:text-[#065D80]
                mt-2
              "
            >
              CEF Bookshop
            </Link>
          </div>
        </div>

        {/* Boy image: head above div, bottom touches div; object-cover + wide width to limit side crop */}
        <div
          className="
            hidden lg:block
            absolute left-10 top-[-5rem] bottom-0
            w-[44%]
            pointer-events-none
            z-0
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  )
}
