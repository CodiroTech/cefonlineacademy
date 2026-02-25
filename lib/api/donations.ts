import type { DonationsResponse } from '@/lib/types/donations'

const HEADLESS_BASE = process.env.NEXT_PUBLIC_HEADLESS_BASE_URL || ''
const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://dev.cefonlineacademy.com/api'

export const DONATION_ENDPOINTS = {
  CART_VIEW: (sessionId: string) => `${BACKEND_BASE}/donation-view-cart/${sessionId}`,
  CART_ADD: `${BACKEND_BASE}/donation-add-to-cart`,
  CART_UPDATE: `${BACKEND_BASE}/donation-update-cart`,
  CART_DELETE_ITEM: `${BACKEND_BASE}/donation-delete-cart-item`,
  CART_DELETE: `${BACKEND_BASE}/donation-delete-cart`,
  CHECKOUT: `${BACKEND_BASE}/donation-pay-checkout-all`,
  MEEZAN_VERIFY: `${BACKEND_BASE}/donation-meezan-api-all`,
  SUCCESS: (id: string) => `${BACKEND_BASE}/donation-successful-faysal-api-all/${id}`,
  FAILURE: (id: string) => `${BACKEND_BASE}/donation-failure-faysal-api-all/${id}`,
}

export async function getDonationsPageData(): Promise<DonationsResponse | null> {
  try {
    const res = await fetch(`${HEADLESS_BASE}/donations`, { next: { revalidate: 300 } })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data) ? data[0] || null : data
  } catch {
    return null
  }
}
