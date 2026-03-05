'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Text } from '../common/text'
import { bookshopUrl } from '@/lib/config'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'

type FooterLink = {
  label: string
  href?: string
}

type FooterColumn = {
  heading?: string
  links: Array<FooterLink>
  showSocial?: boolean
}

const footerColumns: Array<FooterColumn> = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about/vissionMissionValues' },
      { label: 'Media Center', href: '/media-center/upcomingcourses' },
      { label: 'Contact Us', href: '/Contact' },
    ],
  },
  {
    heading: 'Our Courses',
    links: [
      { label: 'Tutoring Courses', href: '/courses/quran-tutoring-courses' },
      { label: 'Other Courses', href: '/courses/other-courses' },
    ],
  },
  {
    heading: 'Other Offerings',
    links: [
      { label: 'Weekly Sessions', href: '/offerings/weeklySessions' },
      { label: 'Special Series', href: '/offerings/specialSeries' },
      { label: 'Webinars', href: '/offerings/webinars' },
      { label: 'Workshops', href: '/offerings/workshops' },
      { label: 'Mentorship Circles', href: '/offerings/mentorship' },
    ],
  },
  {
    heading: 'Donate',
    links: [
      { label: 'Donate Now', href: '/donations' },
      { label: 'Enroll Now', href: '/courses' },
    ],
    showSocial: true,
  },
  {
    heading: 'CEF Website',
    links: [{ label: 'CEF Bookshop', href: bookshopUrl }],
  },
  {
    heading: 'Integrations',
    links: [{ label: 'think-cell', href: '/think-cell' }],
  },
]

const DEFAULT_FOOTER_TEXT =
  'Character Education Foundation (CEF) is an independent operational entity registered as a not-for-profit company set up under section 42 of the Companies Act, 2017.'

type FooterProps = {
  data?: {
    'header-logo'?: { full_url?: string }
    'footer-logo'?: { full_url?: string }
    'footer-cef-logo'?: { full_url?: string }
    'footer-text'?: string
    'footer-cef-text'?: string
    'footer-image-logo-text'?: string
    'facebook-url'?: string
    'insta-url'?: string
    'youtube-url'?: string
    'linkedin-url'?: string
  }
}

export const Footer = ({ data }: FooterProps) => {
  const socialLinks = [
    { icon: FaFacebookF, url: data?.['facebook-url'] ?? '#', hoverColor: 'hover:bg-[#1877F2]' },
    { icon: FaInstagram, url: data?.['insta-url'] ?? '#', hoverColor: 'hover:bg-[#E4405F]' },
    { icon: FaYoutube, url: data?.['youtube-url'] ?? '#', hoverColor: 'hover:bg-[#FF0000]' },
    { icon: FaLinkedinIn, url: data?.['linkedin-url'] ?? '#', hoverColor: 'hover:bg-[#0A66C2]' },
  ]

  return (
    <footer className="font-poppins relative overflow-hidden">

      <div className="relative w-full bg-primary text-white">

        {/* BACKGROUND IMAGE – HIDDEN ON MOBILE */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-56 pointer-events-none z-0">
          <Image
            src="/foooter-icon.png"
            alt=""
            fill
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 lg:px-23">
            <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-10 md:gap-x-8 py-4">

              {/* LOGOS + TEXT */}
              <div className="md:col-span-3 flex items-stretch gap-12">
                <Link href="/" className="flex items-center">
                  <Image
                    src={data?.['footer-logo']?.full_url ?? '/log2.png'}
                    alt="CEF Logo"
                    width={200}
                    height={260}
                    className="w-50 h-auto object-contain"
                    priority
                  />
                </Link>

                <div className="flex flex-col justify-center gap-3">
                  <Link href="/">
                    <Image
                      src={data?.['footer-cef-logo']?.full_url ?? '/logo-2.png'}
                      alt="Character Education Foundation"
                      width={180}
                      height={44}
                      className="w-40 md:w-45  lg:w-45 h-auto object-contain"
                    />
                  </Link>

                  <p className="text-[0.65rem] text-white text-justify max-w-70">
                    {data?.['footer-cef-text'] || DEFAULT_FOOTER_TEXT}
                  </p>
                </div>
              </div>

              {/* FOOTER LINKS */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 lg:mt-2 gap-y-4">
                {footerColumns.map((column) => (
                  <div key={column.heading ?? column.links[0]?.label}>
                    {column.heading && (
                      <h4 className="mb-3 text-xs font-bold text-white">
                        {column.heading}
                      </h4>
                    )}

                    <ul className="space-y-2 text-xs">
                      {column.links.map((l) => {
                        const isBookshop = l.label === 'CEF Bookshop'
                        return (
                        <li key={l.label}>
                          <Link
                            href={l.href ?? '#'}
                            className="text-white hover:text-secondary transition-colors"
                            {...(isBookshop && { target: '_blank', rel: 'noopener noreferrer' })}
                          >
                            {l.label}
                          </Link>
                        </li>
                        )
                      })}

                      {column.showSocial && (
                        <>
                          <li className="pt-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                              <span className="font-bold text-xs text-white whitespace-nowrap">
                                Join Us
                              </span>

                              <div className="flex gap-2 mt-1 sm:mt-0">
                                {socialLinks.map(({ icon: Icon, url, hoverColor }, idx) => (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`grid h-7 w-7 place-items-center rounded-full bg-secondary transition-colors ${hoverColor}`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </li>

                          <li>
<Link
                            href="/career"
                            className="text-white hover:text-secondary transition-colors"
                          >
                              Career
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="w-full bg-secondary">
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-2 text-center text-xs text-white">
              {data?.['footer-text'] || '© Copyright 2025 | CEF Online Academy | All Rights Reserved'}
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
