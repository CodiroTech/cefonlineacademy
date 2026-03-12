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
  /** Backend returns body as `details` */
  details?: string
  image_url?: string | null
  author?: string
  published_at?: string
}

type BackendBlogsResponse = { success?: boolean; data?: BackendBlogItem[] }

/** GET /api/academy/blogs — optional limit (backend default is 5). */
export async function getBlogs(limit?: number): Promise<BackendBlogItem[]> {
  const qs = limit != null ? `?limit=${Math.max(1, Math.min(500, limit))}` : ''
  const res = await fetchBackend<BackendBlogsResponse>(`/academy/blogs${qs}`)
  const list = res?.data
  return Array.isArray(list) ? list : []
}

/** GET /api/academy/blog/{slug} — single blog by slug (backend returns 404 if not found). */
export async function getBlogBySlug(slug: string): Promise<BackendBlogItem | null> {
  const raw = (slug || '').trim()
  if (!raw) return null
  const path = `/academy/blog/${encodeURIComponent(raw)}`
  const res = await fetchBackend<BackendBlogsResponse>(path, 60)
  const data = res as { success?: boolean; data?: BackendBlogItem } | null
  const one = data?.data
  return one && !Array.isArray(one) ? (one as BackendBlogItem) : null
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
