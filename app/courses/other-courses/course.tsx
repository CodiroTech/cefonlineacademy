'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export default function OtherCoursesIntroSection() {
  return (
    <section className="w-full bg-white px-4 lg:px-12 pt-8 lg:pt-10 pb-0 font-poppins">
      <div className="container mx-auto max-w-[1200px] lg:px-14">

        <div className="text-center mb-2">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            Explore Our Holistic Development Courses
          </Heading>
        </div>

        <Text className="max-w-6xl mx-auto text-center mb-11 font-medium leading-[1.4]">
          At CEF Online Academy, our courses are designed to help students connect revealed knowledge with acquired knowledge. Programs on
          character building, parenting, Seerah, meaningful living, or successful marital life guide learners to internalize values that foster ethical,
          compassionate, and responsible individuals. Through interactive learning and mentorship from our dedicated instructors, participants
          learn to harmonize spiritual understanding with practical skills, think critically, act with integrity, and apply knowledge meaningfully in life.
          <br /><br />
          Our courses cultivate not just understanding, but a lifelong ability to bridge revealed knowledge and acquired knowledge, shaping a
          generation ready to lead with wisdom, purpose, and character.
        </Text>

        {/* Filters (search + sort) hidden per design */}
      </div>
    </section>
  )
}
