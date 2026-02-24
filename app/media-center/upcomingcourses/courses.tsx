'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import { Text } from '@/components/common/text'

export const OurCourses = () => {

  /* function to decide card color by index */
  const getVariant = (index: number) => {
    // pattern: default, light, default, light, default, light...
    return index % 2 === 0 ? 'default' : 'light'
  }

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-7xl">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        max-w-270 gap-y-6 gap-x-8 items-center
                        mx-auto justify-items-center">
          {courses.map((course, index) => (
            <Card
              key={index}
              image={course.image}
              title={course.title}
              subTitle={course.subTitle}
              description={course.description}
              link={course.link}
              variant={getVariant(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}


const courses = [
  {
    title: 'Living A Puposeful Life',
    subTitle: 'By Dr. Javed Iqbal',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each course is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Living a Purposeful.png',
    link: '/courses/ayesha-khan',
  },
  {
    title: 'Islamic Parenting',
    subTitle: 'By Dr. Javed Iqbal',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each course is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Islamic Parenting.png',
    link: '/courses/muhammad-ali',
  },
  {
    title: 'Nurtuting Soul & Mind',
    subTitle: 'By Dr. Javed Iqbal',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each course is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Nurtating.png',
    link: '/courses/fatima-noor',
  }, 
]
