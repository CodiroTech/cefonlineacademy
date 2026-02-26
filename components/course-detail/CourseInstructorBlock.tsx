'use client'

import type { InstructorTabItem } from '@/lib/api/course-detail'
import { cn } from '@/lib/utils'

type Props = { instructorTab: InstructorTabItem[] | undefined }

export function CourseInstructorBlock({ instructorTab }: Props) {
  const instructor = instructorTab?.[0]
  if (!instructor) return null

  return (
    <div className="mt-0 bg-[#EAF7E5]/40 rounded-none border border-gray-200 p-6 sm:p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-[#065D80] mb-4">Instructors</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {instructor.image && (
          <img
            src={instructor.image}
            alt=""
            className="w-20 h-20 rounded-full object-cover shrink-0"
          />
        )}
        <div>
          <p className="font-medium text-gray-900">{instructor.name}</p>
          {instructor.professional_title && (
            <p className="text-sm text-gray-600">{instructor.professional_title}</p>
          )}
          {instructor.total_students && (
            <p className="text-sm text-gray-600">{instructor.total_students}</p>
          )}
          {instructor.about && (
            <p className="mt-2 text-sm text-gray-700">{instructor.about}</p>
          )}
        </div>
      </div>
    </div>
  )
}
