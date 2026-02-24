'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export const OurStorySection = () => {
  return (
    <section className="w-full bg-white px-4 lg:px-12 py-12 lg:py-20 font-poppins">
      <div className="container mx-auto max-w-6xl">

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">

          {/* LEFT — IMAGE */}
          <div className="shrink-0">
            <div className="overflow-hidden">
              <Image
                src="/session.png"
                alt="CEF Online Academy weekly sessions"
                width={250}
                height={200}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="flex flex-col w-full">

            {/* HEADING */}
            <Heading textSize="text-3xl sm:text-4xl md:text-4xl mb-3">
              Explore our Weekly Sessions
            </Heading>

            {/* DESCRIPTION */}
            <Text className="leading-relaxed text-justify mb-6">
              CEF Online Academy’s weekly learning sessions help participants connect
              revealed knowledge with acquired knowledge in a practical and meaningful
              way. Each session offers simple, insightful guidance that strengthens
              faith, nurtures understanding, and builds confidence in applying Quranic
              principles to daily life.
              <br /><br />
              Through consistent learning and reflection, participants develop clarity,
              purpose, and strong character. These sessions inspire individuals to think
              wisely, act ethically, and contribute positively to their families and
              communities, aligning personal growth with the values of a purposeful,
              faith-grounded life.
            </Text>

            {/* SEARCH + FILTER */}
            <div className="flex flex-wrap items-center gap-4">

              {/* SEARCH INPUT (SVG ICON – FINAL FIX) */}
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder="Search Session"
                  className="w-full h-9 rounded-lg border border-gray-300
                             px-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                {/* ICON WRAPPER */}
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
                  className="h-9 rounded-lg border border-gray-300 px-3 text-sm
                             focus:outline-none focus:ring-2 focus:ring-green-400"
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
