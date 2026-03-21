'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Text } from '../common/text'
import { bookshopUrl } from '@/lib/config'
import { getAuthCookie } from '@/lib/auth-cookie'
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
  showSocialIconsOnly?: boolean
}

const footerColumns: Array<FooterColumn> = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about-us' },
      { label: 'Media Center', href: '/media-center/upcoming-courses' },
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
    heading: 'Policies',
    links: [], // filled from data.policies (API)
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
    showSocialIconsOnly: true,
  },
]

const DEFAULT_FOOTER_TEXT =
  'Character Education Foundation (CEF) is an independent operational entity registered as a not-for-profit company set up under section 42 of the Companies Act, 2017.'

type PolicyLink = { id: number; title: string }

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
    policies?: PolicyLink[]
  }
}

export const Footer = ({ data }: FooterProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(!!getAuthCookie()?.token)
  }, [])

  const policyLinks: Array<FooterLink> = (data?.policies ?? []).map((p) => ({
    label: p.title,
    href: `/policies/${p.id}`,
  }))
  const columnsWithPolicies = footerColumns.map((col) =>
    col.heading === 'Policies' ? { ...col, links: policyLinks } : col
  )

  const openBookDemo = () => {
    window.dispatchEvent(new CustomEvent('cef-open-demo-popup'))
  }

  const socialLinks = [
    { icon: FaFacebookF, url: data?.['facebook-url'] || '', hoverColor: 'hover:bg-[#1877F2]' },
    { icon: FaInstagram, url: data?.['insta-url'] || '', hoverColor: 'hover:bg-[#E4405F]' },
    { icon: FaYoutube, url: data?.['youtube-url'] || '', hoverColor: 'hover:bg-[#FF0000]' },
    { icon: FaLinkedinIn, url: data?.['linkedin-url'] || '', hoverColor: 'hover:bg-[#0A66C2]' },
  ].filter(({ url }) => url.startsWith('http'))

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
                {columnsWithPolicies.map((column) => (
                  <div key={column.heading ?? column.links[0]?.label}>
                    {column.heading && (
                      <h4 className="mb-3 text-xs font-bold text-white">
                        {column.heading}
                      </h4>
                    )}

                    <ul className="space-y-2 text-xs">
                      {column.links.map((l) => {
                        const isBookshop = l.label === 'CEF Bookshop'
                        if (l.label === 'Enroll Now') {
                          if (isLoggedIn) return null
                          return (
                            <li key={l.label}>
                              <button
                                type="button"
                                onClick={openBookDemo}
                                className="text-white hover:text-secondary transition-colors cursor-pointer text-left bg-transparent border-0 p-0 font-inherit"
                              >
                                {l.label}
                              </button>
                            </li>
                          )
                        }
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
                            <span className="font-bold text-xs text-white whitespace-nowrap">
                              Join Us
                            </span>
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

                      {column.showSocialIconsOnly && (
                        <li className="pt-2">
                          <div className="flex gap-2">
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
                        </li>
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
