'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import type { OurCourseItem } from '@/lib/api/homepage'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackCourses = [
  {
    title: 'Quran Tutoring Courses',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Insight & Inspiration.png',
    link: '/courses/quran-tutoring-courses',
  },
  {
    title: 'Other Courses',
    description:
      'CEF Online Academy offers free courses and paid programs for learners of all ages. The paid options include self-paced recorded lectures and live interactive sessions. Each course is part of Character Education Foundation\'s initiatives. The aim is to nurture minds, strengthen faith, and build character through learning rooted in the Quran, ethics, and community values.',
    image: '/Our Courses Boy.png',
    link: '/courses/other-courses',
  },
]

interface OurCoursesSectionProps {
  sections?: OurCourseItem[]
}

export const OurCoursesSection = ({ sections: apiSections }: OurCoursesSectionProps) => {
  const courses = apiSections && apiSections.length > 0
    ? apiSections.map((s, i) => ({
        title: s.heading ?? fallbackCourses[i]?.title ?? '',
        description: s.description
          ? stripHtml(s.description)
          : fallbackCourses[i]?.description ?? '',
        image: mediaUrl(s.image, fallbackCourses[i]?.image ?? ''),
        link: fallbackCourses[i]?.link ?? '/courses/quran-tutoring-courses',
      }))
    : fallbackCourses

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-7xl">

        <div className="text-center mb-12">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            Our Courses
          </Heading>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-4xl lg:max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <Card
              key={index}
              image={course.image}
              title={course.title}
              description={course.description}
              link={course.link}
              imageSquare
              variant="default"
              className="max-w-[26rem]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
