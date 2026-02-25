'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { DONATION_ENDPOINTS } from '@/lib/api/donations'
import { PaymentStatusOverlay } from '@/components/donations/PaymentStatusOverlay'

export default function PaymentStatusPage() {
  const params = useParams<{ status: string; sessionId: string }>()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<{ status: 'success' | 'failure' | null; data: any }>({ status: null, data: null })

  useEffect(() => {
    if (!params.sessionId) return
    const fetchData = async () => {
      try {
        const baseUrl = params.status === 'success'
          ? DONATION_ENDPOINTS.SUCCESS(params.sessionId)
          : DONATION_ENDPOINTS.FAILURE(params.sessionId)
        const qs = searchParams.toString()
        const fullEndpoint = qs ? `${baseUrl}?${qs}` : baseUrl
        const res = await fetch(fullEndpoint)
        const json = await res.json()

        if (json.success === false || json.status === false) {
          setResult({ status: 'failure', data: json })
        } else {
          setResult({ status: params.status === 'success' ? 'success' : 'failure', data: json })
        }
      } catch {
        setResult({ status: 'failure', data: { message: 'Verification Failed. Please contact support.' } })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.status, params.sessionId, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#065D80] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Verifying Transaction...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <PaymentStatusOverlay result={result} onClose={() => (window.location.href = '/donations')} />
    </div>
  )
}
