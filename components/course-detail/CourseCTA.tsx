'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { CourseDetailResponse } from '@/lib/api/course-detail'
import { getCourseDetailBySlug } from '@/lib/api/course-detail'
import type { PreselectedCourse } from '@/components/demo/BookADemoPopup'
import { cn } from '@/lib/utils'
import { getAuthCookie, isLikelySanctumToken } from '@/lib/auth-cookie'
import { getCheckoutUrlWithAuth } from '@/lib/portal-urls'
import { addToCart, enrollCourse } from '@/lib/api/student-actions'
import { portalUrl } from '@/lib/config'

function getPortalCourseUrl(slug: string): string {
  const base = (portalUrl || '').trim().replace(/\/$/, '')
  return base ? `${base}/mycourses/${slug}` : '#'
}

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

export type LoginPopupCourseIntent = 'enroll_free' | 'buy' | 'request_enrollment_live'

function openLoginPopupFromCourse(
  courseForDemo: PreselectedCourse,
  intent: LoginPopupCourseIntent,
  courseId: number,
  slug: string,
) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent('cef-open-login-popup', {
      detail: {
        stayOnPage: true,
        courseForDemo,
        intent,
        courseId,
        slug,
      },
    })
  )
}

export function CourseCTA({ course }: Props) {
  const [buyNowLoading, setBuyNowLoading] = useState(false)
  const [buyNowError, setBuyNowError] = useState<string | null>(null)
  const [enrollNowLoading, setEnrollNowLoading] = useState(false)
  const [enrollNowError, setEnrollNowError] = useState<string | null>(null)
  const [clientAuth, setClientAuth] = useState<{ token: string; role: string } | null>(null)
  const [refetchedCourse, setRefetchedCourse] = useState<CourseDetailResponse | null>(null)
  const [enrollmentCheckDone, setEnrollmentCheckDone] = useState(false)

  useEffect(() => {
    setClientAuth(getAuthCookie())
  }, [])

  const hasValidClientAuth = clientAuth && isLikelySanctumToken(clientAuth.token)

  // Server may have returned guest data (e.g. 401 fallback). If we have a valid token, refetch with auth to get real enrollment state (no guest fallback).
  useEffect(() => {
    if (!hasValidClientAuth?.token?.trim()) {
      setEnrollmentCheckDone(true)
      return
    }
    if (course.course_exits === 'enrolled' || course.course_exits === 'cartList') {
      setEnrollmentCheckDone(true)
      return
    }
    setEnrollmentCheckDone(false)
    getCourseDetailBySlug(course.course_slug, hasValidClientAuth.token, { noGuestFallback: true })
      .then((res) => {
        if (res && (res.course_exits === 'enrolled' || res.course_exits === 'cartList')) setRefetchedCourse(res)
      })
      .finally(() => setEnrollmentCheckDone(true))
  }, [hasValidClientAuth?.token, course.course_slug, course.course_exits])

  const effectiveCourse = refetchedCourse ?? course
  const slug = effectiveCourse.course_slug
  const courseExits = effectiveCourse.course_exits
  const authRole = effectiveCourse.auth_role
  const alreadyRequested = effectiveCourse.already_requested_enrollment
  const right = effectiveCourse.course_details_right_content_area
  const isLive = right?.course_type === 'Live'
  const isFree = right?.course_learner_accessibility === 'free'
  const isPaid = right?.course_learner_accessibility === 'paid'
  const isStudentOrGuest = authRole === 3 || authRole === null
  const isGuest = authRole === null && !hasValidClientAuth
  const backendBase = getBackendBase()

  const liveEnrollmentFormUrl = backendBase
    ? `${backendBase.replace(/\/$/, '')}/live-course-enrollment-form/1/${slug}`
    : '#'

  // Enrolled: Go to Course
  if (courseExits === 'enrolled') {
    return (
      <div className="flex flex-col gap-3">
        <a
          href={getPortalCourseUrl(slug)}
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
    | { label: string; openLogin: true; intent?: LoginPopupCourseIntent }
  let primary: CTAItem | null = null
  let secondary: CTAItem | null = null

  if (isLive) {
    if (isGuest) {
      primary = { label: 'Request Enrollment', openLogin: true, intent: 'request_enrollment_live' as const }
      if (isPaid) secondary = { label: 'Book a Demo Class', openLogin: true, intent: 'request_enrollment_live' as const }
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
        primary = { label: 'Enroll Now', openLogin: true, intent: 'enroll_free' as const }
      } else {
        primary = { label: 'Enroll Now', href: '#', external: false }
      }
    } else if (isPaid) {
      if (isGuest) {
        primary = { label: 'Buy Now', openLogin: true, intent: 'buy' as const }
      } else {
        primary = { label: 'Buy Now', href: effectiveCourse.btn_api_route ?? '#', external: !!(effectiveCourse.btn_api_route?.startsWith('http')) }
      }
    }
  }

  // Flat API (overview/lessons/reviews) sends btn_text + btn_api_route but not learner_accessibility
  if (!primary && effectiveCourse.btn_text) {
    const href = effectiveCourse.btn_api_route ?? '#'
    const external = href.startsWith('http')
    primary = isGuest
      ? { label: effectiveCourse.btn_text, openLogin: true, intent: isLive ? 'request_enrollment_live' : isFree ? 'enroll_free' : 'buy' }
      : { label: effectiveCourse.btn_text, href, external }
  }

  if (!primary) return null

  const courseForDemo = buildCourseForDemo(effectiveCourse)
  const primaryIntent = 'intent' in primary ? primary.intent : undefined
  const primaryLabel = effectiveCourse.btn_text ?? primary.label
  const isLoggedInBuyNow =
    !isGuest && isPaid && (primaryLabel === 'Buy Now' || primary.label === 'Buy Now')
  const isLoggedInEnrollNow =
    !isGuest && isFree && (primaryLabel === 'Enroll Now' || primary.label === 'Enroll Now')

  async function handleEnrollNowClick() {
    const auth = getAuthCookie()
    if (!auth) return
    setEnrollNowError(null)
    setEnrollNowLoading(true)
    try {
      const result = await enrollCourse(effectiveCourse.course_id, auth.token)
      if (result.ok) {
        window.open(getPortalCourseUrl(slug), '_blank', 'noopener,noreferrer')
        window.location.reload()
      } else {
        setEnrollNowError(result.message ?? 'Enrollment failed')
      }
    } catch {
      setEnrollNowError('Enrollment failed')
    } finally {
      setEnrollNowLoading(false)
    }
  }

  async function handleBuyNowClick() {
    const auth = getAuthCookie()
    if (!auth) return
    setBuyNowError(null)
    setBuyNowLoading(true)
    try {
      const result = await addToCart(effectiveCourse.course_id, auth.token)
      if (result.ok) {
        const url = getCheckoutUrlWithAuth(auth.token, auth.role)
        if (url) window.location.href = url
      } else {
        setBuyNowError(result.message ?? 'Could not add to cart')
      }
    } catch {
      setBuyNowError('Could not add to cart')
    } finally {
      setBuyNowLoading(false)
    }
  }

  const primaryButtonClass = cn(
    'w-full inline-flex justify-center items-center rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide',
    'bg-[#065D80] text-white hover:bg-[#054a66] transition-colors'
  )
  const secondaryButtonClass = cn(
    'w-full inline-flex justify-center items-center rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide',
    'border-2 border-[#065D80] text-[#065D80] bg-white hover:bg-[#065D80] hover:text-white transition-colors'
  )

  const checkingEnrollment =
    hasValidClientAuth &&
    course.course_exits !== 'enrolled' &&
    course.course_exits !== 'cartList' &&
    !enrollmentCheckDone

  return (
    <div className="flex flex-col gap-3">
      {checkingEnrollment ? (
        <button
          type="button"
          disabled
          className={cn(primaryButtonClass, 'opacity-80 cursor-wait')}
        >
          Checking enrollment…
        </button>
      ) : ('openLogin' in primary && primary.openLogin ? (
        <button
          type="button"
          onClick={() => openLoginPopupFromCourse(courseForDemo, primaryIntent ?? 'enroll_free', effectiveCourse.course_id, slug)}
          className={primaryButtonClass}
        >
          {primaryLabel}
        </button>
      ) : isLoggedInBuyNow ? (
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={handleBuyNowClick}
            disabled={buyNowLoading}
            className={cn(primaryButtonClass, buyNowLoading && 'opacity-70 cursor-wait')}
          >
            {buyNowLoading ? 'Adding…' : primaryLabel}
          </button>
          {buyNowError && (
            <p className="text-sm text-red-600" role="alert">
              {buyNowError}
            </p>
          )}
        </div>
      ) : isLoggedInEnrollNow ? (
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={handleEnrollNowClick}
            disabled={enrollNowLoading}
            className={cn(primaryButtonClass, enrollNowLoading && 'opacity-70 cursor-wait')}
          >
            {enrollNowLoading ? 'Enrolling…' : primaryLabel}
          </button>
          {enrollNowError && (
            <p className="text-sm text-red-600" role="alert">
              {enrollNowError}
            </p>
          )}
        </div>
      ) : (
        (() => {
          const href = effectiveCourse.btn_api_route || ('href' in primary ? primary.href : '#')
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
      ))}
      {secondary &&
        ('openLogin' in secondary && secondary.openLogin ? (
          <button
            type="button"
            onClick={() => openLoginPopupFromCourse(courseForDemo, 'intent' in secondary ? (secondary.intent ?? 'request_enrollment_live') : 'request_enrollment_live', effectiveCourse.course_id, slug)}
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
