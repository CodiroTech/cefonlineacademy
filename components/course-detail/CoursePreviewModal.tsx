'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  open: boolean
  onClose: () => void
  /** Image URL – show as image viewer when type is image */
  imageSrc?: string | null
  /** Video URL – show as <video> when type is course_intro_video */
  videoSrc?: string | null
  /** YouTube URL (embed or youtu.be) – show as iframe when type is course_intro_youtube_video */
  youtubeSrc?: string | null
  /** course_intro_image | course_intro_video | course_intro_youtube_video */
  previewType?: string | null
}

function youtubeEmbedUrl(url: string): string {
  if (!url) return ''
  const u = url.trim()
  if (u.includes('youtube.com/embed/')) return u
  const embedMatch = u.match(/youtube\.com\/embed\/([^/?]+)/)
  if (embedMatch) return u
  const watchMatch = u.match(/[?&]v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  const shortMatch = u.match(/youtu\.be\/([^/?]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  if (u.startsWith('http')) return u
  return `https://www.youtube.com/embed/${u}`
}

export function CoursePreviewModal({
  open,
  onClose,
  imageSrc,
  videoSrc,
  youtubeSrc,
  previewType,
}: Props) {
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  const isVideo = previewType === 'course_intro_video' && videoSrc
  const isYoutube = previewType === 'course_intro_youtube_video' && youtubeSrc
  const isImage = (previewType === 'course_intro_image' && !!imageSrc) || (!isVideo && !isYoutube && !!imageSrc)

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label="Course preview"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-[80vw] h-[80vh] max-w-full max-h-[80vh] bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-md"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {isVideo && (
          <video
            src={videoSrc ?? undefined}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            controlsList="nodownload"
          />
        )}
        {isYoutube && (
          <iframe
            src={youtubeEmbedUrl(youtubeSrc!)}
            title="Course preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}
        {isImage && (
          <img
            src={imageSrc ?? ''}
            alt="Course preview"
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
