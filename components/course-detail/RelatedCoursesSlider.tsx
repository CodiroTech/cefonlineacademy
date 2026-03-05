'use client'

import Link from 'next/link'
import type { CourseWithDetails } from '@/lib/api/demo'
import { mediaUrl } from '@/lib/headless'
import { cn } from '@/lib/utils'

type Props = { courses: CourseWithDetails[] }

export function RelatedCoursesSlider({ courses }: Props) {
  if (courses.length === 0) return null

  return (
    <div className="overflow-x-auto overflow-y-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0">
      <div className="flex gap-4 pb-2 min-w-0" style={{ scrollSnapType: 'x mandatory' }}>
        {courses.map((course) => {
          const href = course.slug ? `/course-details/${course.slug}` : '#'
          const imageSrc = mediaUrl(course.image_url) || '/placeholder-course.png'
          return (
            <Link
              key={course.id}
              href={href}
              className={cn(
                'shrink-0 w-[252px] sm:w-[272px] rounded-2xl border border-gray-200 bg-white overflow-hidden',
                'shadow-sm hover:shadow-md transition-shadow',
                'flex flex-col'
              )}
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-[#065D80] line-clamp-2 text-sm sm:text-base">
                  {course.title}
                </h3>
                <div className="mt-auto pt-2">
                  <span className="text-sm text-gray-600">View details</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
