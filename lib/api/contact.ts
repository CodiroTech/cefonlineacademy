import { fetchCollection, fetchSingleContent, type HeadlessMedia } from '../headless'

// --------------- Types ---------------

export type ContactInfo = {
  title: string
  'header-image'?: HeadlessMedia
  address?: string
  phone?: string
  email?: string
  description?: string
}

export type FaqItem = {
  question: string
  answer: string
}

// --------------- Fetch functions ---------------

export async function getContactInfo() {
  return fetchSingleContent<ContactInfo>('contact-us')
}

export async function getFaqs() {
  return fetchCollection<FaqItem>('faqs')
}

// --------------- Aggregate fetcher ---------------

export async function getContactPageData() {
  const [contactInfo, faqs] = await Promise.all([
    getContactInfo(),
    getFaqs(),
  ])
  return { contactInfo, faqs }
}
