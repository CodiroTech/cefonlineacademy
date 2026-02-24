import { fetchBackend, postBackend } from '../backend'

export type CountryItem = { country_id: number; country_name: string }
export type CourseItem = { course_id: number; course_name: string }
export type TimeSlotItem = { slot_id: number; slot_time: string }

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

export async function submitRegister(payload: RegisterPayload): Promise<RegisterResponse> {
  const { data, ok, status, error } = await postBackend<RegisterResponse>('/register', payload as Record<string, unknown>)
  if (!ok && error && typeof error === 'object' && !Array.isArray(error)) {
    return (error as RegisterResponse) || { status: false, message: 'Request failed' }
  }
  if (data && typeof data === 'object') return data as RegisterResponse
  return { status: false, message: status ? 'Request failed' : 'Network error' }
}
