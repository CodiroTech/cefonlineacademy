import { fetchSingleContent, type HeadlessMedia } from '../headless'

export type PageHeader = {
  title: string
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
