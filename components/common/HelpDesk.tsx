'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '../common/heading'
import { Text } from '../common/text'
import type { HelpDeskItem } from '@/lib/api/homepage'
import { cefOrgBaseUrl } from '@/lib/config'
import { mediaUrl } from '@/lib/headless'

type HelpItem = {
  image: string
  title: string
  link: string
}

/** Paths on cef.org.pk for Help Desk (same as cef.org.pk helpdesk2). Contact Us and Queries stay in-app. */
const helpDeskPaths: Record<string, string> = {
  'Contact Us': '/contact-us',
  Queries: '/contact-us#faqs',
  Complaints: '/complaints',
  'Book Sales Representative': '/book-sales-queries',
  'Donation Representative': '/donation-queries',
  Careers: '/hr-queries',
}

const base = cefOrgBaseUrl.replace(/\/$/, '')

function getHelpDeskLink(title: string): string {
  const path = helpDeskPaths[title] ?? '#'
  if (title === 'Contact Us' || title === 'Queries') return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

const fallbackItems: HelpItem[] = [
  { image: '/Contact Us.svg', title: 'Contact Us', link: '/contact-us' },
  { image: '/Queries.svg', title: 'Queries', link: '/contact-us#faqs' },
  { image: '/Complaints.svg', title: 'Complaints', link: `${base}/complaints` },
  { image: '/Book Sales.svg', title: 'Book Sales Representative', link: `${base}/book-sales-queries` },
  { image: '/Donations.svg', title: 'Donation Representative', link: `${base}/donation-queries` },
  { image: '/Careers.svg', title: 'Careers', link: `${base}/hr-queries` },
]

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
          link: getHelpDeskLink(item.title ?? ''),
        }))
    : []
  const helpItems = mapped.length > 0 ? mapped : fallbackItems

  return (
    <section className="w-[90%] mx-auto py-16">

      <div className="text-center mb-6">
        <Heading textSize="text-3xl lg:text-[2.66rem]">
          Reach Our Help Desk
        </Heading>

        <Text className="text-lg lg:text-xl font-bold text-[#59595c]">
          Click me
        </Text>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-0.5 lg:gap-1 w-full lg:max-w-6xl mx-auto">
        {helpItems.map((item, index) => {
          const isExternal = item.title !== 'Contact Us' && item.title !== 'Queries'
          return (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-35 flex justify-center"
          >
            <Link
              href={item.link}
              className="flex flex-col items-center text-center gap-1 group"
              {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <div className="relative w-20 h-20">
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
          )
        })}
      </div>

    </section>
  )
}
