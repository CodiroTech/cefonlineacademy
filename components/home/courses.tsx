'use client'

import { Heading } from '@/components/common/heading'
import { Card } from '@/components/common/card'
import type { CourseSection } from '@/lib/api/homepage'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackCourses = [
  {
    title: 'Quran Tutoring Courses',
    description:
      'CEF Online Academy offers personalized one-on-one tutoring in Nazirah and Fahm-ul-Quran. Each session is guided by qualified tutors who ensure accurate recitation and clear understanding. Our students gradually build confidence, strengthen their connection with the Quran, and experience its message as a source of guidance in everyday life.',
    image: '/Insight & Inspiration.png',
    link: '/courses/qurantutorCourses',
  },
  {
    title: 'Other Courses',
    description:
      'CEF Online Academy offers free courses and paid programs for learners of all ages. The paid options include self-paced recorded lectures and live interactive sessions. Each course is part of Character Education Foundation\'s initiatives. The aim is to nurture minds, strengthen faith, and build character through learning rooted in the Quran, ethics, and community values.',
    image: '/Our Courses Boy.png',
    link: '/courses/otherCourses',
  },
]

interface OurCoursesSectionProps {
  sections?: CourseSection[]
}

export const OurCoursesSection = ({ sections: apiSections }: OurCoursesSectionProps) => {
  const courses = apiSections && apiSections.length > 0
    ? apiSections.map((s, i) => ({
        title: s['homepage-our-courses-section-title'] || fallbackCourses[i]?.title || '',
        description: s['homepage-our-courses-section-description']
          ? stripHtml(s['homepage-our-courses-section-description'])
          : fallbackCourses[i]?.description || '',
        image: mediaUrl(s['homepage-our-courses-section-image'], fallbackCourses[i]?.image || ''),
        link: fallbackCourses[i]?.link || '/courses/qurantutorCourses',
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

        <div className="flex flex-col lg:flex-row justify-center gap-11 lg:gap-15 max-w-[57.6rem] mx-auto">
          {courses.map((course, index) => (
            <Card
              key={index}
              image={course.image}
              title={course.title}
              description={course.description}
              link={course.link}
              growFullWidth
            />
          ))}
        </div>
      </div>
    </section>
  )
}
