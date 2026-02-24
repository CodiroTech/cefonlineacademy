'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '../common/heading'
import { Text } from '../common/text'
import type { HelpDeskItem } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'

type HelpItem = {
  image: string
  title: string
  link: string
}

const fallbackItems: HelpItem[] = [
  { image: '/Contact Us.svg', title: 'Contact Us', link: '/contact' },
  { image: '/Queries.svg', title: 'Queries', link: '/queries' },
  { image: '/Complaints.svg', title: 'Complaints', link: '/complaints' },
  { image: '/Book Sales.svg', title: 'Book Sales Representative', link: '/book-sales-queries' },
  { image: '/Donations.svg', title: 'Donation Representative', link: '/donation-queries' },
  { image: '/Careers.svg', title: 'Careers', link: '/hr-queries' },
]

const linkMap: Record<string, string> = {
  'Contact Us': '/contact',
  Queries: '/queries',
  Complaints: '/complaints',
  'Book Sales Representative': '/book-sales-queries',
  'Donation Representative': '/donation-queries',
  Careers: '/hr-queries',
}

interface HelpDeskProps {
  items?: HelpDeskItem[]
}

export const HelpDesk = ({ items: apiItems }: HelpDeskProps) => {
  const mapped: HelpItem[] = apiItems && apiItems.length > 0
    ? apiItems
        .filter(item => item.title)
        .map((item, i) => ({
          image: mediaUrl(item.icon, fallbackItems[i]?.image || '/Help Desk.svg'),
          title: item.title ?? '',
          link: linkMap[item.title] ?? '#',
        }))
    : []
  const helpItems = mapped.length > 0 ? mapped : fallbackItems

  return (
    <section className="w-[90%] mx-auto py-16">

      <div className="text-center mb-6">
        <Heading textSize="text-3xl lg:text-[2.66rem]">
          Reach Our Help Desk
        </Heading>

        <Text className="text-lg lg:text-xl font-medium text-gray-600">
          Click me
        </Text>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2 lg:gap-3 w-full lg:max-w-6xl mx-auto">
        {helpItems.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-35 flex justify-center"
          >
            <Link
              href={item.link}
              className="flex flex-col items-center text-center gap-1 group"
            >
              <div className="relative w-16 h-16">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <span className="mt-1 text-md font-bold text-primary group-hover:underline leading-snug">
                {item.title}
              </span>
            </Link>
          </div>
        ))}
      </div>

    </section>
  )
}
