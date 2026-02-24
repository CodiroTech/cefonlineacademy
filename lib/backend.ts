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
