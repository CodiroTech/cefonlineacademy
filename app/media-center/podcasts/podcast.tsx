'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { PodcastItem } from '@/lib/api/mediaCenter'
import { stripHtml } from '@/lib/headless'

interface Props {
  items?: PodcastItem[]
}

export const Podcasts = ({ items }: Props) => {
  const list = Array.isArray(items) ? items : []
  if (!list.length) return null

  const firstItem = list[0]
  const heading = (firstItem && typeof firstItem === 'object' && 'title' in firstItem) ? String(firstItem.title ?? '') : ''
  const description = stripHtml((firstItem && typeof firstItem === 'object' && 'description' in firstItem) ? String(firstItem.description ?? '') : '')

  const headingParts = heading.split(' ').filter(Boolean)
  const lastWord = headingParts.pop() ?? ''
  const firstPart = headingParts.join(' ')

  return (
    <>
      <section className="w-full pt-8 sm:pt-10 pb-0" data-podcast-items={list.length}>
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
    </>
  )
}
