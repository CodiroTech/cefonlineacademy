'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import { useCourseFilters } from './CourseFiltersContext'

const SORT_OPTIONS = [
  { value: 1 as const, label: 'All' },
  { value: 2 as const, label: 'Newest' },
  { value: 3 as const, label: 'Oldest' },
]

export default function QuranTutoringCoursesSection() {
  const { filters, setFilters } = useCourseFilters()

  return (
    <section className="w-full bg-white px-4 lg:px-12 pt-8 lg:pt-10 pb-0 font-poppins">
      <div className="container mx-auto max-w-6xl text-center lg:px-14">

        {/* HEADING */}
        <Heading textSize="text-3xl sm:text-4xl md:text-4xl mb-0">
          Discover Our Quran Tutoring Courses
        </Heading>

        {/* DESCRIPTION */}
        <Text className="leading-relaxed md:text-center mt-4 mb-5">
          At CEF Online Academy, our Quran tutoring courses are thoughtfully
          designed to help students connect revealed knowledge with acquired
          knowledge. Through a structured and engaging approach, students not
          only learn Nazirah, Hifz, and Fahm-ul-Quran but also develop the
          character traits that empower them to live purposefully. Each course
          is guided by our dedicated teachers who mentor students to internalize
          values inspired by the Quran and Sunnah, fostering ethical,
          compassionate, and responsible individuals. <br /> <br /> Our courses cultivate
          not just knowledge, but a lifelong ability to harmonize spiritual
          understanding with everyday challenges.
        </Text>

        {/* SEARCH + FILTER - wired to shared filters */}
        <div className="flex flex-wrap justify-center items-center gap-4">

          {/* SEARCH INPUT */}
          <div className="relative w-40">
            <input
              type="search"
              placeholder="Search"
              value={filters.keyword}
              onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
              className="w-full h-7 rounded-lg border border-gray-300
                         px-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Search courses"
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

          {/* FILTER BY SORT */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Filter By
            </span>
            <select
              value={filters.sortBy_id}
              onChange={(e) => setFilters((f) => ({ ...f, sortBy_id: Number(e.target.value) as 1 | 2 | 3 }))}
              className="h-7 rounded-lg border border-gray-300 px-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Sort order"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </section>
  )
}
