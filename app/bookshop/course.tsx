'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export default function CEFBOOKSHOP() {
  return (
    <section className="w-full bg-white px-4 lg:px-12 py-12 lg:pt-10 font-poppins">
      <div className="container mx-auto max-w-6xl text-center">

        {/* HEADING */}
        <Heading textSize="text-3xl sm:text-4xl md:text-5xl mb-15">
          Explore Our Book Collection
        </Heading>

        {/* DESCRIPTION */}
        <Text className=" sm:px-14 leading-relaxed md:text-center mt-4 mb-5">
          Discover a world of knowledge and inspiration through our carefully curated book collection. Each title is thoughtfully selected to
          support personal growth, spark curiosity, and enrich the learning journey for readers of all ages. Explore our diverse range of books and
          find meaningful resources that help you develop impeccable values, nurture meaningful life, and aspire to lead.
        </Text>

        {/* SEARCH + FILTER */}
        <div className="flex flex-wrap justify-center items-center gap-4">

          {/* SEARCH INPUT */}
          <div className="relative w-40">
            <input
              type="text"
              placeholder="Search Book"
              className="w-full h-7 rounded-lg border border-gray-300
                         px-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* SEARCH ICON */}
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ right: '6px' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Filter By
            </span>
            <select
              className="h-7 rounded-lg border border-gray-300 px-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>All</option>
              <option>Faith & Spirituality</option>
              <option>Character Building</option>
              <option>Quranic Reflection</option>
            </select>
          </div>

        </div>

      </div>
    </section>
  )
}
