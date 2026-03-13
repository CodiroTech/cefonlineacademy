import { backendBaseUrl } from './config'
import { isLikelySanctumToken } from './auth-cookie'

export type FetchBackendOptions = {
  /** When set, sends Authorization: Bearer <token> so backend returns auth-dependent data (e.g. course_exits, auth_role). */
  authToken?: string | null
}

export async function fetchBackend<T = unknown>(
  path: string,
  revalidate = 60,
  options?: FetchBackendOptions,
): Promise<T | null> {
  if (!backendBaseUrl) {
    if (path.includes('course/detail')) {
      console.warn('[backend] NEXT_PUBLIC_BACKEND_BASE_URL is not set — course detail requests will 404. Add it to .env.local')
    }
    return null
  }

  const isCourseDetail = path.includes('course/detail')
  const debug = process.env.NODE_ENV === 'development' && isCourseDetail

  const headers: HeadersInit = {}
  const token = options?.authToken?.trim()
  if (token && isLikelySanctumToken(token)) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const url = `${backendBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
    const res = await fetch(url, { next: { revalidate }, headers: Object.keys(headers).length ? headers : undefined })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      console.warn(`[backend] ${res.status} ${url}`, data ?? res.statusText)
      if (debug) console.log('[backend] course-detail error body:', JSON.stringify(data))
      return null
    }
    if (debug) {
      const preview = Array.isArray(data)
        ? `array[${data.length}]`
        : typeof data === 'object' && data && 'message' in data
          ? `object with message: ${(data as { message?: string }).message}`
          : typeof data
      console.log('[backend] course-detail success:', preview)
    }
    return data
  } catch (e) {
    console.warn('[backend] fetch failed', path, e)
    return null
  }
}

/** POST JSON to backend (e.g. register, login). No revalidate. */
export async function postBackend<T = unknown>(
  path: string,
  body: Record<string, unknown>,
): Promise<{ data: T | null; ok: boolean; status: number; error?: unknown }> {
  if (!backendBaseUrl) {
    return { data: null, ok: false, status: 0, error: 'No backend URL' }
  }
  try {
    const url = `${backendBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => null)
    return { data, ok: res.ok, status: res.status, error: res.ok ? undefined : data }
  } catch (e) {
    return { data: null, ok: false, status: 0, error: e }
  }
}
