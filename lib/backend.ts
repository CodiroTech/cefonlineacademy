import { backendBaseUrl } from './config'

export async function fetchBackend<T = unknown>(
  path: string,
  revalidate = 60,
): Promise<T | null> {
  if (!backendBaseUrl) return null

  const isCourseDetail = path.includes('course/detail')
  const debug = process.env.NODE_ENV === 'development' && isCourseDetail

  try {
    const url = `${backendBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
    const res = await fetch(url, { next: { revalidate } })
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
