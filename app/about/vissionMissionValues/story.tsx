'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { StorySection } from '@/lib/api/about'
import { mediaUrl, stripHtml } from '@/lib/headless'

const DEFAULT_TITLE = 'Our Story'
const DEFAULT_DESCRIPTION = `<p>There was a time when we asked ourselves a simple, yet powerful question:</p><h3>What kind of generation do we want to raise?</h3><p>We knew the answer was more than academic success—it was a generation with faith, character, and the ability to spread goodness. We realised that education without character is incomplete, and character without the Quran and Sunnah loses its purpose and direction.</p><p>This journey began in 2016—not as an institution, but as a heartfelt effort to awaken hearts through the Quran and Sunnah. In small rooms across Pakistan, we witnessed early change—children connecting with the Quran, families softening, and hearts returning to Allah.</p><p>To carry this trust beyond borders, CEF Online Academy was born—a place where the Quran reaches homes and hearts worldwide. Here, dedicated teachers and mentors guide each learner with care.</p><p>From such hearts, we pray to raise aspiring leaders—those who don't just know the Quran, but live it. Leaders with dignity in character, clarity in purpose, and courage to guide humanity.</p><p>Because real change begins not in systems, but in hearts that remember who they are—and who they are meant to become!</p>`

interface Props {
  data?: StorySection | null
}

export const OurStorySection = ({ data }: Props) => {
  const title = data?.title || DEFAULT_TITLE
  const description = data?.description || DEFAULT_DESCRIPTION
  const img1 = mediaUrl(
    Array.isArray(data?.images) ? data.images[0] : data?.images,
    '/About Story 1.png',
  )
  const img2 = mediaUrl(
    Array.isArray(data?.images) ? data.images[1] : undefined,
    '/About Story 2.png',
  )

  return (
    <section className="w-full bg-white py-12 lg:py-4 font-poppins">
      <div className="w-full max-w-[1600px] mx-auto px-8 lg:px-20">

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-stretch gap-x-2 lg:gap-x-3">

          {/* LEFT — IMAGES (equal width, no fill so no height:100%) */}
          <div className="flex gap-2 lg:gap-3 w-full mb-6 lg:mb-0">
            <div className="flex-1 min-w-0 relative aspect-[3/4] overflow-hidden shadow-md">
              <Image
                src={img1}
                alt="Student learning Quran"
                width={300}
                height={400}
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto min-h-full min-w-full object-cover object-center"
              />
            </div>
            <div className="flex-1 min-w-0 relative aspect-[3/4] overflow-hidden">
              <Image
                src={img2}
                alt="Teacher guiding student"
                width={300}
                height={400}
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto min-h-full min-w-full object-cover object-center"
              />
            </div>
          </div>

          {/* RIGHT — TEXT */}
          <div className="lg:pl-1">

            <div className="mb-1">
              <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
                {title}
              </Heading>
            </div>

            <div
              className="space-y-3 text-justify text-[15px] font-medium leading-[1.4] text-[#414141]"
              dangerouslySetInnerHTML={{ __html: description }}
            />

          </div>
        </div>

      </div>
    </section>
  )
}
