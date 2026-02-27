'use client'

import { Card } from '@/components/common/card'
import type { BackendCourseItem } from '@/lib/api/academy'

const FALLBACK_COURSES = [
  { title: 'Living A Puposeful Life', subTitle: 'By Dr. Javed Iqbal', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran.', image: '/Living a Purposeful.png', link: '/course-details/ayesha-khan' },
  { title: 'Islamic Parenting', subTitle: 'By Dr. Javed Iqbal', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran.', image: '/Islamic Parenting.png', link: '/course-details/muhammad-ali' },
  { title: 'Nurtuting Soul & Mind', subTitle: 'By Dr. Javed Iqbal', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran.', image: '/Nurtating.png', link: '/course-details/fatima-noor' },
]

export type UpcomingCourseCard = {
  image: string
  title: string
  subTitle: string
  description: string
  link: string
}

function mapBackendToCard(c: BackendCourseItem): UpcomingCourseCard {
  return {
    title: c.title ?? '',
    subTitle: '',
    description: c.short_description ?? c.description ?? '',
    image: c.image_url ?? '/placeholder-course.png',
    link: c.slug ? `/course-details/${c.slug}` : '#',
  }
}

type OurCoursesProps = {
  courses?: BackendCourseItem[] | null
}

export const OurCourses = ({ courses: apiCourses }: OurCoursesProps) => {
  const courses: UpcomingCourseCard[] = Array.isArray(apiCourses) && apiCourses.length > 0
    ? apiCourses.map(mapBackendToCard)
    : FALLBACK_COURSES

  const getVariant = (index: number) => (index % 2 === 0 ? 'default' : 'light')

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-270 gap-y-6 gap-x-8 items-center mx-auto justify-items-center">
          {courses.map((course, index) => (
            <Card
              key={course.link + index}
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
