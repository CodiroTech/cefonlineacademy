'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@/components/common/text'
import type { UnlockNewSection, BackendCourseItem } from '@/lib/api/homepage'
import { stripHtml } from '@/lib/headless'

interface HeadingProps {
  subtitle?: string
  title: string
  subtitleClass?: string
  titleClass?: string
  className?: string
}

const Heading = ({ subtitle, title, subtitleClass = '', titleClass = '', className = '' }: HeadingProps) => {
  return (
    <div className={className}>
      {subtitle && (
        <p className={`whitespace-nowrap ${subtitleClass}`}>
          {subtitle}
        </p>
      )}
      <h2 className={titleClass}>
        {title}
      </h2>
    </div>
  )
}

const fallbackCourses: { title: string; description: string; image: string; link?: string }[] = [
  {
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ',
    image: '/Tajweed ul Quran.png',
  },
  {
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ',
    image: '/Parenting Mastry.png',
  },
]

interface WhatsNewSectionProps {
  unlockNew?: UnlockNewSection | null
  latestCourses?: BackendCourseItem[]
}

export const WhatsNewSection = ({ unlockNew, latestCourses }: WhatsNewSectionProps) => {
  const sectionTitle = unlockNew?.title ?? "Unlock What's New!"
  const sectionDesc = unlockNew?.['unlock-description']
    ?? 'Explore our fresh new courses and inspiring sessions designed to expand your knowledge, skills, and character.'

  const titleParts = sectionTitle.includes('New')
    ? [sectionTitle.replace(/New.*/, '').trim(), sectionTitle.match(/New.*/)?.[0] ?? 'New!']
    : ["Unlock What's", 'New!']

  type CourseItem = { title: string; description: string; image: string; link?: string }
  const courses: CourseItem[] =
    latestCourses && latestCourses.length > 0
      ? latestCourses.slice(0, 2).map((c) => ({
          title: c.title ?? '',
          description: stripHtml(c.short_description ?? c.description ?? '') || 'Explore this course.',
          image: c.image_url ?? '/Tajweed ul Quran.png',
          link: c.slug ? `/courses/${c.slug}` : '/courses',
        }))
      : fallbackCourses

  return (
    <section className="w-full px-4 lg:px-10 py-4 lg:py-6">
      <div
        className="max-w-4xl mx-auto bg-[#EAF4F6]
        rounded-tl-[40px] rounded-br-[40px]
        px-6 sm:px-8 lg:px-10 py-6 lg:py-8"
      >
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">

          <div className="w-full mt-22 lg:w-[34%] space-y-4 flex flex-col items-center lg:items-start">
            <Heading
              subtitle={titleParts[0]}
              title={titleParts[1]}
              subtitleClass="text-lg sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#0B5C6B] to-[#8BC34A] bg-clip-text text-transparent"
              titleClass="text-5xl sm:text-6xl lg:text-[86px] font-extrabold bg-gradient-to-r from-[#0B5C6B] to-[#8BC34A] bg-clip-text text-transparent leading-none"
              className="text-center lg:text-left"
            />

            <Text className="text-justify">
              {sectionDesc}
            </Text>

            <div className="w-full flex justify-center pt-4">
              <Link
                href="/news"
                className="inline-block text-[#8DC63F] font-semibold text-sm sm:text-base
                hover:text-[#065D80] transition-colors
                border-b-2 border-[#8DC63F] hover:border-[#065D80] pb-0.5"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[66%] flex flex-col sm:flex-row gap-3">
            {courses.map((course, index) => {
              const card = (
                <>
                  <div className="w-full h-48 sm:h-52 flex items-center justify-center p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className="px-5 pb-5 flex flex-col min-h-[7rem]">
                    <h3 className="text-base sm:text-lg font-bold text-[#065D80] mb-2 text-center">
                      {course.title}
                    </h3>

                    <Text className="text-justify line-clamp-3">
                      {course.description}
                    </Text>
                  </div>
                </>
              )
              const className =
                'group bg-white rounded-tr-[3.5rem] rounded-bl-[3.5rem] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex-1 block'
              return course.link ? (
                <Link key={index} href={course.link} className={className}>
                  {card}
                </Link>
              ) : (
                <div key={index} className={className}>
                  {card}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
