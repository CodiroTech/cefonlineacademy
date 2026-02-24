'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export const Testimonials = () => {
  return (
    <section className="w-full px-16 sm:pl-16 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-2">

        {/* Left side - Heading */}
        <div className="flex flex-col lg:w-[23%]">
          {/* First line stays on one line */}
          <Heading textSize="text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[24px] font-bold" leading="leading-snug">
            <span className="whitespace-nowrap">What Do Our Students</span>
          </Heading>

          {/* Second line covers full width of top line */}
          <Heading textSize="text-6xl sm:text-7xl lg:text-[90px] xl:text-[120px] font-semibold" leading="leading-none">
            SAY!
          </Heading>
        </div>

        {/* Right side - Description */}
        <div className="lg:w-[75%] space-y-6 lg:mt-0">
          <Text className="text-justify lg:mt-2 xl:mt-11 leading-relaxed">
            At CEF Online Academy, our students experience more than just learning the Quran. Through our courses, they connect
            revealed knowledge with acquired knowledge, building confidence, understanding, and strong character. Here’s what
            they have to say about their journey with us.
          </Text>

        </div>

      </div>
    </section>
  )
}
