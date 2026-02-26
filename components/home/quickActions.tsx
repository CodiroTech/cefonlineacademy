'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/common/heading'
import type { QuickAction } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'

const fallbackActions = [
  {
    title: 'Demo',
    subtitle: 'BOOK A FREE DEMO',
    icon: '/Demo Icon-01.svg',
    href: '/demo',
    variant: 'green' as const,
  },
  {
    title: 'Enroll',
    subtitle: 'CHOOSE & ENROLL',
    icon: '/Enroll Icon-01.svg',
    href: '/enroll',
    variant: 'green' as const,
  },
  {
    title: 'Student Login',
    subtitle: 'LOGIN TO LEARN',
    icon: '/Student Login Icon.svg',
    href: '/login',
    variant: 'blue' as const,
  },
  {
    title: 'Our Courses',
    subtitle: 'VIEW COURSES',
    icon: '/Our Courses Icon.svg',
    href: '/courses',
    variant: 'green' as const,
  },
]

const linkMap: Record<string, { href: string; variant: 'green' | 'blue' }> = {
  Demo: { href: '/demo', variant: 'green' },
  Enroll: { href: '/enroll', variant: 'green' },
  'Student Login': { href: '/login', variant: 'blue' },
  'Our Courses': { href: '/courses', variant: 'green' },
}

interface QuickActionsProps {
  items?: QuickAction[]
}

export const QuickActions = ({ items: apiItems }: QuickActionsProps) => {
  const actions = apiItems && apiItems.length > 0
    ? apiItems.map((item, i) => {
        const mapped = linkMap[item.heading] ?? { href: '#', variant: 'green' as const }
        return {
          title: item.heading || fallbackActions[i]?.title || '',
          subtitle: item['button-text'] || fallbackActions[i]?.subtitle || '',
          icon: mediaUrl(item.icon, fallbackActions[i]?.icon || '/Demo Icon-01.svg'),
          href: mapped.href,
          variant: mapped.variant,
        }
      })
    : fallbackActions

  return (
    <section className="relative w-full bg-white py-20">
      <div className="container mx-auto max-w-4xl px-4">

        <div className="grid grid-cols-2 gap-y-16 gap-x-4 md:grid-cols-4 md:gap-y-10 md:gap-x-0">
          {actions.map((item, index) => (
            <div
              key={item.title}
              className="relative flex items-start justify-center min-h-35 md:min-h-0"
            >
              <div className="relative flex w-full max-w-42.5 flex-col items-center text-center">

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative h-40 w-32 md:h-44 md:w-37.5">
                    <Image
                      src="/Calligraphy-01.png"
                      alt=""
                      fill
                      className="object-cover opacity-100"
                    />
                  </div>
                </div>

                <div className="relative z-10 flex flex-col -mt-3 lg:-mt-8 items-center text-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={42}
                    height={42}
                    className="mb-0"
                  />

                  <Heading
                    textSize="text-lg font-bold leading-none"
                  >
                    {item.title}
                  </Heading>

                  {item.title === 'Student Login' ? (
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('cef-open-login-popup'))}
                      className="cursor-pointer border-0 bg-transparent p-0"
                    >
                      <span
                        className={`inline-block rounded-full border-2 px-3 py-1 text-[8px] font-bold transition-all duration-300 mt-0
                          ${
                            item.variant === 'green'
                              ? 'bg-[#8DC63F] text-white border-[#8DC63F] hover:bg-white hover:text-[#8DC63F]'
                              : 'bg-[#065D80] text-white border-[#065D80] hover:bg-white hover:text-[#065D80]'
                          }
                        `}
                      >
                        {item.subtitle}
                      </span>
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <span
                        className={`inline-block rounded-full border-2 px-3 py-1 text-[8px] font-bold transition-all duration-300 mt-0
                          ${
                            item.variant === 'green'
                              ? 'bg-[#8DC63F] text-white border-[#8DC63F] hover:bg-white hover:text-[#8DC63F]'
                              : 'bg-[#065D80] text-white border-[#065D80] hover:bg-white hover:text-[#065D80]'
                          }
                        `}
                      >
                        {item.subtitle}
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {index !== actions.length - 1 && (
                <div className="hidden md:absolute md:right-0 md:flex md:h-full md:items-center">
                  <div className="h-24 w-px bg-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Link
        href="#"
        className="fixed right-0 top-[calc(50%+20rem)] z-50 -translate-y-1/2 cursor-pointer"
      >
        <div
          className="flex items-center gap-3 rounded-l-full bg-[#8DC63F] px-4 py-3 text-white shadow-lg transition-all hover:bg-[#8DC63F]"
        >
          <Image src="/Chat Icon.svg" alt="Chat" width={26} height={26} />
          <div className="pr-1 text-left leading-tight">
            <div className="text-xs font-semibold">Need Help?</div>
            <div className="text-xs">Chat with Us</div>
          </div>
        </div>
      </Link>
    </section>
  )
}
