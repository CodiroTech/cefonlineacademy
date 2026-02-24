'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import { Text } from '@/components/common/text'

export const MeetOurSpeakers = () => {

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
            Meet Our Speakers
          </Heading>
        </div>

        {/* DESCRIPTION TEXT */}
        <Text
          className="max-w-6xl mx-auto text-center px-6 mb-11"
        >
          At CEF Online Academy, we are honored to host a distinguished group of speakers who inspire, enlighten, and guide our students and
         community. They bridge the wisdom of revealed knowledge with insights from contemporary learning, helping audiences understand
         and apply principles that lead to purposeful living. Through their guidance, participants are encouraged to think critically, act ethically,
         and contribute meaningfully to society. For all who attend, it is both a privilege and a source of inspiration to learn from such
         accomplished individuals who embody our vision of nurturing a generation grounded in faith and equipped for the world.
        </Text>

        {/* speakerS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        max-w-270 gap-y-6 gap-x-8 items-center
                        mx-auto justify-items-center">
          {speakers.map((speaker, index) => (
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


const speakers = [
  {
    title: 'Ayesha Khan',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 4.png',
    link: '/speakers/ayesha-khan',
  },
  {
    title: 'Muhammad Ali',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 5.png',
    link: '/speakers/muhammad-ali',
  },
  {
    title: 'Fatima Noor',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Speaker 3.png',
    link: '/speakers/fatima-noor',
  },
  {
    title: 'Ahmed Raza',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Amjad.png',
    link: '/speakers/ahmed-raza',
  },
  {
    title: 'Zainab Tariq',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 2.png',
    link: '/speakers/zainab-tariq',
  },
  {
    title: 'Usman Farooq',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 3.png',
    link: '/speakers/usman-farooq',
  },
]
