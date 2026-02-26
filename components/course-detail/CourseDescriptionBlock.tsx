'use client'

import type { CourseDetailResponse, CourseDetailsLeftContentArea } from '@/lib/api/course-detail'
import { ShareCourse } from './ShareCourse'
import { cn } from '@/lib/utils'

type Props = {
  course: CourseDetailResponse
  pageTitle: string
  left: CourseDetailsLeftContentArea | undefined
}

export function CourseDescriptionBlock({ course, pageTitle, left }: Props) {
  const right = course.course_details_right_content_area
  const isLive = right?.course_type === 'Live'
  const overview = left?.overview_tab
  const description =
    typeof overview?.course_description === 'string'
      ? overview.course_description
      : typeof overview?.description === 'string'
        ? overview.description
        : ''
  const subtitle = overview?.course_subtitle
  const keypoints = overview?.what_you_will_learn ?? []
  const instructorTab = left?.instructor_tab?.[0]
  const avgRating = left?.review_tab?.average_rating
  const totalReviews = left?.review_tab?.total_user_reviews ?? 0

  return (
    <div className="bg-white rounded-none border border-gray-200 p-6 sm:p-8 shadow-sm">
      {isLive && (
        <p className="text-sm italic text-gray-700 mb-3">
          Live sessions with assigned tutor. Apply to join.
        </p>
      )}
      <h1 className="text-xl sm:text-2xl font-bold text-[#065D80] mb-2">{pageTitle}</h1>
      {subtitle && (
        <p className="text-gray-600 mb-4">{subtitle}</p>
      )}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {avgRating != null && (
          <span className="text-sm font-medium text-gray-700">
            ★ {avgRating} ({totalReviews} reviews)
          </span>
        )}
        <ShareCourse slug={course.course_slug} title={pageTitle} />
      </div>
      {instructorTab && (
        <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          {instructorTab.image && (
            <img
              src={instructorTab.image}
              alt=""
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Instructor/Teacher</p>
            <p className="font-medium text-gray-900">{instructorTab.name}</p>
          </div>
          {right?.course_video_lectures != null && (
            <p className="text-sm text-gray-600">Classes: {right.course_video_lectures}</p>
          )}
          {right?.course_level && (
            <p className="text-sm text-gray-600">Category: {right.course_level}</p>
          )}
        </div>
      )}
      {keypoints.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-[#065D80] mb-2">What you will learn</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            {keypoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </>
      )}
      <h2 className="text-lg font-semibold text-[#065D80] mb-2">Description</h2>
      <div
        className={cn('prose prose-sm max-w-none text-gray-700 mb-6')}
        dangerouslySetInnerHTML={{ __html: description || 'No description available.' }}
      />

      <h2 className="text-lg font-semibold text-[#065D80] mb-2">Curriculum</h2>
      <div className="text-sm text-gray-600 mb-2">
        {right?.course_video_lectures != null && right?.course_duration != null
          ? `${right.course_video_lectures} Classes | ${right.course_duration}`
          : right?.course_video_lectures != null
            ? `${right.course_video_lectures} Classes`
            : right?.course_duration != null
              ? String(right.course_duration)
              : null}
      </div>
      {left?.curriculum_tab && Array.isArray(left.curriculum_tab) && left.curriculum_tab.length > 0 ? (
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
          {(left.curriculum_tab as { title?: string }[]).slice(0, 10).map((item, i) => (
            <li key={i}>{item.title ?? 'Item'}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No Data Found!</p>
      )}
    </div>
  )
}
