import { fetchCollection } from '@/lib/headless'
import {
  headlessBaseUrl,
  headlessProjectId,
  headlessApiToken,
} from '@/lib/config'
import type { DonationsResponse, DonationBankItem } from '@/lib/types/donations'

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://dev.cefonlineacademy.com/api'

function headlessContentUrl(slug: string, searchParams?: string): string {
  const base = headlessBaseUrl.replace(/\/$/, '')
  const path = headlessProjectId ? `${headlessProjectId}/${slug}` : slug
  const q = searchParams?.trim() ? `?${searchParams.trim()}` : ''
  return `${base}/${path}${q}`
}

function headlessAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {}
  if (headlessApiToken) headers.Authorization = `Bearer ${headlessApiToken}`
  return headers
}

/** Unwrap Strapi-style `{ data: [...] }` and flatten `{ id, attributes }` entries. */
function flattenDonationBanksRelation(relationRaw: unknown): Record<string, unknown>[] {
  let inner: unknown = relationRaw
  if (
    inner &&
    typeof inner === 'object' &&
    !Array.isArray(inner) &&
    Array.isArray((inner as { data?: unknown[] }).data)
  ) {
    inner = (inner as { data: unknown[] }).data
  }
  if (!Array.isArray(inner)) return []
  return inner
    .map((item): Record<string, unknown> | null => {
      if (typeof item === 'number') return { id: item }
      if (item == null || typeof item !== 'object') return null
      const o = item as Record<string, unknown>
      if (o.attributes && typeof o.attributes === 'object') {
        return { ...(o.attributes as object), id: o.id } as Record<string, unknown>
      }
      return o as Record<string, unknown>
    })
    .filter((x): x is Record<string, unknown> => x != null)
}

/* ---------- Dynamic accordion (Donate Online Now) ---------- */

export type DonationSectionRaw = {
  id: number
  title?: string
  sort_number?: number
}

export type DonationCategoryRaw = {
  id: number
  title?: string
  description?: string
  'donation-section'?: number | { id?: number }
  sort_number?: number
}

export type DonationCauseRaw = {
  id: number
  title?: string
  image?: { full_url?: string } | { full_url?: string }[]
  'default-amount'?: number
  'full-partial'?: boolean
  category?: number | { id?: number }
  section?: number | { id?: number }
  sort_number?: number
}

export type DonationCauseResolved = {
  id: number
  title: string
  imageUrl: string | null
  defaultAmount: number
  fullPartial: boolean
  categoryId: number | null
  sectionId: number
}

export type DonationCategoryResolved = {
  id: number
  title: string
  description: string | null
  causes: DonationCauseResolved[]
}

export type DonationSectionResolved = {
  id: number
  title: string
  categories: DonationCategoryResolved[]
  uncategorizedCauses: DonationCauseResolved[]
}

export type DonationAccordionData = {
  sections: DonationSectionResolved[]
}

function resolveRelationId(rel: number | { id?: number } | undefined): number | null {
  if (rel == null) return null
  if (typeof rel === 'number') return rel
  const id = rel?.id
  return typeof id === 'number' ? id : null
}

function resolveMediaUrl(media: DonationCauseRaw['image']): string | null {
  if (!media) return null
  if (Array.isArray(media)) return media[0]?.full_url ?? null
  return media?.full_url ?? null
}

export async function getDonationSections(): Promise<DonationSectionRaw[]> {
  const items = await fetchCollection<DonationSectionRaw>('donation-sections', 300)
  return (items ?? []).sort((a, b) => (a.sort_number ?? 999) - (b.sort_number ?? 999))
}

export async function getDonationCategories(): Promise<DonationCategoryRaw[]> {
  const items = await fetchCollection<DonationCategoryRaw>('donation-categories', 300)
  return (items ?? []).sort((a, b) => (a.sort_number ?? 999) - (b.sort_number ?? 999))
}

export async function getDonationCauses(): Promise<DonationCauseRaw[]> {
  const items = await fetchCollection<DonationCauseRaw>('donation-causes', 300)
  return (items ?? []).sort((a, b) => (a.sort_number ?? 999) - (b.sort_number ?? 999))
}

export async function getDonationAccordionData(): Promise<DonationAccordionData> {
  const [sectionsRaw, categoriesRaw, causesRaw] = await Promise.all([
    getDonationSections(),
    getDonationCategories(),
    getDonationCauses(),
  ])

  const causesResolved: DonationCauseResolved[] = causesRaw.map((c) => ({
    id: c.id,
    title: (c.title ?? '').trim() || 'Cause',
    imageUrl: resolveMediaUrl(c.image),
    defaultAmount: Number(c['default-amount']) || 0,
    fullPartial: Boolean(c['full-partial']),
    categoryId: resolveRelationId(c.category),
    sectionId: resolveRelationId(c.section) ?? 0,
  }))

  const sectionIds = new Set(sectionsRaw.map((s) => s.id))

  const sections: DonationSectionResolved[] = sectionsRaw.map((sec) => {
    const sectionId = sec.id
    const categoriesForSection = categoriesRaw.filter(
      (cat) => resolveRelationId(cat['donation-section']) === sectionId,
    )
    const causesForSection = causesResolved.filter((c) => c.sectionId === sectionId)

    const categories: DonationCategoryResolved[] = categoriesForSection.map((cat) => ({
      id: cat.id,
      title: (cat.title ?? '').trim() || 'Category',
      description: (cat.description ?? '').trim() || null,
      causes: causesForSection.filter((c) => c.categoryId === cat.id),
    }))

    const uncategorizedCauses = causesForSection.filter((c) => c.categoryId == null)

    return {
      id: sectionId,
      title: (sec.title ?? '').trim() || 'Section',
      categories,
      uncategorizedCauses,
    }
  })

  return { sections }
}

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

export type DonationFAQItem = {
  id?: number
  locale?: string
  question?: string
  answer?: string
}

export type DonationFAQResponse = {
  id?: number
  locale?: string
  title?: string
  description?: string
  'header-image'?: string | { full_url?: string }
  'donation-faqs'?: DonationFAQItem[]
}

export async function getDonationFAQPageData(): Promise<DonationFAQResponse | null> {
  if (!headlessBaseUrl) return null
  try {
    const url = headlessContentUrl('donation-faqs')
    const res = await fetch(url, {
      headers: headlessAuthHeaders(),
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data) ? data[0] || null : data
  } catch {
    return null
  }
}

/** Normalize bank relation: may be populated objects or IDs; accept snake_case key */
function normalizeDonationBanksRelation(
  raw: unknown,
  banksById: Map<number, DonationBankItem>,
): DonationBankItem[] {
  const arr = Array.isArray(raw) ? raw : []
  if (arr.length === 0) return []
  const first = arr[0]
  if (first != null && typeof first === 'object' && ('bank-name' in first || 'bank_name' in first)) {
    return arr.map((b) => ({
      id: (b as any).id,
      locale: (b as any).locale ?? 'en',
      'bank-name': (b as any)['bank-name'] ?? (b as any).bank_name,
      'account-title': (b as any)['account-title'] ?? (b as any).account_title,
      iban: (b as any).iban,
      'donation-type': (b as any)['donation-type'] ?? (b as any).donation_type,
    })) as DonationBankItem[]
  }
  const ids = arr.map((id) => (typeof id === 'number' ? id : (id as any)?.id)).filter((n): n is number => typeof n === 'number')
  return ids.map((id) => banksById.get(id)).filter((b): b is DonationBankItem => b != null)
}

export async function getDonationsPageData(): Promise<DonationsResponse | null> {
  if (!headlessBaseUrl) return null
  try {
    const populateParam = 'populate[donation-banks-relation]=*'
    const url = headlessContentUrl('donations', populateParam)
    const res = await fetch(url, {
      headers: headlessAuthHeaders(),
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const data = await res.json()
    let page: Record<string, unknown> | null = null
    if (Array.isArray(data)) page = (data[0] as Record<string, unknown>) ?? null
    else if (data && typeof data === 'object') {
      if (data.data != null && typeof data.data === 'object') {
        const d = data.data as Record<string, unknown>
        page = (Array.isArray(d) ? d[0] : d) as Record<string, unknown>
        if (page?.attributes && typeof page.attributes === 'object')
          page = { ...page, ...(page.attributes as object), attributes: undefined }
      } else page = data as Record<string, unknown>
    }
    if (!page || typeof page !== 'object') return null

    const relationRaw = page['donation-banks-relation'] ?? page.donation_banks_relation
    const relationFlat = flattenDonationBanksRelation(relationRaw)
    const needsResolve =
      relationFlat.length > 0 &&
      relationFlat.some(
        (x) =>
          typeof x === 'number' ||
          (x != null &&
            typeof x === 'object' &&
            !('bank-name' in x) &&
            !('bank_name' in x)),
      )

    if (needsResolve && relationFlat.length > 0) {
      const allBanksRaw = await fetchCollection<Record<string, unknown>>('donation-banks', 300)
      const banksById = new Map(allBanksRaw.map((b) => [Number(b.id) || 0, normalizeBankItem(b)]))
      const resolved = normalizeDonationBanksRelation(relationFlat, banksById)
      return { ...page, 'donation-banks-relation': resolved } as unknown as DonationsResponse
    }

    if (relationFlat.length > 0) {
      const banksById = new Map<number, DonationBankItem>()
      const resolved = normalizeDonationBanksRelation(relationFlat, banksById)
      if (resolved.length > 0)
        return { ...page, 'donation-banks-relation': resolved } as unknown as DonationsResponse
    }

    return page as unknown as DonationsResponse
  } catch {
    return null
  }
}

function normalizeBankItem(b: Record<string, unknown>): DonationBankItem {
  return {
    id: (b.id as number) ?? 0,
    locale: (b.locale as string) ?? 'en',
    'bank-name': (b['bank-name'] ?? b.bank_name) as string | undefined,
    'account-title': (b['account-title'] ?? b.account_title) as string | undefined,
    iban: b.iban as string | undefined,
    'donation-type': (b['donation-type'] ?? b.donation_type) as string | undefined,
  }
}
