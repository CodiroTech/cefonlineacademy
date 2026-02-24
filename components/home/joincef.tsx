'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { JoinCEFSection as JoinCEFData } from '@/lib/api/homepage'
import { stripHtml } from '@/lib/headless'

interface JoinCEFSectionProps {
  data?: JoinCEFData | null
}

export const JoinCEFSection = ({ data }: JoinCEFSectionProps) => {
  const rawTitle = data?.title ?? 'Join CEF Online Academy Be Part of a Global Mission'
  const titleParts = rawTitle.includes('Be Part')
    ? rawTitle.split(/(?=Be Part)/)
    : [rawTitle]

  const description = data?.description
    ? stripHtml(data.description)
    : 'Enroll in our courses. Join our sessions. Or support us with your donation. Together, let\'s spread Quran and Sunnah-based Character Education, inspire meaningful living, and nurture leadership for the Ummah.'

  return (
    <section className="w-full px-4 py-16 lg:py-20 relative overflow-hidden bg-white">

      <div className="absolute inset-0 flex items-center justify-center opacity-120">
        <div className="relative w-full max-w-3xl h-full">
          <Image
            src="/Map.png"
            alt="World Map"
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <Heading textSize="text-3xl sm:text-4xl lg:text-[44px]">
          {titleParts[0].trim()}
        </Heading>

        {titleParts.length > 1 && (
          <div className="mt-0 mb-3">
            <Heading textSize="text-2xl sm:text-3xl lg:text-[32px]">
              {titleParts[1].trim()}
            </Heading>
          </div>
        )}

        <Text className="max-w-2xl mx-auto mb-8 px-8">
          {description}
        </Text>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/enroll"
            className="inline-block px-10 py-3.5 text-base font-semibold bg-[#8DC63F] text-white rounded-full border-2 border-[#8BC34A] transition-all duration-300 hover:bg-white hover:text-[#8DC63F] shadow-md hover:shadow-lg min-w-45"
          >
            Enroll Now
          </Link>

          <Link
            href="/donate"
            className="inline-block px-10 py-3.5 text-base font-semibold bg-[#EF4444] text-white rounded-full border-2 border-[#EF4444] transition-all duration-300 hover:bg-white hover:text-[#EF4444] shadow-md hover:shadow-lg min-w-45"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  )
}
