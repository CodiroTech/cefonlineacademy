'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { HallmarkItem } from '@/lib/api/homepage'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackHallmarks = [
  {
    icon: '/24-7.svg',
    title: 'Progress Feedback Mechanism with 24/7 Support',
    description:
      'Regular assessments, progress reports, and round-the-clock support help students stay on track and continuously improve.',
  },
  {
    icon: '/Virtual Class Room.svg',
    title: 'Virtual Classroom - Individual & Group Instructions',
    description:
      'Enjoy the flexibility of personalized one-on-one sessions or interactive group classes in our digital learning environment.',
  },
  {
    icon: '/Unique Teaching.svg',
    title: 'Unique Teaching Methodology',
    description:
      'We use interactive techniques like Total Physical Interaction (TPI), contextual learning, and gradual progression for effective knowledge retention.',
  },
  {
    icon: '/Highly Researched.svg',
    title: 'Highly Researched Content',
    description:
      'Our courses are built on well-researched, authentic knowledge, ensuring a structured and engaging learning experience.',
  },
  {
    icon: '/Highly Trained.svg',
    title: 'Highly Trained Tutors',
    description:
      'Our tutors are experienced educators, trained in modern teaching methodologies and Islamic studies to provide quality instruction.',
  },
  {
    icon: '/Male & Female.svg',
    title: 'Female & Male Tutors for Separate Classes',
    description:
      'We offer gender-segregated classes, ensuring a comfortable and focused learning space for all students.',
  },
]

interface HallmarksOfExcellenceProps {
  heading?: string
  items?: HallmarkItem[]
}

export const HallmarksOfExcellence = ({
  heading,
  items: apiItems,
}: HallmarksOfExcellenceProps) => {
  const mapped = apiItems && apiItems.length > 0
    ? apiItems
        .filter(item => item.title)
        .map(item => ({
          icon: mediaUrl(item.icon) || '/24-7.svg',
          title: item.title ?? '',
          description: stripHtml(item.description) || '',
        }))
    : []
  const hallmarks = mapped.length > 0 ? mapped : fallbackHallmarks

  return (
    <section className="w-full relative py-12 lg:py-16 font-poppins">
      {/* Mobile: light green patterned background */}
      <div
        className="absolute inset-0 z-0 lg:hidden bg-[#EAF7E5]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(136,188,68,0.12) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Desktop: original calligraphy background */}
      <div className="absolute inset-0 z-0 hidden lg:block opacity-100">
        <Image
          src="/Calligraphy Large.png"
          alt=""
          fill
          className="object-cover contrast-150 brightness-110"
          priority
          quality={100}
        />
      </div>

      {/* Need Help? Chat with Us — fixed bottom right, all screen sizes */}
      

      <div className="relative z-10 container mx-auto px-4 lg:px-10 flex justify-center">
        {/* Mobile: stacked green cards */}
        <div className="w-full max-w-4xl lg:hidden">
          {heading && (
            <div className="text-center mb-10 lg:mb-14">
              <Heading textSize="text-2xl sm:text-3xl md:text-[2.6rem]">
                {heading}
              </Heading>
            </div>
          )}
          <div className="flex flex-col gap-4 sm:gap-6">
            {hallmarks.map((hallmark, index) => (
              <div
                key={index}
                className="bg-[#88bc44] rounded-2xl sm:rounded-3xl py-5 px-3 sm:py-6 sm:px-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-row items-center gap-4 text-left"
              >
                <div className="w-[20%] min-w-[80px] shrink-0 flex items-center justify-center">
                  <Image
                    src={hallmark.icon}
                    alt=""
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain brightness-0 invert"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#065D80] mb-2 leading-snug">
                    {hallmark.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-gray-700 leading-[1.3]">
                    {hallmark.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: original grid + card style */}
        <div className="w-full max-w-6xl hidden lg:block">
          {heading && (
            <div className="text-center mb-10 lg:mb-14">
              <Heading textSize="text-2xl sm:text-3xl md:text-[2.6rem]">
                {heading}
              </Heading>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
            {hallmarks.map((hallmark, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-[#88bc44] to-[#88bc44]
                           rounded-tr-[50px] rounded-bl-[50px]
                           py-2 px-3 sm:py-4 sm:px-5
                           shadow-md hover:shadow-xl
                           transition-all duration-300 hover:scale-[1.02]
                           flex flex-col items-center text-center"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <Image
                    src={hallmark.icon}
                    alt={hallmark.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm sm:text-lg text-center font-bold text-[#065D80] mb-2 leading-snug w-full">
                  {hallmark.title}
                </h3>
                <Text className="text-[13px] text-balance text-white leading-[1.3]">
                  {hallmark.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
