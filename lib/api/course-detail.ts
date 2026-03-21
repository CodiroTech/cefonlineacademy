import { fetchBackend } from '../backend'
import { backendBaseUrl } from '../config'

// --------------- Types (match backend courseDetailApi response) ---------------

export type CourseExits = 'enrolled' | 'cartList' | 0

export type OverviewTab = {
  title?: string
  description?: string
  course_subtitle?: string
  what_you_will_learn?: string[]
  course_description?: string
  total_lessons?: number
  /** courses.classes — session/class count for sidebar */
  classes?: number
  /** Instructional duration label, e.g. "48hrs" (not access period) */
  instructional_duration?: string | null
  level?: string
  /** Enrollment access period text (weeks / lifetime) */
  duration?: string
  language?: string
  skills?: string[]
}

export type ReviewTab = {
  can_review?: boolean
  average_rating: string
  total_user_reviews: number
  five_star_percentage: number
  four_star_percentage: number
  three_star_percentage: number
  two_star_percentage: number
  first_star_percentage: number
  user_reviews?: Array<{
    id: number
    user_id?: number
    user_image?: string
    user_name?: string
    comment?: string
    created_at?: string
    rating: number
  }>
  pagination?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    has_more_pages: boolean
    next_page_url: string | null
  }
}

export type InstructorTabItem = {
  id?: number
  image?: string
  name?: string
  type?: string
  professional_title?: string
  total_students?: string
  about?: string
}

// Curriculum (lessons + lectures) for course details
export type CurriculumLecture = {
  lecture_id?: number
  lecture_title?: string
  lecture_type?: string
  lecture_file_duration?: string | null
  lecture_is?: string
  lecture_preview_btn_src?: string | null
  lecture_icon_src?: string | null
}

export type CurriculumLesson = {
  lesson_name?: string
  lesson_no?: number
  lesson_lectures?: CurriculumLecture[]
}

export type CourseDetailsLeftContentArea = {
  title?: string
  overview_tab?: OverviewTab
  curriculum_tab?: CurriculumLesson[]
  discussion_tab?: unknown[]
  review_tab?: ReviewTab
  instructor_tab?: InstructorTabItem[]
}

export type CourseDetailsRightContentArea = {
  course_image?: string
  course_type?: string
  course_preview_src?: string | null
  course_preview_src_type?: string
  course_duration?: string | number | null
  course_level?: string | null
  students_enrolled?: number
  course_language?: string
  course_price?: string | null
  course_old_price?: string | null
  course_discount_price?: string | null
  course_promotion_percentage_off?: string | null
  course_left_price?: string | null
  course_learner_accessibility?: string
  course_video_lectures?: string | null
  course_quizzes?: string
  course_assignments?: string
  course_downloads?: string
  /** Enrollment window (e.g. weeks) — optional second line in sidebar */
  course_accessPeriod?: string
  /** Raw price from backend (0 = free) */
  course_price_amount?: number
  add_to_wishlist_web_route?: string
  add_to_wishlist_api_route?: string
  share_course_api_route?: string
}

export type CourseDetailResponse = {
  course_id: number
  course_slug: string
  course_cover_image: string
  course_details_left_content_area: CourseDetailsLeftContentArea
  course_details_right_content_area: CourseDetailsRightContentArea
  course_exits: CourseExits
  auth_role: number | null
  auth_user_student_id: number | null
  already_requested_enrollment: boolean
  /** From flat API: label for main CTA (e.g. "Buy Now", "Enroll Now") */
  btn_text?: string | null
  /** From flat API: URL/route for main CTA */
  btn_api_route?: string | null
}

// --------------- Flat API response (backend courseDetailApi returns this shape) ---------------

export type CourseDetailApiRaw = {
  course_id: number
  course_slug: string
  course_type?: string
  course_image?: string
  course_preview_src?: string | null
  course_preview_src_type?: string
  overview?: {
    title?: string
    description?: string
    total_lessons?: number
    classes?: number
    instructional_duration?: string | null
    level?: string
    duration?: string
    language?: string
    skills?: string[]
  }
  lessons?: Array<{
    lesson_name?: string
    lesson_no?: number
    lesson_lectures?: Array<{
      lecture_id?: number
      lecture_title?: string
      lecture_type?: string
      lecture_file_duration?: string | null
      lecture_is?: string
      lecture_preview_btn_src?: string | null
      lecture_icon_src?: string | null
    }>
  }>
  reviews?: ReviewTab
  instructors?: InstructorTabItem[]
  btn_text?: string | null
  btn_api_route?: string | null
  students_enrolled?: number
  course_exits?: 'enrolled' | 'cartList' | 0
  auth_role?: number | null
  already_requested_enrollment?: boolean
  course_learner_accessibility?: string | null
}

/** Map flat API response (overview, lessons, reviews, instructors) to CourseDetailResponse. */
function normalizeCourseDetailResponse(raw: CourseDetailApiRaw): CourseDetailResponse {
  const overview = raw.overview ?? {}
  const lessons = raw.lessons ?? []
  const curriculum_tab: CurriculumLesson[] = lessons.map((l) => ({
    lesson_name: l.lesson_name ?? 'Module',
    lesson_no: l.lesson_no,
    lesson_lectures: (l.lesson_lectures ?? []).map((lec) => ({
      lecture_id: lec.lecture_id,
      lecture_title: lec.lecture_title,
      lecture_type: lec.lecture_type,
      lecture_file_duration: lec.lecture_file_duration ?? null,
      lecture_is: lec.lecture_is,
      lecture_preview_btn_src: lec.lecture_preview_btn_src ?? null,
      lecture_icon_src: lec.lecture_icon_src ?? null,
    })),
  }))
  const left: CourseDetailsLeftContentArea = {
    title: overview.title,
    overview_tab: {
      title: overview.title,
      description: overview.description,
      course_description: overview.description,
      total_lessons: overview.total_lessons,
      classes: overview.classes,
      instructional_duration: overview.instructional_duration ?? undefined,
      level: overview.level,
      duration: overview.duration,
      language: overview.language,
      skills: overview.skills,
    },
    curriculum_tab: curriculum_tab.length > 0 ? curriculum_tab : undefined,
    review_tab: raw.reviews,
    instructor_tab: raw.instructors?.length ? raw.instructors : undefined,
  }
  /** Prefer courses.classes; fall back to total_lessons for older API payloads */
  const rawClasses = overview.classes ?? overview.total_lessons
  const classesCount =
    rawClasses != null && rawClasses !== undefined ? Number(rawClasses) : undefined
  const instructionalDuration =
    overview.instructional_duration != null && String(overview.instructional_duration).trim() !== ''
      ? String(overview.instructional_duration)
      : null

  const right: CourseDetailsRightContentArea = {
    course_image: raw.course_image,
    course_type: raw.course_type,
    course_preview_src: raw.course_preview_src,
    course_preview_src_type: raw.course_preview_src_type,
    /** Sidebar "Duration" = instructional length, not access period */
    course_duration: instructionalDuration,
    course_level: overview.level ?? null,
    course_language: overview.language,
    /** Sidebar "Classes" = courses.classes from API */
    course_video_lectures:
      classesCount !== undefined && !Number.isNaN(classesCount) ? String(classesCount) : null,
    course_accessPeriod: overview.duration ?? undefined,
    students_enrolled: raw.students_enrolled,
    course_learner_accessibility: raw.course_learner_accessibility ?? undefined,
    course_price: raw.course_price ?? null,
    course_price_amount: raw.price !== undefined && raw.price !== null ? Number(raw.price) : undefined,
  }
  return {
    course_id: raw.course_id,
    course_slug: raw.course_slug,
    course_cover_image: raw.course_image ?? '',
    course_details_left_content_area: left,
    course_details_right_content_area: right,
    course_exits: raw.course_exits !== undefined ? raw.course_exits : 0,
    auth_role: raw.auth_role !== undefined ? raw.auth_role : null,
    auth_user_student_id: null,
    already_requested_enrollment: raw.already_requested_enrollment ?? false,
    btn_text: raw.btn_text ?? null,
    btn_api_route: raw.btn_api_route ?? null,
  }
}

function isFlatApiResponse(item: unknown): item is CourseDetailApiRaw {
  return (
    typeof item === 'object' &&
    item != null &&
    'course_id' in item &&
    'overview' in item &&
    !('course_details_left_content_area' in item)
  )
}

const DEBUG_COURSE_DETAIL = process.env.NODE_ENV === 'development'

export type GetCourseDetailOptions = {
  /** When true, do not retry as guest on 401; return null so caller can keep server state. Use from client CTA refetch. */
  noGuestFallback?: boolean
}

/** Fetch course detail by slug. Returns first element of API array or null if not found/error.
 * Tries exact slug first, then lowercase, since backend may store slugs in lowercase.
 * When authToken is provided, sends Bearer token so backend returns auth_role and course_exits for the user. */
export async function getCourseDetailBySlug(
  slug: string,
  authToken?: string | null,
  options?: GetCourseDetailOptions,
): Promise<CourseDetailResponse | null> {
  const noGuestFallback = options?.noGuestFallback === true
  if (DEBUG_COURSE_DETAIL) {
    console.log('[course-detail] getCourseDetailBySlug called with slug:', JSON.stringify(slug))
    console.log('[course-detail] backendBaseUrl:', backendBaseUrl || '(empty - check NEXT_PUBLIC_BACKEND_BASE_URL)')
  }

  const trySlug = async (s: string, token?: string | null) => {
    const path = `/frontend/course/detail/${encodeURIComponent(s)}`
    const url = `${backendBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
    if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Requesting URL:', url, token ? '(with auth)' : '(guest)')

    let data = await fetchBackend<CourseDetailResponse[] | CourseDetailResponse | CourseDetailApiRaw | { message?: string; data?: unknown }>(
      path,
      0,
      token?.trim() ? { authToken: token } : undefined,
    )

    // Unwrap if backend returns { data: course } or { data: [course] }
    if (data != null && typeof data === 'object' && !Array.isArray(data) && 'data' in data && (data as { data?: unknown }).data != null) {
      data = (data as { data: unknown }).data as typeof data
    }

    if (DEBUG_COURSE_DETAIL) {
      if (data === null) {
        console.warn('[course-detail] Response: null — backend returned error or NEXT_PUBLIC_BACKEND_BASE_URL is missing. Check .env.local and backend URL:', backendBaseUrl || '(empty)')
      } else if (Array.isArray(data)) {
        console.log('[course-detail] Response: array length =', data.length, data.length > 0 ? '(first item has course_id: ' + (data[0] && typeof data[0] === 'object' && 'course_id' in data[0]) + ')' : '')
      } else {
        console.log('[course-detail] Response: object (single course)', typeof data, data && typeof data === 'object' && 'course_id' in data ? 'has course_id' : '', (data && typeof data === 'object' && 'overview' in data) ? 'flat format (overview)' : '')
      }
    }

    // Backend may return either a single object or an array of one
    const item = Array.isArray(data) && data.length > 0 ? data[0] : data
    if (item && typeof item === 'object' && 'course_id' in item) {
      if (isFlatApiResponse(item)) {
        return normalizeCourseDetailResponse(item)
      }
      return item as CourseDetailResponse
    }
    return null
  }

  let result = await trySlug(slug, authToken)
  if (!result && authToken?.trim() && !noGuestFallback) {
    if (DEBUG_COURSE_DETAIL) console.log('[course-detail] 401 or error with auth — retrying as guest')
    result = await trySlug(slug, undefined)
  }
  if (result) {
    if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Course found with slug:', slug)
    return result
  }

  if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Exact slug not found, trying lowercase fallback')

  const slugLower = slug.toLowerCase()
  if (slugLower !== slug) {
    let fallbackResult = await trySlug(slugLower, authToken)
    if (!fallbackResult && authToken?.trim() && !noGuestFallback) {
      if (DEBUG_COURSE_DETAIL) console.log('[course-detail] 401 or error with auth (lowercase) — retrying as guest')
      fallbackResult = await trySlug(slugLower, undefined)
    }
    if (fallbackResult) {
      if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Course found with lowercase slug:', slugLower)
      return fallbackResult
    }
  }

  if (DEBUG_COURSE_DETAIL) console.log('[course-detail] No course found for slug:', JSON.stringify(slug), '— page will 404')
  return null
}
