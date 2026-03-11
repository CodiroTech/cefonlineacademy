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

export type FetchCollectionOptions = {
  search?: string
  limit?: number
}

export async function fetchCollection<T = Record<string, unknown>>(
  slug: string,
  revalidate = 60,
  options?: FetchCollectionOptions,
): Promise<T[]> {
  if (!headlessBaseUrl) return []

  try {
    let url = `${headlessBaseUrl}/${slug}`
    const params = new URLSearchParams()
    if (options?.search?.trim()) params.set('search', options.search.trim())
    if (options?.limit != null && options.limit > 0) params.set('limit', String(options.limit))
    if (params.toString()) url += `?${params.toString()}`
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
    // Unwrap common API shapes: array, { data: [] }, { contents: [] }, { items: [] }
    let items: unknown[] = []
    if (Array.isArray(data)) {
      items = data
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) items = data.data
      else if (Array.isArray(data.contents)) items = data.contents
      else if (Array.isArray(data.items)) items = data.items
      else items = [data]
    }
    return items as T[]
  } catch {
    return []
  }
}

/**
 * Fetches a collection with optional search; supports headless API response shape
 * { main: [...], relations: [{ collection_slug, collection_label, parent_slug, items: [...] }] }
 * when search is present. Returns raw response for search callers that need to unwrap main + relations.
 */
export async function fetchCollectionWithSearch<T = Record<string, unknown>>(
  slug: string,
  options?: { search?: string; limit?: number },
  revalidate = 60,
): Promise<{ main: T[]; relations: { collection_slug: string; collection_label: string; parent_slug: string; items: T[] }[] } | T[]> {
  if (!headlessBaseUrl) return { main: [], relations: [] }

  const search = options?.search?.trim() ?? ''
  const limit = options?.limit ?? 30
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  params.set('limit', String(limit))

  try {
    const url = `${headlessBaseUrl}/${slug}?${params.toString()}`
    console.log('[headless API] GET', url)
    const headers: HeadersInit = {}
    if (headlessApiToken) {
      headers['Authorization'] = `Bearer ${headlessApiToken}`
    }
    const res = await fetch(url, { next: { revalidate }, headers })
    if (!res.ok) return { main: [], relations: [] }
    const data = await res.json()

    if (data && typeof data === 'object' && Array.isArray(data.main) && Array.isArray(data.relations)) {
      return {
        main: (data.main ?? []) as T[],
        relations: (data.relations ?? []) as { collection_slug: string; collection_label: string; parent_slug: string; items: T[] }[],
      }
    }
    let items: unknown[] = []
    if (Array.isArray(data)) items = data
    else if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) items = data.data
      else if (Array.isArray(data.contents)) items = data.contents
      else if (Array.isArray(data.items)) items = data.items
      else items = [data]
    }
    return items as T[]
  } catch {
    return { main: [], relations: [] }
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
