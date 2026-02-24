'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Card1 } from '@/components/common/card1'

export default function CourseDescriptionSection() {
  return (
    <section className="w-full font-poppins">

      {/* ================= BANNER ================= */}
      <div className="px-10 pt-5">
        <div className="relative w-full h-40 md:h-80 xl:h-135  overflow-hidden">
          <Image
            src="/Banner.png"
            alt="Course Banner"
            fill
            priority
            className=" object-fill"
          />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        {/* ================= CARDS SECTION ================= */}
        <div className="flex flex-col lg:flex-row gap-16">

          {/* LEFT SIDE – CENTERED ON iPAD */}
          <div className="lg:w-[42%] mx-auto lg:mx-0 flex justify-center">
            <Card1
              images={[
                { src: '/Free Trial.png', width: 340, height: 240 },
                { src: '/3 Images.png', width: 340, height: 900 },
              ]}
              variant="light"
              padding="px-8 py-8"
              layout="column"
            />
          </div>

          {/* RIGHT SIDE – TWO STACKED CARDS */}
          <div className="lg:w-[85%] flex flex-col gap-6 lg:mt-2">

            <Card1
              images={[{ src: '/Live Sessions.png', width: 650, height: 550 }]}
              variant="light"
              padding="px-10 py-6"
            />

            <Card1
              images={[{ src: '/Instructors.png', width: 550, height: 400 }]}
              variant="light"
              padding="px-8 py-8"
            />

          </div>
        </div>

        {/* ================= YOU MAY ALSO LIKE ================= */}
        <div className="text-center mt-12">
          <Heading textSize="text-3xl lg:text-[2.4rem]">
            You May Also Like
          </Heading>
        </div>

        {/* ================= IMAGE BELOW HEADING ================= */}
        <div className="px-10">
          <div className="relative w-full h-65 md:h-85 rounded-3xl overflow-hidden">
            <Image
              src="/You May Also Like.png"
              alt="You May Also Like"
              fill
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
