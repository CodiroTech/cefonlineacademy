'use client'

import { useCallback, useEffect, useState } from 'react'
import { CourseCard } from '@/components/courses/CourseCard'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import {
  fetchCategories,
  fetchCategoryCourses,
  fetchFeaturedCourse,
  type CategoryCourseItem,
  type CategoryItem,
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

type CategoryType = 1 | 2  // 1 = Quran Tutoring, 2 = Others

type TajweedCoursesSectionProps = {
  categoryType?: CategoryType
  fallbackSectionTitle?: string
}

export default function TajweedCoursesSection({ categoryType = 1, fallbackSectionTitle = 'Tajweed ul Quran Courses' }: TajweedCoursesSectionProps) {
  const { filters, setFilters } = useCourseFilters()
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [featuredCourse, setFeaturedCourse] = useState<CategoryCourseItem | null>(null)
  const [keywordDebounced, setKeywordDebounced] = useState('')
  const [firstCategoryCourses, setFirstCategoryCourses] = useState<CategoryCourseItem[]>([])
  const [difficultyLevels, setDifficultyLevels] = useState<Array<{ id: number; name: string }>>([])
  const [otherCategoryCourses, setOtherCategoryCourses] = useState<Record<string, CategoryCourseItem[]>>({})
  const [loading, setLoading] = useState(true)
  const [loadingOthers, setLoadingOthers] = useState(true)

  const firstCategory = categories[0]

  useEffect(() => {
    const t = setTimeout(() => setKeywordDebounced(filters.keyword), 400)
    return () => clearTimeout(t)
  }, [filters.keyword])

  const loadFirstCategory = useCallback(async () => {
    if (!firstCategory) return
    setLoading(true)
    const params: CategoryCoursesFilters = {
      category_slug: firstCategory.slug,
      keyword: keywordDebounced || undefined,
      sortBy_id: filters.sortBy_id,
      limit: 4,
    }
    if (filters.categoryId != null) params.categoryId = filters.categoryId
    if (filters.difficultyLevelId != null) params.difficultyLevelId = filters.difficultyLevelId
    if (filters.ratingId != null) params.ratingId = filters.ratingId
    if (filters.learnerAccessibilityType) params.learnerAccessibilityType = filters.learnerAccessibilityType
    if (filters.durationId != null) params.durationId = filters.durationId

    const data = await fetchCategoryCourses(params)
    setLoading(false)
    if (data) {
      setFirstCategoryCourses(data.courses)
      setDifficultyLevels(data.difficulty_levels)
    } else {
      setFirstCategoryCourses([])
    }
  }, [firstCategory, keywordDebounced, filters])

  useEffect(() => {
    if (firstCategory) {
      loadFirstCategory()
    }
  }, [firstCategory?.slug, loadFirstCategory])

  useEffect(() => {
    let cancelled = false
    async function run() {
      const list = await fetchCategories(categoryType)
      if (cancelled) return
      setCategories(list ?? [])
      const featured = await fetchFeaturedCourse()
      if (!cancelled) setFeaturedCourse(featured)
      if (list && list.length > 1) {
        setLoadingOthers(true)
        const next: Record<string, CategoryCourseItem[]> = {}
        await Promise.all(
          list.slice(1).map(async (cat) => {
            const data = await fetchCategoryCourses({ category_slug: cat.slug, limit: 4 })
            if (!cancelled && data?.courses) next[cat.slug] = data.courses
          })
        )
        if (!cancelled) {
          setOtherCategoryCourses((p) => ({ ...p, ...next }))
        }
        setLoadingOthers(false)
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

  /** Filter courses by Free (price === 0) or Paid (price > 0). */
  const filterByPrice = (list: CategoryCourseItem[]) => {
    const type = filters.learnerAccessibilityType
    if (!type) return list
    if (type === 'free') return list.filter((c) => c.price === 0)
    return list.filter((c) => c.price > 0)
  }

  const getCoursesForCategory = (cat: CategoryItem) => {
    const raw =
      cat.slug === firstCategory?.slug ? firstCategoryCourses : (otherCategoryCourses[cat.slug] ?? [])
    return filterByPrice(raw)
  }

  const categoriesWithCourses = categories.filter(
    (cat) => getCoursesForCategory(cat).length > 0
  )
  const firstCategoryWithCourses = categoriesWithCourses[0]

  /** Featured course only shown when it matches the price filter. */
  const showFeaturedCourse: CategoryCourseItem | null =
    featuredCourse &&
    (filters.learnerAccessibilityType === 'free'
      ? featuredCourse.price === 0
      : filters.learnerAccessibilityType === 'paid'
        ? featuredCourse.price > 0
        : true)
      ? featuredCourse
      : null

  return (
    <section className="w-full py-12 lg:pb-12 font-poppins">
      <div className="container mx-auto">

        <div className="flex justify-center lg:ml-47 mb-8 text-center">
          <Heading textSize="text-3xl sm:text-4xl md:text-4xl">
            {firstCategoryWithCourses ? firstCategoryWithCourses.name : firstCategory ? firstCategory.name : fallbackSectionTitle}
          </Heading>
        </div>

        <div
          className="
            grid gap-5
            grid-cols-1
            md:grid-cols-2
            xl:flex xl:flex-row xl:gap-1
          "
        >

          <aside
            className="
              hidden
              md:col-span-1
              xl:w-auto xl:shrink-0 xl:mr-6
              font-medium leading-none
              relative
              mx-auto md:mx-0 w-full max-w-xs
            "
            aria-hidden="true"
          >
            <div className="flex flex-col items-start md:items-start">
              <FilterBlock title="Categories" showClear onClear={handleClear}>
                {categoriesWithCourses.length > 0 ? (
                  categoriesWithCourses.map((c) => (
                    <FilterItem
                      key={c.id}
                      name="category"
                      label={c.name}
                      value={c.id}
                      checked={filters.categoryId === c.id}
                      onChange={() => setFilters((f) => ({ ...f, categoryId: f.categoryId === c.id ? null : c.id }))}
                    />
                  ))
                ) : (
                  <span className="text-gray-500 text-[12px]">Loading…</span>
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
                      onChange={() => setFilters((f) => ({ ...f, difficultyLevelId: f.difficultyLevelId === d.id ? null : d.id }))}
                    />
                  ))
                ) : (
                  <span className="text-gray-500 text-[12px]">Loading…</span>
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
                    onChange={() => setFilters((f) => ({ ...f, ratingId: f.ratingId === r.value ? null : r.value }))}
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
                    onChange={() => setFilters((f) => ({ ...f, learnerAccessibilityType: f.learnerAccessibilityType === p.value ? null : p.value }))}
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
                    onChange={() => setFilters((f) => ({ ...f, durationId: f.durationId === d.value ? null : d.value }))}
                  />
                ))}
              </FilterBlock>
            </div>
          </aside>

          <div className="mx-auto md:mx-0 md:col-span-1 min-w-0 shrink-0 w-full max-w-[320px] xl:max-w-[290px] xl:ml-6 xl:mr-0">
            <div className="bg-[#EAF4F6] px-6 py-6 rounded-tr-[60px] rounded-bl-[60px]">
              {loading && !featuredCourse ? (
                <div className="min-h-[26rem] flex items-center justify-center text-gray-500 text-sm">Loading...</div>
              ) : showFeaturedCourse ? (
                <CourseCard
                  slug={showFeaturedCourse.slug}
                  title={showFeaturedCourse.title}
                  subtitle={showFeaturedCourse.subtitle}
                  languageName={showFeaturedCourse.language_name}
                  averageRating={String(showFeaturedCourse.average_rating)}
                  imageUrl={showFeaturedCourse.image_url}
                  price={showFeaturedCourse.price}
                  classes={showFeaturedCourse.classes}
                  currencySymbol={showFeaturedCourse.currency_symbol}
                />
              ) : (
                <div className="min-h-[26rem] flex items-center justify-center text-gray-500 text-sm">No featured course</div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 xl:col-span-auto min-w-0 xl:flex-1 overflow-hidden flex justify-center">
            <div className="bg-[#EAF7E5] px-6 py-6 rounded-tr-[60px] rounded-bl-[60px] w-fit">
              {loading && !firstCategoryWithCourses ? (
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="min-h-[26rem] w-[252px] max-w-full rounded-none bg-white/80 animate-pulse" />
                  <div className="min-h-[26rem] w-[252px] max-w-full rounded-none bg-white/80 animate-pulse" />
                  <div className="min-h-[26rem] w-[252px] max-w-full rounded-none bg-white/80 animate-pulse" />
                </div>
              ) : firstCategoryWithCourses ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {getCoursesForCategory(firstCategoryWithCourses).map((course) => (
                    <div key={course.id} className="w-[252px] max-w-full xl:w-[240px] 2xl:w-[252px]">
                      <CourseCard
                        slug={course.slug}
                        title={course.title}
                        subtitle={course.subtitle}
                        languageName={course.language_name}
                        averageRating={String(course.average_rating)}
                        imageUrl={course.image_url}
                        price={course.price}
                        classes={course.classes}
                        currencySymbol={course.currency_symbol}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">No courses found.</div>
              )}
            </div>
          </div>

        </div>

        <div className="w-full flex flex-col items-center">
          {categoriesWithCourses.slice(1).map((cat) => (
            <div key={cat.id} className="mt-12 w-full flex flex-col items-center">
              <div className="flex justify-center lg:ml-47 mb-6 text-center">
                <Heading textSize="text-3xl sm:text-4xl md:text-4xl">
                  {cat.name}
                </Heading>
              </div>
              <div className="bg-[#EAF7E5] px-6 py-6 rounded-tr-[60px] rounded-bl-[60px] w-fit">
                <div className="flex flex-wrap justify-center gap-4">
                  {getCoursesForCategory(cat).map((course) => (
                    <div key={course.id} className="w-[252px] max-w-full xl:w-[240px] 2xl:w-[252px]">
                      <CourseCard
                        slug={course.slug}
                        title={course.title}
                        subtitle={course.subtitle}
                        languageName={course.language_name}
                        averageRating={String(course.average_rating)}
                        imageUrl={course.image_url}
                        price={course.price}
                        classes={course.classes}
                        currencySymbol={course.currency_symbol}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
      <div className="flex items-center justify-between mb-1">
        <Text className="font-bold text-black text-[11px]">{title}</Text>
        {showClear && (
          <button type="button" onClick={onClear} className="text-[12px] font-bold text-black hover:underline">
            Clear
          </button>
        )}
      </div>
      <div className="space-y-1">{children}</div>
      <hr className="border-black border-t-2 mt-2" />
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
    <label className="flex items-center gap-1 text-gray-700 text-[12px] cursor-pointer">
      <input
        type="radio"
        name={name}
        id={id}
        value={value ?? ''}
        checked={checked}
        onChange={onChange}
        className="
          relative
          appearance-none
          w-3 h-3
          rounded-full
          bg-gray-400
          checked:after:content-['']
          checked:after:absolute
          checked:after:top-1/2
          checked:after:left-1/2
          checked:after:-translate-x-1/2
          checked:after:-translate-y-1/2
          checked:after:w-1.5
          checked:after:h-1.5
          checked:after:rounded-full
          checked:after:bg-black
        "
      />
      {label}
    </label>
  )
}
