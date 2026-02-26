'use client'
import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'
import type { JourneyStep } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'

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
    icon: '/Take a Demo Icon-01.svg',
  },
  {
    number: 3,
    title: 'Choose & Enroll',
    desc: 'Select your preferred course and complete the payment.',
    icon: '/Choose & Encroll Icon-01.svg',
  },
  {
    number: 4,
    title: 'Start Learning',
    desc: 'Access your dashboard & begin your personalized learning journey.',
    icon: '/Start Learning Icon-01.svg',
  },
]

interface JourneyStepsSectionProps {
  steps?: JourneyStep[]
}

export const JourneyStepsSection = ({ steps: apiSteps }: JourneyStepsSectionProps) => {
  const mapped = apiSteps && apiSteps.length > 0
    ? apiSteps
        .filter(s => s.title)
        .map((s, i) => ({
          number: i + 1,
          title: s.title ?? '',
          desc: s.text ?? '',
          icon: mediaUrl(s.icon, fallbackSteps[i]?.icon || '/Sign Up Icon-01.svg'),
        }))
    : []
  const steps = mapped.length > 0 ? mapped : fallbackSteps

  return (
    <section className="w-full bg-white px-4 lg:px-10 py-12 lg:py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Heading textSize="text-[1.5rem] sm:text-[2rem] md:text-[2.75rem]">
            Begin Your Journey In 4 Simple Steps
          </Heading>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-5 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="relative w-53 h-59 transition-transform duration-200 ease-out hover:scale-[1.35] cursor-default">
              <div
                className="absolute -top-4 -left-4 w-13 h-13 rounded-full
                           bg-[#8DC63F] text-white text-4xl font-bold
                           flex items-center justify-center
                           shadow-[0_5px_12px_rgba(0,0,0,0.25)]
                           z-20"
              >
                {step.number}
              </div>

              <div
                className="absolute inset-0
                           border-4 border-[#8abcc5]
                           rounded-tr-[3.5rem] rounded-bl-[3.5rem]
                           z-10"
              />

              <div
                className="absolute inset-0 m-4
                           bg-white
                           rounded-tr-[3.5rem] rounded-bl-[3.5rem]
                           shadow-[8px_8px_8px_rgba(138,188,197,0.50),12px_12px_8px_rgba(138,188,197,0.10)]
                           flex flex-col items-center justify-center
                           text-center px-4
                           z-15"
              >
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={45}
                  height={45}
                  className="mb-2"
                />

                <h3 className="text-base font-extrabold text-[#065D80] mb-3">
                  {step.title}
                </h3>

                <Text className=" text-balance mb-2 leading-snug">
                  {step.desc}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
