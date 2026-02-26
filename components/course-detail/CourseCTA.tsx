'use client'

import Link from 'next/link'
import type { CourseDetailResponse } from '@/lib/api/course-detail'
import type { PreselectedCourse } from '@/components/demo/BookADemoPopup'
import { cn } from '@/lib/utils'

const PORTAL_BASE = 'https://portal.cefonlineacademy.com/mycourses'

type Props = { course: CourseDetailResponse }

function getBackendBase(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
  }
  return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
}

function buildCourseForDemo(course: CourseDetailResponse): PreselectedCourse {
  const right = course.course_details_right_content_area
  const left = course.course_details_left_content_area
  const isLive = right?.course_type === 'Live'
  const title = left?.title ?? course.course_slug
  const shortDescription =
    typeof left?.overview_tab?.course_description === 'string'
      ? left.overview_tab.course_description
      : undefined
  return {
    course_id: course.course_id,
    slug: course.course_slug,
    title,
    image_url: course.course_cover_image || undefined,
    short_description: shortDescription,
    courseType: isLive ? 1 : 2,
  }
}

function openLoginPopupFromCourse(courseForDemo: PreselectedCourse) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent('cef-open-login-popup', {
      detail: { stayOnPage: true, courseForDemo },
    })
  )
}

export function CourseCTA({ course }: Props) {
  const slug = course.course_slug
  const courseExits = course.course_exits
  const authRole = course.auth_role
  const alreadyRequested = course.already_requested_enrollment
  const right = course.course_details_right_content_area
  const isLive = right?.course_type === 'Live'
  const isFree = right?.course_learner_accessibility === 'free'
  const isPaid = right?.course_learner_accessibility === 'paid'
  const isStudentOrGuest = authRole === 3 || authRole === null
  const isGuest = authRole === null
  const backendBase = getBackendBase()

  const liveEnrollmentFormUrl = backendBase
    ? `${backendBase.replace(/\/$/, '')}/live-course-enrollment-form/1/${slug}`
    : '#'

  // Enrolled: Go to Course
  if (courseExits === 'enrolled') {
    return (
      <div className="flex flex-col gap-3">
        <a
          href={`${PORTAL_BASE}/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'w-full inline-flex justify-center items-center rounded-xl px-4 py-3 text-sm font-semibold',
            'bg-[#065D80] text-white hover:bg-[#054a66] transition-colors'
          )}
        >
          Go to Course
        </a>
      </div>
    )
  }

  // In cart
  if (courseExits === 'cartList') {
    if (isLive) {
      if (alreadyRequested) {
        return (
          <button
            type="button"
            disabled
            className={cn(
              'w-full rounded-xl px-4 py-3 text-sm font-semibold',
              'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            Already Requested
          </button>
        )
      }
      return (
        <a
          href={liveEnrollmentFormUrl}
          className={cn(
            'w-full inline-flex justify-center items-center rounded-xl px-4 py-3 text-sm font-semibold',
            'bg-[#065D80] text-white hover:bg-[#054a66] transition-colors'
          )}
        >
          Request Enrollment
        </a>
      )
    }
    return (
      <button
        type="button"
        disabled
        className={cn(
          'w-full rounded-xl px-4 py-3 text-sm font-semibold',
          'bg-gray-300 text-gray-500 cursor-not-allowed'
        )}
      >
        Added to Cart
      </button>
    )
  }

  // Not enrolled, not in cart - show primary (and optionally secondary) CTA
  if (!isStudentOrGuest) return null

  type CTAItem =
    | { label: string; href: string; external?: boolean; openLogin?: false }
    | { label: string; openLogin: true }
  let primary: CTAItem | null = null
  let secondary: CTAItem | null = null

  if (isLive) {
    if (isGuest) {
      primary = { label: 'Request Enrollment', openLogin: true }
      if (isPaid) secondary = { label: 'Book a Demo Class', openLogin: true }
    } else {
      if (alreadyRequested) {
        return (
          <button
            type="button"
            disabled
            className={cn(
              'w-full rounded-xl px-4 py-3 text-sm font-semibold',
              'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            Already Requested
          </button>
        )
      }
      primary = { label: 'Request Enrollment', href: liveEnrollmentFormUrl, external: !!backendBase }
    }
  } else {
    if (isFree) {
      if (isGuest) {
        primary = { label: 'Enroll Now', openLogin: true }
      } else {
        primary = { label: 'Enroll Now', href: '#', external: false }
      }
    } else if (isPaid) {
      if (isGuest) {
        primary = { label: 'Buy Now', openLogin: true }
      } else {
        primary = { label: 'Buy Now', href: '#', external: false }
      }
    }
  }

  // Flat API (overview/lessons/reviews) sends btn_text + btn_api_route but not learner_accessibility
  if (!primary && course.btn_text) {
    const href = course.btn_api_route ?? '#'
    const external = href.startsWith('http')
    primary = isGuest
      ? { label: course.btn_text, openLogin: true }
      : { label: course.btn_text, href, external }
  }

  if (!primary) return null

  const courseForDemo = buildCourseForDemo(course)
  const primaryLabel = course.btn_text ?? primary.label
  const primaryButtonClass = cn(
    'w-full inline-flex justify-center items-center rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide',
    'bg-[#065D80] text-white hover:bg-[#054a66] transition-colors'
  )
  const secondaryButtonClass = cn(
    'w-full inline-flex justify-center items-center rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide',
    'border-2 border-[#065D80] text-[#065D80] bg-white hover:bg-[#065D80] hover:text-white transition-colors'
  )

  return (
    <div className="flex flex-col gap-3">
      {'openLogin' in primary && primary.openLogin ? (
        <button
          type="button"
          onClick={() => openLoginPopupFromCourse(courseForDemo)}
          className={primaryButtonClass}
        >
          {primaryLabel}
        </button>
      ) : (
        (() => {
          const href = course.btn_api_route || ('href' in primary ? primary.href : '#')
          const external = href.startsWith('http')
          const PrimaryTag = external ? 'a' : Link
          const primaryProps = external
            ? { href, target: '_blank', rel: 'noopener noreferrer' as const }
            : { href }
          return (
            <PrimaryTag {...primaryProps} className={primaryButtonClass}>
              {primaryLabel}
            </PrimaryTag>
          )
        })()
      )}
      {secondary &&
        ('openLogin' in secondary && secondary.openLogin ? (
          <button
            type="button"
            onClick={() => openLoginPopupFromCourse(courseForDemo)}
            className={secondaryButtonClass}
          >
            {secondary.label}
          </button>
        ) : (
          (() => {
            const sec = secondary as { label: string; href: string }
            return (
              <a
                href={sec.href}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButtonClass}
              >
                {sec.label}
              </a>
            )
          })()
        ))}
    </div>
  )
}
