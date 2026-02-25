export interface DonationCartItem {
  id: number
  title: string
  amount: number
  paymentFrequency: string
  donationType: string
  sponsor_type?: string
  quantity: number
  subtitle?: string
  image?: string
  accordionId?: string
}

export interface DonationImage {
  id: number
  file_name: string
  full_url: string
  thumb?: string
  caption?: string | null
  size?: number
  width?: number
  height?: number
}

export interface DonationBankItem {
  id: number
  locale: string
  'bank-name'?: string
  'account-title'?: string
  iban?: string
  'donation-type'?: string
}

export interface DonationsResponse {
  id: number
  locale: string
  'donation-title'?: string
  'donation-slug'?: string
  'donation-desc'?: string
  'donation-banks-relation'?: DonationBankItem[]
  'donations-info'?: string
  'quires-support'?: string
  image?: DonationImage
  'header-image'?: string | DonationImage
}
