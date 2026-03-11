'use client'

import type { CourseDetailsRightContentArea } from '@/lib/api/course-detail'

type Props = { right?: CourseDetailsRightContentArea | null; course?: { course_details_right_content_area?: unknown; courseDetailsRightContentArea?: unknown } }

// API may return snake_case or (in some setups) camelCase; some responses omit the nested object
function getRightArea(props: Props): CourseDetailsRightContentArea | undefined {
  if (props.right != null && typeof props.right === 'object') return props.right
  const c = props.course
  if (!c) return undefined
  const r = c.course_details_right_content_area ?? (c as { courseDetailsRightContentArea?: unknown }).courseDetailsRightContentArea
  return r && typeof r === 'object' ? (r as CourseDetailsRightContentArea) : undefined
}

const metaItems = (
  right: CourseDetailsRightContentArea | undefined
): { label: string; value: string | number | null | undefined }[] => {
  const items: { label: string; value: string | number | null | undefined }[] = []
  if (right) {
    if (right.course_video_lectures != null)
      items.push({ label: 'Classes', value: right.course_video_lectures })
    if (right.course_duration != null)
      items.push({ label: 'Duration', value: right.course_duration })
    if (right.course_level) items.push({ label: 'Category', value: right.course_level })
    if (right.course_language) items.push({ label: 'Language', value: right.course_language })
    if (right.course_accessPeriod) items.push({ label: 'Access', value: right.course_accessPeriod })
    if (right.course_downloads) items.push({ label: 'Resource', value: right.course_downloads })
    if (typeof right.students_enrolled === 'number' && right.students_enrolled > 0)
      items.push({ label: 'Students enrolled', value: right.students_enrolled })
  }
  items.push({ label: 'Certificate', value: 'Yes' })
  return items
}

const iconClass = 'w-4 h-4 shrink-0 text-gray-600'
const icons: Record<string, React.ReactNode> = {
  Classes: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Duration: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Category: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  Language: (
    <span className="text-xs font-bold text-gray-600 shrink-0 w-4 text-center">Aa</span>
  ),
  Access: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2m0 0V11m0-2.5v-1a7.5 7.5 0 0115 0v1m-15 0a7.5 7.5 0 0015 0" />
    </svg>
  ),
  Certificate: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  Resource: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'Students enrolled': (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
}

export function CourseMetaCard({ right, course }: Props) {
  const resolvedRight = getRightArea({ right, course })
  const items = metaItems(resolvedRight)
  return (
    <ul className="py-0">
      {items.map(({ label, value }) =>
        value != null && value !== '' ? (
          <li
            key={label}
            className="flex items-center gap-3 py-3 px-4 text-sm border-b border-gray-200 last:border-b-0"
          >
            {icons[label] ?? null}
            <span className="text-gray-700 font-medium flex-1 min-w-0">{label}</span>
            <span className="text-gray-600 text-right shrink-0 break-words max-w-[55%]">{String(value)}</span>
          </li>
        ) : null
      )}
    </ul>
  )
}
