'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

type BlogPost = {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
  author: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: '/Insight & Inspiration.png',
    title: 'Embracing Online Learning:',
    subtitle: 'A Modern Path to Mastering Tajweed',
    description:
      'Online learning has opened doors to knowledge for everyone. It allows people to learn anytime, anywhere. For those who wish to study the Quran, online Tajweed classes are a blessing. Tajweed is the art of reciting the Quran correctly, preserving its beauty and meaning. Through online learning, students can connect with qualified teachers from across the world. They can practice pronunciation, rhythm, and rules at their own pace. Interactive tools, recordings, and one-on-one guidance make learning easy and effective. Busy professionals, mothers, and students can all benefit without leaving home. Online Tajweed classes bring the Quran closer to every heart. They help learners recite with respect, clarity, and love for Allah\'s words. It\'s a modern path to timeless wisdom.',
    author: 'Sara Ali',
  },
  {
    id: 2,
    image: '/Insight & Inspiration.png',
    title: 'The Power of',
    subtitle: 'Consistent Learning',
    description:
      'Consistency is the key to mastering any skill. When we dedicate regular time to learning, we build strong foundations...',
    author: 'Ahmed Hassan',
  },
  {
    id: 3,
    image: '/Insight & Inspiration.png',
    title: 'Building Strong Character',
    subtitle: 'Through Education',
    description:
      'Education goes beyond acquiring knowledge. It shapes our character, values, and worldview...',
    author: 'Fatima Khan',
  },
]

export const InsightsSection = () => {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const total = blogPosts.length
  const post = blogPosts[current]

  const prev = () => setCurrent(p => (p === 0 ? total - 1 : p - 1))
  const next = () => setCurrent(p => (p === total - 1 ? 0 : p + 1))

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) next()
    if (diff < -50) prev()
    touchStartX.current = null
  }

  return (
    <section className="w-full px-4 py-14 lg:py-6">
      <div className="max-w-265 mx-auto"> 

        {/* Heading */}
        <div className="text-center mb-3">
          <Heading textSize="text-3xl sm:text-4xl lg:text-5xl">
            Insights & Inspirations
          </Heading>
        </div>

        <Text className="text-center mb-8">
          Explore our latest blogs.
        </Text>

        <div
          className="relative flex items-center gap-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="hidden cursor-pointer md:flex shrink-0 w-10 h-10 rounded-full bg-[#8BC34A] text-white items-center justify-center transition hover:scale-110"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Background Card */}
          <div
            className="
              flex-1
              bg-[#EAF7E5]
              rounded-tr-[70px] rounded-bl-[70px]
              px-8 lg:px-12
              py-5 lg:py-6   /* 🔥 reduced height */
              mx-auto
            "
            style={{ maxWidth: '100%' }} /* 🔥 wider card */
          >
            <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4">
              
              {/* Image */}
              <div className="w-full lg:w-[45%] shrink-0">
                <div className="relative w-full h-104 lg:h-110 xl:h-100"> {/* 🔥 increased image height */}
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full lg:w-[55%] flex flex-col justify-between py-1">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-[20px] font-bold text-[#065D80] leading-tight">
                    {post.title}
                    <br />
                    <span className="font-semibold">{post.subtitle}</span>
                  </h3>

                  <Text className="text-justify text-[14px] leading-relaxed">
                    {post.description}
                  </Text>
                </div>

                <Text className=" font-semibold mt-3">
                  By: {post.author}
                </Text>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="hidden cursor-pointer md:flex shrink-0 w-10 h-10 rounded-full bg-[#8BC34A] text-white items-center justify-center transition hover:scale-110"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Mobile Dots */}
        {isMobile && total > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: total }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? 'w-6 bg-[#0B5C6B]'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/media-center/blogs"
            className="inline-block px-7 py-1 text-sm font-semibold bg-[#0B5C6B] text-white rounded-full border-2 border-[#0B5C6B] transition hover:bg-white hover:text-[#0B5C6B]"
          >
            SEE ALL
          </Link>
        </div>
      </div>
    </section>
  )
}
