'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export default function QuranTutoringCoursesSection() {
  return (
    <section className="w-full bg-white px-4 lg:px-12 pt-8 lg:pt-10 pb-0 font-poppins">
      <div className="container mx-auto max-w-[1200px] lg:px-14">

        {/* HEADING — same block rhythm as about/speakers */}
        <div className="text-center mb-2">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            Discover Our Quran Tutoring Courses
          </Heading>
        </div>

        {/* DESCRIPTION — same text style as MeetOurSpeakers */}
        <Text className="max-w-6xl mx-auto text-center mb-11 font-medium leading-[1.4]">
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

        {/* Filters (search + sort) hidden per design */}
      </div>
    </section>
  )
}
