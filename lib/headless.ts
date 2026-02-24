import { headlessBaseUrl, headlessApiToken } from './config'

export type HeadlessMedia = {
  id: number
  file_name: string
  full_url: string
  thumb?: string
  caption?: string | null
  size?: number
  width?: number
  height?: number
}

export async function fetchCollection<T = Record<string, unknown>>(
  slug: string,
  revalidate = 60,
): Promise<T[]> {
  if (!headlessBaseUrl) return []

  try {
    const url = `${headlessBaseUrl}/${slug}`
    console.log('[headless API] GET', url)
    const headers: HeadersInit = {}
    if (headlessApiToken) {
      headers['Authorization'] = `Bearer ${headlessApiToken}`
    }
    const res = await fetch(url, {
      next: { revalidate },
      headers,
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : [data]
  } catch {
    return []
  }
}

export async function fetchSingleContent<T = Record<string, unknown>>(
  slug: string,
  revalidate = 60,
): Promise<T | null> {
  const items = await fetchCollection<T>(slug, revalidate)
  return items[0] ?? null
}

export function mediaUrl(
  media: HeadlessMedia | HeadlessMedia[] | string | undefined | null,
  fallback = '',
): string {
  if (!media) return fallback
  if (typeof media === 'string') return media || fallback
  if (Array.isArray(media)) return media[0]?.full_url || fallback
  return media.full_url || fallback
}

export function stripHtml(html: string | undefined | null): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}
