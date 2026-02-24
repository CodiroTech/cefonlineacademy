'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { SortOption } from './BookshopContent'

type CEFBOOKSHOPProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
]

export default function CEFBOOKSHOP({ searchQuery, onSearchChange, sort, onSortChange }: CEFBOOKSHOPProps) {
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

        {/* SEARCH + SORT BY */}
        <div className="flex flex-wrap justify-center items-center gap-4">

          {/* SEARCH INPUT */}
          <div className="relative w-40">
            <input
              type="text"
              placeholder="Search Book"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-7 rounded-lg border border-gray-300
                         px-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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

          {/* SORT BY */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-7 rounded-lg border border-gray-300 px-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </section>
  )
}
