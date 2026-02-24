import { fetchCollection, fetchSingleContent, type HeadlessMedia } from '../headless'

// --------------- Types ---------------

export type TestimonialsSectionHeader = {
  'section-title': string
  'section-sub-title': string
}

export type TestimonialItem = {
  image?: HeadlessMedia
  name: string
  country: string
  text: string
}

export type PodcastItem = {
  title: string
  description: string
  image?: HeadlessMedia
  'video-url'?: string
}

// --------------- Fetch functions ---------------

export async function getTestimonialsSectionHeader() {
  return fetchSingleContent<TestimonialsSectionHeader>('testimonials-section')
}

export async function getTestimonialItems() {
  return fetchCollection<TestimonialItem>('testimonials')
}

export async function getPodcastItems() {
  return fetchCollection<PodcastItem>('listen-and-learn')
}

// --------------- Aggregate fetchers ---------------

export async function getTestimonialsPageData() {
  const [sectionHeader, testimonials] = await Promise.all([
    getTestimonialsSectionHeader(),
    getTestimonialItems(),
  ])
  return { sectionHeader, testimonials }
}

export async function getPodcastsPageData() {
  const podcasts = await getPodcastItems()
  return { podcasts }
}
