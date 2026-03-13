'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { BlogArticleItem } from '@/lib/api/pageHeaders'
import type { BackendBlogItem } from '@/lib/api/academy'
import { mediaUrl, stripHtml } from '@/lib/headless'

type BlogPost = {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
  author: string
  slug?: string | null
}

/** Max characters for description in the Insights card. Doubled from previous 300. */
const INSIGHTS_DESCRIPTION_MAX_LENGTH = 600

const FALLBACK_POSTS: BlogPost[] = [
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

function trimDescription(text: string, maxLen: number): string {
  const t = (text || '').trim()
  if (t.length <= maxLen) return t
  return t.slice(0, maxLen).trim() + '…'
}

function mapApiToPost(items: BlogArticleItem[]): BlogPost[] {
  return items.map((a, i) => ({
    id: i + 1,
    image: mediaUrl(a.image) || '/Insight & Inspiration.png',
    title: a.title ?? '',
    subtitle: '',
    description: trimDescription(a.description ?? '', INSIGHTS_DESCRIPTION_MAX_LENGTH),
    author: a.author ?? '',
  })).filter(p => p.title || p.description)
}

function mapBackendToPost(blogs: BackendBlogItem[]): BlogPost[] {
  return blogs.map((b, i) => ({
    id: b.id ?? i + 1,
    image: b.image_url ?? '/Insight & Inspiration.png',
    title: b.title ?? '',
    subtitle: '',
    description: trimDescription(stripHtml(b.excerpt ?? b.content ?? ''), INSIGHTS_DESCRIPTION_MAX_LENGTH),
    author: b.author ?? '',
    slug: b.slug ?? null,
  })).filter(p => p.title || p.description)
}

type InsightsSectionProps = {
  items?: BlogArticleItem[] | null
  backendBlogs?: BackendBlogItem[] | null
}

export const InsightsSection = ({ items: apiItems, backendBlogs }: InsightsSectionProps) => {
  const blogPosts = useMemo(() => {
    if (Array.isArray(backendBlogs) && backendBlogs.length > 0) {
      const mapped = mapBackendToPost(backendBlogs)
      if (mapped.length > 0) return mapped
    }
    if (Array.isArray(apiItems) && apiItems.length > 0) {
      const mapped = mapApiToPost(apiItems)
      if (mapped.length > 0) return mapped
    }
    return FALLBACK_POSTS
  }, [apiItems, backendBlogs])

  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Reset to first slide when blogPosts change (e.g. API load)
  useEffect(() => {
    setCurrent(0)
  }, [blogPosts.length])

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

        <Text className="text-center mb-8 text-black">
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

          {/* Background Card - full card clickable when post has slug */}
          {post.slug ? (
            <Link
              href={`/media-center/blogs/${post.slug}`}
              className="flex-1 block mx-auto cursor-pointer hover:opacity-95 transition-opacity bg-[#EAF7E5] rounded-tr-[70px] rounded-bl-[70px] px-8 lg:px-12 py-5 lg:py-6"
              style={{ maxWidth: '100%' }}
            >
              <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4">
                <div className="w-full lg:w-[45%] shrink-0">
                  <div className="relative w-full h-104 lg:h-110 xl:h-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-[55%] flex flex-col justify-between py-1">
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-[20px] font-bold text-[#065D80] leading-tight">
                      {post.title}
                      <br />
                      <span className="font-semibold">{post.subtitle}</span>
                    </h3>
                    <Text className="text-justify leading-[1.3] text-black">
                      {post.description}
                    </Text>
                  </div>
                  <Text className="font-semibold mt-3">
                    By: {post.author}
                  </Text>
                </div>
              </div>
            </Link>
          ) : (
            <div
              className="flex-1 bg-[#EAF7E5] rounded-tr-[70px] rounded-bl-[70px] px-8 lg:px-12 py-5 lg:py-6 mx-auto"
              style={{ maxWidth: '100%' }}
            >
              <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4">
                <div className="w-full lg:w-[45%] shrink-0">
                  <div className="relative w-full h-104 lg:h-110 xl:h-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-[55%] flex flex-col justify-between py-1">
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-[20px] font-bold text-[#065D80] leading-tight">
                      {post.title}
                      <br />
                      <span className="font-semibold">{post.subtitle}</span>
                    </h3>
                    <Text className="text-justify leading-[1.3] text-black">
                      {post.description}
                    </Text>
                  </div>
                  <Text className="font-semibold mt-3">
                    By: {post.author}
                  </Text>
                </div>
              </div>
            </div>
          )}

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
            className="inline-block px-8 py-0.5 text-sm font-semibold bg-[#0B5C6B] text-white rounded-full border-2 border-[#0B5C6B] transition hover:bg-white hover:text-[#0B5C6B]"
          >
            SEE ALL
          </Link>
        </div>
      </div>
    </section>
  )
}
