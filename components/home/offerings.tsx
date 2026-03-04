'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { OfferingItem } from '@/lib/api/homepage'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackOfferings = [
  {
    title: 'Weekly Sessions',
    description:
      'Explore our weekly learning sessions designed to deepen Quranic understanding, strengthen character, and inspire meaningful growth in everyday life.',
    image: '/Weekly Sessions.png',
    link: '/offerings/weeklySessions',
  },
  {
    title: 'CEF Series',
    description:
      'Engage with our special series offering focused learning journeys that connect Quranic wisdom with real-life values and personal transformation.',
    image: '/CEF Series.png',
    link: '/offerings/specialSeries',
  },
  {
    title: 'Webinars',
    description:
      'Join our interactive webinars featuring scholars and experts who share insights on faith, character, and purposeful living.',
    image: '/Webinars.png',
    link: '/offerings/webinars',
  },
  {
    title: 'Workshops',
    description:
      'Experience our hands-on workshops that build practical skills, strengthen values, and encourage personal and community growth.',
    image: '/Work Shopes.png',
    link: '/offerings/workshops',
  },
  {
    title: 'Mentorship Circles',
    description:
      'Be part of our mentorship circles designed to guide, support, and inspire learners through shared experiences and meaningful dialogue.',
    image: '/Mentroship.png',
    link: '/offerings/mentorship',
  },
]

const linkMap: Record<string, string> = {
  'Weekly Sessions': '/offerings/weeklySessions',
  'CEF Series': '/offerings/specialSeries',
  Webinars: '/offerings/webinars',
  Workshops: '/offerings/workshops',
  'Mentorship Circles': '/offerings/mentorship',
}

interface OtherOfferingsSectionProps {
  items?: OfferingItem[]
}

export const OtherOfferingsSection = ({ items: apiItems }: OtherOfferingsSectionProps) => {
  const itemsPerRow = 3

  const mapped = apiItems && apiItems.length > 0
    ? apiItems
        .filter(item => item.title)
        .map((item, i) => ({
          title: item.title ?? '',
          description: stripHtml(item.description),
          image: mediaUrl(item.image, fallbackOfferings[i]?.image || '/o1.png'),
          link: linkMap[item.title] ?? `/offerings/${(item.title ?? '').toLowerCase().replace(/\s+/g, '-')}`,
        }))
    : []
  const offerings = mapped.length > 0 ? mapped : fallbackOfferings

  const rows = []
  for (let i = 0; i < offerings.length; i += itemsPerRow) {
    rows.push(offerings.slice(i, i + itemsPerRow))
  }

  return (
    <section className="w-full bg-white px-4 lg:px-10 pt-0 pb-12 lg:pb-16 font-poppins relative">
      <div className="container mx-auto max-w-7xl relative">

        <div className="text-center mb-12">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            Other Offerings
          </Heading>
        </div>

        <div className="flex flex-col gap-8 lg:gap-16 max-w-6xl mx-auto relative">
          {rows.map((rowOfferings, rowIndex) => (
            <div
              key={rowIndex}
              className="relative flex flex-wrap justify-center gap-8 lg:gap-10"
            >

              <div className="hidden lg:block absolute top-0 w-full h-full pointer-events-none">
                <div className="absolute left-20 w-7 h-7 bg-[#8BC34A] opacity-40 top-10 rounded-full" />
                <div className="absolute left-20 w-6 h-6 bg-[#065D80] opacity-30 bottom-10 rounded-full" />
                <div className="absolute right-20 w-7 h-7 bg-[#8BC34A] opacity-40 top-10 rounded-full" />
                <div className="absolute right-20 w-6 h-6 bg-[#065D80] opacity-30 bottom-10 rounded-full" />
              </div>

              {rowOfferings.map((offering, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full sm:w-64 md:w-66"
                >
                  <div className="relative w-56 h-56 mb-5 p-2 bg-white">
                    <Image
                      src={offering.image}
                      alt={offering.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#065D80] mb-3 text-center">
                    {offering.title}
                  </h3>

                  <Text className="leading-relaxed text-center lg:min-h-38">
                    {offering.description}
                  </Text>

                  <Link
                    href={offering.link}
                    className="text-[#065D80] font-semibold text-sm
                               hover:text-[#8DC63F] transition-colors
                               underline"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
