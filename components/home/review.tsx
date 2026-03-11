'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Heading } from '@/components/common/heading'
import { Subtitle } from '@/components/common/subtitle'
import { Text } from '@/components/common/text'
import type { TestimonialItem } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'

type Testimonial = {
  id: number
  name: string
  country: string
  message: string
  image: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sidra Ashraf',
    country: 'New Zealand',
    message:
      'This Tajweed Course completely transformed the way I read the Quran. The tutor was patient, knowledgeable, and explained the rules so clearly. I feel so much more confident now, Alhamdulillah!',
    image: '/Sidra Ashrif.png',
  },
  {
    id: 2,
    name: 'Ayesha Khan',
    country: 'United Kingdom',
    message:
      'An amazing learning experience. The lessons were easy to follow and very well structured. Highly recommended for anyone who wants to improve their Quran recitation.',
    image: '/CEF Series.png',
  },
]

interface TestimonialsSectionProps {
  items?: TestimonialItem[]
}

export const TestimonialsSection = ({ items: apiItems }: TestimonialsSectionProps) => {
  const mapped: Testimonial[] = apiItems && apiItems.length > 0
    ? apiItems
        .filter(item => item.name)
        .map((item, i) => ({
          id: i + 1,
          name: item.name ?? '',
          country: item.country ?? '',
          message: item.text ?? '',
          image: mediaUrl(item.image, '/CEF Series.png'),
        }))
    : []
  const testimonials = mapped.length > 0 ? mapped : fallbackTestimonials

  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const total = testimonials.length
  const hasMultiple = total > 1
  const item = testimonials[current]

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const prevSlide = () => setCurrent(p => (p === 0 ? total - 1 : p - 1))
  const nextSlide = () => setCurrent(p => (p === total - 1 ? 0 : p + 1))

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) nextSlide()
    if (diff < -50) prevSlide()
    touchStartX.current = null
  }

  return (
    <section className="w-full px-4 lg:px-10 py-16">
      <div className="relative max-w-2xl lg:max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 py-14 text-center overflow-hidden">

        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="relative w-[75%] h-full">
            <Image
              src="/Map (1).png"
              alt="World Map Background"
              fill
              className="object-contain opacity-40"
              style={{ objectPosition: 'center -60px' }}
            />
          </div>
        </div>

        <div className="relative z-10">
          <Subtitle className="text-lg sm:text-4xl font-bold bg-linear-to-r from-[#065D80] to-[#8DC63F] bg-clip-text text-transparent">
            Hear It from the
          </Subtitle>

          <div className="mb-12">
            <Heading textSize="text-3xl sm:text-4xl lg:text-5xl">
              Hearts We've Touched
            </Heading>
          </div>

          <div
            className="relative flex items-center justify-center gap-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prevSlide}
              disabled={!hasMultiple}
              className={`hidden sm:flex cursor-pointer w-10 h-10 flex-shrink-0 rounded-full bg-[#8BC34A] items-center justify-center text-white transition ${
                hasMultiple ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex flex-col lg:flex-row items-stretch gap-6 max-w-xl lg:max-w-2xl mx-auto">
              <div className="relative w-48 h-48 sm:h-auto shrink-0 flex justify-center mx-auto lg:mx-0">
                <div className="relative p-2 bg-white w-full h-60 sm:h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className={`flex flex-col justify-between text-center lg:text-left py-2 max-w-md
                  ${isMobile ? 'mt-4' : 'mt-0'}`}
              >
                <div>
                  <h3 className="text-xl font-extrabold text-[#065D80]">{item.name}</h3>
                  <p className="text-base font-semibold text-[#8DC63F] mb-4">{item.country}</p>
                  <Text className="text-justify leading-[1.3] text-black font-medium">
                    {item.message}
                  </Text>
                </div>

                <div className="mt-6">
                  <Link
                    href="/media-center/testimonials"
                    className="inline-block px-8 py-1 text-sm font-semibold bg-[#065D80] text-white rounded-full border-2 border-[#065D80] transition-all duration-300 hover:bg-white hover:text-[#065D80]"
                  >
                    SEE ALL
                  </Link>
                </div>
              </div>
            </div>

            <button
              onClick={nextSlide}
              disabled={!hasMultiple}
              className={`hidden sm:flex cursor-pointer w-10 h-10 flex-shrink-0 rounded-full bg-[#8BC34A] items-center justify-center text-white transition ${
                hasMultiple ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {isMobile && hasMultiple && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: total }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    current === index ? 'w-6 bg-[#0B5C6B]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
