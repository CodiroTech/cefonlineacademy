import { fetchBackend } from '../backend'

// --------------- Types ---------------

export type BookshopProductCategory = {
  id: number
  name: string
  slug: string
  is_feature?: string | null
}

export type BookshopProduct = {
  id: number
  title: string
  slug: string
  current_price: number
  old_price?: number | null
  thumbnail_url: string | null
  category: BookshopProductCategory | null
  average_review?: number | null
  discount_percentage?: number | null
  quantity?: number
  created_at?: string | null
}

export type ProductListParams = {
  category_id?: number | null
  min_price?: number | string | null
  max_price?: number | string | null
  rating?: number | string | null
  discount?: number | string | null
  search_key?: string | null
  q?: string | null
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc'
  page?: number
  per_page?: number
  limit?: number
}

export type PaginatedProductList = {
  data: BookshopProduct[]
  total: number
  current_page: number
  last_page: number
  per_page: number
}

type BackendSuccess<T> = { success?: boolean; data?: T; message?: string }

// --------------- Helpers ---------------

function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  })
  const q = search.toString()
  return q ? `?${q}` : ''
}

// --------------- API functions ---------------

/** Featured products for "Our Best Sellers" section. */
export async function getFeaturedProducts(limit = 12): Promise<BookshopProduct[]> {
  const path = `/academy/products${buildQuery({ featured: 1, limit, sort: 'newest' })}`
  const res = await fetchBackend<BackendSuccess<BookshopProduct[]>>(path)
  const list = res?.data
  return Array.isArray(list) ? list : []
}

/** All product categories for sidebar and category sections. */
export async function getProductCategories(): Promise<BookshopProductCategory[]> {
  const res = await fetchBackend<BackendSuccess<BookshopProductCategory[]>>('/academy/product-categories')
  const list = res?.data
  return Array.isArray(list) ? list : []
}

/** Filtered, paginated product list for main grid. */
export async function getProductList(params: ProductListParams): Promise<PaginatedProductList | null> {
  const q: Record<string, string | number> = {}
  if (params.category_id != null) q.category_id = params.category_id
  if (params.min_price != null && params.min_price !== '') q.min_price = Number(params.min_price)
  if (params.max_price != null && params.max_price !== '') q.max_price = Number(params.max_price)
  if (params.rating != null && params.rating !== '') q.rating = Number(params.rating)
  if (params.discount != null && params.discount !== '') q.discount = Number(params.discount)
  const searchKey = params.search_key ?? params.q
  if (searchKey) q.search_key = searchKey
  if (params.sort) q.sort = params.sort
  if (params.page != null) q.page = params.page
  if (params.per_page != null) q.per_page = params.per_page
  if (params.limit != null) q.per_page = params.limit
  const path = `/academy/products/list${buildQuery(q)}`
  const res = await fetchBackend<BackendSuccess<PaginatedProductList>>(path)
  return res?.data ?? null
}

/** Latest N products for a category (for category sections). */
export async function getLatestProductsByCategory(
  categoryId: number,
  limit = 3
): Promise<BookshopProduct[]> {
  const list = await getProductList({
    category_id: categoryId,
    sort: 'newest',
    per_page: limit,
    page: 1,
  })
  return list?.data ?? []
}
