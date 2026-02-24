import { backendBaseUrl } from './config'

export async function fetchBackend<T = unknown>(
  path: string,
  revalidate = 60,
): Promise<T | null> {
  if (!backendBaseUrl) return null

  try {
    const url = `${backendBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
    const res = await fetch(url, { next: { revalidate } })
    if (!res.ok) return null
    return await res.json()
  } catch {
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
