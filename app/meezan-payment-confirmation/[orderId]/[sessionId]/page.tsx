'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { DONATION_ENDPOINTS } from '@/lib/api/donations'
import { PaymentStatusOverlay } from '@/components/donations/PaymentStatusOverlay'
import { useDonationCart } from '@/context/DonationCartContext'

export default function MeezanConfirmationPage() {
  const params = useParams<{ orderId: string; sessionId: string }>()
  const { clearCart } = useDonationCart()
  const verifiedRef = useRef(false)
  const [result, setResult] = useState<{ status: 'success' | 'failure' | null; data: any }>({ status: null, data: null })

  useEffect(() => {
    if (verifiedRef.current) return
    verifiedRef.current = true

    const verifyMeezanPayment = async () => {
      try {
        const response = await fetch(DONATION_ENDPOINTS.MEEZAN_VERIFY, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: params.orderId, cart_session_id: params.sessionId }),
        })
        const json = await response.json()
        if (json.status === true) {
          setResult({ status: 'success', data: json })
          clearCart()
        } else {
          setResult({ status: 'failure', data: json })
        }
      } catch {
        setResult({ status: 'failure', data: { message: 'Verification Failed' } })
      }
    }

    verifyMeezanPayment()
  }, [params.orderId, params.sessionId, clearCart])

  if (!result.status) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#065D80] mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Verifying Meezan Payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <PaymentStatusOverlay result={result} onClose={() => (window.location.href = '/donations')} />
    </div>
  )
}
