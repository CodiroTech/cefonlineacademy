'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { CourseCard } from '@/components/courses/CourseCard'
import type { CategoryCourseItem } from '@/lib/api/categoryCourses'

import 'swiper/css'
import 'swiper/css/pagination'

function isFreeCourse(c: CategoryCourseItem) {
  const p = Number(c.price)
  return Number.isNaN(p) || p <= 0
}

function toCardProps(course: CategoryCourseItem) {
  return {
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    languageName: course.language_name,
    averageRating: String(course.average_rating),
    imageUrl: course.image_url,
    price: course.price,
    classes: course.classes,
    currencySymbol: course.currency_symbol,
  }
}

type Props = {
  courses: CategoryCourseItem[]
}

export function CategoryCoursesSwiper({ courses }: Props) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [ready, setReady] = useState(false)
  const [canScroll, setCanScroll] = useState(false)
  const [, setNavTick] = useState(0)

  const syncScrollState = useCallback((sw: SwiperType) => {
    sw.update()
    requestAnimationFrame(() => {
      setCanScroll(!sw.isLocked)
    })
  }, [])

  useEffect(() => {
    const sw = swiperRef.current
    if (sw) syncScrollState(sw)
  }, [courses, syncScrollState])

  if (courses.length === 0) return null

  const s = swiperRef.current
  const showArrows = ready && canScroll
  const atStart = !ready || (s?.isBeginning ?? true)
  const atEnd = !ready || (s?.isEnd ?? true)

  return (
    <div className="relative flex items-center justify-center gap-2 sm:gap-4 px-1 pb-2 pt-1 sm:px-2 sm:pb-4">
      {showArrows && (
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={atStart}
          aria-label="Previous courses"
          className={`hidden sm:flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#8BC34A] text-white transition ${
            !atStart ? 'hover:scale-105' : 'cursor-not-allowed opacity-40'
          }`}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <div
        className={`
          min-w-0
          ${showArrows ? 'flex-1' : 'w-full max-w-full'}
          [&_.swiper]:[--swiper-theme-color:#8BC34A] [&_.swiper]:[--swiper-pagination-color:#8BC34A]
          [&_.swiper]:[--swiper-pagination-bullet-inactive-color:#8BC34A] [&_.swiper]:[--swiper-pagination-bullet-inactive-opacity:0.4]
          [&_.swiper-pagination]:max-sm:flex [&_.swiper-pagination]:max-sm:justify-center
          [&_.swiper-pagination]:sm:hidden
        `}
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          watchOverflow
          centerInsufficientSlides
          breakpoints={{
            640: { slidesPerView: 2, pagination: { enabled: false } },
            768: { slidesPerView: 3, pagination: { enabled: false } },
            1024: { slidesPerView: 4, pagination: { enabled: false } },
          }}
          pagination={
            courses.length > 1
              ? { clickable: true, enabled: true }
              : false
          }
          className="!pb-8 sm:!pb-0 [--swiper-pagination-color:#8BC34A] [--swiper-theme-color:#8BC34A] [--swiper-pagination-bullet-inactive-color:#8BC34A] [--swiper-pagination-bullet-inactive-opacity:0.4]"
          onSwiper={(sw) => {
            swiperRef.current = sw
            setReady(true)
            syncScrollState(sw)
            setNavTick((n) => n + 1)
          }}
          onSlideChange={() => setNavTick((n) => n + 1)}
          onBreakpoint={(sw) => syncScrollState(sw)}
          onResize={(sw) => syncScrollState(sw)}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id} className="!h-auto">
              <div
                className={`flex h-full min-h-[min(26rem,100%)] justify-center rounded-tr-[60px] rounded-bl-[60px] px-4 py-6 ${
                  isFreeCourse(course) ? 'bg-[#EAF4F6]' : 'bg-[#EAF7E5]'
                }`}
              >
                <div className="w-full max-w-[300px] self-center">
                  <CourseCard {...toCardProps(course)} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showArrows && (
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={atEnd}
          aria-label="Next courses"
          className={`hidden sm:flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#8BC34A] text-white transition ${
            !atEnd ? 'hover:scale-105' : 'cursor-not-allowed opacity-40'
          }`}
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  )
}
