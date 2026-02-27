'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { UpcomingSection } from '@/lib/api/pageHeaders'

const DEFAULT_LINE_1 = "Unlock What's"
const DEFAULT_LINE_2 = 'New!'
const DEFAULT_P1 =
  "CEF Online Academy's upcoming courses and sessions offer meaningful learning opportunities that help participants connect revealed knowledge with acquired knowledge. Each program is carefully designed to strengthen understanding, deepen faith, and build practical skills that support purposeful living in today's world."
const DEFAULT_P2 =
  "Through guided learning, reflection, and structured content, participants grow in clarity, confidence, and character. These new courses inspire learners to apply Quranic wisdom to everyday challenges, think ethically, and contribute positively to their families and communities—nurturing individuals grounded in faith and prepared for real-life impact."

type UpcomingCoursesProps = {
  section?: UpcomingSection | null
}

export const UpcomingCourses = ({ section }: UpcomingCoursesProps) => {
  const titleLine1 = section?.['title-line-1'] ?? section?.title ?? DEFAULT_LINE_1
  const titleLine2 = section?.['title-line-2'] ?? DEFAULT_LINE_2
  const paragraph1 = section?.['paragraph-1'] ?? section?.['description'] ?? DEFAULT_P1
  const paragraph2 = section?.['paragraph-2'] ?? DEFAULT_P2

  return (
    <section className="w-full px-16 sm:pl-16 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-2">

        <div className="flex flex-col lg:w-[21%]">
          <Heading textSize="text-xl sm:text-2xl lg:text-[23px] xl:text-[34px] font-bold" leading="leading-snug">
            <span className="whitespace-nowrap">{titleLine1}</span>
          </Heading>
          <Heading textSize="text-6xl sm:text-7xl lg:text-[70px] xl:text-[96px]">
            {titleLine2}
          </Heading>
        </div>

        <div className="lg:w-[75%] space-y-6 mt-4 lg:mt-2">
          <Text className="text-justify leading-relaxed">{paragraph1}</Text>
          <Text className="text-justify leading-relaxed">{paragraph2}</Text>
        </div>

      </div>
    </section>
  )
}
