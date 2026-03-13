'use client'

import { Card } from '@/components/common/card'
import type { BackendCourseItem } from '@/lib/api/academy'
import { stripHtml } from '@/lib/headless'

const FALLBACK_COURSES = [
  { title: 'Living A Puposeful Life', subTitle: 'By Dr. Javed Iqbal', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran.', image: '/Living a Purposeful.png', link: '/course-details/ayesha-khan' },
  { title: 'Islamic Parenting', subTitle: 'By Dr. Javed Iqbal', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran.', image: '/Islamic Parenting.png', link: '/course-details/muhammad-ali' },
  { title: 'Nurtuting Soul & Mind', subTitle: 'By Dr. Javed Iqbal', description: 'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran.', image: '/Nurtating.png', link: '/course-details/fatima-noor' },
]

const DESCRIPTION_MAX_LENGTH = 350

function truncateDescription(text: string, maxLength: number): string {
  const plain = stripHtml(text).trim()
  if (plain.length <= maxLength) return plain
  return plain.slice(0, maxLength).trim().replace(/\s+\S*$/, '') + '…'
}

export type UpcomingCourseCard = {
  image: string
  title: string
  subTitle: string
  description: string
  link: string
}

function mapBackendToCard(c: BackendCourseItem): UpcomingCourseCard {
  const raw = c.short_description ?? c.description ?? ''
  const instructorName = (c.instructor_name ?? '').trim()
  return {
    title: c.title ?? '',
    subTitle: instructorName ? `By ${instructorName}` : '',
    description: truncateDescription(raw, DESCRIPTION_MAX_LENGTH),
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch w-full max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <Card
              key={course.link + index}
              image={course.image}
              title={course.title}
              subTitle={course.subTitle}
              description={course.description}
              link={course.link}
              variant={getVariant(index)}
              paddingX="px-6"
              paddingY="py-5"
              descriptionLineClamp={9}
              className="h-full w-full max-w-sm"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
