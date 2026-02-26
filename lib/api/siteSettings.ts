import { fetchSingleContent, type HeadlessMedia } from '../headless'
import { mediaUrl } from '../headless'

export type SiteSettings = {
  'site-logo'?: HeadlessMedia
  favicon?: HeadlessMedia
  facebook?: string
  instagram?: string
  youtube?: string
  linkedin?: string
  tiktok?: string
  'footer-text'?: string
  'portal-url'?: string
}

const DEFAULT_LOGO = '/CEF Logo-01.png'
const DEFAULT_FAVICON = '/favicon.ico'
const DEFAULT_FACEBOOK = 'https://facebook.com/'
const DEFAULT_INSTAGRAM = 'https://instagram.com/'
const DEFAULT_YOUTUBE = 'https://youtube.com/'
const DEFAULT_LINKEDIN = 'https://linkedin.com/'
const DEFAULT_PORTAL_URL = 'http://localhost:5174/'

/** When set (e.g. in .env.local), overrides portal-url from API so local login redirects to your dashboard. */
const PORTAL_URL_ENV =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PORTAL_URL?.trim()
    ? process.env.NEXT_PUBLIC_PORTAL_URL.trim()
    : ''

/** Normalize URL: fix common typos (e.g. htps -> https) and ensure valid protocol */
function normalizeUrl(url: string | undefined | null, defaultUrl: string): string {
  const raw = (url ?? '').trim()
  if (!raw) return defaultUrl
  // Fix common typo "htps" -> "https"
  const fixed = raw.replace(/^htps:\/\//i, 'https://')
  if (!/^https?:\/\//i.test(fixed)) return defaultUrl
  return fixed
}

export async function getSiteSettings(revalidate = 60) {
  const raw = await fetchSingleContent<SiteSettings>('site-settings', revalidate)
  if (!raw) return null
  return raw
}

/**
 * Build navbar/footer data from site-settings with fallbacks.
 */
export function buildSiteSettingsData(settings: SiteSettings | null) {
  return {
    'header-logo': {
      full_url: settings?.['site-logo']
        ? mediaUrl(settings['site-logo'], DEFAULT_LOGO)
        : DEFAULT_LOGO,
    },
    'facebook-url': settings?.facebook?.trim() || DEFAULT_FACEBOOK,
    'insta-url': settings?.instagram?.trim() || DEFAULT_INSTAGRAM,
    'youtube-url': settings?.youtube?.trim() || DEFAULT_YOUTUBE,
    'linkedin-url': settings?.linkedin?.trim() || DEFAULT_LINKEDIN,
    'tiktok-url': settings?.tiktok?.trim() || '',
    'portal-url': PORTAL_URL_ENV
      ? normalizeUrl(PORTAL_URL_ENV, DEFAULT_PORTAL_URL)
      : normalizeUrl(settings?.['portal-url'], DEFAULT_PORTAL_URL),
    faviconUrl: settings?.favicon
      ? mediaUrl(settings.favicon, DEFAULT_FAVICON)
      : DEFAULT_FAVICON,
    'footer-text': settings?.['footer-text']?.trim() || '',
  }
}
