'use client'

import { useRef } from 'react'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import { ProductCard } from '@/components/bookshop/ProductCard'
import type { BookshopProduct, BookshopProductCategory } from '@/lib/api/bookshop'
import type { FilterState } from './BookshopContent'

const DISCOUNT_OPTIONS = [
  { value: '0', label: '0% off or more' },
  { value: '10', label: '10% off or more' },
  { value: '25', label: '25% off or more' },
  { value: '50', label: '50% off or more' },
  { value: '70', label: '70% off or more' },
]

const RATING_OPTIONS = [
  { value: '5', label: '5 star' },
  { value: '4', label: '4 star or above' },
  { value: '3', label: '3 star or above' },
  { value: '2', label: '2 star or above' },
  { value: '1', label: '1 star or above' },
]

type BOOKDETAILSProps = {
  categories: BookshopProductCategory[]
  featuredProducts: BookshopProduct[]
  categoryLatest: Record<number, BookshopProduct[]>
  gridData: { data: BookshopProduct[]; total: number; current_page: number; last_page: number; per_page: number } | null
  loadingFeatured: boolean
  loadingGrid: boolean
  filters: FilterState
  onFilterChange: (next: Partial<FilterState>) => void
  onClearFilters: () => void
  onViewAllCategory: (categoryId: number) => void
  gridPage: number
  onGridPageChange: (page: number) => void
}

export default function BOOKDETAILS({
  categories,
  featuredProducts,
  categoryLatest,
  gridData,
  loadingFeatured,
  loadingGrid,
  filters,
  onFilterChange,
  onClearFilters,
  onViewAllCategory,
  gridPage,
  onGridPageChange,
}: BOOKDETAILSProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleViewAll = (categoryId: number) => {
    onViewAllCategory(categoryId)
    scrollToGrid()
  }

  const sidebarContent = (
    <>
      <FilterBlock title="Categories" showClear onClear={onClearFilters}>
        <label className="flex items-center gap-2 text-gray-700 text-[11px] cursor-pointer">
          <input
            type="radio"
            name="filterCategory"
            checked={filters.category_id === null}
            onChange={() => onFilterChange({ category_id: null })}
            className="relative appearance-none w-3 h-3 rounded-full bg-gray-400 checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-1.5 checked:after:h-1.5 checked:after:rounded-full checked:after:bg-black"
          />
          All
        </label>
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center gap-2 text-gray-700 text-[11px] cursor-pointer">
            <input
              type="radio"
              name="filterCategory"
              checked={filters.category_id === cat.id}
              onChange={() => onFilterChange({ category_id: cat.id })}
              className="relative appearance-none w-3 h-3 rounded-full bg-gray-400 checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-1.5 checked:after:h-1.5 checked:after:rounded-full checked:after:bg-black"
            />
            {cat.name}
          </label>
        ))}
      </FilterBlock>
      <FilterBlock title="Price">
        <div className="flex gap-2 text-[11px] text-gray-700">
          <input
            type="number"
            placeholder="Min PKR"
            value={filters.min_price}
            onChange={(e) => onFilterChange({ min_price: e.target.value })}
            className="w-1/2 rounded-lg border border-gray-400 px-2 py-1 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Max PKR"
            value={filters.max_price}
            onChange={(e) => onFilterChange({ max_price: e.target.value })}
            className="w-1/2 rounded-lg border border-gray-400 px-2 py-1 focus:outline-none"
          />
        </div>
      </FilterBlock>
      <FilterBlock title="Discount">
        {DISCOUNT_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-gray-700 text-[11px] cursor-pointer">
            <input
              type="radio"
              name="filterDiscount"
              value={opt.value}
              checked={filters.discount === opt.value}
              onChange={() => onFilterChange({ discount: opt.value })}
              className="relative appearance-none w-3 h-3 rounded-full bg-gray-400 checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-1.5 checked:after:h-1.5 checked:after:rounded-full checked:after:bg-black"
            />
            {opt.label}
          </label>
        ))}
      </FilterBlock>
      <FilterBlock title="Rating">
        {RATING_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-gray-700 text-[11px] cursor-pointer">
            <input
              type="radio"
              name="filterRating"
              value={opt.value}
              checked={filters.rating === opt.value}
              onChange={() => onFilterChange({ rating: opt.value })}
              className="relative appearance-none w-3 h-3 rounded-full bg-gray-400 checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-1.5 checked:after:h-1.5 checked:after:rounded-full checked:after:bg-black"
            />
            {opt.label}
          </label>
        ))}
      </FilterBlock>
    </>
  )

  return (
    <section className="w-full pb-10 font-poppins">
      <div className="w-full max-w-7xl mx-auto px-2">

        {/* ================= MOBILE & TABLET FILTERS ================= */}
        <div className="xl:hidden w-full mb-6 flex flex-col gap-4 px-2">
          {sidebarContent}
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex flex-col md:flex-row items-start">

          {/* ================= DESKTOP FILTER SIDEBAR ================= */}
          <aside className="hidden xl:block w-60 text-[14px] font-semibold self-start ml-12">
            {sidebarContent}
          </aside>

          {/* ================= CONTENT ================= */}
          <div className="flex-1 xl:-ml-24">

            {/* OUR BEST SELLERS */}
            <div className="text-center mb-6">
              <Heading textSize="text-[34px] sm:text-[36px] md:text-[38px]">
                Our Best Sellers
              </Heading>
              {loadingFeatured ? (
                <div className="mt-2 text-gray-500">Loading...</div>
              ) : featuredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 px-2">
                  {featuredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-gray-500">No featured products at the moment.</p>
              )}
            </div>

            {/* CATEGORY SECTIONS (latest 3 + View all) */}
            {categories.map((cat) => {
              const products = categoryLatest[cat.id] ?? []
              return (
                <div key={cat.id} className="text-center mb-6">
                  <Heading textSize="text-[34px] sm:text-[36px] md:text-[38px]">
                    {cat.name}
                  </Heading>
                  {products.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 px-2">
                        {products.map((p) => (
                          <ProductCard key={p.id} product={p} />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleViewAll(cat.id)}
                        className="mt-2 rounded-lg border border-[#065D80] px-4 py-2 text-sm font-medium text-[#065D80] hover:bg-[#065D80] hover:text-white transition-colors"
                      >
                        View all
                      </button>
                    </>
                  ) : (
                    <p className="mt-2 text-gray-500">No products in this category.</p>
                  )}
                </div>
              )
            })}

            {/* UNIFIED PRODUCT GRID */}
            <div ref={gridRef} className="mt-6">
              <Heading textSize="text-[28px] sm:text-[32px] md:text-[34px]">
                All Products
              </Heading>
              {loadingGrid ? (
                <div className="mt-2 text-gray-500">Loading...</div>
              ) : gridData && gridData.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 px-2">
                    {gridData.data.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                  {gridData.last_page > 1 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <button
                        type="button"
                        disabled={gridPage <= 1}
                        onClick={() => onGridPageChange(gridPage - 1)}
                        className="rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-1 text-sm text-gray-600">
                        Page {gridData.current_page} of {gridData.last_page}
                      </span>
                      <button
                        type="button"
                        disabled={gridPage >= gridData.last_page}
                        onClick={() => onGridPageChange(gridPage + 1)}
                        className="rounded border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-2 text-gray-500">No products match your filters.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= FILTER COMPONENTS ================= */

function FilterBlock({
  title,
  children,
  showClear = false,
  onClear,
}: {
  title: string
  children: React.ReactNode
  showClear?: boolean
  onClear?: () => void
}) {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="flex items-center justify-between mb-1">
        <Text className="font-semibold text-[12px]">{title}</Text>
        {showClear && (
          <button type="button" onClick={onClear} className="text-[10px] font-bold hover:underline">
            Clear
          </button>
        )}
      </div>
      <div className="space-y-1.5">{children}</div>
      <hr className="border-black border-t-2 mt-2" />
    </div>
  )
}
