'use client'

import { useState } from 'react'
import type { CourseDetailResponse } from '@/lib/api/course-detail'
import { CoursePreviewModal } from './CoursePreviewModal'

type Props = { course: CourseDetailResponse }

const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-md">
    <circle cx="24" cy="24" r="24" fill="black" fillOpacity="0.5" />
    <path d="M18 14v20l16-10-16-10z" fill="currentColor" />
  </svg>
)

export function CoursePreviewBlock({ course }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const right = course.course_details_right_content_area
  const previewSrc = right?.course_preview_src ?? null
  const previewType = right?.course_preview_src_type ?? null
  const coverImage = course.course_cover_image || '/placeholder-course.png'

  const isVideo = previewType === 'course_intro_video' && previewSrc
  const isYoutube = previewType === 'course_intro_youtube_video' && previewSrc
  const isImage = previewType === 'course_intro_image' && previewSrc
  const hasPreview = isVideo || isYoutube || isImage
  const showPlayButton = isVideo || isYoutube

  const handleClick = () => {
    setModalOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="w-full rounded-t-xl overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#065D80] focus:ring-inset"
        aria-label="Enlarge course preview"
      >
        <div className="relative w-full aspect-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <PlayIcon />
            </div>
          )}
        </div>
      </button>

      <CoursePreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={hasPreview ? (isImage ? previewSrc : coverImage) : coverImage}
        videoSrc={isVideo ? previewSrc : null}
        youtubeSrc={isYoutube ? previewSrc : null}
        previewType={previewType}
      />
    </>
  )
}
