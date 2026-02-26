'use client'

import { CourseCard, type CourseCardProps } from './CourseCard'

export type CourseListItem = CourseCardProps

type CoursesGridProps =
  | { children: React.ReactNode; courses?: never; currencySymbol?: string }
  | { courses: CourseListItem[]; children?: never; currencySymbol?: string }

/**
 * Grid layout matching backend: 1 col default, 2 cols md, 3 cols xl.
 * Either pass `children` (React nodes) or `courses` (array of course objects to render as CourseCard).
 */
export function CoursesGrid(props: CoursesGridProps) {
  const currencySymbol = 'courses' in props ? (props.currencySymbol ?? 'Rs') : undefined

  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        ps-0 pe-2 md:ps-4 mt-3
        w-full
      "
    >
      {'courses' in props && props.courses ? (
        props.courses.map((course) => (
          <div
            key={course.slug}
            className="
              col-span-1
              px-2 my-3 ms-0 ps-5 pe-0 sm:pe-12 xl:px-1 xl:my-1
            "
          >
            <CourseCard {...course} currencySymbol={currencySymbol ?? course.currencySymbol} />
          </div>
        ))
      ) : (
        props.children
      )}
    </div>
  )
}
