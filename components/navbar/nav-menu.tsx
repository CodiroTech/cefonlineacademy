'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import type { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface SubItem {
  label: string
  to: string
  icon?: React.ReactNode
}

interface SocialIcon {
  name: string
  url: string
  icon: string
}

interface DropdownLink {
  label: string
  to: string
  hasSubItems?: boolean
  subItems?: Array<SubItem>
  specialNote?: string
  socialIcons?: Array<SocialIcon>
}

interface NavigationItem {
  label: string
  to?: string
  hasDropdown: boolean
  dropdownLinks: Array<DropdownLink>
}

type NavMenuData = {
  'facebook-url'?: string
  'insta-url'?: string
  'youtube-url'?: string
  'linkedin-url'?: string
}

const navigationItems: Array<NavigationItem> = [
  {
    label: 'About us',
    hasDropdown: true,
    dropdownLinks: [
      { label: 'Vision, Mission & Core Values', to: '/about-us' },
      { label: 'Our Teachers', to: '/about/teachers' },
      { label: 'Our Speakers', to: '/about/speakers' },
      // { label: 'Our Accreditations', to: '/about/programs' },
      { label: 'Why Choose Us?', to: '/why-choose-cef' },
    ],
  },
  {
    label: 'Our Courses',
    hasDropdown: true,
    dropdownLinks: [
      { label: 'Quran Tutoring Courses', to: '/courses/quran-tutoring-courses' },
      { label: 'Other Courses', to: '/courses/other-courses' },
    ],
  },
  // {
  //   label: 'Other Offerings',
  //   hasDropdown: true,
  //   dropdownLinks: [
  //     { label: 'Weekly Learning Sessions', to: '/offerings/weeklySessions' },
  //     { label: 'Special Series', to: '/offerings/specialSeries' },
  //     { label: 'Webinars', to: '/offerings/webinars' },
  //     { label: 'Workshops', to: '/offerings/workshops' },
  //     { label: 'Mentorship Circles', to: '/offerings/mentorship' },
  //   ],
  // },
  {
    label: 'Media Center',
    hasDropdown: true,
    dropdownLinks: [
      { label: 'Upcoming Courses/sessions', to: '/media-center/upcoming-courses' },
      { label: 'Testimonials', to: '/media-center/testimonials' },
      { label: 'Blogs', to: '/media-center/blogs' },
      { label: 'Podcasts', to: '/media-center/podcasts' },
      {
        label: 'Social Media',
        to: '/',
        hasSubItems: true,
        subItems: [
          {
            label: 'Facebook',
            to: 'https://facebook.com',
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#1877F2"
                  d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4v-2.3c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.4.7-1.4 1.3V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12z"
                />
              </svg>
            ),
          },
          {
            label: 'Instagram',
            to: 'https://instagram.com',
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#E1306C"
                  d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7z"
                />
                <path
                  fill="#fff"
                  d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                />
              </svg>
            ),
          },
          {
            label: 'YouTube',
            to: 'https://youtube.com',
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#FF0000"
                  d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-1C16.4 4.5 12 4.5 12 4.5s-4.4 0-7 .5c-.4.2-1.3.2-2 1-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.6.8 2 1 2.6.5 7 .5 7 .5s4.4 0 7-.5c.4-.2 1.3-.2 2-1 .6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2z"
                />
                <path fill="#fff" d="m10 15 5.2-3L10 9z" />
              </svg>
            ),
          },
          {
            label: 'Twitter (X)',
            to: 'https://x.com',
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#000000"
                  d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-6.2L5.9 22H2.8l7.3-8.4L1 2h6.6l4.6 5.6L18.9 2z"
                />
              </svg>
            ),
          },
          {
            label: 'WhatsApp',
            to: 'https://wa.me',
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#25D366"
                  d="M12 2a10 10 0 0 0-8.4 15.4L2 22l4.7-1.5A10 10 0 1 0 12 2z"
                />
              </svg>
            ),
          },
          {
            label: 'Pinterest',
            to: 'https://pinterest.com',
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#E60023"
                  d="M12 2a10 10 0 1 0 6.6 17.5c-.1-.8-.3-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .8-.5 2.1-.8 3.3-.3 1 .6 1.8 1.6 1.8 1.9 0 3.4-2 3.4-4.9 0-2.6-1.9-4.4-4.6-4.4-3.1 0-4.9 2.3-4.9 4.7 0 .9.3 1.9.8 2.4.1.1.1.2.1.3l-.3 1c0 .2-.2.2-.3.1-1-.5-1.6-2.1-1.6-3.4 0-2.8 2-5.4 5.8-5.4z"
                />
              </svg>
            ),
          },
          {
            label: 'LinkedIn',
            to: 'https://linkedin.com',
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#0077B5"
                  d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3zM9 9h3.6v1.7h.1c.5-1 1.8-2 3.6-2 3.9 0 4.6 2.6 4.6 6V21h-4v-5.2c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"
                />
              </svg>
            ),
          },
        ],
      },
    ],
  },
  {
    label: 'Contact Us',
    to: '/contact-us',
    hasDropdown: false,
    dropdownLinks: [],
  },
]

export const NavMenu = ({
  data,
  applyMenuTopMargin,
  ...menuProps
}: NavigationMenuProps & {
  data?: NavMenuData
  /** When true, navigation menu gets mt-[30px] (homepage only) */
  applyMenuTopMargin?: boolean
}) => {
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState<string | null>(
    null,
  )
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null,
  )
  const [isMounted, setIsMounted] = useState(false)

  const isVertical = menuProps.orientation === 'vertical'
  const socialMediaSubItems = useMemo<SubItem[]>(
    () =>
      ([
        {
          label: 'Facebook',
          to: data?.['facebook-url'] || '',
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#1877F2"
                d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4v-2.3c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.4.7-1.4 1.3V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12z"
              />
            </svg>
          ),
        },
        {
          label: 'Instagram',
          to: data?.['insta-url'] || '',
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#E1306C"
                d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7z"
              />
              <path
                fill="#fff"
                d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
              />
            </svg>
          ),
        },
        {
          label: 'YouTube',
          to: data?.['youtube-url'] || '',
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#FF0000"
                d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-1C16.4 4.5 12 4.5 12 4.5s-4.4 0-7 .5c-.4.2-1.3.2-2 1-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.6.8 2 1 2.6.5 7 .5 7 .5s4.4 0 7-.5c.4-.2 1.3-.2 2-1 .6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2z"
              />
              <path fill="#fff" d="m10 15 5.2-3L10 9z" />
            </svg>
          ),
        },
        {
          label: 'LinkedIn',
          to: data?.['linkedin-url'] || '',
          icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#0077B5"
                d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3zM9 9h3.6v1.7h.1c.5-1 1.8-2 3.6-2 3.9 0 4.6 2.6 4.6 6V21h-4v-5.2c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"
              />
            </svg>
          ),
        },
      ] as SubItem[]).filter((item) => Boolean(item.to)),
    [data],
  )
  const resolvedNavigationItems = useMemo(
    () =>
      navigationItems.map((item) => {
        if (item.label !== 'Media Center') return item
        return {
          ...item,
          dropdownLinks: item.dropdownLinks.map((dropdownItem) =>
            dropdownItem.label === 'Social Media'
              ? { ...dropdownItem, subItems: socialMediaSubItems }
              : dropdownItem,
          ),
        }
      }),
    [socialMediaSubItems],
  )

  // Fix hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Return a placeholder that matches the eventual structure
    return (
      <div className={menuProps.className}>
        <ul className="gap-0 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:w-full relative group flex flex-1 list-none items-center justify-start">
          {resolvedNavigationItems.map((item) => (
            <li key={item.label} className={isVertical ? 'w-full' : 'relative'}>
              {item.hasDropdown ? (
                <button className="text-primary font-medium lg:text-[0.6rem]! xl:text-[0.8rem]! 2xl:text-[0.9rem]! hover:text-[#0B5C6B] hover:font-medium cursor-pointer group inline-flex h-9 w-max items-center justify-center px-2 py-2">
                  {item.label}
                </button>
              ) : (
                <Link
                  className={`text-primary font-medium cursor-pointer whitespace-nowrap lg:text-[0.6rem]! xl:text-[0.8rem]! 2xl:text-[0.9rem]! hover:text-[#0B5C6B] hover:font-medium ${
                    isVertical ? 'w-full block p-3' : ''
                  }`}
                  href={item.to!}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <NavigationMenu viewport={false} applyTopMargin={applyMenuTopMargin} {...menuProps}>
      <NavigationMenuList className="flex items-center gap-0 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:w-full relative">
        {resolvedNavigationItems.map((item) =>
          item.hasDropdown ? (
            <NavigationMenuItem
              key={item.label}
              className={isVertical ? 'w-full' : 'relative'}
            >
              {isVertical ? (
                <button
                  className="text-primary font-medium lg:text-[0.6rem]! xl:text-[0.8rem]! 2xl:text-[0.9rem]! hover:text-[#0B5C6B] hover:font-medium w-full text-left p-1 flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedMobileItem(
                      expandedMobileItem === item.label ? null : item.label,
                    )
                  }
                >
                  {item.label}
                  <ChevronRightIcon
                    className={`h-4 w-4 text-primary transition-transform ${
                      expandedMobileItem === item.label ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              ) : (
                <NavigationMenuTrigger className="text-primary font-medium lg:text-[0.6rem]! xl:text-[0.8rem]! 2xl:text-[0.9rem]! hover:text-[#0B5C6B] hover:font-medium cursor-pointer">
                  {item.label}
                </NavigationMenuTrigger>
              )}

              {/* Mobile expanded content */}
              {isVertical && expandedMobileItem === item.label && (
                <div className="w-full pl-4 py-2 space-y-2">
                  {item.dropdownLinks.map((dropdownItem) => (
                    <div key={dropdownItem.label}>
                      <Link
                        className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-secondary focus:bg-accent focus:text-secondary text-primary font-medium lg:text-[0.6rem] xl:text-[0.8rem] 2xl:text-[0.9rem]! cursor-pointer"
                        href={dropdownItem.to}
                      >
                        {dropdownItem.label}
                      </Link>

                      {dropdownItem.hasSubItems && (
                        <div className="pl-4 py-1 space-y-1">
                          {dropdownItem.subItems?.map((subItem) => (
                            <Link
                              key={subItem.label}
                              className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-secondary focus:bg-accent focus:text-secondary text-primary font-medium lg:text-[0.6rem] xl:text-[0.8rem] 2xl:text-[0.9rem]! cursor-pointer"
                              href={subItem.to}
                            >
                              <div className="flex items-center gap-1">
                                {dropdownItem.label === 'Social Media' &&
                                  subItem.icon && (
                                    <span className="w-3 h-3">
                                      {subItem.icon}
                                    </span>
                                  )}
                                <span>{subItem.label}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Desktop dropdown content */}
              {!isVertical && (
                <NavigationMenuContent className="absolute left-0 top-full mt-1 z-50">
                  <ul className="w-50">
                    {item.dropdownLinks.map((dropdownItem) => (
                      <div
                        key={dropdownItem.label}
                        onMouseEnter={() =>
                          setHoveredDropdownItem(dropdownItem.label)
                        }
                        onMouseLeave={() => setHoveredDropdownItem(null)}
                      >
                        <li className="relative">
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none cursor-pointer space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-secondary focus:bg-accent focus:text-secondary text-primary font-medium"
                              href={dropdownItem.to}
                            >
                              <div className="lg:text-[0.6rem] xl:text-[0.8rem] 2xl:text-[0.9rem] font-medium leading-none cursor-pointer flex items-center justify-between">
                                {dropdownItem.label}
                                {dropdownItem.hasSubItems && (
                                  <ChevronRightIcon className="h-4 w-4 text-primary" />
                                )}
                              </div>
                            </Link>
                          </NavigationMenuLink>

                          {dropdownItem.hasSubItems &&
                            hoveredDropdownItem === dropdownItem.label && (
                              <div
                                className="absolute top-0 left-full pl-2 z-110"
                                onMouseEnter={() =>
                                  setHoveredDropdownItem(dropdownItem.label)
                                }
                                onMouseLeave={() =>
                                  setHoveredDropdownItem(null)
                                }
                              >
                                <div
                                  className={`relative cursor-pointer bg-white rounded-b-4xl p-4 shadow-xl border border-gray-200 ${
                                    dropdownItem.label === 'Social Media'
                                      ? 'w-auto min-w-0'
                                      : 'w-max min-w-50'
                                  }
                                  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-1 before:bg-[#085c7c] before:rounded-t-4xl before:z-1
                                  after:content-[''] after:absolute after:left-0 after:top-1 after:w-full after:h-1 after:bg-[#88bc44] after:z-1
                                  *:relative *:z-2`}
                                >
                                <ul
                                  className={
                                    dropdownItem.label === 'Social Media'
                                      ? 'flex flex-col items-start gap-1'
                                      : 'space-y-1'
                                  }
                                >
                                  {dropdownItem.subItems?.map((subItem) => (
                                    <li key={subItem.label}>
                                      <Link
                                        className={
                                          dropdownItem.label === 'Social Media'
                                            ? 'block select-none cursor-pointer rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-secondary focus:bg-accent focus:text-secondary text-primary font-medium'
                                            : 'block select-none cursor-pointer rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-secondary focus:bg-accent focus:text-secondary text-primary font-medium'
                                        }
                                        href={subItem.to}
                                      >
                                        {dropdownItem.label === 'Social Media' ? (
                                          <span className="w-4 h-4 inline-block">{subItem.icon}</span>
                                        ) : (
                                          <div className="flex items-center gap-2">
                                            {subItem.icon && <span className="w-4 h-4">{subItem.icon}</span>}
                                            <span className="lg:text-[0.6rem] xl:text-[0.8rem] 2xl:text-[0.9rem]">
                                              {subItem.label}
                                            </span>
                                          </div>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                </div>
                              </div>
                            )}
                        </li>
                      </div>
                    ))}
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem
              key={item.label}
              className={isVertical ? 'w-full' : ''}
            >
              <NavigationMenuLink asChild>
                <Link
                  className={`text-primary font-medium cursor-pointer whitespace-nowrap lg:text-[0.6rem]! xl:text-[0.8rem]! 2xl:text-[0.9rem]! hover:text-[#0B5C6B] hover:font-medium ${
                    isVertical ? 'w-full block p-3' : ''
                  }`}
                  href={item.to!}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}