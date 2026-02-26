import { fetchBackend, postBackend } from '../backend'

export type CountryItem = { country_id: number; country_name: string }
export type CourseItem = { course_id: number; course_name: string }
export type TimeSlotItem = { slot_id: number; slot_time: string }

/** Course with details (image, description) for popup preview. From academy/courses. */
export type CourseWithDetails = {
  id: number
  title: string
  slug?: string
  short_description?: string
  description?: string
  image_url?: string | null
}

export async function getCoursesWithDetails(limit = 100): Promise<CourseWithDetails[]> {
  const res = await fetchBackend<{ success?: boolean; data?: CourseWithDetails[] }>(
    `/academy/courses?limit=${limit}&sort=newest`
  )
  const list = res?.data
  return Array.isArray(list) ? list : []
}

export async function getCountries(): Promise<CountryItem[]> {
  const data = await fetchBackend<CountryItem[]>('/frontend/get-countries-list')
  return Array.isArray(data) ? data : []
}

export async function getCoursesByType(typeId: 1 | 2): Promise<CourseItem[]> {
  const data = await fetchBackend<CourseItem[]>(`/frontend/get-courses-by-type/${typeId}`)
  return Array.isArray(data) ? data : []
}

export async function getTimeSlots(): Promise<TimeSlotItem[]> {
  const data = await fetchBackend<TimeSlotItem[]>('/frontend/get-time-slots')
  return Array.isArray(data) ? data : []
}

/** Payload for POST /register (storeSignUpAsStudentApi). */
export type RegisterPayload = {
  course_type: 1 | 2
  course: number
  fullname: string
  phone: string
  email: string
  city: string
  country: number
  password: string
  age?: number
  school_grade?: string
  parent_name?: string
  preferred_teacher?: string
  how_many_students?: number
  preferDate?: string
  preferSlot?: number
  slug?: string
}

export type RegisterResponse = {
  status?: boolean
  message?: string
  url?: string
  error?: Record<string, string[]>
}

const GENERIC_ERROR = 'Registration failed. Please try again.'

function isServerError(message: string): boolean {
  const s = message
  return (
    s.includes('Symfony') ||
    s.includes('Dsn') ||
    s.includes('Argument #') ||
    s.includes('vendor') ||
    s.includes('.php') ||
    s.includes('::') ||
    s.includes('MailManager') ||
    s.includes('must be of type')
  )
}

export async function submitRegister(payload: RegisterPayload): Promise<RegisterResponse> {
  const { data, ok, status, error } = await postBackend<RegisterResponse>('/register', payload as Record<string, unknown>)
  if (!ok && error) {
    const err = error as RegisterResponse & { message?: string; error?: Record<string, string[]> }
    const raw =
      err?.message ||
      (err?.error && typeof err.error === 'object' ? Object.values(err.error).flat().join(' ') : '') ||
      'Request failed'
    const message = status >= 500 || isServerError(String(raw)) ? GENERIC_ERROR : raw
    return { status: false, message }
  }
  if (data && typeof data === 'object') return data as RegisterResponse
  return { status: false, message: status ? GENERIC_ERROR : 'Network error. Please try again.' }
}
