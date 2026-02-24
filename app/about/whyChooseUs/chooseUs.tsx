'use client'

import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { ChooseUsSectionHeader } from '@/lib/api/about'
import { stripHtml } from '@/lib/headless'

interface Props {
  data?: ChooseUsSectionHeader | null
}

export const ChooseUs = ({ data }: Props) => {
  const heading = data?.title || 'Why Choose Us?'
  const description = stripHtml(data?.description) || 'CEF Online Academy is designed with a comprehensive and well-structured mechanism to ensure holistic learning. We use advanced teaching techniques, carefully curated content, and interactive methodologies to engage students effectively. Our highly trained tutors and mentors are dedicated to guiding every child with patience, expertise, and care. Through this integrated approach, we develop not only knowledge but also character, values, and leadership, preparing students for a purposeful and confident future.'

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16 font-poppins">
      <div className="container mx-auto max-w-7xl">

        <div className="text-center mb-2">
          <Heading textSize="text-3xl sm:text-4xl md:text-5xl">
            {heading}
          </Heading>
        </div>

        <Text className="max-w-6xl mx-auto text-center px-6 mb-11">
          {description}
        </Text>

      </div>
    </section>
  )
}
