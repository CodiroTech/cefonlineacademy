import React from 'react'
import { getUpcomingSection } from '@/lib/api/pageHeaders'
import { getUpcomingCourses } from '@/lib/api/academy'
import { UpcomingCourses } from './upcomingcourses'
import { OurCourses } from './courses'

const Page = async () => {
  const [section, courses] = await Promise.all([
    getUpcomingSection(),
    getUpcomingCourses(6, 'Upcoming Courses'),
  ])

  return (
    <div>
      <UpcomingCourses section={section} />
      <OurCourses courses={courses} />
    </div>
  )
}

export default Page
