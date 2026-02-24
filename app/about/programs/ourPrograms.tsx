'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import { Text } from '@/components/common/text'
import type { AccreditationsSectionHeader, AccreditationItem } from '@/lib/api/about'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackPrograms = [
  { title: 'Ayesha Khan', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Ripah.png', link: '/programs/ayesha-khan' },
  { title: 'Muhammad Ali', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/UOP.png', link: '/programs/muhammad-ali' },
  { title: 'Fatima Noor', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/IOU.png', link: '/programs/fatima-noor' },
  { title: 'Ahmed Raza', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/LUMS.png', link: '/programs/ahmed-raza' },
  { title: 'Zainab Tariq', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/KU.png', link: '/programs/zainab-tariq' },
  { title: 'Usman Farooq', subTitle: 'Instructor', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding.', image: '/Ripah.png', link: '/programs/usman-farooq' },
]

interface Props {
  sectionHeader?: AccreditationsSectionHeader | null
  accreditations?: AccreditationItem[]
}

export const OurPrograms = ({ sectionHeader, accreditations }: Props) => {
  const heading = sectionHeader?.title || 'Our Accredited Programs'
  const description = stripHtml(sectionHeader?.description) || 'CEF Online Academy is proud to hold accreditations from distinguished and recognized institutions. These endorsements reflect the quality, credibility, and standards of our programs. Parents and students can have full confidence in the authenticity, rigor, and value of the education and guidance we provide.'

  const items = accreditations && accreditations.length > 0
    ? accreditations.map((a) => ({
        title: a.name || '',
        subTitle: a.title || '',
        description: stripHtml(a.description),
        image: mediaUrl(a.image, '/Ripah.png'),
        link: a.link || '',
      }))
    : fallbackPrograms

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
          {items.map((program, index) => (
            <Card
              key={index}
              image={program.image}
              title={program.title}
              subTitle={program.subTitle}
              description={program.description}
              link={program.link}
              variant={getVariant(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
