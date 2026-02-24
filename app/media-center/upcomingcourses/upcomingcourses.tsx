'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export const UpcomingCourses = () => {
  return (
    <section className="w-full px-16 sm:pl-16 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-2">

        {/* Left side - Heading */}
        <div className="flex flex-col lg:w-[21%]">
          {/* First line stays on one line */}
          <Heading textSize="text-xl sm:text-2xl lg:text-[23px] xl:text-[34px] font-bold" leading="leading-snug">
            <span className="whitespace-nowrap">Unlock What&apos;s</span>
          </Heading>

          {/* Second line covers full width of top line */}
          <Heading textSize="text-6xl sm:text-7xl lg:text-[70px] xl:text-[96px]">
            New!
          </Heading>
        </div>

        {/* Right side - Description */}
        <div className="lg:w-[75%] space-y-6 mt-4 lg:mt-2">
          <Text className="text-justify leading-relaxed">
            CEF Online Academy&apos;s upcoming courses and sessions offer meaningful learning opportunities that help participants
            connect revealed knowledge with acquired knowledge. Each program is carefully designed to strengthen understanding,
            deepen faith, and build practical skills that support purposeful living in today&apos;s world.
          </Text>

          <Text className="text-justify leading-relaxed">
            Through guided learning, reflection, and structured content, participants grow in clarity, confidence, and character. These
            new courses inspire learners to apply Quranic wisdom to everyday challenges, think ethically, and contribute positively to
            their families and communities—nurturing individuals grounded in faith and prepared for real-life impact.
          </Text>
        </div>

      </div>
    </section>
  )
}
