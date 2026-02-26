'use client'

import type { CourseDetailResponse } from '@/lib/api/course-detail'
import { CourseMetaCard } from './CourseMetaCard'
import { CoursePreviewBlock } from './CoursePreviewBlock'
import { CourseCTA } from './CourseCTA'
import { CourseReviewsSummary } from './CourseReviewsSummary'
import { CourseDescriptionBlock } from './CourseDescriptionBlock'
import { CourseInstructorBlock } from './CourseInstructorBlock'

type Props = {
  course: CourseDetailResponse
  pageTitle: string
}

export function CourseDetailLayout({ course, pageTitle }: Props) {
  const right = course.course_details_right_content_area
  const left = course.course_details_left_content_area

  const sectionBox = 'bg-[#EAF7E5] px-6 py-6 rounded-tr-[60px] rounded-bl-[60px] w-full'

  return (
    <section className="mt-6 flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Left column: 20% - Meta, CTA, Reviews (each in its own box) */}
      <aside className="w-full lg:w-[20%] shrink-0 flex flex-col gap-6 order-2 lg:order-1">
        <div className={sectionBox}>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <CoursePreviewBlock course={course} />
            <hr className="border-0 border-t border-gray-200" />
            <CourseMetaCard right={right} course={course} />
            <hr className="border-0 border-t border-gray-200" />
            <div className="p-4 pt-3 pb-4">
              <CourseCTA course={course} />
            </div>
          </div>
        </div>
        <div className={sectionBox}>
          <CourseReviewsSummary reviewTab={left?.review_tab} />
        </div>
      </aside>

      {/* Right column: 80% - Description box, then Instructors box */}
      <div className="flex-1 min-w-0 order-1 lg:order-2 flex flex-col gap-6">
        <div className={sectionBox}>
          <CourseDescriptionBlock
            course={course}
            pageTitle={pageTitle}
            left={left}
          />
        </div>
        <div className={sectionBox}>
          <CourseInstructorBlock instructorTab={left?.instructor_tab} />
        </div>
      </div>
    </section>
  )
}
