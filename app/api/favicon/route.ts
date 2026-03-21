import { NextRequest, NextResponse } from 'next/server'
import { getSiteSettings, buildSiteSettingsData } from '@/lib/api/siteSettings'

function encodedFaviconUrl(url: string): string {
  const u = url.trim()
  if (!u.startsWith('http')) return u
  try {
    const parsed = new URL(u)
    parsed.pathname = parsed.pathname
      .split('/')
      .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
      .join('/')
    return parsed.toString()
  } catch {
    return u
  }
}

/**
 * GET /api/favicon — proxies the favicon image from site-settings API.
 * Proxying the content avoids browser redirect caching issues.
 */
export async function GET(request: NextRequest) {
  const settings = await getSiteSettings(0)
  const data = buildSiteSettingsData(settings)
  const faviconUrl = data.faviconUrl?.trim() || ''

  const target =
    faviconUrl.startsWith('http')
      ? encodedFaviconUrl(faviconUrl)
      : `${request.nextUrl.origin}${faviconUrl.startsWith('/') ? faviconUrl : `/${faviconUrl}`}`

  try {
    const upstream = await fetch(target, { next: { revalidate: 3600 } })
    if (!upstream.ok) {
      return NextResponse.redirect(target, 302)
    }
    const body = await upstream.arrayBuffer()
    const contentType = upstream.headers.get('content-type') || 'image/png'
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return NextResponse.redirect(target, 302)
  }
}
