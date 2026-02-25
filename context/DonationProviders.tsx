'use client'

import { ToastProvider } from '@/context/ToastContext'
import { DonationCartProvider } from '@/context/DonationCartContext'
import { PaymentProvider } from '@/context/PaymentContext'

export function DonationProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DonationCartProvider>
        <PaymentProvider>
          {children}
        </PaymentProvider>
      </DonationCartProvider>
    </ToastProvider>
  )
}
