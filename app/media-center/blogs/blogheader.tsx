'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export const Blogs = () => {
  return (
    <section className="w-full px-16 sm:pl-16 pt-16 pb-6 sm:pt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-2">

        {/* Left side - Heading */}
        <div className="flex flex-col lg:w-[23%]">
          {/* First line stays on one line */}
          <Heading textSize="text-2xl md:text-3xl lg:text-[28px] xl:text-[36px] font-semibold" leading="leading-snug">
            <span className="whitespace-nowrap">Blogs Worth A</span>
          </Heading>

          {/* Second line covers full width of top line */}
          <Heading textSize="text-6xl sm:text-7xl lg:text-[67px] xl:text-[85px] font-bold" leading="leading-none">
            READ!
          </Heading>
        </div>

        {/* Right side - Description */}
        <div className="lg:w-[75%] space-y-6 ">
          <Text className="text-justify lg:mt-2 xl:mt-10 leading-relaxed">
            Explore CEF Online Academy’s Blogs to connect revealed knowledge with acquired knowledge. Each article shares
            insights, practical tips, and reflections on leadership, character, and purposeful living. Our blogs inspire readers to
            think critically, act ethically, and grow as thoughtful, faith-grounded leaders in all areas of life.
          </Text>

        </div>

      </div>
    </section>
  )
}
