'use client'

import { Card1 } from '@/components/common/card1'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export default function TajweedCoursesSection() {
  return (
    <section className="w-full lg:pb-12 flex justify-center font-poppins">
      <div className="w-full max-w-7xl px-0">

        {/* HEADING */}
        <div className="flex justify-center lg:ml-47 mb-8 text-center">
          <Heading textSize="text-3xl sm:text-4xl md:text-4xl">
            Tajweed ul Quran Courses
          </Heading>
        </div>

        {/* MAIN LAYOUT */}
        <div
          className="
            grid gap-6
            grid-cols-1
            md:grid-cols-2
            xl:flex xl:flex-row
          "
        >

          {/* ASIDE FILTERS */}
          <aside
            className="
              md:col-span-1
              xl:w-auto
              font-medium leading-none
              relative

              /* Mobile: centered block */
              mx-auto w-full max-w-xs

              /* Tablet */
              md:mx-0 md:ml-10

              /* Desktop */
              xl:ml-4 xl:mr-5 xl:-mt-8
            "
          >
            <div className="flex flex-col items-start md:items-start">
              <FilterBlock title="Categories" showClear>
                <FilterItem label="Nazirah/Tajweed-ul-Quran" name="category" />
                <FilterItem label="Fahm-ul-Quran" name="category" />
                <FilterItem label="Customized & Essential Hifdh" name="category" />
              </FilterBlock>

              <FilterBlock title="Course Level">
                <FilterItem label="Higher" name="level" />
                <FilterItem label="Medium" name="level" />
              </FilterBlock>

              <FilterBlock title="Rating">
                <FilterItem label="5 star" name="rating" />
                <FilterItem label="4 star or above" name="rating" />
                <FilterItem label="3 star or above" name="rating" />
                <FilterItem label="2 star or above" name="rating" />
                <FilterItem label="1 star or above" name="rating" />
              </FilterBlock>

              <FilterBlock title="Price">
                <FilterItem label="Free" name="price" />
                <FilterItem label="Paid" name="price" />
              </FilterBlock>

              <FilterBlock title="Duration">
                <FilterItem label="Less than 24 Hours" name="duration" />
                <FilterItem label="24 to 36 hours" name="duration" />
                <FilterItem label="36 to 72 hours" name="duration" />
                <FilterItem label="Above 72 hours" name="duration" />
              </FilterBlock>
            </div>
          </aside>

          {/* CARD 1 */}
          <div className="mx-auto md:mx-0 md:col-span-1 min-w-0 overflow-hidden">
            <Card1 images={['/Tajveed Ul Quran 1.png']} />
          </div>

          {/* CARD 2 */}
          <div className="md:col-span-2 xl:col-span-auto min-w-0 overflow-hidden">

            {/* Desktop */}
            <div className="hidden xl:flex gap-2">
              <Card1
                images={[
                  { src: '/Tajveed Ul Quran 2.png', width: 440, height: 220 },
                  '/Recite Quran.png',
                ]}
                variant="light"
                padding="px-5 py-6"
                className="mx-auto"
              />
            </div>

            {/* Tablets */}
            <div className="hidden sm:flex md:flex xl:hidden gap-4 px-4 sm:px-6 md:px-8 mx-auto">
              <Card1
                images={[
                  { src: '/Tajveed Ul Quran 2.png', width: 440, height: 220 },
                  '/Recite Quran.png',
                ]}
                variant="light"
                padding="px-4 py-6"
                className="mx-auto"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col sm:hidden gap-4 px-4 mx-auto">
              <Card1
                images={[{ src: '/Tajveed Ul Quran 2.png', width: 440, height: 220 }]}
                variant="light"
                padding="px-4 py-6"
                className="mx-auto"
              />
              <Card1
                images={['/Recite Quran.png']}
                variant="light"
                padding="px-4 py-6"
                className="mx-auto"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

/* ---------------- FILTER COMPONENTS ---------------- */

function FilterBlock({
  title,
  children,
  showClear = false,
}: {
  title: string
  children: React.ReactNode
  showClear?: boolean
}) {
  return (
    <div className="mb-3 w-full">
      <div className="flex items-center justify-between mb-1">
        <Text className="font-bold text-black text-[11px]">{title}</Text>
        {showClear && (
          <button className="text-[9px] font-bold text-black">Clear</button>
        )}
      </div>
      <div className="space-y-1">{children}</div>
      <hr className="border-black border-t-2 mt-2" />
    </div>
  )
}

function FilterItem({
  label,
  name,
}: {
  label: string
  name: string
}) {
  return (
    <label className="flex items-center gap-1 text-gray-700 text-[9px] cursor-pointer">
      <input
        type="radio"
        name={name}
        className="
          relative
          appearance-none
          w-3 h-3
          rounded-full
          bg-gray-400

          checked:after:content-['']
          checked:after:absolute
          checked:after:top-1/2
          checked:after:left-1/2
          checked:after:-translate-x-1/2
          checked:after:-translate-y-1/2
          checked:after:w-1.5
          checked:after:h-1.5
          checked:after:rounded-full
          checked:after:bg-black
        "
      />
      {label}
    </label>
  )
}
