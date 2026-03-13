'use client'

import { useState, useEffect } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NavMenu } from './nav-menu'
import { NavigationSheet } from './navigation-sheet'
import { BookADemoPopup, type PreselectedCourse } from '@/components/demo/BookADemoPopup'
import { LoginPopup, type LoginSuccessContext } from '@/components/auth/LoginPopup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { getAuthCookie, clearAuthCookie } from '@/lib/auth-cookie'
import { bookshopUrl, backendBaseUrl, portalUrl as configPortalUrl } from '@/lib/config'
import { getCheckoutUrlWithAuth, getPortalCourseUrlWithAuth, getBillingUrlWithAuth } from '@/lib/portal-urls'
import { AboutHeader } from '@/components/common/aboutHeader'
import { enrollCourse, addToCart } from '@/lib/api/student-actions'
import { getCourseDetailBySlug } from '@/lib/api/course-detail'

type LoginPopupCourseIntent = 'enroll_free' | 'buy' | 'request_enrollment_live'

type LoginPopupDetail = {
  stayOnPage?: boolean
  courseForDemo?: PreselectedCourse
  intent?: LoginPopupCourseIntent
  courseId?: number
  slug?: string
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

type PageHeaderData = { title: string; imageSrc: string } | null

function getBackendBase(): string {
  return process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
}

function getLiveEnrollmentFormUrl(slug: string): string {
  const base = getBackendBase().replace(/\/$/, '')
  return base ? `${base}/live-course-enrollment-form/1/${encodeURIComponent(slug)}` : '#'
}

async function runNextStepAfterAuth(
  ctx: LoginSuccessContext,
  router: ReturnType<typeof useRouter>,
): Promise<void> {
  const { token, role, intent, courseId, slug } = ctx

  // 1. If we have slug + token, fetch course state to decide the right action (enrolled → Go to Course, etc.)
  let courseExits: 'enrolled' | 'cartList' | 0 = 0
  if (slug && token) {
    const course = await getCourseDetailBySlug(slug, token, { noGuestFallback: true })
    if (course && typeof course.course_exits !== 'undefined') courseExits = course.course_exits as 'enrolled' | 'cartList' | 0
  }

  // 2. Already enrolled → redirect to portal course page with auth hash so portal restores session
  if (courseExits === 'enrolled' && slug) {
    const url = getPortalCourseUrlWithAuth(slug, token, role)
    if (url) {
      window.location.href = url
      return
    }
  }

  // 3. In cart and intent was buy → send to billing screen with checkout open
  if (courseExits === 'cartList' && intent === 'buy') {
    const url = getBillingUrlWithAuth(token, role)
    if (url) {
      window.location.href = url
      return
    }
  }

  // 4. Not enrolled: perform the intended action
  if (intent === 'enroll_free' && courseId != null) {
    const result = await enrollCourse(courseId, token)
    if (result.ok && slug) {
      const url = getPortalCourseUrlWithAuth(slug, token, role)
      if (url) {
        window.location.href = url
        return
      }
    }
    if (result.ok) {
      router.refresh()
      return
    }
  }
  if (intent === 'buy' && courseId != null) {
    const result = await addToCart(courseId, token)
    if (result.ok) {
      const url = getBillingUrlWithAuth(token, role)
      if (url) {
        window.location.href = url
        return
      }
    }
    if (result.ok) {
      router.refresh()
      return
    }
  }
  if (intent === 'request_enrollment_live' && slug) {
    const url = getLiveEnrollmentFormUrl(slug)
    if (url !== '#') {
      window.location.href = url
      return
    }
  }

  // 5. Fallback: refresh so CTA updates (e.g. Go to Course / Enroll Now / Buy Now)
  router.refresh()
}

const Navbar01Page = ({ data }: NavbarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'
  const [pageHeader, setPageHeader] = useState<PageHeaderData>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginOptions, setLoginOptions] = useState<LoginPopupDetail | null>(null)
  const [demoPreselectedCourse, setDemoPreselectedCourse] = useState<PreselectedCourse | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!getAuthCookie()?.token)
  }, [])

  const refreshAuthState = () => setIsLoggedIn(!!getAuthCookie()?.token)

  const handleLogout = () => {
    const auth = getAuthCookie()
    const token = auth?.token
    const base = (configPortalUrl || '').replace(/\/$/, '')

    if (token && backendBaseUrl) {
      const logoutApiUrl = `${backendBaseUrl.replace(/\/$/, '')}/logoutApi`
      fetch(logoutApiUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      }).catch(() => {})
    }

    clearAuthCookie()
    setIsLoggedIn(false)
    setSheetOpen(false)
    router.refresh()

    if (base) {
      const portalLogoutUrl = `${base}/logout`
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = portalLogoutUrl
      document.body.appendChild(iframe)
      setTimeout(() => document.body.removeChild(iframe), 3000)
    }
  }
  useEffect(() => {
    if (isHomePage || !pathname) {
      setPageHeader(null)
      return
    }
    let cancelled = false
    fetch(`/api/page-header?path=${encodeURIComponent(pathname)}`)
      .then((res) => res.json())
      .then((body: { title?: string | null; imageSrc?: string | null }) => {
        if (cancelled) return
        const title = body?.title ?? null
        const imageSrc = body?.imageSrc ?? null
        if (title || imageSrc)
          setPageHeader({
            title: title || 'About Us',
            imageSrc: imageSrc || '/About Us Header.png',
          })
        else setPageHeader(null)
      })
      .catch(() => {
        if (!cancelled) setPageHeader(null)
      })
    return () => {
      cancelled = true
    }
  }, [pathname, isHomePage])
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<LoginPopupDetail | undefined>)?.detail
      if (detail && typeof detail === 'object') {
        setLoginOptions({
          stayOnPage: !!detail.stayOnPage,
          courseForDemo: detail.courseForDemo ?? undefined,
          intent: detail.intent,
          courseId: detail.courseId,
          slug: detail.slug,
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

  const socialLinks = [
    { icon: FaFacebookF, url: data?.['facebook-url'] },
    { icon: FaInstagram, url: data?.['insta-url'] },
    { icon: FaYoutube, url: data?.['youtube-url'] },
    { icon: FaLinkedinIn, url: data?.['linkedin-url'] },
  ].filter(({ url }) => !!url)

  const renderSocialIcons = (className = '') => (
    <div className={`flex items-center gap-1 ${className}`}>
      {socialLinks.map(({ icon: Icon, url }, idx) => (
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
  )

  const renderRightSection = (showSocialInRow: boolean) => (
    <div className="flex items-center justify-end gap-1">
      {showSocialInRow && (
        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
          <div className="flex items-center gap-1 mb-1">{renderSocialIcons()}</div>
          <div className="flex items-center gap-1 flex-wrap justify-end">{renderButtons()}</div>
        </div>
      )}
      {!showSocialInRow && (
        <>
          <div className="hidden sm:flex items-center gap-1 flex-wrap justify-end">
            {renderSocialIcons()}
            {renderButtons()}
          </div>
        </>
      )}
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
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  )

  const renderButtons = () => (
    <>
      <Link href="/search" className="hidden md:inline-flex shrink-0" aria-label="Search">
        <IoMdSearch className="w-5 h-5 lg:w-6 lg:h-6 text-primary cursor-pointer" />
      </Link>
      {isLoggedIn ? (
        <>
          <Link href={portalUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primarySmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">Dashboard</Button>
          </Link>
          <Button
            variant="secondarySmall"
            className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
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
      <Link href={bookshopUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="primarySmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">CEF Bookshop</Button>
      </Link>
      <Link href="https://cef.org.pk" target="_blank" rel="noopener noreferrer">
        <Button variant="secondarySmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">CEF Website</Button>
      </Link>
      <Link href="/donations">
        <Button variant="dangerSmall" className="lg:text-[0.45rem]! xl:text-[0.7rem]! 2xl:text-[0.9rem]! cursor-pointer whitespace-nowrap px-1.5! py-0.5! lg:px-2! 2xl:px-3! 2xl:py-1!">Donate Now</Button>
      </Link>
    </>
  )

  if (isHomePage) {
    return (
      <>
        <div className="mt-[30px] w-full shrink-0">
          <nav className="h-16 sm:h-20 md:h-24 mb-0 bg-transparent navbar-shrink w-full">
            <div className="h-full flex items-center justify-start gap-6 max-w-[1600px] mx-auto px-8 lg:px-20">
            <div className="shrink-0 mt-28 pl-6 lg:pl-8">
              <Link href="/" className="cursor-pointer">
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt="logo"
                    width={140}
                    height={46}
                    className="w-28 sm:w-32 md:w-36 lg:w-36 xl:w-40 2xl:w-44 cursor-pointer"
                    priority
                  />
                ) : (
                  <div className="w-36 h-12 bg-gray-200 animate-pulse" />
                )}
              </Link>
            </div>
            <NavMenu className="hidden lg:block" data={data} applyMenuTopMargin />
            {renderRightSection(true)}
          </div>
        </nav>
        </div>
        <Popups />
      </>
    )
  }

  return (
    <>
      <header className="mt-0 lg:mt-10 w-full navbar-shrink">
        {/* Wider header container than homepage; no side padding on mobile */}
        <div className="w-full max-w-[1600px] mx-auto px-0 lg:px-20">
          {/* Top row: social icons — hidden on mobile (shown in menu drawer), visible from lg */}
          <div className="relative z-[120] -mb-[17px] w-full hidden lg:flex justify-end items-center py-0.5 min-h-0">
            {renderSocialIcons('flex')}
          </div>
          {/* Main nav row: same vertical alignment as homepage (centered in row) */}
          <nav className="h-16 sm:h-20 md:h-24 -mb-1 bg-white border-b border-gray-100">
            <div className="h-full flex items-center justify-between gap-2">
              <div className="relative z-[110] shrink-0 mt-22 ml-8 lg:ml-10">
                <Link href="/" className="cursor-pointer">
                  {logoSrc ? (
                    <Image
                      src={logoSrc}
                      alt="logo"
                      width={100}
                      height={33}
                      className="w-20 sm:w-24 md:w-28 lg:w-24 xl:w-28 2xl:w-32 cursor-pointer"
                      priority
                    />
                  ) : (
                    <div className="w-32 h-12 bg-gray-200 animate-pulse" />
                  )}
                </Link>
              </div>
              <div className="hidden lg:flex flex-1 items-center justify-between gap-2">
                <NavMenu className="flex-1" data={data} />
                <div className="flex items-center gap-1 flex-wrap justify-end shrink-0">
                  {renderButtons()}
                </div>
              </div>
              <div className="ml-2 flex items-center lg:hidden">
                <NavigationSheet
                  data={data}
                  open={sheetOpen}
                  onOpenChange={setSheetOpen}
                  onBookDemoOpen={() => {
                    setDemoPreselectedCourse(null)
                    setDemoOpen(true)
                  }}
                  onLoginOpen={() => {
                    setLoginOptions(null)
                    setLoginOpen(true)
                  }}
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </div>
          </nav>
          {/* Green page header — on top, pulled up toward nav; on mobile hamburger inside green area top right */}
          {pageHeader && (
            <div className="relative z-[100] -mt-5 pb-1">
              <div className="lg:hidden absolute top-3 right-3 z-30">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="border-[#065D80] text-[#065D80] hover:bg-[#065D80] hover:text-white cursor-pointer shrink-0"
                  onClick={() => setSheetOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
              <AboutHeader
                title={pageHeader.title}
                imageSrc={pageHeader.imageSrc}
                embedded
              />
            </div>
          )}
        </div>
      </header>
      <Popups />
    </>
  )

  function Popups() {
    return (
      <>
        <BookADemoPopup
          open={demoOpen}
          onOpenChange={(open) => {
            setDemoOpen(open)
            if (!open) setDemoPreselectedCourse(null)
          }}
          preselectedCourse={demoPreselectedCourse}
          signupSuccessContext={
            demoPreselectedCourse && (loginOptions?.intent != null || loginOptions?.courseId != null || loginOptions?.slug)
              ? { intent: loginOptions?.intent, courseId: loginOptions?.courseId, slug: loginOptions?.slug }
              : undefined
          }
          onSignupSuccess={
            demoPreselectedCourse
              ? (ctx) => {
                  // New signup from course details: log in on academy (cookie set in popup), then go to portal billing with checkout open
                  const url = getBillingUrlWithAuth(ctx.token, ctx.role)
                  if (url) window.location.href = url
                  else router.refresh()
                }
              : undefined
          }
        />
        <LoginPopup
          open={loginOpen}
          onOpenChange={(open) => {
            setLoginOpen(open)
            if (!open) refreshAuthState()
          }}
          portalUrl={portalUrl}
          stayOnPage={loginOptions?.stayOnPage ?? false}
          loginSuccessContext={
            (loginOptions?.intent != null || loginOptions?.courseId != null || loginOptions?.slug != null)
              ? {
                  intent: loginOptions?.intent,
                  courseId: loginOptions?.courseId,
                  slug: loginOptions?.slug,
                }
              : undefined
          }
          onLoginSuccess={
            loginOptions?.stayOnPage && (loginOptions?.intent != null || loginOptions?.courseId != null || loginOptions?.slug != null)
              ? (ctx) => runNextStepAfterAuth(ctx, router)
              : undefined
          }
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
      </>
    )
  }
}

export default Navbar01Page