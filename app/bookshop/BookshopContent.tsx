'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getFeaturedProducts,
  getProductCategories,
  getProductList,
  getLatestProductsByCategory,
  type BookshopProduct,
  type BookshopProductCategory,
  type ProductListParams,
} from '@/lib/api/bookshop'
import CEFBOOKSHOP from './course'
import BOOKDETAILS from './charProgram'

export type SortOption = 'newest' | 'oldest' | 'price_asc' | 'price_desc'

export type FilterState = {
  category_id: number | null
  min_price: string
  max_price: string
  discount: string
  rating: string
}

const defaultFilters: FilterState = {
  category_id: null,
  min_price: '',
  max_price: '',
  discount: '',
  rating: '',
}

export default function BookshopContent() {
  const [categories, setCategories] = useState<BookshopProductCategory[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<BookshopProduct[]>([])
  const [categoryLatest, setCategoryLatest] = useState<Record<number, BookshopProduct[]>>({})
  const [gridData, setGridData] = useState<{
    data: BookshopProduct[]
    total: number
    current_page: number
    last_page: number
    per_page: number
  } | null>(null)
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingGrid, setLoadingGrid] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [gridPage, setGridPage] = useState(1)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [cats, featured] = await Promise.all([
        getProductCategories(),
        getFeaturedProducts(12),
      ])
      if (cancelled) return
      setCategories(cats)
      setFeaturedProducts(featured)
      setLoadingCategories(false)
      setLoadingFeatured(false)
      const latestByCat: Record<number, BookshopProduct[]> = {}
      await Promise.all(
        cats.map(async (cat) => {
          const list = await getLatestProductsByCategory(cat.id, 3)
          if (!cancelled) latestByCat[cat.id] = list
        })
      )
      if (!cancelled) setCategoryLatest(latestByCat)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoadingGrid(true)
    const params: ProductListParams = {
      page: gridPage,
      per_page: 9,
      sort,
      search_key: searchQuery || undefined,
      category_id: filters.category_id ?? undefined,
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      discount: filters.discount || undefined,
      rating: filters.rating || undefined,
    }
    getProductList(params).then((result) => {
      if (!cancelled) {
        setGridData(result ?? null)
      }
      setLoadingGrid(false)
    })
    return () => {
      cancelled = true
    }
  }, [sort, searchQuery, filters.category_id, filters.min_price, filters.max_price, filters.discount, filters.rating, gridPage])

  const handleViewAllCategory = useCallback((categoryId: number) => {
    setFilters((f) => ({ ...f, category_id: categoryId }))
    setGridPage(1)
  }, [])

  const handleFilterChange = useCallback((next: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...next }))
    setGridPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters)
    setGridPage(1)
  }, [])

  return (
    <>
      <CEFBOOKSHOP
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sort={sort}
        onSortChange={setSort}
      />
      <BOOKDETAILS
        categories={categories}
        featuredProducts={featuredProducts}
        categoryLatest={categoryLatest}
        gridData={gridData}
        loadingFeatured={loadingFeatured}
        loadingGrid={loadingGrid}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onViewAllCategory={handleViewAllCategory}
        gridPage={gridPage}
        onGridPageChange={setGridPage}
      />
    </>
  )
}
