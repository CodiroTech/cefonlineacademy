'use client'

import type { ReviewTab } from '@/lib/api/course-detail'
import { cn } from '@/lib/utils'

const StarIcon = ({ size = 'md' }: { size?: 'md' | 'sm' }) => {
  const className = size === 'sm' ? 'w-3 h-3 shrink-0' : 'w-4 h-[15px] shrink-0'
  return (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M7.60845 0L10.0066 4.69921L15.2169 5.52786L11.4888 9.26079L12.3107 14.4721L7.60845 12.08L2.90617 14.4721L3.72814 9.26079L0 5.52786L5.21029 4.69921L7.60845 0Z"
        fill="#FEC801"
      />
    </svg>
  )
}

type Props = { reviewTab: ReviewTab | undefined }

export function CourseReviewsSummary({ reviewTab }: Props) {
  if (!reviewTab) return null

  const avg = reviewTab.average_rating
  const total = reviewTab.total_user_reviews
  const p5 = reviewTab.five_star_percentage ?? 0
  const p4 = reviewTab.four_star_percentage ?? 0
  const p3 = reviewTab.three_star_percentage ?? 0
  const p2 = reviewTab.two_star_percentage ?? 0
  const p1 = reviewTab.first_star_percentage ?? 0

  const counts = [
    Math.round((total * p5) / 100),
    Math.round((total * p4) / 100),
    Math.round((total * p3) / 100),
    Math.round((total * p2) / 100),
    Math.round((total * p1) / 100),
  ]
  const percentages = [p5, p4, p3, p2, p1]

  return (
    <div className="bg-white rounded-tl-none rounded-br-none rounded-tr-[24px] rounded-bl-[24px] border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-[#065D80] mb-4">Students Feedback</h3>
      <div className="flex flex-col sm:flex-row gap-6 overflow-hidden">
        {/* Left: rating circle, then "from X reviews", then stars below */}
        <div className="flex flex-col items-start gap-2 shrink-0">
          <div className="w-12 h-12 rounded-full border-2 border-orange-400 flex items-center justify-center shrink-0 bg-white">
            <span className="text-base font-bold text-gray-900">{avg}</span>
          </div>
          <span className="text-sm text-gray-600">from {total} reviews</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} size="md" />
            ))}
          </div>
        </div>
        {/* Right: star distribution – smaller stars so they don't clip */}
        <div className="flex-1 min-w-0 overflow-hidden space-y-2">
          {[5, 4, 3, 2, 1].map((stars, i) => {
            const p = percentages[i]
            return (
              <div key={stars} className="flex items-center gap-1.5 text-sm min-w-0">
                <span className="w-4 text-gray-700 font-medium shrink-0">{stars}</span>
                <div className="flex items-center gap-px shrink-0">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <StarIcon key={j} size="sm" />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[40px]">
                  <div
                    className={cn('h-full rounded-full bg-gray-500')}
                    style={{ width: `${Math.min(100, p)}%` }}
                  />
                </div>
                <span className="w-6 text-right text-gray-700 font-medium shrink-0">{counts[i]}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
