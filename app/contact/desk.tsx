'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/common/heading'
import { Subtitle } from '@/components/common/subtitle'

type HelpItem = {
  image: string
  title: string
  link: string
}

const helpItems: HelpItem[] = [
  { image: '/Contact Us.svg', title: 'Contact Us', link: '/contact' },
  { image: '/Queries.svg', title: 'Queries', link: '/queries' },
  { image: '/Complaints.svg', title: 'Complaints', link: '/complaints' },
  { image: '/Book Sales.svg', title: 'Book Sales Representative', link: '/book-sales-queries' },
  { image: '/Donations.svg', title: 'Donation Representative', link: '/donation-queries' },
  { image: '/Careers.svg', title: 'Careers', link: '/hr-queries' },
]

export const HelpDesk = () => {
  return (
    <section className="pb-16">

      {/* BACKGROUND CONTAINER */}
      <div className="bg-[#EAF4F6] rounded-3xl w-[92%] lg:w-[82%] mx-auto py-10 px-4 lg:px-10">

        {/* HEADING */}
        <div className="text-center mb-6">
          <Heading textSize="text-3xl lg:text-[2.66rem]">
            Reach Our Help Desk
          </Heading>

          <Subtitle className="text-lg lg:text-xl">
            Click me
          </Subtitle>
        </div>

        {/* ITEMS */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-1 w-full lg:w-[70%] mx-auto">
          {helpItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="w-full sm:w-1/2 lg:w-[20%] flex flex-col items-center gap-1 text-center cursor-pointer group"
            >
              <div className="relative w-16 h-16">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <span className="mt-2 text-md font-bold text-primary group-hover:underline">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

      </div>

    </section>
  )
}
