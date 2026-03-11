/**
 * Client-callable student actions (enroll, add to cart) with Bearer token.
 * Used after login/signup to auto-perform the next step from course details.
 */

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
  const url = `${base.replace(/\/$/, '')}/student/enroll-course`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ course_id: courseId }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      return { ok: false, message: (data as { message?: string })?.message ?? 'Enroll failed' }
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
  const url = `${base.replace(/\/$/, '')}/student/cart/add`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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
