'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '../common/heading'
import { Text } from '../common/text'
import { Button } from '../ui/button'
import type { HeroSection, SliderStep } from '@/lib/api/homepage'
import { bookshopUrl } from '@/lib/config'
import { mediaUrl, stripHtml } from '@/lib/headless'

const fallbackSteps = [
  {
    number: 1,
    title: 'Sign Up',
    desc: 'Create your account by adding your basic details.',
    icon: '/Sign Up Icon-01.svg',
  },
  {
    number: 2,
    title: 'Take a Demo',
    desc: 'Explore our teaching excellence through a free demo session.',
    icon: '/Demo Icon-01.svg',
  },
  {
    number: 3,
    title: 'Choose & Enroll',
    desc: 'Select your preferred course and complete the payment.',
    icon: '/Enroll Icon-01.svg',
  },
  {
    number: 4,
    title: 'Start Learning',
    desc: 'Access your dashboard & begin your learning journey.',
    icon: '/Start Learning Icon-01.svg',
  },
]

interface HeaderProps {
  hero?: HeroSection | null
  steps?: SliderStep[]
}

export const Header = ({ hero, steps: apiSteps }: HeaderProps) => {
  const heroTitle = hero?.title ?? 'Transforming Lives Globally— From Quran to Character'
  const titleParts = heroTitle.split('—').map(s => s.trim())
  const heroDesc = hero?.description
    ? stripHtml(hero.description)
    : 'At CEF Online Academy, we offer excellence in Nazirah and Fahm-ul-Quran, helping students recite, understand, and live the Quran. Our character-building courses blend modern skills with Quranic and Prophetic values, empowering youth to live purposefully, lead confidently, and serve the Ummah with excellence.'
  const heroImage = mediaUrl(hero?.image, '/Child Image with Circles-01.jpg')

  const heroDescBold = hero?.description?.includes('<strong>')
    ? hero.description.match(/<strong>(.*?)<\/strong>/)?.[1] ?? 'Illuminate Your Soul with Quran.'
    : 'Illuminate Your Soul with Quran.'
  const heroDescBody = hero?.description
    ? stripHtml(hero.description.replace(/<strong>.*?<\/strong>/, ''))
    : heroDesc

  const steps = apiSteps && apiSteps.length > 0
    ? apiSteps.map((s, i) => ({
        number: parseInt(s.step, 10) || (i + 1),
        title: s.title || fallbackSteps[i]?.title || '',
        desc: s['step-description'] || fallbackSteps[i]?.desc || '',
        icon: mediaUrl(s.icon, fallbackSteps[i]?.icon || '/Sign Up Icon-01.svg'),
      }))
    : fallbackSteps

  return (
    <section className="w-full px-3 sm:px-4 lg:px-6 pt-1 pb-5">
      <div className="container mx-auto bg-[#EAF7E5] rounded-[36px] px-3 sm:px-4 lg:px-6 pt-7 lg:pt-10 pb-3 lg:pb-6 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">

        <div className="relative z-20 w-full lg:w-[53%] space-y-4 pt-15 lg:pt-23 sm:pt-23">
          <Heading
            textSize="!text-xl sm:!text-2xl md:!text-3xl lg:!text-[39.5px]"
          >
            {titleParts[0]}{titleParts.length > 1 ? '—' : ''}
          </Heading>

          <br />

          {titleParts.length > 1 && (
            <Heading
              textSize="!text-xl sm:!text-2xl md:!text-3xl lg:!text-[38px]"
            >
              {titleParts[1]}
            </Heading>
          )}

          <br />
          <br />

          <Text><strong>{heroDescBold}</strong></Text>
          <Text className="-mt-4 text-justify">
            {heroDescBody}
          </Text>

          <br />

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('cef-open-demo-popup'))}
            className="inline-block"
          >
            <Button className="rounded-full px-3 sm:px-5 py-4 sm:py-5 text-xs lg:text-[16px] font-semibold bg-linear-to-r from-[#065D80] to-[#8DC63F] text-white hover:opacity-90 cursor-pointer">
              Register for Free Demo — Start Your Journey
            </Button>
          </button>

          <div className="flex flex-wrap gap-2 sm:gap-2 pt-1">
            <Link href="/courses/qurantutorCourses">
              <button type="button" className="rounded-full border bg-[#065D80] px-3 sm:px-3 py-1.5 sm:py-2 text-[16px] font-bold text-white hover:bg-white hover:text-[#0B5C6B] transition cursor-pointer">
                Our Courses
              </button>
            </Link>

            <Link href="/offerings/workshops">
              <button type="button" className="rounded-full border bg-[#8DC63F] px-3 sm:px-3 py-1.5 sm:py-2 text-[16px] font-bold text-white hover:bg-white hover:text-[#8DC63F] transition cursor-pointer">
                Our Offerings
              </button>
            </Link>

            <Link href={bookshopUrl} target="_blank" rel="noopener noreferrer">
              <button type="button" className="rounded-full border bg-[#065D80] px-3 sm:px-3 py-1.5 sm:py-2 text-[16px] font-bold text-white hover:bg-white hover:text-[#0B5C6B] transition cursor-pointer">
                CEF Bookshop
              </button>
            </Link>

            <Link href="/media-center/upcomingcourses">
              <button type="button" className="rounded-full bg-linear-to-r from-[#065D80] to-[#8DC63F] px-3 sm:px-3 py-1.5 sm:py-2 text-[16px] font-bold text-white hover:scale-105 transition cursor-pointer">
                What's New
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[47%] flex flex-col sm:flex-row items-end justify-between gap-4 sm:gap-0 pb-1 lg:pb-0 overflow-hidden lg:overflow-visible">

          <div className="relative z-0 w-full sm:flex-1 h-64 sm:h-80 md:h-120 lg:h-115 xl:h-115 pt-6 sm:pt-8 lg:pt-10 -mb-6 sm:-mb-8 lg:-mb-10 lg:-translate-y-6 lg:-ml-10">
            <Image
              src={heroImage}
              alt="Student Learning Quran"
              fill
              className="object-contain md:object-cover lg:object-fill xl:object-cover"
              priority
            />
          </div>

          {/* STEPS -- mobile */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto lg:hidden bg-white rounded-2xl py-6 px-4">
            <div className="mb-4 px-5 py-2.5 rounded-full bg-linear-to-r from-[#88bc44] to-[#6b9e36] text-white text-sm font-bold border border-[#5a8a2e]/60 shadow-sm">
              4 Easy Steps
            </div>
            <div className="w-full rounded-2xl sm:rounded-3xl bg-[#065D80] border-2 border-[#88bc44]/40 overflow-hidden shadow-lg">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center gap-3 py-4 px-4 sm:py-5 sm:px-5 border-b border-white/20 last:border-b-0 transition-transform duration-200 ease-out hover:scale-[1.5] origin-left"
                >
                  <div className="flex shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8DC63F] text-white font-bold flex items-center justify-center text-sm -ml-0.5 border-2 border-[#065D80]">
                    {step.number}
                  </div>
                  <div className="flex shrink-0 items-center justify-center">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={20}
                      height={20}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {step.title}
                    </h4>
                    <p className="text-white/85 text-xs sm:text-sm mt-1 leading-snug">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEPS -- desktop */}
          <div className="relative z-10 hidden lg:flex flex-col items-center w-full sm:w-auto lg:-translate-y-5">
            <div className="mb-1.5 px-3 py-2 rounded-full bg-linear-to-r from-[#065D80] to-[#8DC63F] text-white text-xs sm:text-sm font-semibold">
              <strong>4 Easy Steps</strong>
            </div>
            <div className="bg-[#065D80] rounded-tr-[36px] rounded-bl-[36px] px-3 sm:px-6 py-4 sm:py-6 w-full sm:w-28 md:w-26 flex flex-col justify-between gap-2 sm:gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative bg-white rounded-tr-3xl rounded-bl-3xl sm:py-2 text-center transition-transform duration-200 ease-out hover:scale-[1.5] cursor-default"
                >
                  <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-5 h-5 sm:w-5 sm:h-5 rounded-full bg-[#8DC63F] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="flex justify-center mt-1 sm:mt-0 mb-1">
                    <Image
                      src={step.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <h4 className="text-[7px] sm:text-[6px] font-extrabold text-[#065D80]">
                    {step.title}
                  </h4>
                  <Text className="text-[6px] mb-1.5 sm:mb-0 sm:text-[5px] text-[#414141] leading-tight">
                    {step.desc}
                  </Text>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
