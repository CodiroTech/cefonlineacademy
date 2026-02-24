'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import { Text } from '@/components/common/text'

export const OurPrograms = () => {

  /* function to decide card color by index */
  const getVariant = (index: number) => {
    // pattern: default, light, default, light, default, light...
    return index % 2 === 0 ? 'default' : 'light'
  }

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-7xl">

        {/* HEADING */}
        <div className="text-center mb-2">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            Our Accredited Programs
          </Heading>
        </div>

        {/* DESCRIPTION TEXT */}
        <Text
          className="max-w-6xl mx-auto text-center px-6 mb-11"
        >
          CEF Online Academy is proud to hold accreditations from distinguished and recognized institutions. These endorsements reflect the
          quality, credibility, and standards of our programs. Parents and students can have full confidence in the authenticity, rigor, and value of
          the education and guidance we provide.
        </Text>

        {/* programS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        max-w-270 gap-y-6 gap-x-8 items-center
                        mx-auto justify-items-center">
          {programs.map((program, index) => (
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


const programs = [
  {
    title: 'Ayesha Khan',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Ripah.png',
    link: '/programs/ayesha-khan',
  },
  {
    title: 'Muhammad Ali',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/UOP.png',
    link: '/programs/muhammad-ali',
  },
  {
    title: 'Fatima Noor',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/IOU.png',
    link: '/programs/fatima-noor',
  },
  {
    title: 'Ahmed Raza',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/LUMS.png',
    link: '/programs/ahmed-raza',
  },
  {
    title: 'Zainab Tariq',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/KU.png',
    link: '/programs/zainab-tariq',
  },
  {
    title: 'Usman Farooq',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Ripah.png',
    link: '/programs/usman-farooq',
  },
]
