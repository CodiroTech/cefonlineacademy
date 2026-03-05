'use client'

import Link from 'next/link'
import { Card1 } from '@/components/common/card1'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export default function CharacterProgram() {
  return (
    <section className="w-full pb-12 flex justify-center font-poppins">
      <div className="w-full text-center max-w-7xl px-4 sm:px-6 md:px-8">

        {/* ================= CHARACTER BUILDING PROGRAM ================= */}

        <div className="flex justify-center">
          <Heading textSize="text-3xl sm:text-4xl md:text-[32px]">
            Character Building Program
          </Heading>
        </div>

        <Text className="xl:px-18 xl:pl-54 px-4 text-[16px] leading-relaxed md:text-center mb-1">
          Our Character Building Program (CBP) is a holistic, values-based educational initiative.
          It is designed to build impeccable character, nurture purposeful living and develop our
          young generation into aspirational future leaders.
        </Text>

        <div className="flex justify-center mb-3">
          <Link
            href="#"
            className="inline-block text-[#8BC34A] font-semibold text-sm hover:text-[#7CB342] transition-colors underline"
          >
            Learn More
          </Link>
        </div>

        {/* ================= FILTERS → Mobile & Tablet (full row) / Desktop (aside) ================= */}
        <div className="w-full mb-6 xl:hidden">
          <FilterBlock title="Categories" showClear>
            <FilterItem label="Character Building Program" name="category" />
            <FilterItem label="Community Development Program" name="category" />
            <FilterItem label="Youth Leadership Program" name="category" />
            <FilterItem label="Mentor Development Program" name="category" />
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

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex flex-col xl:flex-row gap-12 relative justify-center">

          {/* Decorative circles */}
          <div className="absolute inset-0 pointer-events-none hidden xl:block">
            <div className="absolute right-0 top-20 w-11 h-11 rounded-full bg-[#21515a] opacity-30" />
            <div className="absolute right-0 top-48 w-11 h-11 rounded-full bg-[#8BC34A] opacity-25" />
          </div>

          {/* FILTERS → Desktop only */}
          <aside
            className="
              hidden xl:block
              w-58
              text-[19px] font-semibold leading-none
              relative lg:-mt-25
            "
          >
            <FilterBlock title="Categories" showClear>
              <FilterItem label="Character Building Program" name="category" />
              <FilterItem label="Community Development Program" name="category" />
              <FilterItem label="Youth Leadership Program" name="category" />
              <FilterItem label="Mentor Development Program" name="category" />
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
          </aside>

          {/* CARDS */}
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center xl:-ml-8 px-4 sm:px-6 md:px-8">
            <Card1 images={[{src:'/Seerat Kahani.png', width: 240, height: 220}]} padding="px-10 py-8" />
            <Card1
              images={[{ src: '/Hasana Tarbiyah.png', width: 420, height: 220 }]}
              variant="light"
              padding="px-18 py-10"
            />
          </div>
        </div>

        {/* ================= COMMUNITY DEVELOPMENT PROGRAM ================= */}
        <div className="mt-10 xl:pl-14 relative">
          <Heading textSize="text-3xl sm:text-4xl md:text-[32px]">
            Community Development Program
          </Heading>

          <Text className="mt-1 mb-1 px-4 sm:px-6 md:px-8 xl:px-28 text-[16px] leading-relaxed md:text-center">
            Our Community Development Program (CDP) primarily focuses on Citizenship,
            Leadership, and Entrepreneurship (CLE) Education, offering a holistic approach to empower individuals to drive positive social change. .
          </Text>

          <div className="flex justify-center mb-2">
            <Link
              href="All pages"
              className="inline-block text-[#8DC63F] font-semibold text-sm hover:text-[#7CB342] underline"
            >
              Learn More
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-center xl:ml-12 gap-6 px-4 sm:px-6 md:px-8">
            <Card1 images={['/Seerat Kahani.png']} padding="px-8 py-10" />
            <Card1
              images={[{ src: '/Hasana Tarbiyah.png', width: 420, height: 220 }]}
              variant="light"
              padding="px-18 py-10"
            />
          </div>
        </div>

        {/* ================= YOUTH LEADERSHIP PROGRAM ================= */}
        <div className="mt-12 relative">
          <Heading textSize="text-3xl sm:text-4xl md:text-[32px]">
            Youth Leadership Program
          </Heading>

          <Text className="mt-2 mb-2 px-4 sm:px-6 md:px-8 xl:px-30 xl:ml-20 text-[16px] leading-relaxed md:text-center">
            Our Youth Leadership Program (YLP) is designed to engage school, college, and university students and develop their leadership skills for future roles in society. 
          </Text>

          <div className="flex justify-center mb-4">
            <Link href="#" className="text-[#8DC63F] font-semibold underline">
              Learn More
            </Link>
          </div>

          <div className="flex justify-center px-4 sm:px-6 md:px-8">
            <Card1 images={['/Youth Leader Ship Program.png']} padding="px-10 py-10" />
          </div>
        </div>

        {/* ================= MENTOR DEVELOPMENT PROGRAM ================= */}
        <div className="mt-12 relative">
          <Heading textSize="text-3xl sm:text-4xl md:text-[32px]">
            Mentor Development Program
          </Heading>

          <Text className="mt-2 mb-2 px-4 sm:px-6 md:px-8 xl:px-30 xl:ml-20 text-[16px] leading-relaxed md:text-center">
            Our Mentor Development Program (MDP) is a powerful initiative designed to transform traditional educators into inspiring mentors. 
          </Text>

          <div className="flex justify-center mb-4">
            <Link href="#" className="text-[#8DC63F] font-semibold underline">
              Learn More
            </Link>
          </div>

          <div className="flex justify-center px-4 sm:px-6 md:px-8">
            <Card1 images={['/Mentor Development.png']} variant="light" padding="px-10 py-10" />
          </div>
        </div>

      </div>
    </section>
  )
}

/* ================= FILTER HELPERS ================= */

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
    <div className="mb-2">
      <div className="flex items-center justify-between mb-0.5">
        <Text className="font-bold text-black text-[11px]">{title}</Text>
        {showClear && <button className="text-[9px] font-bold">Clear</button>}
      </div>
      <div className="space-y-1">{children}</div>
      <hr className="border-black border-t-2 mt-2" />
    </div>
  )
}

function FilterItem({ label, name }: { label: string; name: string }) {
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
