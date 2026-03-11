/**
 * Academy list APIs (cef-backend): courses, blogs.
 */

import { fetchBackend } from '../backend'

export type BackendCourseItem = {
  id: number
  uuid?: string
  title: string
  slug?: string
  short_description?: string
  description?: string
  image_url?: string | null
}

type BackendCoursesResponse = { success?: boolean; data?: BackendCourseItem[] }

/** GET /api/academy/courses?limit=&sort=newest */
export async function getUpcomingCourses(limit = 6): Promise<BackendCourseItem[]> {
  const res = await fetchBackend<BackendCoursesResponse>(
    `/academy/courses?limit=${limit}&sort=newest`,
  )
  const list = res?.data
  return Array.isArray(list) ? list : []
}

export type BackendBlogItem = {
  id: number
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  image_url?: string | null
  author?: string
  published_at?: string
}

type BackendBlogsResponse = { success?: boolean; data?: BackendBlogItem[] }

/** GET /api/academy/blogs */
export async function getBlogs(): Promise<BackendBlogItem[]> {
  const res = await fetchBackend<BackendBlogsResponse>('/academy/blogs')
  const list = res?.data
  return Array.isArray(list) ? list : []
}

export type BackendInstructorItem = {
  id: number
  name: string
  professional_title?: string
  about_me?: string
  image_url?: string | null
  slug?: string
  profile_url?: string
}

type BackendInstructorsResponse = { success?: boolean; data?: BackendInstructorItem[] }

/** GET /api/academy/instructors — featured, approved instructors (same as backend homepage "Teachers Who Inspire"). */
export async function getInstructors(): Promise<BackendInstructorItem[]> {
  const res = await fetchBackend<BackendInstructorsResponse>('/academy/instructors')
  const list = res?.data
  return Array.isArray(list) ? list : []
}
