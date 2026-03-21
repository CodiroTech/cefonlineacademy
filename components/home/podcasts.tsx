'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import { VideoPopup } from '@/components/common/VideoPopup'
import type { ListenLearnItem } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'
import { parseVideoUrl } from '@/lib/videoUrl'

type Podcast = {
  id: number
  image: string
  title: string
  videoUrl?: string
}

const fallbackPodcasts: Podcast[] = [
  { id: 1, image: '/Insight & Inspiration.png', title: 'Podcast 1' },
  { id: 2, image: '/Insight & Inspiration.png', title: 'Podcast 2' },
  { id: 3, image: '/Listen & Learn 1.png', title: 'Podcast 3' },
  { id: 4, image: '/Listen & Learn 2.png', title: 'Podcast 4' },
  { id: 5, image: '/Listen & Learn 2.png', title: 'Podcast 5' },
]

interface ListenLearnSectionProps {
  items?: ListenLearnItem[]
  /** When false, hide the "WATCH ALL" link (e.g. on the dedicated podcasts page). Default true. */
  showWatchAllLink?: boolean
  /** 'slider' = carousel (default). 'grid' = all items in a grid, max 4 per row. */
  layout?: 'slider' | 'grid'
}

function isValidVideoUrl(url: string | undefined): boolean {
  if (!url?.trim()) return false
  return parseVideoUrl(url.trim()) !== null
}

export const ListenLearnSection = ({ items: apiItems, showWatchAllLink = true, layout = 'slider' }: ListenLearnSectionProps) => {
  const mapped: Podcast[] = apiItems && apiItems.length > 0
    ? apiItems
        .filter(item => item.title)
        .map((item, i) => {
          const rawUrl = item['video-url']?.trim()
          return {
            id: i + 1,
            image: mediaUrl(item.image, '/Insight & Inspiration.png'),
            title: item.title ?? '',
            videoUrl: rawUrl && isValidVideoUrl(rawUrl) ? rawUrl : undefined,
          }
        })
    : []
  const podcasts = mapped.length > 0 ? mapped : fallbackPodcasts

  const [current, setCurrent] = useState(0)
  const [videoPopupItem, setVideoPopupItem] = useState<Podcast | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const itemsPerSlide = isMobile ? 1 : 2
  const total = Math.ceil(podcasts.length / itemsPerSlide)

  const prev = () => setCurrent(p => (p === 0 ? total - 1 : p - 1))
  const next = () => setCurrent(p => (p === total - 1 ? 0 : p + 1))

  const startIndex = current * itemsPerSlide
  const visiblePodcasts = podcasts.slice(startIndex, startIndex + itemsPerSlide)

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
    <section className="relative w-full py-14 lg:py-16 overflow-hidden">
      <div className="absolute top-36 left-[20%] w-8 h-8 rounded-full bg-[#E8F5F1] opacity-60" />
      <div className="absolute top-40 right-[20%] w-10 h-10 rounded-full bg-[#D1E8DD] opacity-50" />
      <div className="absolute bottom-20 left-[26%] w-8 h-8 rounded-full bg-[#C8E6C9] opacity-40" />
      <div className="absolute bottom-44 left-[18%] w-6 h-6 rounded-full bg-[#b5b7b9] opacity-60" />

      <div className={`relative z-10 mx-auto px-3 ${layout === 'grid' ? 'max-w-7xl' : 'max-w-4xl'}`}>
        <div className="text-center mb-3">
          <Heading textSize="text-3xl sm:text-4xl lg:text-5xl">
            Listen & Learn
          </Heading>
        </div>

        <Text className="text-center text-sm sm:text-base mb-8">
          Delve into our latest inspiring conversations and thoughtful podcasts.
        </Text>

        {layout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {podcasts.map(podcast => (
              <div
                key={podcast.id}
                className={`relative w-full h-94 overflow-hidden ${podcast.videoUrl ? 'cursor-pointer' : ''}`}
                role={podcast.videoUrl ? 'button' : undefined}
                onClick={podcast.videoUrl ? () => setVideoPopupItem(podcast) : undefined}
                onKeyDown={
                  podcast.videoUrl
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setVideoPopupItem(podcast)
                        }
                      }
                    : undefined
                }
                tabIndex={podcast.videoUrl ? 0 : undefined}
                aria-label={podcast.videoUrl ? `Play video: ${podcast.title}` : undefined}
              >
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="relative flex items-center justify-center gap-5"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prev}
              className="hidden cursor-pointer md:flex w-11 h-11 rounded-full bg-[#8DC63F] text-white items-center justify-center transition hover:scale-110"
            >
              <ChevronLeft size={22} />
            </button>

            <div className={`flex-1 grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-5`}>
              {visiblePodcasts.map(podcast => (
                <div
                  key={podcast.id}
                  className={`relative w-full h-94 overflow-hidden ${podcast.videoUrl ? 'cursor-pointer' : ''}`}
                  role={podcast.videoUrl ? 'button' : undefined}
                  onClick={podcast.videoUrl ? () => setVideoPopupItem(podcast) : undefined}
                  onKeyDown={
                    podcast.videoUrl
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setVideoPopupItem(podcast)
                          }
                        }
                      : undefined
                  }
                  tabIndex={podcast.videoUrl ? 0 : undefined}
                  aria-label={podcast.videoUrl ? `Play video: ${podcast.title}` : undefined}
                >
                  <Image
                    src={podcast.image}
                    alt={podcast.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={next}
              className="hidden md:flex cursor-pointer w-11 h-11 rounded-full bg-[#8DC63F] text-white items-center justify-center transition hover:scale-110"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        {videoPopupItem?.videoUrl && (
          <VideoPopup
            videoUrl={videoPopupItem.videoUrl}
            title={videoPopupItem.title}
            open={!!videoPopupItem}
            onOpenChange={(open) => !open && setVideoPopupItem(null)}
          />
        )}

        {layout === 'slider' && isMobile && total > 1 && (
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
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {showWatchAllLink && (
          <div className="mt-10 text-center">
            <Link
              href="/media-center/podcasts"
              className="inline-block px-8 py-0.5 text-sm font-semibold bg-[#0B5C6B] text-white rounded-full border-2 border-[#065D80] transition hover:bg-white hover:text-[#065D80]"
            >
              WATCH ALL
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
