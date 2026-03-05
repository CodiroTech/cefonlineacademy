'use client'

import { useState, useEffect } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { NavMenu } from './nav-menu'
import { NavigationSheet } from './navigation-sheet'
import { BookADemoPopup, type PreselectedCourse } from '@/components/demo/BookADemoPopup'
import { LoginPopup } from '@/components/auth/LoginPopup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { getAuthCookie } from '@/lib/auth-cookie'
import { bookshopUrl } from '@/lib/config'

type LoginPopupDetail = {
  stayOnPage?: boolean
  courseForDemo?: PreselectedCourse
}

type NavbarProps = {
  data?: {
    'header-logo'?: {
      full_url?: string
    }
    'facebook-url'?: string
    'insta-url'?: string
    'youtube-url'?: string
    'linkedin-url'?: string
    'portal-url'?: string
  }
}

const Navbar01Page = ({ data }: NavbarProps) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [demoOpen, setDemoOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginOptions, setLoginOptions] = useState<LoginPopupDetail | null>(null)
  const [demoPreselectedCourse, setDemoPreselectedCourse] = useState<PreselectedCourse | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(!!getAuthCookie()?.token)
  }, [])
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<LoginPopupDetail | undefined>)?.detail
      if (detail && typeof detail === 'object') {
        setLoginOptions({
          stayOnPage: !!detail.stayOnPage,
          courseForDemo: detail.courseForDemo ?? undefined,
        })
      } else {
        setLoginOptions(null)
      }
      setLoginOpen(true)
    }
    window.addEventListener('cef-open-login-popup', handler)
    return () => window.removeEventListener('cef-open-login-popup', handler)
  }, [])
  useEffect(() => {
    const handler = () => {
      setDemoPreselectedCourse(null)
      setDemoOpen(true)
    }
    window.addEventListener('cef-open-demo-popup', handler)
    return () => window.removeEventListener('cef-open-demo-popup', handler)
  }, [])
  const portalUrl = (data?.['portal-url']?.trim() && /^https?:\/\//i.test(data['portal-url'].trim()))
    ? data['portal-url'].trim()
    : 'https://cefonlineacademy.com/'

  const logoSrc = data?.['header-logo']?.full_url

  return (
    <nav className="h-16 mt-10 sm:h-20 md:h-24 bg-transparent navbar-shrink">
      <div className="h-full flex items-center justify-between container mx-auto px-2 sm:px-3 md:px-4 lg:px-5 xl:px-5 2xl:px-6">

        {/* Logo - padding (not margin) so left spacing holds at 125%/150% zoom */}
        <div className="shrink-0 mt-22 pl-2 sm:pl-3 md:pl-4 lg:pl-5 xl:pl-5 2xl:pl-6">
          <Link href="/" className="cursor-pointer">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="logo"
                width={isHomePage ? 140 : 100}
                height={isHomePage ? 46 : 33}
                className={
                  isHomePage
                    ? 'w-24 sm:w-32 md:w-36 lg:w-32 xl:w-36 2xl:w-40 cursor-pointer'
                    : 'w-20 sm:w-24 md:w-28 lg:w-24 xl:w-28 2xl:w-32 cursor-pointer'
                }
                priority
              />
            ) : (
              <div className="w-32 h-12 bg-gray-200 animate-pulse" />
            )}
          </Link>
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden lg:block" data={data} />

        {/* Right Section */}
        <div className="flex items-center justify-end gap-1">

          {/* Social Icons */}
          <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1 mb-1">
              {[
                { icon: FaFacebookF, url: data?.['facebook-url'] },
                { icon: FaInstagram, url: data?.['insta-url'] },
                { icon: FaYoutube, url: data?.['youtube-url'] },
                { icon: FaLinkedinIn, url: data?.['linkedin-url'] },
              ]
                .filter(({ url }) => !!url)
                .map(({ icon: Icon, url }, idx) => (
                  <Link
                    key={idx}
                    href={url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 cursor-pointer"
                  >
                    <Icon className="text-white text-xs md:text-sm" />
                  </Link>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-1 flex-wrap justify-end">
              <IoMdSearch className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 text-primary cursor-pointer shrink-0" />
               
              {isLoggedIn ? (
                <Link
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primarySmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Button
                    variant="primarySmall"
                    className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!"
                    onClick={() => {
                      setLoginOptions(null)
                      setLoginOpen(true)
                    }}
                  >
                    Student Login
                  </Button>
                  <Button
                    variant="secondarySmall"
                    className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!"
                    onClick={() => {
                      setDemoPreselectedCourse(null)
                      setDemoOpen(true)
                    }}
                  >
                    Book a Demo
                  </Button>
                </>
              )}

              <Link
                href={bookshopUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primarySmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">CEF Bookshop</Button>
              </Link>

              <Link
                href="https://cef.org.pk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondarySmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">CEF Website</Button>
              </Link>

              <Link href="/donations">
                <Button variant="dangerSmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">Donate Now</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden ml-2">
            <NavigationSheet
              data={data}
              onBookDemoOpen={() => {
                setDemoPreselectedCourse(null)
                setDemoOpen(true)
              }}
              onLoginOpen={() => {
                setLoginOptions(null)
                setLoginOpen(true)
              }}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </div>
      <BookADemoPopup
        open={demoOpen}
        onOpenChange={(open) => {
          setDemoOpen(open)
          if (!open) setDemoPreselectedCourse(null)
        }}
        preselectedCourse={demoPreselectedCourse}
      />
      <LoginPopup
        open={loginOpen}
        onOpenChange={setLoginOpen}
        portalUrl={portalUrl}
        stayOnPage={loginOptions?.stayOnPage ?? false}
        onJoinNow={
          loginOptions?.courseForDemo
            ? () => {
                setLoginOpen(false)
                setDemoPreselectedCourse(loginOptions.courseForDemo!)
                setDemoOpen(true)
              }
            : undefined
        }
      />
    </nav>
  )
}

export default Navbar01Page