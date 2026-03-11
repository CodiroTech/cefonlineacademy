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
  level?: string
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

export type CourseDetailsLeftContentArea = {
  title?: string
  overview_tab?: OverviewTab
  curriculum_tab?: unknown[]
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
  course_accessPeriod?: string
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
    level?: string
    duration?: string
    language?: string
    skills?: string[]
  }
  lessons?: Array<{
    lesson_name?: string
    lesson_no?: number
    lesson_lectures?: Array<{ lecture_title?: string }>
  }>
  reviews?: ReviewTab
  instructors?: InstructorTabItem[]
  btn_text?: string | null
  btn_api_route?: string | null
}

/** Map flat API response (overview, lessons, reviews, instructors) to CourseDetailResponse. */
function normalizeCourseDetailResponse(raw: CourseDetailApiRaw): CourseDetailResponse {
  const overview = raw.overview ?? {}
  const lessons = raw.lessons ?? []
  const curriculum_tab = lessons.map((l) => ({ title: l.lesson_name ?? 'Module' }))
  const left: CourseDetailsLeftContentArea = {
    title: overview.title,
    overview_tab: {
      title: overview.title,
      description: overview.description,
      course_description: overview.description,
      total_lessons: overview.total_lessons,
      level: overview.level,
      duration: overview.duration,
      language: overview.language,
      skills: overview.skills,
    },
    curriculum_tab: curriculum_tab.length > 0 ? curriculum_tab : undefined,
    review_tab: raw.reviews,
    instructor_tab: raw.instructors?.length ? raw.instructors : undefined,
  }
  const right: CourseDetailsRightContentArea = {
    course_image: raw.course_image,
    course_type: raw.course_type,
    course_preview_src: raw.course_preview_src,
    course_preview_src_type: raw.course_preview_src_type,
    course_duration: overview.duration ?? null,
    course_level: overview.level ?? null,
    course_language: overview.language,
    course_video_lectures: overview.total_lessons != null ? String(overview.total_lessons) : null,
    course_accessPeriod: overview.duration ?? undefined,
  }
  return {
    course_id: raw.course_id,
    course_slug: raw.course_slug,
    course_cover_image: raw.course_image ?? '',
    course_details_left_content_area: left,
    course_details_right_content_area: right,
    course_exits: 0,
    auth_role: null,
    auth_user_student_id: null,
    already_requested_enrollment: false,
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

/** Fetch course detail by slug. Returns first element of API array or null if not found/error.
 * Tries exact slug first, then lowercase, since backend may store slugs in lowercase.
 * When authToken is provided, sends Bearer token so backend returns auth_role and course_exits for the user. */
export async function getCourseDetailBySlug(slug: string, authToken?: string | null): Promise<CourseDetailResponse | null> {
  if (DEBUG_COURSE_DETAIL) {
    console.log('[course-detail] getCourseDetailBySlug called with slug:', JSON.stringify(slug))
    console.log('[course-detail] backendBaseUrl:', backendBaseUrl || '(empty - check NEXT_PUBLIC_BACKEND_BASE_URL)')
  }

  const trySlug = async (s: string) => {
    const path = `/frontend/course/detail/${encodeURIComponent(s)}`
    const url = `${backendBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
    if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Requesting URL:', url)

    const data = await fetchBackend<CourseDetailResponse[] | CourseDetailResponse | CourseDetailApiRaw | { message?: string }>(
      path,
      0,
      authToken ? { authToken } : undefined,
    )

    if (DEBUG_COURSE_DETAIL) {
      if (data === null) {
        console.log('[course-detail] Response: null (backend error, non-200, or fetch threw — check [backend] logs above)')
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

  const result = await trySlug(slug)
  if (result) {
    if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Course found with slug:', slug)
    return result
  }

  if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Exact slug not found, trying lowercase fallback')

  // Backend often stores slugs in lowercase; try lowercase if exact match failed
  const slugLower = slug.toLowerCase()
  if (slugLower !== slug) {
    const fallbackResult = await trySlug(slugLower)
    if (fallbackResult) {
      if (DEBUG_COURSE_DETAIL) console.log('[course-detail] Course found with lowercase slug:', slugLower)
      return fallbackResult
    }
  }

  if (DEBUG_COURSE_DETAIL) console.log('[course-detail] No course found for slug:', JSON.stringify(slug), '— page will 404')
  return null
}
