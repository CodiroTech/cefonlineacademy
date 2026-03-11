/**
 * Combined search: headless (CMS content) + backend (courses, blogs).
 * Returns a single paginated list with shared result shape.
 */

import { fetchBackend } from '../backend'
import { searchHeadless, type SearchResultItem } from '../search/searchHeadless'

const DEFAULT_PAGE_SIZE = 10
const BACKEND_SEARCH_LIMIT = 20

export type SearchResult = {
  items: SearchResultItem[]
  total: number
  page: number
  pageSize: number
}

type BackendSearchResponse = {
  data?: {
    courses?: { id: number; type: string; title: string; slug: string; description?: string; image_url?: string; url: string }[]
    blogs?: { id: number; type: string; title: string; slug: string; description?: string; image_url?: string; url: string }[]
  }
  courses?: { id: number; type: string; title: string; slug: string; description?: string; image_url?: string; url: string }[]
  blogs?: { id: number; type: string; title: string; slug: string; description?: string; image_url?: string; url: string }[]
}

function mapBackendToResultItem(
  item: { id: number; type: string; title: string; slug: string; url: string },
  collectionLabel: string,
  urlOverride: string,
): SearchResultItem {
  return {
    id: item.id,
    collectionSlug: item.type,
    collectionLabel,
    title: item.title || 'Untitled',
    url: urlOverride,
  }
}

/** Call backend GET /api/academy/search; map to SearchResultItem[] */
async function searchBackend(q: string): Promise<SearchResultItem[]> {
  const query = (typeof q === 'string' ? q : '').trim()
  if (query === '') return []

  const path = `/api/academy/search?q=${encodeURIComponent(query)}&type=all&limit=${BACKEND_SEARCH_LIMIT}`
  const res = await fetchBackend<BackendSearchResponse>(path, 60)
  if (!res || typeof res !== 'object') return []

  const courses = res.data?.courses ?? res.courses ?? []
  const blogs = res.data?.blogs ?? res.blogs ?? []

  const items: SearchResultItem[] = []
  for (const c of courses) {
    items.push(
      mapBackendToResultItem(c, 'Course', `/course-details/${c.slug || c.id}`),
    )
  }
  for (const b of blogs) {
    items.push(
      mapBackendToResultItem(b, 'Blog', '/media-center/blogs'),
    )
  }
  return items
}

/**
 * Combined search: runs headless and backend in parallel, merges and paginates.
 */
export async function searchCombined(
  q: string,
  options: { page?: number; pageSize?: number } = {},
): Promise<SearchResult> {
  const query = (typeof q === 'string' ? q : '').trim()
  const page = Math.max(1, options.page ?? 1)
  const pageSize = Math.min(50, Math.max(1, options.pageSize ?? DEFAULT_PAGE_SIZE))

  if (query === '') {
    return { items: [], total: 0, page, pageSize }
  }

  const [headlessItems, backendItems] = await Promise.all([
    searchHeadless(query),
    searchBackend(query),
  ])

  const allItems: SearchResultItem[] = [...headlessItems, ...backendItems]
  const total = allItems.length
  const start = (page - 1) * pageSize
  const items = allItems.slice(start, start + pageSize)

  return { items, total, page, pageSize }
}
