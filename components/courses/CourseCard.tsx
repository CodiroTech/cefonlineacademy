'use client'

import Link from 'next/link'

export type CourseCardProps = {
  slug: string
  title: string
  subtitle: string
  languageName: string
  averageRating: number | string
  imageUrl: string
  price: number
  classes: number
  currencySymbol?: string
  isUpcoming?: boolean
}

const StarIcon = () => (
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path
      d="M7.60845 0L10.0066 4.69921L15.2169 5.52786L11.4888 9.26079L12.3107 14.4721L7.60845 12.08L2.90617 14.4721L3.72814 9.26079L0 5.52786L5.21029 4.69921L7.60845 0Z"
      fill="#FEC801"
    />
  </svg>
)

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" fill="white" />
    <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="black" />
    <path
      d="M11.9288 9.59143C12.2111 9.79063 12.2111 10.2093 11.9288 10.4085L7.91328 13.2421C7.58206 13.4758 7.125 13.2389 7.125 12.8335L7.125 7.16637C7.125 6.761 7.58207 6.52412 7.91328 6.75784L11.9288 9.59143Z"
      fill="white"
      stroke="black"
    />
  </svg>
)

function formatPrice(price: number, currencySymbol: string): string {
  const p = Number(price)
  if (Number.isNaN(p) || p === 0) return 'Free'
  const formatted = Number.isInteger(p) ? p.toLocaleString() : p.toFixed(2)
  return `${currencySymbol} ${formatted}`
}

export function CourseCard({
  slug,
  title,
  subtitle,
  languageName,
  averageRating,
  imageUrl,
  price,
  classes,
  currencySymbol = 'Rs',
  isUpcoming = false,
}: CourseCardProps) {
  const classesLabel = classes > 0 ? `${classes} classes` : '0 classes'

  return (
    <Link
      href={`/course-details/${slug}`}
      className={`
        flex flex-col w-full rounded-none border-0 bg-white p-4 text-left shadow-[0_0_30px_rgba(0,0,0,0.04)]
        min-h-[26rem] cursor-pointer
        hover:shadow-md transition-shadow
        ${isUpcoming ? 'opacity-90' : ''}
      `}
    >
      {/* 1. Language tag */}
      <p className="inline-flex justify-start items-center text-[0.7rem] font-medium text-[#065D80] bg-[#065D80]/15 px-2 py-0.5 rounded w-fit">
        {languageName}
      </p>

      {/* 2. Title – two lines */}
      <p className="mt-1 mb-0.5 text-[0.9rem] font-semibold text-black line-clamp-2" title={title}>
        {title}
      </p>

      {/* 3. Rating */}
      <p className="flex items-center gap-0.5 text-[0.875rem]">
        <StarIcon />
        <span className="ml-0.5">{String(averageRating)}</span>
      </p>

      {/* 4. Image – full image visible (no crop); letterboxing uses neutral bg */}
      <div className="relative mt-2 mb-2 flex w-full aspect-[4/3] items-center justify-center overflow-hidden rounded bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* 5. Subtitle */}
      <p className="text-[0.875rem] text-gray-700 line-clamp-2">{subtitle}</p>

      {/* 6. HR */}
      <hr className="my-2 border-gray-200" />

      {/* 7. Footer: price + play + classes – stick to bottom */}
      <div className="flex justify-between items-center mt-auto pt-1">
        <h2 className="text-[1rem] font-semibold text-[#065D80] m-0">
          {formatPrice(price, currencySymbol)}
        </h2>
        <div className="flex items-center gap-2">
          <PlayIcon />
          <span className="ml-2 text-[0.875rem] font-semibold">{classesLabel}</span>
        </div>
      </div>
    </Link>
  )
}
