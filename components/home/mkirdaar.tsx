'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import { VideoPopup } from '@/components/common/VideoPopup'
import type { MissionKirdaarItem } from '@/lib/api/homepage'
import { mediaUrl, stripHtml } from '@/lib/headless'

type MediaItem = {
  id: number
  src: string
  alt: string
  videoUrl?: string
}

const fallbackMedia: MediaItem[] = [
  { id: 1, src: '/Mission Kirdaar.png', alt: 'Mission Kirdaar Episode' },
  { id: 2, src: '/Mission Kirdaar.png', alt: 'Mission Kirdaar Episode' },
]

interface MissionKirdaarSectionProps {
  items?: MissionKirdaarItem[]
}

export const MissionKirdaarSection = ({ items: apiItems }: MissionKirdaarSectionProps) => {
  const sectionTitle = apiItems?.[0]?.title ?? 'Mission Kirdaar'
  const sectionDesc = apiItems?.[0]?.description
    ? stripHtml(apiItems[0].description)
    : 'Explore our latest series specially created to inspire young minds and make learning exciting. Each story nurtures values, strengthens character, and helps children grow with purpose and confidence.'

  const mediaItems: MediaItem[] = apiItems && apiItems.length > 0
    ? apiItems.map((item, i) => ({
        id: i + 1,
        src: mediaUrl(item.media, '/Mission Kirdaar.png'),
        alt: item.title || 'Mission Kirdaar Episode',
        videoUrl: item['video-url']?.trim() || undefined,
      }))
    : fallbackMedia

  const [current, setCurrent] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const total = mediaItems.length
  const hasMultiple = total > 1
  const item = mediaItems[current]

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    setVideoOpen(false)
  }, [current])

  const prev = () => {
    setCurrent(p => (p === 0 ? total - 1 : p - 1))
  }

  const next = () => {
    setCurrent(p => (p === total - 1 ? 0 : p + 1))
  }

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
    <section className="relative w-full px-4 lg:px-10 pb-20 overflow-hidden">

      <div className="absolute top-60 left-[16%] w-7 h-7 rounded-full bg-[#8BC34A] opacity-40" />
      <div className="absolute top-1/2 left-[4%] w-7 h-7 rounded-full bg-[#0B5C6B] opacity-30" />
      <div className="absolute bottom-28 left-[17%] w-6 h-6 rounded-full bg-[#8BC34A] opacity-40" />

      <div className="absolute top-60 right-[16%] w-6 h-6 rounded-full bg-[#8BC34A] opacity-40" />
      <div className="absolute top-1/2 right-[4%] w-6 h-6 rounded-full bg-[#0B5C6B] opacity-30" />
      <div className="absolute bottom-28 right-[17%] w-6 h-6 rounded-full bg-[#8BC34A] opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        <Heading textSize="text-3xl sm:text-4xl lg:text-5xl">{sectionTitle}</Heading>

        <Text
          className="
            mx-auto md:px-18
            max-w-3xl mt-2
            text-center leading-[1.3] text-black
          "
        >
          {sectionDesc}
        </Text>

        <div
          className="relative flex items-center justify-center gap-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          <button
            onClick={prev}
            disabled={!hasMultiple}
            className={`
              hidden sm:flex
              w-9 h-9 rounded-full
              bg-[#8DC63F] text-white
              items-center justify-center
              transition
              ${hasMultiple
                ? 'cursor-pointer hover:scale-105'
                : 'opacity-40 cursor-not-allowed'}
            `}
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className={`
              relative
              w-full
              max-w-205
              aspect-video
              overflow-hidden
              ${item.videoUrl ? 'cursor-pointer' : ''}
            `}
            role={item.videoUrl ? 'button' : undefined}
            onClick={item.videoUrl ? () => setVideoOpen(true) : undefined}
            onKeyDown={
              item.videoUrl
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setVideoOpen(true)
                    }
                  }
                : undefined
            }
            tabIndex={item.videoUrl ? 0 : undefined}
            aria-label={item.videoUrl ? `Play video: ${item.alt}` : undefined}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain"
            />
          </div>

          {item.videoUrl && (
            <VideoPopup
              videoUrl={item.videoUrl}
              title={item.alt}
              open={videoOpen}
              onOpenChange={setVideoOpen}
            />
          )}

          <button
            onClick={next}
            disabled={!hasMultiple}
            className={`
              hidden sm:flex
              w-9 h-9 rounded-full
              bg-[#8DC63F] text-white
              items-center justify-center
              transition
              ${hasMultiple
                ? 'cursor-pointer hover:scale-105'
                : 'opacity-40 cursor-not-allowed'}
            `}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {isMobile && hasMultiple && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: total }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? 'w-6 bg-[#065D80]'
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="mt-3">
          <Link
            href="/media-center/testimonials"
            className="
              inline-block
              px-5 py-1
              text-sm font-semibold
              bg-[#065D80] text-white
              rounded-full
              border-2 border-[#065D80]
              transition-all duration-300
              hover:bg-white hover:text-[#065D80]
            "
          >
            WATCH ALL
          </Link>
        </div>
      </div>
    </section>
  )
}
