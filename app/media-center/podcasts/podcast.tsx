'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { PodcastItem } from '@/lib/api/mediaCenter'
import { stripHtml } from '@/lib/headless'

const DEFAULT_HEADING = "Podcasts You'll Want To LISTEN!"
const DEFAULT_DESCRIPTION = "Tune in to CEF Online Academy's Podcasts to explore ideas that connect revealed knowledge with acquired knowledge. Each episode offers insights, practical guidance, and inspiring discussions on leadership, character, and purposeful living, helping listeners grow into thoughtful, ethical, and faith-grounded leaders."

interface Props {
  items?: PodcastItem[]
}

export const Podcasts = ({ items }: Props) => {
  const firstItem = items?.[0]
  const heading = firstItem?.title || DEFAULT_HEADING
  const description = stripHtml(firstItem?.description) || DEFAULT_DESCRIPTION

  const headingParts = heading.split(' ')
  const lastWord = headingParts.pop() || ''
  const firstPart = headingParts.join(' ')

  return (
    <>
      <section className="w-full px-16 sm:pl-16 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-2">

          <div className="flex flex-col lg:w-[28%]">
            <Heading
              textSize="text-lg sm:text-[21px] lg:text-[20px] xl:text-[27px] font-semibold"
              leading="leading-snug"
            >
              <span className="whitespace-nowrap">{firstPart}</span>
            </Heading>

            <Heading
              textSize="text-6xl sm:text-7xl lg:text-[70px] xl:text-[90px] font-bold"
              leading="leading-none"
            >
              {lastWord}
            </Heading>
          </div>

          <div className="lg:w-[70%] space-y-6 -mt-5">
            <Text className="text-justify lg:mt-4 xl:mt-10 leading-relaxed">
              {description}
            </Text>
          </div>

        </div>
      </section>

      <div className="w-full flex justify-center py-12">
        <Image
          src="/6 images.png"
          alt="Podcast gallery"
          width={900}
          height={400}
          className="object-contain"
        />
      </div>
    </>
  )
}
