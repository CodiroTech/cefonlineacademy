import { fetchSingleContent, fetchCollection, type HeadlessMedia } from '../headless'

export type PageHeader = {
  title?: string
  'header-image'?: HeadlessMedia
}

export async function getAboutPageHeader() {
  return fetchSingleContent<PageHeader>('about-us')
}

export async function getMediaCenterPageHeader() {
  return fetchSingleContent<PageHeader>('media-center')
}

export async function getContactPageHeader() {
  return fetchSingleContent<PageHeader>('contact-us')
}

/** Generic page header by collection slug (bookshop-page, quran-tutoring-courses-page, etc.) */
export async function getPageHeader(slug: string): Promise<PageHeader | null> {
  const data = await fetchSingleContent<PageHeader>(slug)
  return data && (data.title != null || data['header-image'] != null) ? data : null
}

/** Upcoming courses section copy (headless collection 173) */
export type UpcomingSection = {
  'title-line-1'?: string
  'title-line-2'?: string
  'paragraph-1'?: string
  'paragraph-2'?: string
  title?: string
  description?: string
}

export async function getUpcomingSection(): Promise<UpcomingSection | null> {
  return fetchSingleContent<UpcomingSection>('upcoming-courses-section')
}

/** Inspiring Minds / blog articles (headless repeatable collection 174) */
export type BlogArticleItem = {
  title?: string
  description?: string
  author?: string
  image?: HeadlessMedia
}

export async function getBlogArticles(): Promise<BlogArticleItem[]> {
  const items = await fetchCollection<BlogArticleItem>('blog-article')
  return Array.isArray(items) ? items : []
}
