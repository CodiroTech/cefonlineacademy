'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { NavMenu } from './nav-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from '@/components/ui/sheet'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import { bookshopUrl } from '@/lib/config'

export type NavigationSheetProps = {
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
  onBookDemoOpen?: () => void
  onLoginOpen?: () => void
  onLogout?: () => void
  isLoggedIn?: boolean
  /** Controlled mode: when set, sheet open state is controlled and no default trigger is rendered (caller renders trigger(s)). */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const NavigationSheet = ({ data, onBookDemoOpen, onLoginOpen, onLogout, isLoggedIn, open, onOpenChange }: NavigationSheetProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isControlled = open !== undefined && onOpenChange !== undefined

  if (!isMounted) {
    // Return a simple button placeholder during SSR
    return (
      <button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground size-9 border-primary text-primary cursor-pointer"
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>
    )
  }

  return (
    <Sheet open={isControlled ? open : undefined} onOpenChange={isControlled ? onOpenChange : undefined}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="overflow-y-scroll w-80 sm:w-96 bg-white border-l border-gray-200 p-0"
      >
        <SheetHeader className="flex flex-row items-center justify-start p-4 border-b border-gray-200">
          {data?.['header-logo']?.full_url ? (
            <Image
              src={data['header-logo'].full_url}
              alt="logo"
              width={96}
              height={40}
              className="w-24 h-auto"
            />
          ) : (
            <div className="w-24 h-12 bg-gray-200" />
          )}
        </SheetHeader>

        <div className="py-6 px-4">
          <NavMenu orientation="vertical" className="mb-8" data={data} />

          {/* SOCIAL ICONS */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-primary mb-4">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebookF, url: data?.['facebook-url'] },
                { icon: FaInstagram, url: data?.['insta-url'] },
                { icon: FaYoutube, url: data?.['youtube-url'] },
                { icon: FaLinkedinIn, url: data?.['linkedin-url'] },
              ]
                .filter(({ url }) => url)
                .map(({ icon: Icon, url }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Icon className="text-white text-sm" />
                  </a>
                ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex flex-col gap-3">

              {/* Dashboard + Logout (when logged in) or Student Login + Book a Demo */}
              {isLoggedIn ? (
                <>
                  <Link
                    href={(data?.['portal-url']?.trim() && /^https?:\/\//i.test(data['portal-url'].trim())) ? data['portal-url'].trim()! : 'https://cefonlineacademy.com/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      className="w-full py-2.5 text-sm bg-[#0B5C6B] hover:bg-[#094a56] text-white cursor-pointer"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  {onLogout && (
                    <Button
                      className="w-full py-2.5 text-sm bg-[#8BC34A] hover:bg-[#79ad3f] text-white cursor-pointer"
                      onClick={onLogout}
                    >
                      Logout
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {onLoginOpen ? (
                    <Button
                      className="w-full py-2.5 text-sm bg-[#0B5C6B] hover:bg-[#094a56] text-white cursor-pointer"
                      onClick={onLoginOpen}
                    >
                      Student Login
                    </Button>
                  ) : (
                    <Link href="/login" className="w-full">
                      <Button
                        className="w-full py-2.5 text-sm bg-[#0B5C6B] hover:bg-[#094a56] text-white cursor-pointer"
                      >
                        Student Login
                      </Button>
                    </Link>
                  )}
                  {/* Book a Demo – GREEN */}
                  {onBookDemoOpen ? (
                    <Button
                      className="w-full py-2.5 text-sm bg-[#8BC34A] hover:bg-[#79ad3f] text-white cursor-pointer"
                      onClick={onBookDemoOpen}
                    >
                      Book a Demo
                    </Button>
                  ) : (
                    <Link href="/book-demo" className="w-full">
                      <Button
                        className="w-full py-2.5 text-sm bg-[#8BC34A] hover:bg-[#79ad3f] text-white cursor-pointer"
                      >
                        Book a Demo
                      </Button>
                    </Link>
                  )}
                </>
              )}

              {/* CEF Bookshop - BLUE */}
              <Link
                href={bookshopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full py-2.5 text-sm bg-[#0B5C6B] hover:bg-[#094a56] text-white cursor-pointer"
                >
                  CEF Bookshop
                </Button>
              </Link>

              {/* CEF Website – GREEN */}
              <Link
                href="https://cef.org.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  className="w-full py-2.5 text-sm bg-[#8BC34A] hover:bg-[#79ad3f] text-white cursor-pointer"
                >
                  CEF Website
                </Button>
              </Link>

              {/* Donate Now – RED */}
              <Link href="/donations" className="w-full">
                <Button
                  className="w-full py-2.5 text-sm bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                >
                  Donate Now
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}