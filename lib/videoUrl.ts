/**
 * Parses a video URL and returns the type and URL to use for embedding or direct playback.
 * - YouTube / youtu.be → iframe embed URL
 * - Vimeo → iframe embed URL
 * - Google Drive (file/d/... or open?id=) → iframe preview URL
 * - Direct (e.g. .mp4, .webm) or unknown → src for HTML5 <video>
 */

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov)(\?|$)/i

export type VideoEmbedResult =
  | { type: 'youtube'; embedUrl: string }
  | { type: 'vimeo'; embedUrl: string }
  | { type: 'drive'; embedUrl: string }
  | { type: 'direct'; src: string }

export function parseVideoUrl(url: string): VideoEmbedResult | null {
  const raw = url?.trim()
  if (!raw) return null

  let parsed: URL
  try {
    const toParse = raw.startsWith('http') ? raw : `https://${raw}`
    parsed = new URL(toParse)
  } catch {
    return null
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return null
  }

  const host = parsed.hostname.toLowerCase()
  const pathname = parsed.pathname || '/'

  // YouTube
  if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'youtu.be') {
    let videoId = ''
    if (host === 'youtu.be') {
      videoId = pathname.slice(1).split('/')[0]?.split('?')[0] || ''
    } else {
      videoId = parsed.searchParams.get('v') || pathname.split('/').filter(Boolean).pop() || ''
    }
    if (videoId) {
      return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${videoId}` }
    }
  }

  // Vimeo
  if (host === 'vimeo.com' || host === 'www.vimeo.com') {
    const segments = pathname.split('/').filter(Boolean)
    const id = segments[0] || segments[segments.length - 1]
    if (id && /^\d+$/.test(id)) {
      return { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${id}` }
    }
  }

  // Google Drive
  if (host === 'drive.google.com' || host === 'www.drive.google.com') {
    const fileIdMatch = pathname.match(/\/file\/d\/([^/]+)/)
    const fileId = fileIdMatch
      ? fileIdMatch[1]
      : parsed.searchParams.get('id')
    if (fileId) {
      return {
        type: 'drive',
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      }
    }
  }

  // Direct video (by extension) or unknown URL → use as <video src>
  const normalized = parsed.href
  if (VIDEO_EXTENSIONS.test(pathname) || VIDEO_EXTENSIONS.test(normalized)) {
    return { type: 'direct', src: normalized }
  }
  return { type: 'direct', src: normalized }
}
