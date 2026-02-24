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
}

const DEFAULT_LOGO = '/CEF Logo-01.png'
const DEFAULT_FAVICON = '/favicon.ico'
const DEFAULT_FACEBOOK = 'https://facebook.com/'
const DEFAULT_INSTAGRAM = 'https://instagram.com/'
const DEFAULT_YOUTUBE = 'https://youtube.com/'
const DEFAULT_LINKEDIN = 'https://linkedin.com/'

export async function getSiteSettings() {
  const raw = await fetchSingleContent<SiteSettings>('site-settings')
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
    faviconUrl: settings?.favicon
      ? mediaUrl(settings.favicon, DEFAULT_FAVICON)
      : DEFAULT_FAVICON,
    'footer-text': settings?.['footer-text']?.trim() || '',
  }
}
