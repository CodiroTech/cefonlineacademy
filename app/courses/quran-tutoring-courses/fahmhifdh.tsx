'use client'

import { Card1 } from '@/components/common/card1'
import { Heading } from '@/components/common/heading'

export default function FahmHifdhCoursesSection() {
  return (
    <>
      {/* ===================== FAHM-UL-QURAN ===================== */}
      <section className="w-full font-poppins py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center xl:justify-end">
            <div className="max-w-5xl w-full">
              <div className="mb-8 text-center">
                <Heading textSize="text-3xl sm:text-4xl md:text-4xl">
                  Fahm-ul-Quran Courses
                </Heading>
              </div>

              <div className="relative flex justify-center">
                <div className="w-full max-w-full md:max-w-none overflow-hidden xl:ml-26">
                  <Card1
                    images={[
                      { src: '/Fahm Ul Quran.png', width: 740, height: 220 },
                    ]}
                    variant="light"
                    padding="px-6 py-6 md:px-13"
                  />
                </div>

                {/* Dots */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute right-18 -top-25 w-5 h-5 rounded-full bg-[#21515a] opacity-40" />
                  <div className="absolute right-18 top-100 w-6 h-6 rounded-full bg-[#8BC34A] opacity-25" />
                  <div className="absolute right-0 top-80 w-9 h-9 rounded-full bg-[#21515a] opacity-15" />
                  <div className="absolute -right-6 top-20 w-5 h-5 rounded-full bg-[#8BC34A] opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CUSTOMIZED & ESSENTIAL HIFDH ===================== */}
      <section className="w-full font-poppins pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center xl:justify-end">
            <div className="max-w-3xl w-full text-center xl:text-right">
              <div className="mb-8 xl:mr-55">
                <Heading textSize="text-3xl sm:text-4xl md:text-[36px]">
                  Customize & Essential Hifdh
                </Heading>
              </div>

              <div className="relative flex justify-center xl:justify-end xl:pr-62">
                <div className="w-full max-w-full md:max-w-none overflow-hidden">
                  <Card1
                    images={[
                      { src: '/Customized Essentials.png', width: 220, height: 420 },
                    ]}
                    padding="px-6 py-8 md:px-34"
                  />
                </div>

                {/* Dots */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute right-18 top-25 w-5 h-5 rounded-full bg-[#21515a] opacity-40" />
                  <div className="absolute right-18 top-100 w-6 h-6 rounded-full bg-[#8BC34A] opacity-25" />
                  <div className="absolute right-0 top-80 w-9 h-9 rounded-full bg-[#21515a] opacity-15" />
                  <div className="absolute -right-6 top-20 w-5 h-5 rounded-full bg-[#8BC34A] opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
