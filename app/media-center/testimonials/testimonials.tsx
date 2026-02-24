'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { TestimonialsSectionHeader } from '@/lib/api/mediaCenter'

interface Props {
  data?: TestimonialsSectionHeader | null
}

export const Testimonials = ({ data }: Props) => {
  const titleParts = (data?.['section-title'] || 'What Do Our Students SAY!').split(' ')
  const lastWord = titleParts.pop() || ''
  const firstPart = titleParts.join(' ')

  const subtitle = data?.['section-sub-title'] || 'At CEF Online Academy, our students experience more than just learning the Quran. Through our courses, they connect revealed knowledge with acquired knowledge, building confidence, understanding, and strong character. Here\'s what they have to say about their journey with us.'

  return (
    <section className="w-full px-16 sm:pl-16 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-2">

        <div className="flex flex-col lg:w-[23%]">
          <Heading textSize="text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[24px] font-bold" leading="leading-snug">
            <span className="whitespace-nowrap">{firstPart}</span>
          </Heading>
          <Heading textSize="text-6xl sm:text-7xl lg:text-[90px] xl:text-[120px] font-semibold" leading="leading-none">
            {lastWord}
          </Heading>
        </div>

        <div className="lg:w-[75%] space-y-6 lg:mt-0">
          <Text className="text-justify lg:mt-2 xl:mt-11 leading-relaxed">
            {subtitle}
          </Text>
        </div>

      </div>
    </section>
  )
}
