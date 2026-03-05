/**
 * Category courses API – filters and list (same behaviour as cef-backend category/courses page).
 * Uses GET /api/academy/category-courses with query params.
 */

export type CategoryCourseItem = {
  id: number
  slug: string
  title: string
  subtitle: string
  language_name: string
  average_rating: number
  image_url: string
  price: number
  classes: number
  currency_symbol: string
}

export type CategoryCoursesResponse = {
  success: boolean
  message?: string
  data?: {
    category: { id: number; name: string; slug: string }
    categories: Array<{ id: number; name: string; slug: string }>
    difficulty_levels: Array<{ id: number; name: string }>
    courses: CategoryCourseItem[]
  }
}

export type CategoryItem = {
  id: number
  name: string
  slug: string
}

export type CategoryCoursesFilters = {
  category_slug: string
  keyword?: string
  sortBy_id?: 1 | 2 | 3  // 1 All, 2 Newest, 3 Oldest
  categoryId?: number
  difficultyLevelId?: number
  ratingId?: number
  learnerAccessibilityType?: 'free' | 'paid'
  durationId?: number  // 1–4
  limit?: number
}

function getBackendBase(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
  }
  return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
}

export async function fetchCategoryCourses(
  filters: CategoryCoursesFilters
): Promise<CategoryCoursesResponse['data'] | null> {
  const base = getBackendBase()
  if (!base) return null

  const params = new URLSearchParams()
  params.set('category_slug', filters.category_slug)
  if (filters.keyword?.trim()) params.set('keyword', filters.keyword.trim())
  if (filters.sortBy_id) params.set('sortBy_id', String(filters.sortBy_id))
  if (filters.categoryId) params.set('categoryId', String(filters.categoryId))
  if (filters.difficultyLevelId) params.set('difficultyLevelId', String(filters.difficultyLevelId))
  if (filters.ratingId !== undefined && filters.ratingId !== null) params.set('ratingId', String(filters.ratingId))
  if (filters.learnerAccessibilityType) params.set('learnerAccessibilityType', filters.learnerAccessibilityType)
  if (filters.durationId) params.set('durationId', String(filters.durationId))
  if (filters.limit != null && filters.limit > 0) params.set('limit', String(filters.limit))

  const url = `${base.replace(/\/$/, '')}/academy/category-courses?${params.toString()}`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const json = (await res.json()) as CategoryCoursesResponse
    if (!res.ok || !json.success || !json.data) return null
    return json.data
  } catch {
    return null
  }
}

/** GET /api/academy/categories – list of categories (id, name, slug). categoryType: 1 = Quran Tutoring, 2 = Others */
export async function fetchCategories(categoryType?: 1 | 2): Promise<CategoryItem[] | null> {
  const base = getBackendBase()
  if (!base) return null
  const params = new URLSearchParams()
  if (categoryType !== undefined && categoryType !== null) params.set('type', String(categoryType))
  const url = `${base.replace(/\/$/, '')}/academy/categories${params.toString() ? `?${params.toString()}` : ''}`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const json = (await res.json()) as { success?: boolean; data?: CategoryItem[] }
    if (!res.ok || !json.success || !Array.isArray(json.data)) return null
    return json.data
  } catch {
    return null
  }
}

/** GET /api/academy/courses?featured=1&limit=1 – one featured course, mapped to CategoryCourseItem shape */
export async function fetchFeaturedCourse(): Promise<CategoryCourseItem | null> {
  const base = getBackendBase()
  if (!base) return null
  const url = `${base.replace(/\/$/, '')}/academy/courses?featured=1&limit=1`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const json = (await res.json()) as { success?: boolean; data?: Array<Record<string, unknown>> }
    if (!res.ok || !json.success || !Array.isArray(json.data) || json.data.length === 0) return null
    const c = json.data[0]
    return {
      id: (c?.id as number) ?? 0,
      slug: (c?.slug as string) ?? '',
      title: (c?.title as string) ?? '',
      subtitle: (c?.subtitle as string) ?? (c?.short_description as string) ?? '',
      language_name: (c?.category as { name?: string })?.name ?? 'English',
      average_rating: 0,
      image_url: (c?.image_url as string) ?? '',
      price: Number(c?.price) ?? 0,
      classes: 0,
      currency_symbol: 'Rs',
    }
  } catch {
    return null
  }
}
