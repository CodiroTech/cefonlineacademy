'use client'

import { useState } from 'react'
import type {
  CourseDetailResponse,
  CourseDetailsLeftContentArea,
  CurriculumLesson,
  CurriculumLecture,
} from '@/lib/api/course-detail'
import { ShareCourse } from './ShareCourse'
import { ResourcePreviewModal } from './ResourcePreviewModal'
import { cn } from '@/lib/utils'

type Props = {
  course: CourseDetailResponse
  pageTitle: string
  left: CourseDetailsLeftContentArea | undefined
}

function isLectureFree(lecture: CurriculumLecture): boolean {
  const v = lecture.lecture_is ?? ''
  return v === 'Free' || v.toLowerCase() === 'free'
}

function openPdfInNewTab(src: string): void {
  if (typeof window !== 'undefined' && src) window.open(src, '_blank', 'noopener,noreferrer')
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

  const curriculum = left?.curriculum_tab
  const hasCurriculum = Array.isArray(curriculum) && curriculum.length > 0

  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview')
  const [openLessonIndex, setOpenLessonIndex] = useState<number | null>(0)
  const [previewLecture, setPreviewLecture] = useState<{
    title: string
    type: string | null
    src: string | null
  } | null>(null)

  const openPreview = (lecture: CurriculumLecture) => {
    const type = (lecture.lecture_type ?? '').toLowerCase()
    if (type === 'pdf') {
      if (lecture.lecture_preview_btn_src) openPdfInNewTab(lecture.lecture_preview_btn_src)
      return
    }
    setPreviewLecture({
      title: lecture.lecture_title ?? 'Preview',
      type: lecture.lecture_type ?? null,
      src: lecture.lecture_preview_btn_src ?? null,
    })
  }

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

      {/* Tab bar */}
      <nav className="flex border-b border-gray-200 mb-6" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'overview'}
          aria-controls="overview-panel"
          id="overview-tab"
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
            activeTab === 'overview'
              ? 'border-[#065D80] text-[#065D80]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          )}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        {hasCurriculum && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'curriculum'}
            aria-controls="curriculum-panel"
            id="curriculum-tab"
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              activeTab === 'curriculum'
                ? 'border-[#065D80] text-[#065D80]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            )}
            onClick={() => setActiveTab('curriculum')}
          >
            Curriculum
          </button>
        )}
      </nav>

      {/* Overview tab */}
      <div
        id="overview-panel"
        role="tabpanel"
        aria-labelledby="overview-tab"
        hidden={activeTab !== 'overview'}
        className={cn(activeTab !== 'overview' && 'hidden')}
      >
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
          className={cn('prose prose-sm max-w-none text-gray-700')}
          dangerouslySetInnerHTML={{ __html: description || 'No description available.' }}
        />
      </div>

      {/* Curriculum tab */}
      {hasCurriculum && (
        <div
          id="curriculum-panel"
          role="tabpanel"
          aria-labelledby="curriculum-tab"
          hidden={activeTab !== 'curriculum'}
          className={cn(activeTab !== 'curriculum' && 'hidden')}
        >
          <div className="text-sm text-gray-600 mb-4">
            {right?.course_video_lectures != null && right?.course_duration != null
              ? `${right.course_video_lectures} Classes | ${right.course_duration}`
              : right?.course_video_lectures != null
                ? `${right.course_video_lectures} Classes`
                : right?.course_duration != null
                  ? String(right.course_duration)
                  : null}
          </div>
          <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
            {(curriculum as CurriculumLesson[]).map((lesson, lessonIndex) => {
              const isOpen = openLessonIndex === lessonIndex
              const lectures = lesson.lesson_lectures ?? []
              return (
                <div key={lessonIndex} className="border-b border-gray-200 last:border-b-0">
                  <button
                    type="button"
                    className={cn(
                      'w-full flex items-center gap-2 px-4 py-3 text-left font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors',
                      isOpen && 'bg-gray-100'
                    )}
                    onClick={() =>
                      setOpenLessonIndex(isOpen ? null : lessonIndex)
                    }
                    aria-expanded={isOpen}
                  >
                    <span className="text-[#065D80] shrink-0">Q.</span>
                    <span className="flex-1">{lesson.lesson_name ?? 'Module'}</span>
                    <svg
                      className={cn('w-5 h-5 shrink-0 transition-transform', isOpen && 'rotate-180')}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 py-3 bg-white border-t border-gray-100">
                      <ul className="space-y-3">
                        {lectures.length === 0 ? (
                          <li className="text-sm text-gray-500">No lectures</li>
                        ) : (
                          lectures.map((lecture, lectureIndex) => {
                            const free = isLectureFree(lecture)
                            const hasPreview = !!(lecture.lecture_preview_btn_src && free)
                            const isPdf =
                              (lecture.lecture_type ?? '').toLowerCase() === 'pdf'
                            return (
                              <li key={lectureIndex} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 min-w-0">
                                  {lecture.lecture_icon_src ? (
                                    <img
                                      src={lecture.lecture_icon_src}
                                      alt=""
                                      className="w-5 h-5 shrink-0 object-contain"
                                    />
                                  ) : (
                                    <span className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-400">
                                      {free ? '▶' : '🔒'}
                                    </span>
                                  )}
                                  <span className="text-sm font-medium text-gray-900 truncate">
                                    {lecture.lecture_title ?? 'Lecture'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {lecture.lecture_file_duration && (
                                    <span className="text-xs text-gray-500">
                                      {lecture.lecture_file_duration}
                                    </span>
                                  )}
                                  {hasPreview ? (
                                    isPdf ? (
                                      <button
                                        type="button"
                                        className="text-sm font-medium text-[#065D80] hover:underline"
                                        onClick={() =>
                                          lecture.lecture_preview_btn_src &&
                                          openPdfInNewTab(lecture.lecture_preview_btn_src)
                                        }
                                      >
                                        View Lecture
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="text-sm font-medium text-[#065D80] hover:underline"
                                        onClick={() => openPreview(lecture)}
                                      >
                                        View Lecture
                                      </button>
                                    )
                                  ) : (
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                      </svg>
                                      Locked
                                    </span>
                                  )}
                                </div>
                              </li>
                            )
                          })
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <ResourcePreviewModal
        open={!!previewLecture}
        onClose={() => setPreviewLecture(null)}
        title={previewLecture?.title}
        lectureType={previewLecture?.type ?? undefined}
        previewSrc={previewLecture?.src}
      />
    </div>
  )
}
