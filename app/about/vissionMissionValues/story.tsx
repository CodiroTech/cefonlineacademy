'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export const OurStorySection = () => {
  return (
    <section className="w-full bg-white px-4 lg:px-12 py-12 lg:py-4 font-poppins">
      <div className="container mx-auto max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* LEFT — IMAGES */}
          <div
            className="
              flex gap-3 justify-center lg:justify-start
              mb-6 lg:mb-0
            "
          >
            <div
              className="
                w-52 sm:w-56 md:w-64 lg:w-75
                h-130 md:h-130
                lg:h-180 xl:h-140
                overflow-hidden shadow-md
              "
            >
              <Image
                src="/About Story 1.png"
                alt="Student learning Quran"
                width={260}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="
                w-52 sm:w-56 md:w-64 lg:w-75
                h-130 md:h-130
                lg:h-180 xl:h-140
                overflow-hidden
              "
            >
              <Image
                src="/About Story 2.png"
                alt="Teacher guiding student"
                width={260}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT — TEXT */}
          <div className="lg:pl-6 xl:pl-0">

            {/* HEADING */}
            <div className="mb-1">
              <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
                Our Story
              </Heading>
            </div>

            {/* QUESTION */}
            <Text className="mb-1">
              There was a time when we asked ourselves a simple, yet powerful question:
            </Text>

            <Heading textSize="text-2xl mb-1">
              What kind of generation do we want to raise?
            </Heading>

            {/* STORY PARAGRAPHS */}
            <div className="space-y-3">
              <Text className="text-justify text-[15px] leading-relaxed">
                We knew the answer was more than academic success—it was a generation
                with faith, character, and the ability to spread goodness. We realised
                that education without character is incomplete, and character without
                the Quran and Sunnah loses its purpose and direction.
              </Text>

              <Text className="text-justify text-[16px] leading-relaxed">
                This journey began in 2016—not as an institution, but as a heartfelt
                effort to awaken hearts through the Quran and Sunnah. In small rooms
                across Pakistan, we witnessed early change—children connecting with the
                Quran, families softening, and hearts returning to Allah.
              </Text>

              <Text className="text-justify text-[16px] leading-relaxed">
                To carry this trust beyond borders, CEF Online Academy was born—a place
                where the Quran reaches homes and hearts worldwide. Here, dedicated
                teachers and mentors guide each learner with care.
              </Text>

              <Text className="text-justify text-[16px] leading-relaxed">
                From such hearts, we pray to raise aspiring leaders—those who don’t just
                know the Quran, but live it. Leaders with dignity in character, clarity
                in purpose, and courage to guide humanity.
              </Text>

              <Text className="text-justify text-[16px] leading-relaxed">
                Because real change begins not in systems, but in hearts that remember
                who they are—and who they are meant to become!
              </Text>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
