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
      <section className="w-full pt-8 sm:pt-10 pb-0">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 flex flex-col lg:flex-row gap-8 lg:gap-4">

          <div className="w-full flex flex-col flex-shrink-0 lg:w-[30%] text-center lg:text-left">
            <Heading
              textSize="text-xl sm:text-2xl lg:text-[23px] xl:text-[34px] font-bold"
              leading="leading-snug"
            >
              <span className="whitespace-nowrap">{firstPart}</span>
            </Heading>
            <Heading
              textSize="text-6xl sm:text-7xl lg:text-[70px] xl:text-[96px]"
              leading="leading-snug"
            >
              {lastWord}
            </Heading>
          </div>

          <div className="min-w-0 lg:flex-1 space-y-6 mt-4 lg:mt-2">
            <Text className="text-justify leading-snug font-medium">
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
