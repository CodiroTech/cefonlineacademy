/**
 * Client-callable student actions (enroll, add to cart) with Bearer token.
 * Used after login/signup to auto-perform the next step from course details.
 */

import { isLikelySanctumToken } from '../auth-cookie'

function getBackendBase(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
  }
  return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
}

export type StudentActionResult = { ok: boolean; message?: string; redirectUrl?: string }

/** POST /api/student/enroll-course with Bearer token. For free self-paced courses. */
export async function enrollCourse(courseId: number, token: string): Promise<StudentActionResult> {
  const base = getBackendBase()
  if (!base) return { ok: false, message: 'Backend URL not configured' }
  const t = token?.trim()
  if (!t) return { ok: false, message: 'Not logged in. Please log in and try again.' }
  if (!isLikelySanctumToken(t)) return { ok: false, message: 'Session invalid. Please log in again.' }
  const url = `${base.replace(/\/$/, '')}/student/enroll-course`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify({ course_id: courseId }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      const msg = (data as { message?: string })?.message
      return { ok: false, message: msg === 'Unauthenticated.' ? 'Session expired. Please log in again.' : (msg ?? 'Enroll failed') }
    }
    return { ok: true, message: (data as { message?: string })?.message }
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : 'Network error' }
  }
}

/** POST /api/student/cart/add with Bearer token. Adds course to cart; caller should redirect to checkout. */
export async function addToCart(courseId: number, token: string): Promise<StudentActionResult> {
  const base = getBackendBase()
  if (!base) return { ok: false, message: 'Backend URL not configured' }
  const t = token?.trim()
  if (!t) return { ok: false, message: 'Not logged in. Please log in and try again.' }
  if (!isLikelySanctumToken(t)) return { ok: false, message: 'Session invalid. Please log in again.' }
  const url = `${base.replace(/\/$/, '')}/student/cart/add`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify({ course_id: courseId }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      return { ok: false, message: (data as { message?: string })?.message ?? 'Add to cart failed' }
    }
    return { ok: true, message: (data as { message?: string })?.message }
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : 'Network error' }
  }
}
