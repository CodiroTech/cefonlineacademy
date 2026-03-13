import { NextRequest, NextResponse } from 'next/server'
import {
  getPageHeader,
  getAboutPageHeader,
  getContactPageHeader,
  getMediaCenterPageHeader,
  type PageHeader,
} from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'

/** Map pathname to headless slug or fetcher. */
function getSlugOrFetcher(pathname: string): string | 'about' | 'contact' | 'media-center' | null {
  const path = (pathname || '').replace(/^\/+|\/+$/g, '') || '/'
  if (path === 'contact-us' || path === 'contact') return 'contact'
  if (path === 'about-us' || path.startsWith('about')) return 'about'
  if (path === 'why-choose-cef') return 'about'
  if (path.startsWith('media-center/podcasts') || path.startsWith('media-center/testimonials'))
    return 'media-center'
  if (path.startsWith('media-center/blogs')) return 'blogs-page'
  if (path.startsWith('media-center/upcoming-courses') || path.startsWith('media-center/upcomingcourses')) return 'upcoming-courses-page'
  if (path === 'bookshop') return 'bookshop-page'
  if (path.startsWith('courses/quran-tutoring-courses')) return 'quran-tutoring-courses-page'
  if (path.startsWith('courses/other-courses')) return 'other-courses-page'
  if (path.startsWith('course-details')) return 'course-details'
  if (path.startsWith('offerings/mentorship')) return 'mentorship-page'
  if (path.startsWith('offerings/webinars')) return 'webinars-page'
  if (path.startsWith('offerings/specialSeries')) return 'special-series-page'
  if (path.startsWith('offerings/weeklySessions')) return 'weekly-sessions-page'
  if (path.startsWith('offerings/workshops')) return 'workshops-page'
  return null
}

const DEFAULT_IMAGE = '/About Us Header.png'

/** Static fallback titles when headless returns no title. Key = getSlugOrFetcher return value. */
const FALLBACK_TITLES: Record<string, string> = {
  about: 'About Us',
  contact: 'Contact Us',
  'media-center': 'Media Center',
  'blogs-page': 'Blogs',
  'upcoming-courses-page': 'Upcoming Courses',
  'bookshop-page': 'CEF Bookshop',
  'quran-tutoring-courses-page': 'Quran Tutoring Courses',
  'other-courses-page': 'Other Courses',
  'course-details': 'Course Details',
  'mentorship-page': 'Mentorship',
  'webinars-page': 'Webinars',
  'special-series-page': 'Special Series',
  'weekly-sessions-page': 'Weekly Sessions',
  'workshops-page': 'Workshops',
}

/** Path-specific fallback titles for about sub-pages (path segment -> title). */
const ABOUT_PATH_FALLBACKS: Record<string, string> = {
  'vissionMissionValues': 'Vision, Mission & Values',
  'teachers': 'Meet Our Teachers',
  'speakers': 'Meet Our Speakers',
  'whyChooseUs': 'Why Choose Us',
  'programs': 'Programs',
  'story': 'Our Story',
}

function getFallbackTitle(key: string, pathname: string): string {
  if (key === 'about') {
    const path = (pathname || '').replace(/^\/+|\/+$/g, '')
    if (path === 'why-choose-cef') return 'Why Choose Us'
    if (path === 'about-us') return 'About Us'
    const segments = path.split('/').filter(Boolean)
    const aboutSegment = segments[1]
    if (aboutSegment && ABOUT_PATH_FALLBACKS[aboutSegment])
      return ABOUT_PATH_FALLBACKS[aboutSegment]
  }
  return FALLBACK_TITLES[key] ?? 'About Us'
}

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('path') || ''
  console.log('[page-header] GET pathname:', JSON.stringify(pathname))

  if (!pathname || pathname === '/') {
    console.log('[page-header] early return: empty pathname')
    return NextResponse.json({ title: null, imageSrc: null })
  }

  const key = getSlugOrFetcher(pathname)
  console.log('[page-header] resolved key:', key)

  if (!key) {
    console.log('[page-header] early return: no key for pathname')
    return NextResponse.json({ title: null, imageSrc: null })
  }

  let data: PageHeader | null = null
  if (key === 'about') {
    data = await getAboutPageHeader()
  } else if (key === 'contact') {
    data = await getContactPageHeader()
  } else if (key === 'media-center') {
    data = await getMediaCenterPageHeader()
  } else {
    data = await getPageHeader(key)
  }

  console.log('[page-header] headless data:', data == null ? 'null' : { title: data?.title, hasHeaderImage: !!data?.['header-image'] })

  const rawTitle = data?.title
  const title = (rawTitle != null && String(rawTitle).trim() !== '')
    ? String(rawTitle).trim()
    : getFallbackTitle(key, pathname)
  const imageSrc = data?.['header-image']
    ? mediaUrl(data['header-image'], DEFAULT_IMAGE)
    : DEFAULT_IMAGE

  console.log('[page-header] response:', { title, imageSrc: imageSrc?.slice(0, 60) + (imageSrc && imageSrc.length > 60 ? '...' : '') })

  return NextResponse.json({ title, imageSrc })
}
