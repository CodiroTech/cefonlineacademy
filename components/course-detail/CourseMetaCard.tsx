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

/** Free vs paid from numeric price when API sends it; else learner_accessibility. */
function accessFreeOrPaid(right: CourseDetailsRightContentArea): 'Free' | 'Paid' {
  const amt = right.course_price_amount
  if (amt !== undefined && amt !== null && !Number.isNaN(Number(amt))) {
    return Number(amt) <= 0 ? 'Free' : 'Paid'
  }
  if (right.course_learner_accessibility === 'free') return 'Free'
  if (right.course_learner_accessibility === 'paid') return 'Paid'
  return 'Free'
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
    items.push({ label: 'Access', value: accessFreeOrPaid(right) })
    if (right.course_accessPeriod)
      items.push({ label: 'Enrollment period', value: right.course_accessPeriod })
    if (right.course_downloads) items.push({ label: 'Resource', value: right.course_downloads })
    if (typeof right.students_enrolled === 'number' && right.students_enrolled > 0)
      items.push({ label: 'Students enrolled', value: right.students_enrolled })
  }
  items.push({ label: 'Certificate', value: 'Yes' })
  return items
}

const iconClass = 'w-4 h-4 shrink-0'
const IconImg = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className={iconClass} aria-hidden />
)
const icons: Record<string, React.ReactNode> = {
  Classes: <IconImg src="/course-details/Classes-01.svg" alt="" />,
  Duration: <IconImg src="/course-details/Duration-01.svg" alt="" />,
  Category: <IconImg src="/course-details/Category-01.svg" alt="" />,
  Language: <IconImg src="/course-details/Language-01.svg" alt="" />,
  Access: <IconImg src="/course-details/Access-01.svg" alt="" />,
  'Enrollment period': <IconImg src="/course-details/Access-01.svg" alt="" />,
  Certificate: <IconImg src="/course-details/Certificate-01.svg" alt="" />,
  Resource: <IconImg src="/course-details/Resourse-01.svg" alt="" />,
  'Students enrolled': (
    <svg className={`${iconClass} text-gray-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
