'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Landmark } from 'lucide-react'
import { usePayment } from '@/context/PaymentContext'
import { useDonationCart } from '@/context/DonationCartContext'

export function PayFastCheckout({ className = '' }: { className?: string }) {
  const { initiatePayment, isProcessing } = usePayment()
  const { sessionId, cart } = useDonationCart()

  const hasRecurringItems = useMemo(
    () => cart.some((item) => item.paymentFrequency === 'monthly' || item.paymentFrequency === 'annually' || item.paymentFrequency === 'daily'),
    [cart],
  )

  const [selectedMethod, setSelectedMethod] = useState<'payfast' | 'meezan_bank'>('payfast')

  useEffect(() => {
    if (hasRecurringItems) setSelectedMethod('meezan_bank')
  }, [hasRecurringItems])

  const effectiveMethod = hasRecurringItems ? 'meezan_bank' : selectedMethod

  const handlePayment = () => {
    if (!sessionId) return
    initiatePayment(sessionId, effectiveMethod)
  }

  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className="bg-white border-4 border-[#065D80] rounded-lg overflow-hidden shadow-lg">
        <div className="bg-[#065D80] p-3">
          <h2 className="text-white text-lg font-bold text-center">Select Payment Method</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
          {!hasRecurringItems && (
            <div onClick={() => setSelectedMethod('payfast')}
              className={`cursor-pointer border-2 rounded-xl p-4 transition-all hover:bg-gray-50 ${effectiveMethod === 'payfast' ? 'border-[#065D80] bg-blue-50/50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'payfast' ? 'border-[#065D80]' : 'border-gray-300'}`}>
                    {selectedMethod === 'payfast' && <div className="w-2.5 h-2.5 bg-[#065D80] rounded-full" />}
                  </div>
                  <span className="font-bold text-gray-800">PayFast</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap opacity-80">
                <span className="text-xs text-gray-500">Visa, Mastercard, Easypaisa</span>
              </div>
            </div>
          )}

          <div onClick={() => setSelectedMethod('meezan_bank')}
            className={`cursor-pointer border-2 rounded-xl p-4 transition-all hover:bg-gray-50 ${effectiveMethod === 'meezan_bank' ? 'border-[#065D80] bg-blue-50/50' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'meezan_bank' ? 'border-[#065D80]' : 'border-gray-300'}`}>
                  {selectedMethod === 'meezan_bank' && <div className="w-2.5 h-2.5 bg-[#065D80] rounded-full" />}
                </div>
                <span className="font-bold text-gray-800">Meezan Bank</span>
              </div>
              <Landmark className={`h-6 w-6 ${effectiveMethod === 'meezan_bank' ? 'text-[#065D80]' : 'text-gray-400'}`} />
            </div>
            <div className="flex gap-2 flex-wrap opacity-80">
              <span className="text-xs text-gray-500">Visa, Mastercard</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Direct secure redirection to Meezan Bank portal.</p>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 border-t">
          <p className="text-gray-600 text-[11px] leading-tight">
            Your personal data will be used to process your order as described in our <span className="underline cursor-pointer">Privacy policy</span>.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center mt-6">
        <button onClick={handlePayment} disabled={isProcessing}
          className="w-full sm:w-auto text-md sm:text-lg lg:text-xl py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 bg-[#88bc44] text-white font-bold">
          {isProcessing ? 'Connecting to Bank...' : `Pay Now with ${effectiveMethod === 'payfast' ? 'PayFast' : 'Meezan'}`}
        </button>
      </div>
    </div>
  )
}
