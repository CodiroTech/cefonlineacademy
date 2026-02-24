'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Text } from '@/components/common/text'
import { Heading } from '@/components/common/heading'

type FAQ = {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: '1. What is CEF Online Academy',
    answer:
      'CEF Online Academy is a digital learning platform that provides courses focused on character development, Islamic values, leadership, and practical life skills for learners of all ages.',
  },
  {
    question: '2. What courses are available at CEF Online Academy?',
    answer:
      'Courses include character building, Quranic studies, leadership development, parenting guidance, and entrepreneurship.',
  },
  {
    question: '3. Are the courses live or pre-recorded?',
    answer:
      'Most courses are pre-recorded for flexibility, while selected sessions may be conducted live.',
  },
  {
    question: '4. How can I enroll in a course?',
    answer:
      'You can enroll by creating an account on the platform and selecting the course you want to join.',
  },
  {
    question: '5. Are the courses free or paid?',
    answer:
      'The academy offers both free and paid courses depending on the program.',
  },
  {
    question: '6. What age groups are the courses for?',
    answer:
      'Courses are designed for children, teens, parents, and adults.',
  },
  {
    question: '7. What makes CEF Online Academy unique?',
    answer:
      'It combines Islamic teachings with modern educational techniques to build strong character.',
  },
  {
    question: '8. Can I access courses on mobile devices?',
    answer:
      'Yes, the platform is fully responsive and works seamlessly on mobile devices.',
  },
  {
    question: '9. Do participants receive certificates?',
    answer:
      'Certificates are awarded upon successful completion of eligible courses.',
  },
  {
    question: '10. How can I contact CEF Online Academy support?',
    answer:
      'Support can be reached through the official website or via provided contact channels.',
  },
  {
    question: '11. Can I purchase related books?',
    answer:
      'Yes, books and supplementary learning materials are available for purchase.',
  },
  {
    question: '12. Are there any discounts or scholarships available?',
    answer:
      'Discounts and scholarships are offered periodically for selected courses.',
  },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full bg-white py-10 px-6 sm:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center mb-10">
          <Heading textSize="text-3xl lg:text-[2.5rem] font-bold" leading="leading-tight">
            Frequently Asked Questions
          </Heading>

          <Text className="mt-3 font-medium text-[20px]">
            Find all the information about CEF Online Academy courses,
            enrollment, and more.
          </Text>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="rounded-xl bg-[#EAF4F6] px-6 py-4 transition-all"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-[#065D80]">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <ChevronUp className="h-3 w-3 text-[#065D80]" />
                  ) : (
                    <ChevronDown className="h-3 w-3 text-[#065D80]" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-3">
                    <Text className="text-sm leading-relaxed text-[#414141]">
                      {faq.answer}
                    </Text>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FAQSection
