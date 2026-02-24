'use client'

import { Card } from '@/components/common/card'
import type { TestimonialItem } from '@/lib/api/mediaCenter'
import { mediaUrl } from '@/lib/headless'

const fallbackTestimonials = [
  { title: 'Sidra Ashraf', subTitle: 'Student-Newzeland', description: 'This Tajweed course completely transformed the way I read the Quran. The tutor was patient, knowledgeable, and explained the rules so clearly. I feel so much more confident now, Alhamdulillah!', image: '/Sidra.png' },
  { title: 'Rehan Khan', subTitle: 'Student-USA', description: 'I enjoy every Nazirah class at CEF Online Academy. The teachers make learning the Quran easy and fun, helping me understand its meaning and apply it in daily life.', image: '/Rehan.png' },
  { title: 'Sidra Ashraf', subTitle: 'Student-Newzeland', description: "CEF's Nazirah course has boosted my confidence. I can read Quran correctly and clearly, while also learning lessons that help me become a better person every day.", image: '/Sidra.png' },
]

interface Props {
  testimonials?: TestimonialItem[]
}

export const StudentTestimonials = ({ testimonials }: Props) => {
  const items = testimonials && testimonials.length > 0
    ? testimonials.map((t) => ({
        title: t.name || '',
        subTitle: t.country ? `Student-${t.country}` : '',
        description: t.text || '',
        image: mediaUrl(t.image, '/Sidra.png'),
      }))
    : fallbackTestimonials

  const getVariant = (index: number) => (index % 2 === 0 ? 'default' : 'light')

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-7xl">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        max-w-270 gap-y-6 gap-x-8
                        mx-auto justify-items-center items-stretch">
          {items.map((testimonial, index) => (
            <Card
              key={index}
              image={testimonial.image}
              title={testimonial.title}
              subTitle={testimonial.subTitle}
              description={testimonial.description}
              variant={getVariant(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
