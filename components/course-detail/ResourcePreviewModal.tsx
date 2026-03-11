'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

function youtubeEmbedUrl(url: string): string {
  if (!url) return ''
  const u = url.trim()
  if (u.includes('youtube.com/embed/')) return u
  const watchMatch = u.match(/[?&]v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  const shortMatch = u.match(/youtu\.be\/([^/?]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  if (u.startsWith('http')) return u
  return `https://www.youtube.com/embed/${u}`
}

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  /** Backend lecture type: Video, Youtube, Text, Image, PDF, Slide Document, Audio (case-insensitive) */
  lectureType?: string | null
  /** URL or text content for preview (lecture_preview_btn_src or text content) */
  previewSrc?: string | null
}

export function ResourcePreviewModal({
  open,
  onClose,
  title,
  lectureType,
  previewSrc,
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

  const type = (lectureType ?? '').toLowerCase()
  const isVideo = (type === 'video') && !!previewSrc
  const isYoutube = (type === 'youtube') && !!previewSrc
  const isText = type === 'text'
  const isImage = type === 'image' && !!previewSrc
  const isPdf = (type === 'pdf') && !!previewSrc
  const isSlide = (type === 'slide document') && !!previewSrc
  const isAudio = (type === 'audio') && !!previewSrc

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Resource preview'}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] w-full bg-white rounded-lg overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between shrink-0 px-4 py-2 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
            {title ?? 'Preview'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto min-h-0 p-4">
          {isVideo && (
            <video
              src={previewSrc ?? undefined}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[70vh] object-contain"
              controlsList="nodownload"
            />
          )}
          {isYoutube && (
            <div className="aspect-video w-full">
              <iframe
                src={youtubeEmbedUrl(previewSrc!)}
                title={title ?? 'Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          {isText && (
            <div
              className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: previewSrc ?? '' }}
            />
          )}
          {isImage && (
            <img
              src={previewSrc ?? ''}
              alt={title ?? 'Image'}
              className="max-w-full max-h-[70vh] object-contain mx-auto"
            />
          )}
          {isPdf && (
            <iframe
              src={previewSrc ?? ''}
              title={title ?? 'PDF'}
              className="w-full h-[70vh] border-0"
            />
          )}
          {isSlide && (
            <iframe
              src={previewSrc ?? ''}
              title={title ?? 'Slide'}
              className="w-full h-[70vh] border-0"
            />
          )}
          {isAudio && (
            <div className="py-4">
              <audio
                src={previewSrc ?? undefined}
                controls
                autoPlay
                className="w-full"
              />
            </div>
          )}
          {!isVideo && !isYoutube && !isText && !isImage && !isPdf && !isSlide && !isAudio && (
            <p className="text-gray-500">No preview available.</p>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
