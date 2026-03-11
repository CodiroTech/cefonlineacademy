'use client'

import { useState } from 'react'
import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import { Text } from '@/components/common/text'
import { SpeakerDetailModal, type SpeakerDetailItem } from '@/components/about/SpeakerDetailModal'
import type { SpeakersSectionHeader, SpeakerItem } from '@/lib/api/about'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackSpeakers: SpeakerDetailItem[] = [
  { title: 'Ayesha Khan', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 4.png' },
  { title: 'Muhammad Ali', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 5.png' },
  { title: 'Fatima Noor', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Speaker 3.png' },
  { title: 'Ahmed Raza', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Amjad.png' },
  { title: 'Zainab Tariq', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 2.png' },
  { title: 'Usman Farooq', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 3.png' },
]

interface Props {
  sectionHeader?: SpeakersSectionHeader | null
  speakers?: SpeakerItem[]
}

/** Max characters to show in card; full description is in the popup. */
const DESCRIPTION_PREVIEW_LENGTH = 500

export const MeetOurSpeakers = ({ sectionHeader, speakers }: Props) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerDetailItem | null>(null)

  const heading = sectionHeader?.title || 'Meet Our Speakers'
  const description = stripHtml(sectionHeader?.description) || 'At CEF Online Academy, we are honored to host a distinguished group of speakers who inspire, enlighten, and guide our students and community. They bridge the wisdom of revealed knowledge with insights from contemporary learning, helping audiences understand and apply principles that lead to purposeful living. Through their guidance, participants are encouraged to think critically, act ethically, and contribute meaningfully to society. For all who attend, it is both a privilege and a source of inspiration to learn from such accomplished individuals who embody our vision of nurturing a generation grounded in faith and equipped for the world.'

  const items: SpeakerDetailItem[] = speakers && speakers.length > 0
    ? speakers.map((s) => ({
        title: s.name || '',
        subTitle: s.designation || '',
        description: stripHtml(s.description),
        image: mediaUrl(s.image, '/Teacher 4.png'),
      }))
    : fallbackSpeakers

  const getVariant = (index: number) => (index % 2 === 0 ? 'default' : 'light')

  return (
    <section className="w-full bg-white px-10 lg:px-28 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-[1200px]">

        <div className="text-center mb-2">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            {heading}
          </Heading>
        </div>

        <Text className="max-w-6xl mx-auto text-center mb-11 font-medium leading-[1.4]">
          {description}
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        gap-y-6 gap-x-5 items-stretch
                        mx-auto w-full">
          {items.map((speaker, index) => {
            const previewDesc =
              speaker.description.length > DESCRIPTION_PREVIEW_LENGTH
                ? speaker.description.slice(0, DESCRIPTION_PREVIEW_LENGTH) + '...'
                : speaker.description
            return (
              <Card
                key={index}
                image={speaker.image}
                title={speaker.title}
                subTitle={speaker.subTitle}
                description={previewDesc}
                variant={getVariant(index)}
                onLearnMore={() => setSelectedSpeaker(speaker)}
                descriptionClassName="text-sm"
                growFullWidth
              />
            )
          })}
        </div>

        <SpeakerDetailModal
          open={!!selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
          speaker={selectedSpeaker}
        />
      </div>
    </section>
  )
}
