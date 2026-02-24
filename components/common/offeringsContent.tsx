'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import { ReactNode } from 'react'

interface ContentWithSearchSectionProps {
  imageSrc: string
  imageAlt: string
  heading: string
  description: ReactNode
  searchPlaceholder?: string
}

export const ContentWithSearchSection = ({
  imageSrc,
  imageAlt,
  heading,
  description,
  searchPlaceholder = 'Search',
}: ContentWithSearchSectionProps) => {
  return (
    <section className="w-full bg-white px-4 lg:px-12 py-4 lg:pt-18 font-poppins">
      <div className="container mx-auto max-w-7xl px-4">

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">

          {/* LEFT — IMAGE */}
          <div className="shrink-0">
            <div className="relative w-62.5 h-66 lg:-mt-2 overflow-hidden flex items-end">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="flex flex-col w-full">

            {/* HEADING */}
            <Heading textSize="text-3xl sm:text-4xl md:text-4xl mb-3">
              {heading}
            </Heading>

            {/* DESCRIPTION */}
            <Text className="leading-relaxed text-justify mb-6">
              {description}
            </Text>

            {/* SEARCH + FILTER */}
            <div className="flex flex-wrap items-center gap-4">

              {/* SEARCH INPUT */}
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full h-9 rounded-lg border border-gray-300
                             px-2 text-sm
                             focus:outline-none focus:ring-1 focus:ring-black"
                />

                {/* SVG ICON */}
                <span
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ right: '6px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-900"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              </div>

              {/* FILTER */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#414141]">
                  Filter By
                </span>
                <select
                  className="h-9 rounded-lg border border-gray-300 px-3 text-sm
                             focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option>All</option>
                  <option>Faith & Spirituality</option>
                  <option>Character Building</option>
                  <option>Quranic Reflection</option>
                </select>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
