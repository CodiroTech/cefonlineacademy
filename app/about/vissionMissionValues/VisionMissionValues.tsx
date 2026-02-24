'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { VisionSection, MissionSection, ValuesSection } from '@/lib/api/about'
import { mediaUrl, stripHtml } from '@/lib/headless'

interface Props {
  vision?: VisionSection | null
  mission?: MissionSection | null
  values?: ValuesSection | null
}

export const VisionMissionValues = ({ vision, mission, values }: Props) => {
  const visionTitle = vision?.title || 'Our Vision'
  const visionDesc = stripHtml(vision?.description) || 'Nurture a generation that connects revealed and acquired knowledge.'
  const visionImg = mediaUrl(vision?.image, '/Our Vision.png')

  const missionTitle = mission?.title || 'Our Mission'
  const missionDesc = stripHtml(mission?.description) || 'We will achieve our vision by investing in holistic character development in light of Quran and Sunnah.'
  const missionImg = mediaUrl(mission?.image, '/Our Mission.png')

  const valuesTitle = values?.title || 'Our Values'
  const valuesDesc = stripHtml(values?.description) || 'Collaboration, Excellence, Innovation, Transparency and a Sense of Responsibility'
  const valuesImg = mediaUrl(values?.image, '/Our Values.png')

  return (
    <section className="w-full px-3 lg:px-10 py-12">
      <div className="relative mx-auto max-w-7xl bg-[#EAF4F6] rounded-[36px] px-5 lg:px-16 py-12 overflow-hidden">

        <div className="relative z-10 flex flex-col gap-10">

          {/* ===== OUR VISION ===== */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-x-18 text-center">
            <div className="lg:w-[44%] lg:mt-16 order-2 lg:order-1">
              <Heading textSize="text-[1.6rem] lg:text-[2.8rem] text-center">
                {visionTitle}
              </Heading>
              <Text className="mt-1 text-[20px] leading-snug max-w-2xl text-start">
                {visionDesc}
              </Text>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:-mt-6">
              <span className="hidden lg:block absolute top-4 -left-18 w-11 h-11 rounded-full bg-[#B7DDB0]" />
              <span className="hidden lg:block absolute top-8 -right-9 w-11 h-11 rounded-full bg-[#9BB7C1]" />
              <span className="hidden lg:block absolute top-38 -left-16 w-11 h-11 rounded-full bg-[#DDECCB]" />
              <span className="hidden lg:block absolute bottom-2 -left-7 w-7 h-7 rounded-full bg-[#B7DDB0]" />
              <span className="hidden lg:block absolute top-54 -right-6 w-7 h-7 rounded-full bg-[#9BB7C1]" />
              <span className="hidden lg:block absolute -bottom-4 right-14 w-3 h-3 rounded-full bg-[#DDECCB]" />

              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-76 lg:h-76 rounded-full overflow-hidden">
                <Image src={visionImg} alt={visionTitle} fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* ===== OUR MISSION ===== */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-x-18 text-center lg:text-start">
            <div className="relative flex justify-center lg:-mt-16">
              <span className="hidden lg:block absolute -top-8 left-12 w-7 h-7 rounded-full bg-[#B7DDB0]" />
              <span className="hidden lg:block absolute -top-10 right-10 w-7 h-7 rounded-full bg-[#9BB7C1]" />
              <span className="hidden lg:block absolute top-14 -left-6 w-7 h-7 rounded-full bg-[#DDECCB]" />
              <span className="hidden lg:block absolute -bottom-10 left-12 w-7 h-7 rounded-full bg-[#B7DDB0]" />
              <span className="hidden lg:block absolute top-28 -right-6 w-3 h-3 rounded-full bg-[#9BB7C1]" />
              <span className="hidden lg:block absolute -bottom-4 right-16 w-3 h-3 rounded-full bg-[#DDECCB]" />

              <div className="relative lg:-mt-6 w-56 h-56 sm:w-64 sm:h-64 lg:w-76 lg:h-76 rounded-full overflow-hidden">
                <Image src={missionImg} alt={missionTitle} fill className="object-cover" />
              </div>
            </div>

            <div className="lg:w-[44%] lg:-mt-10">
              <Heading textSize="text-[1.6rem] lg:text-[2.8rem] text-start">
                {missionTitle}
              </Heading>
              <Text className="mt-6 text-[20px] leading-snug max-w-md mx-auto lg:mx-0 text-start">
                {missionDesc}
              </Text>
            </div>
          </div>

          {/* ===== OUR VALUES ===== */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-x-18 text-center lg:-translate-x-6">
            <div className="lg:w-[44%] order-2 lg:order-1 text-right">
              <Heading textSize="text-[1.6rem] lg:text-[2.8rem] text-end">
                {valuesTitle}
              </Heading>
              <Text className="mt-1 text-[20px] leading-snug max-w-md ml-auto text-end">
                {valuesDesc}
              </Text>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:-mt-24">
              <span className="hidden lg:block absolute -top-8 left-10 w-7 h-7 rounded-full bg-[#B7DDB0]" />
              <span className="hidden lg:block absolute -top-10 right-6 w-7 h-7 rounded-full bg-[#9BB7C1]" />
              <span className="hidden lg:block absolute top-14 -left-6 w-7 h-7 rounded-full bg-[#DDECCB]" />
              <span className="hidden lg:block absolute -bottom-10 left-12 w-7 h-7 rounded-full bg-[#B7DDB0]" />
              <span className="hidden lg:block absolute top-28 -right-6 w-3 h-3 rounded-full bg-[#9BB7C1]" />
              <span className="hidden lg:block absolute -bottom-4 right-14 w-3 h-3 rounded-full bg-[#DDECCB]" />

              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-78 lg:h-78 rounded-full overflow-hidden">
                <Image src={valuesImg} alt={valuesTitle} fill className="object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
