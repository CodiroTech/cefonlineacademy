'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import { Text } from '@/components/common/text'
import type { SpeakersSectionHeader, SpeakerItem } from '@/lib/api/about'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackSpeakers = [
  { title: 'Ayesha Khan', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 4.png', link: '/speakers/ayesha-khan' },
  { title: 'Muhammad Ali', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 5.png', link: '/speakers/muhammad-ali' },
  { title: 'Fatima Noor', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Speaker 3.png', link: '/speakers/fatima-noor' },
  { title: 'Ahmed Raza', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Amjad.png', link: '/speakers/ahmed-raza' },
  { title: 'Zainab Tariq', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 2.png', link: '/speakers/zainab-tariq' },
  { title: 'Usman Farooq', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Teacher 3.png', link: '/speakers/usman-farooq' },
]

interface Props {
  sectionHeader?: SpeakersSectionHeader | null
  speakers?: SpeakerItem[]
}

export const MeetOurSpeakers = ({ sectionHeader, speakers }: Props) => {
  const heading = sectionHeader?.title || 'Meet Our Speakers'
  const description = stripHtml(sectionHeader?.description) || 'At CEF Online Academy, we are honored to host a distinguished group of speakers who inspire, enlighten, and guide our students and community. They bridge the wisdom of revealed knowledge with insights from contemporary learning, helping audiences understand and apply principles that lead to purposeful living. Through their guidance, participants are encouraged to think critically, act ethically, and contribute meaningfully to society. For all who attend, it is both a privilege and a source of inspiration to learn from such accomplished individuals who embody our vision of nurturing a generation grounded in faith and equipped for the world.'

  const items = speakers && speakers.length > 0
    ? speakers.map((s) => ({
        title: s.name || '',
        subTitle: s.designation || '',
        description: stripHtml(s.description),
        image: mediaUrl(s.image, '/Teacher 4.png'),
        link: s.link || '',
      }))
    : fallbackSpeakers

  const getVariant = (index: number) => (index % 2 === 0 ? 'default' : 'light')

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-7xl">

        <div className="text-center mb-2">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            {heading}
          </Heading>
        </div>

        <Text className="max-w-6xl mx-auto text-center px-6 mb-11">
          {description}
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        max-w-270 gap-y-6 gap-x-8 items-center
                        mx-auto justify-items-center">
          {items.map((speaker, index) => (
            <Card
              key={index}
              image={speaker.image}
              title={speaker.title}
              subTitle={speaker.subTitle}
              description={speaker.description}
              link={speaker.link}
              variant={getVariant(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
