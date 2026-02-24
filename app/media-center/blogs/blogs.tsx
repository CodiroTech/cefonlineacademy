'use client'

import Image from 'next/image'
import { Text } from '@/components/common/text'

type ArticleCardProps = {
  title: string
  description: string
  author: string
  image: string
  reverse?: boolean
}

function ArticleCard({
  title,
  description,
  author,
  image,
  reverse = false,
}: ArticleCardProps) {
  return (
    <section className="w-full px-4 lg:px-0 py-8">
      <div
        className={`relative max-w-6xl mx-auto
        rounded-tr-[60px] rounded-bl-[60px]
        px-6 lg:px-14 py-4
        flex flex-col ${
          reverse ? 'lg:flex-row-reverse bg-[#EAF7E5]' : 'lg:flex-row bg-[#EAF4F6]'
        }
        items-center lg:items-start gap-3`}
      >
        {/* Image */}
        <div className="relative w-full lg:w-[24%] h-56 lg:h-58 mt-0 lg:-mt-11">
          <Image
            src={image}
            alt={title}
            fill
            className="lg:object-cover object-contain"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-[76%]">
          <h2 className="text-[#065D80] font-bold">
            {title}
          </h2>

          <Text className="text-justify text-[13px] lg:mt-6 leading-relaxed">
            {description}
          </Text>

          <p className="mt-4 ml-1 font-medium text-[#065D80]">
            By: {author}
          </p>
        </div>
      </div>
    </section>
  )
}

export default function InspiringMindsSection() {
  return (
    <div className="w-full font-poppins">
      <ArticleCard
        title="Inspiring Minds at CEF Online Academy"
        description="CEF Online Academy provides students with more than academic learning. Its programs connect revealed knowledge with acquired knowledge, fostering both spiritual understanding and practical skills. Through Nazirah, Fahm-ul-Quran, leadership workshops, and mentorship circles, students build confidence, clarity, and character. Each interactive session encourages learners to apply ethical guidance in daily life, shaping them into thoughtful, purpose-driven individuals ready to lead with integrity and faith."
        author="Nabiha Waqar"
        image="/Imspiring.png"
      />

      <ArticleCard
        title="Learning Beyond the Classroom"
        description="At CEF Online Academy, education goes beyond memorization. Courses are designed to connect revealed knowledge with acquired knowledge, nurturing both intellect and character. Students engage in Nazirah, Fahm-ul-Quran, leadership sessions, and mentorship circles that develop confidence, clarity, and ethical reasoning. By participating in interactive learning and reflective discussions, learners grow into individuals who can apply faith-based principles in real-life situations, cultivating purposeful living and inspiring positive change in their communities."
        author="Rizwan Altaf"
        image="/Learning.png"
        reverse
      />

      <ArticleCard
        title="Bridging Knowledge and Character"
        description="CEF Online Academy bridges revealed knowledge and acquired knowledge, helping students grow intellectually, morally, and spiritually. Its courses—from Quranic studies to workshops on leadership and purposeful living—empower learners to develop strong character and practical skills. Through webinars, mentorship circles, and interactive programs, students are inspired to apply Quranic principles in daily life, think critically, and become compassionate, responsible leaders in their families, communities, and beyond."
        author="Kashif Khan"
        image="/Bridging.png"
      />
    </div>
  )
}
