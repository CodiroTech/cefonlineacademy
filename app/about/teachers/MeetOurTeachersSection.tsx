'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import { Text } from '@/components/common/text'

export const MeetOurTeachersSection = () => {

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
            Meet Our Teachers
          </Heading>
        </div>

        {/* DESCRIPTION TEXT */}
        <Text
          className="max-w-6xl mx-auto text-center px-6 mb-11"
        >
          At CEF Online Academy, we are privileged to have a remarkable team of teachers who not only guide children in learning the Quran but 
          also nurture their character. Our teachers inspire students to harmonize revealed knowledge with acquired knowledge, enabling them
          to think critically, act ethically, and live purposefully. Through their mentorship, children are empowered to become compassionate,
          responsible leaders of tomorrow. For parents, it is both an honor and a reassurance to entrust their children to such dedicated
          educators who embody our vision of a generation grounded in faith and equipped for the world.
        </Text>

        {/* TEACHERS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        max-w-270 gap-y-6 gap-x-8 items-center
                        mx-auto justify-items-center">
          {teachers.map((teacher, index) => (
            <Card
              key={index}
              image={teacher.image}
              title={teacher.title}
              subTitle={teacher.subTitle}
              description={teacher.description}
              link={teacher.link}
              variant={getVariant(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}


const teachers = [
  {
    title: 'Ayesha Khan',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Amjad.png',
    link: '/teachers/ayesha-khan',
  },
  {
    title: 'Muhammad Ali',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 2.png',
    link: '/teachers/muhammad-ali',
  },
  {
    title: 'Fatima Noor',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 3.png',
    link: '/teachers/fatima-noor',
  },
  {
    title: 'Ahmed Raza',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Amjad.png',
    link: '/teachers/ahmed-raza',
  },
  {
    title: 'Zainab Tariq',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 2.png',
    link: '/teachers/zainab-tariq',
  },
  {
    title: 'Usman Farooq',
    subTitle: 'Instructor',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Teacher 3.png',
    link: '/teachers/usman-farooq',
  },
]
