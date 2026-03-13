'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/common/heading'
import { Subtitle } from '@/components/common/subtitle'
import type { HelpDeskItem } from '@/lib/api/homepage'
import { cefOrgBaseUrl } from '@/lib/config'
import { mediaUrl } from '@/lib/headless'

type LocalHelpItem = {
  image: string
  title: string
  link: string
}

/** Paths on cef.org.pk (same as cef.org.pk helpdesk2). Contact Us stays in-app. */
const helpDeskPaths: Record<string, string> = {
  'Contact Us': '/contact',
  Queries: '/queries',
  Complaints: '/complaints',
  'Book Sales Representative': '/book-sales-queries',
  'Donation Representative': '/donation-queries',
  Careers: '/hr-queries',
}

const base = cefOrgBaseUrl.replace(/\/$/, '')

function getHelpDeskLink(title: string): string {
  const path = helpDeskPaths[title] ?? '#'
  if (title === 'Contact Us') return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

const fallbackItems: LocalHelpItem[] = [
  { image: '/Contact Us.svg', title: 'Contact Us', link: '/contact' },
  { image: '/Queries.svg', title: 'Queries', link: `${base}/queries` },
  { image: '/Complaints.svg', title: 'Complaints', link: `${base}/complaints` },
  { image: '/Book Sales.svg', title: 'Book Sales Representative', link: `${base}/book-sales-queries` },
  { image: '/Donations.svg', title: 'Donation Representative', link: `${base}/donation-queries` },
  { image: '/Careers.svg', title: 'Careers', link: `${base}/hr-queries` },
]

interface Props {
  items?: HelpDeskItem[]
}

export const HelpDesk = ({ items }: Props) => {
  const helpItems: LocalHelpItem[] = (items && items.length > 0
    ? items.map((item, i) => ({
        image: mediaUrl(item.icon, fallbackItems[i]?.image ?? '/Contact Us.svg'),
        title: item.title || fallbackItems[i]?.title || '',
        link: getHelpDeskLink(item.title || fallbackItems[i]?.title || ''),
      }))
    : fallbackItems
  ).filter((item) => item.title !== 'Contact Us')

  return (
    <section className="pb-16">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20">
        <div className="bg-[#f6faf0] rounded-3xl py-10 px-4 lg:px-10">

        <div className="text-center mb-6">
          <Heading textSize="text-3xl lg:text-[2.66rem]">
            Reach Our Help Desk
          </Heading>
          <Subtitle className="text-lg lg:text-xl">
            Click me
          </Subtitle>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-0.5 w-full lg:w-[50%] mx-auto">
          {helpItems.map((item, index) => {
            const isExternal = item.title !== 'Contact Us'
            return (
            <Link
              key={index}
              href={item.link}
              className="w-full sm:w-1/2 lg:w-[20%] flex flex-col items-center gap-0.5 text-center cursor-pointer group py-1"
              {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <span className="mt-1 text-md font-bold text-primary group-hover:underline">
                {item.title}
              </span>
            </Link>
            )
          })}
        </div>

        </div>
      </div>
    </section>
  )
}
