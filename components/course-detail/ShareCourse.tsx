'use client'

import { useState } from 'react'

type Props = { slug: string; title: string }

function getCourseUrl(slug: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/course-details/${slug}`
  }
  return `https://cefonlineacademy.com/course-details/${slug}`
}

export function ShareCourse({ slug, title }: Props) {
  const [open, setOpen] = useState(false)
  const url = getCourseUrl(slug)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-[#065D80] hover:underline"
      >
        <span>Share Course</span>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path
            d="M15 5.83331C15.6454 5.96713 16.1323 6.19047 16.5237 6.56322C17.5 7.49315 17.5 8.9899 17.5 11.9833C17.5 14.9767 17.5 16.4734 16.5237 17.4034C15.5474 18.3333 13.976 18.3333 10.8333 18.3333H9.16667C6.02397 18.3333 4.45262 18.3333 3.47631 17.4034C2.5 16.4734 2.5 14.9767 2.5 11.9833C2.5 8.9899 2.5 7.49315 3.47631 6.56322C3.86765 6.19047 4.35458 5.96713 5 5.83331"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            d="M10.0211 1.66712L10 11.6667M10.0211 1.66712C9.88558 1.66152 9.74925 1.70995 9.62775 1.81246C8.87242 2.45007 7.5 4.10741 7.5 4.10741M10.0211 1.66712C10.1426 1.67217 10.2635 1.72066 10.3723 1.81259C11.1276 2.45033 12.5 4.10741 12.5 4.10741"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full mt-1 z-20 bg-white rounded-lg border border-gray-200 shadow-lg py-2 min-w-[160px]">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Facebook
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Twitter
            </a>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              LinkedIn
            </a>
          </div>
        </>
      )}
    </div>
  )
}
