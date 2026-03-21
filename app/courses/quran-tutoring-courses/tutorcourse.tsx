'use client'

import { useCallback, useEffect, useState } from 'react'
import { CategoryCoursesSwiper } from '@/components/courses/CategoryCoursesSwiper'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import {
  fetchSubcategories,
  fetchCategoryCourses,
  type CategoryCourseItem,
  type SubcategoryItem,
  type CategoryCoursesFilters,
} from '@/lib/api/categoryCourses'
import { useCourseFilters, defaultFilters } from './CourseFiltersContext'

const RATING_OPTIONS = [
  { value: 5, label: '5 star' },
  { value: 4, label: '4 star or above' },
  { value: 3, label: '3 star or above' },
  { value: 2, label: '2 star or above' },
  { value: 1, label: '1 star or above' },
] as const

const PRICE_OPTIONS = [
  { value: 'free' as const, label: 'Free' },
  { value: 'paid' as const, label: 'Paid' },
]

const DURATION_OPTIONS = [
  { value: 1, label: 'Less than 24 Hours' },
  { value: 2, label: '24 to 36 hours' },
  { value: 3, label: '36 to 72 hours' },
  { value: 4, label: 'Above 72 hours' },
]

type CategoryType = 1 | 2

type TajweedCoursesSectionProps = {
  categoryType?: CategoryType
  fallbackSectionTitle?: string
}

function isFreeCourse(c: CategoryCourseItem) {
  const p = Number(c.price)
  return Number.isNaN(p) || p <= 0
}

export default function TajweedCoursesSection({
  categoryType = 1,
  fallbackSectionTitle = 'Tajweed ul Quran Courses',
}: TajweedCoursesSectionProps) {
  const { filters, setFilters } = useCourseFilters()
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>([])
  const [keywordDebounced, setKeywordDebounced] = useState('')
  const [firstSubcategoryCourses, setFirstSubcategoryCourses] = useState<CategoryCourseItem[]>([])
  const [difficultyLevels, setDifficultyLevels] = useState<Array<{ id: number; name: string }>>([])
  const [otherSubcategoryCourses, setOtherSubcategoryCourses] = useState<Record<string, CategoryCourseItem[]>>({})
  const [loading, setLoading] = useState(false)
  const [loadingOthers, setLoadingOthers] = useState(false)
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(true)

  const firstSubcategory = subcategories[0]

  useEffect(() => {
    const t = setTimeout(() => setKeywordDebounced(filters.keyword), 400)
    return () => clearTimeout(t)
  }, [filters.keyword])

  const loadFirstSubcategory = useCallback(async () => {
    if (!firstSubcategory?.category_slug) {
      setLoading(false)
      return
    }
    setLoading(true)
    const params: CategoryCoursesFilters = {
      category_slug: firstSubcategory.category_slug,
      subcategory_slug: firstSubcategory.slug,
      keyword: keywordDebounced || undefined,
      sortBy_id: filters.sortBy_id,
    }
    if (filters.categoryId != null) params.categoryId = filters.categoryId
    if (filters.difficultyLevelId != null) params.difficultyLevelId = filters.difficultyLevelId
    if (filters.ratingId != null) params.ratingId = filters.ratingId
    if (filters.learnerAccessibilityType) params.learnerAccessibilityType = filters.learnerAccessibilityType
    if (filters.durationId != null) params.durationId = filters.durationId

    const data = await fetchCategoryCourses(params)
    setLoading(false)
    if (data) {
      setFirstSubcategoryCourses(data.courses)
      setDifficultyLevels(data.difficulty_levels)
    } else {
      setFirstSubcategoryCourses([])
    }
  }, [firstSubcategory, keywordDebounced, filters])

  useEffect(() => {
    if (firstSubcategory?.category_slug) {
      loadFirstSubcategory()
    }
  }, [firstSubcategory?.slug, firstSubcategory?.category_slug, loadFirstSubcategory])

  useEffect(() => {
    let cancelled = false
    async function run() {
      setSubcategoriesLoading(true)
      try {
        const list = await fetchSubcategories(categoryType)
        if (cancelled) return
        setSubcategories(list ?? [])

        if (!list || list.length <= 1) {
          setLoadingOthers(false)
          setOtherSubcategoryCourses({})
          return
        }

        setLoadingOthers(true)
        const next: Record<string, CategoryCourseItem[]> = {}
        await Promise.all(
          list.slice(1).map(async (sub) => {
            if (!sub.category_slug) return
            const data = await fetchCategoryCourses({
              category_slug: sub.category_slug,
              subcategory_slug: sub.slug,
            })
            if (!cancelled && data?.courses) next[sub.slug] = data.courses
          }),
        )
        if (!cancelled) {
          setOtherSubcategoryCourses(next)
        }
        setLoadingOthers(false)
      } finally {
        if (!cancelled) setSubcategoriesLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [categoryType])

  const handleClear = () => {
    setFilters(defaultFilters)
    setKeywordDebounced('')
  }

  const filterByPrice = (list: CategoryCourseItem[]) => {
    const type = filters.learnerAccessibilityType
    if (!type) return list
    if (type === 'free') return list.filter((c) => isFreeCourse(c))
    return list.filter((c) => !isFreeCourse(c))
  }

  const getCoursesForSubcategory = (sub: SubcategoryItem) => {
    const raw =
      sub.slug === firstSubcategory?.slug
        ? firstSubcategoryCourses
        : (otherSubcategoryCourses[sub.slug] ?? [])
    return filterByPrice(raw)
  }

  const subcategoriesWithCourses = subcategories.filter((sub) => getCoursesForSubcategory(sub).length > 0)
  const displaySubcategories =
    filters.categoryId != null ? subcategories.filter((s) => s.id === filters.categoryId) : subcategories

  const isSubcategoryLoading = (sub: SubcategoryItem) => {
    if (sub.slug === firstSubcategory?.slug) return loading
    if (subcategories.length <= 1) return false
    return loadingOthers && otherSubcategoryCourses[sub.slug] === undefined
  }

  const showSkeleton = (sub: SubcategoryItem) => {
    if (sub.slug === firstSubcategory?.slug) return loading
    return isSubcategoryLoading(sub)
  }

  return (
    <section className="w-full py-12 lg:pb-12 font-poppins">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex w-full flex-col items-center">
          {!subcategoriesLoading &&
            displaySubcategories.map((sub, index) => (
            <div key={sub.id} className={`w-full flex flex-col items-center ${index > 0 ? 'mt-12' : ''}`}>
              <div className="mb-8 text-center">
                <Heading textSize="text-3xl sm:text-4xl md:text-5xl">{sub.name}</Heading>
              </div>

              {showSkeleton(sub) ? (
                <div className="w-full rounded-tr-[60px] rounded-bl-[60px] border border-gray-100 bg-gray-50/80 px-4 py-6 shadow-sm">
                  <div className="flex justify-center gap-4 overflow-hidden">
                    {[1, 2, 3, 4].map((k) => (
                      <div
                        key={k}
                        className="hidden h-[26rem] w-[220px] shrink-0 animate-pulse rounded-tr-[40px] rounded-bl-[40px] bg-[#EAF4F6]/80 sm:block sm:w-[270px] lg:w-[300px]"
                      />
                    ))}
                    <div className="h-[26rem] w-full max-w-[300px] animate-pulse rounded-tr-[40px] rounded-bl-[40px] bg-[#EAF7E5]/80 sm:hidden" />
                  </div>
                </div>
              ) : (() => {
                  const courses = getCoursesForSubcategory(sub)
                  if (courses.length === 0) {
                    return <div className="py-12 text-center text-gray-500">No courses found.</div>
                  }
                  return (
                    <div className="w-full">
                      <CategoryCoursesSwiper courses={courses} />
                    </div>
                  )
                })()}
            </div>
          ))}

          {subcategoriesLoading ? (
            <div className="py-12 text-center text-gray-500">Loading…</div>
          ) : null}

          {!subcategoriesLoading && subcategories.length === 0 && (
            <div className="w-full text-center">
              <div className="mb-6">
                <Heading textSize="text-3xl sm:text-4xl md:text-5xl">{fallbackSectionTitle}</Heading>
              </div>
              <p className="text-gray-500">No course sections found.</p>
            </div>
          )}

          {!subcategoriesLoading && displaySubcategories.length === 0 && subcategories.length > 0 && (
            <div className="py-12 text-center text-gray-500">No matching subcategory.</div>
          )}

          {/* Filters: same markup as before (hidden) — keeps filter state / future UI */}
          <aside className="sr-only" aria-hidden="true">
            <FilterBlock title="Subcategories" showClear onClear={handleClear}>
              {subcategoriesWithCourses.length > 0 ? (
                subcategoriesWithCourses.map((s) => (
                  <FilterItem
                    key={s.id}
                    name="subcategory"
                    label={s.name}
                    value={s.id}
                    checked={filters.categoryId === s.id}
                    onChange={() =>
                      setFilters((f) => ({ ...f, categoryId: f.categoryId === s.id ? null : s.id }))
                    }
                  />
                ))
              ) : (
                <span className="text-[12px] text-gray-500">—</span>
              )}
            </FilterBlock>
            <FilterBlock title="Course Level">
              {difficultyLevels.length > 0 ? (
                difficultyLevels.map((d) => (
                  <FilterItem
                    key={d.id}
                    name="level"
                    label={d.name}
                    value={d.id}
                    checked={filters.difficultyLevelId === d.id}
                    onChange={() =>
                      setFilters((f) => ({
                        ...f,
                        difficultyLevelId: f.difficultyLevelId === d.id ? null : d.id,
                      }))
                    }
                  />
                ))
              ) : (
                <span className="text-[12px] text-gray-500">—</span>
              )}
            </FilterBlock>
            <FilterBlock title="Rating">
              {RATING_OPTIONS.map((r) => (
                <FilterItem
                  key={r.value}
                  name="rating"
                  label={r.label}
                  value={r.value}
                  checked={filters.ratingId === r.value}
                  onChange={() =>
                    setFilters((f) => ({ ...f, ratingId: f.ratingId === r.value ? null : r.value }))
                  }
                />
              ))}
            </FilterBlock>
            <FilterBlock title="Price">
              {PRICE_OPTIONS.map((p) => (
                <FilterItem
                  key={p.value}
                  name="price"
                  label={p.label}
                  value={p.value}
                  checked={filters.learnerAccessibilityType === p.value}
                  onChange={() =>
                    setFilters((f) => ({
                      ...f,
                      learnerAccessibilityType:
                        f.learnerAccessibilityType === p.value ? null : p.value,
                    }))
                  }
                />
              ))}
            </FilterBlock>
            <FilterBlock title="Duration">
              {DURATION_OPTIONS.map((d) => (
                <FilterItem
                  key={d.value}
                  name="duration"
                  label={d.label}
                  value={d.value}
                  checked={filters.durationId === d.value}
                  onChange={() =>
                    setFilters((f) => ({ ...f, durationId: f.durationId === d.value ? null : d.value }))
                  }
                />
              ))}
            </FilterBlock>
          </aside>
        </div>
      </div>
    </section>
  )
}

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
    <div className="mb-3 w-full">
      <div className="mb-1 flex items-center justify-between">
        <Text className="text-[11px] font-bold text-black">{title}</Text>
        {showClear && (
          <button type="button" onClick={onClear} className="text-[12px] font-bold text-black hover:underline">
            Clear
          </button>
        )}
      </div>
      <div className="space-y-1">{children}</div>
      <hr className="mt-2 border-t-2 border-black" />
    </div>
  )
}

function FilterItem({
  label,
  name,
  value,
  checked,
  onChange,
}: {
  label: string
  name: string
  value: number | string | null
  checked: boolean
  onChange: () => void
}) {
  const id = `${name}-${value ?? label.replace(/\s/g, '-')}`
  return (
    <label className="flex cursor-pointer items-center gap-1 text-[12px] text-gray-700">
      <input
        type="radio"
        name={name}
        id={id}
        value={value ?? ''}
        checked={checked}
        onChange={onChange}
        className="
          relative h-3 w-3 appearance-none rounded-full bg-gray-400
          checked:after:absolute checked:after:top-1/2 checked:after:left-1/2
          checked:after:h-1.5 checked:after:w-1.5 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
          checked:after:rounded-full checked:after:bg-black checked:after:content-['']
        "
      />
      {label}
    </label>
  )
}
