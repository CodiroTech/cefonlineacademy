import { NextRequest, NextResponse } from 'next/server'

const headlessBaseUrl = process.env.NEXT_PUBLIC_HEADLESS_BASE_URL ?? ''
const headlessApiToken = process.env.HEADLESS_API_TOKEN ?? ''

type ContactPayload = {
  'contact-name'?: string
  'contact-phone'?: string
  'contact-email'?: string
  'contact-message'?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!fullName || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    if (!headlessBaseUrl) {
      console.error('[contact-form] NEXT_PUBLIC_HEADLESS_BASE_URL is not set')
      return NextResponse.json(
        { success: false, message: 'Service unavailable' },
        { status: 503 }
      )
    }

    const payload: ContactPayload = {
      'contact-name': fullName,
      'contact-phone': phone,
      'contact-email': email,
      'contact-message': message,
    }

    const url = `${headlessBaseUrl.replace(/\/$/, '')}/contact-us-form`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    if (headlessApiToken) {
      headers['Authorization'] = `Bearer ${headlessApiToken}`
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('[contact-form] headless API error:', response.status, text)
      return NextResponse.json(
        { success: false, message: 'Failed to send message' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    })
  } catch (error) {
    console.error('[contact-form] error:', error)
    return NextResponse.json(
      { success: false, message: 'Error sending message' },
      { status: 500 }
    )
  }
}
