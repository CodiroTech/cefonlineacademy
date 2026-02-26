'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import type { WhyChooseUsStat } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'

const fallbackStats = [
  { label: 'Countries', value: 25, icon: '/Earth.svg' },
  { label: 'Students', value: 25, icon: '/Students-01.svg' },
  { label: 'Years of Experience', value: 25, icon: '/Years.svg' },
  { label: 'Tutors', value: 25, icon: '/Tutors.svg' },
  { label: 'Courses', value: 25, icon: '/Students-01.svg' },
]

interface WhyChooseUsProps {
  stats?: WhyChooseUsStat[]
}

export const WhyChooseUs = ({ stats: apiStats }: WhyChooseUsProps) => {
  const stats = apiStats && apiStats.length > 0
    ? apiStats.map((s, i) => ({
        label: s.text || fallbackStats[i]?.label || '',
        value: parseInt(s.number, 10) || 0,
        icon: mediaUrl(s.icon, fallbackStats[i]?.icon || '/Earth.svg'),
      }))
    : fallbackStats

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [startCount, setStartCount] = useState(false)
  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!startCount) return

    const interval = setInterval(() => {
      setCounters(prev =>
        prev.map((val, i) => {
          if (val < stats[i].value) return val + 1
          return val
        })
      )
    }, 50)

    return () => clearInterval(interval)
  }, [startCount, stats])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) setStartCount(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full py-10 sm:py-14 bg-white overflow-hidden">

      <div className="absolute inset-0 pointer-events-none transform scale-125 translate-y-24">
        <Image
          src="/Map.png"
          alt=""
          fill
          className="object-contain opacity-80"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        <div className="text-center mb-8 sm:mb-12">
          <Heading textSize="text-2xl sm:text-4xl lg:text-5xl">
            Why Choose Us
          </Heading>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
          {stats.map((item, index) => (
            <div key={item.label} className="flex items-center">

              <div className="flex flex-col items-center text-center px-6">

                <div className="h-14 flex items-center justify-center mb-2">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>

                <div className="text-3xl sm:text-4xl lg:text-7xl font-medium text-[#065D80] leading-none">
                  {counters[index]}+
                </div>

                <div className="text-sm sm:text-base text-[#414141] font-medium leading-tight mt-1">
                  {item.label}
                </div>
              </div>

              {index !== stats.length - 1 && (
                <div className="hidden sm:flex items-center">
                  <div className="h-23 w-px bg-[#065D80] opacity-40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
