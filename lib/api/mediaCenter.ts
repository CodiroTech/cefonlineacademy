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

// --------------- Helpers: normalize headless response shapes ---------------

function pick<T extends Record<string, unknown>, K extends string>(obj: T | null | undefined, ...keys: K[]): string {
  if (!obj || typeof obj !== 'object') return ''
  for (const k of keys) {
    const v = obj[k as keyof T]
    if (v != null && typeof v === 'string') return v
  }
  return ''
}

function pickMedia(obj: Record<string, unknown> | null | undefined): HeadlessMedia | undefined {
  if (!obj || typeof obj !== 'object') return undefined
  const raw = obj.image ?? obj.avatar ?? (obj as Record<string, unknown>).media
  if (raw && typeof raw === 'object' && raw !== null && 'full_url' in raw) return raw as HeadlessMedia
  if (Array.isArray(raw) && raw[0] && typeof raw[0] === 'object' && raw[0] !== null && 'full_url' in raw[0]) return raw[0] as HeadlessMedia
  return undefined
}

// --------------- Fetch functions ---------------

export async function getTestimonialsSectionHeader() {
  const raw = await fetchSingleContent<Record<string, unknown>>('testimonials-section')
  if (!raw) return null
  return {
    'section-title': pick(raw, 'section-title', 'section_title', 'sectionTitle') || 'What Do Our Students SAY!',
    'section-sub-title': pick(raw, 'section-sub-title', 'section_sub_title', 'sectionSubTitle') || '',
  } as TestimonialsSectionHeader
}

export async function getTestimonialItems(): Promise<TestimonialItem[]> {
  const rawItems = await fetchCollection<Record<string, unknown>>('testimonials')
  if (!Array.isArray(rawItems) || rawItems.length === 0) return []
  return rawItems.map((raw) => {
    const fields = (raw && typeof raw.fields === 'object' && raw.fields !== null ? raw.fields as Record<string, unknown> : raw) as Record<string, unknown>
    return {
      name: pick(fields, 'name') || '',
      country: pick(fields, 'country') || '',
      text: pick(fields, 'text', 'description', 'content') || '',
      image: pickMedia(fields) ?? pickMedia(raw as Record<string, unknown>),
    } as TestimonialItem
  }).filter((t) => t.name || t.text)
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
