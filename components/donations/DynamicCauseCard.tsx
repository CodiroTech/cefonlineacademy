'use client'

import React, { useState } from 'react'
import DonateCard1 from '@/components/donations/DonateCard1'
import { useDonationCart } from '@/context/DonationCartContext'
import { useToast } from '@/context/ToastContext'
import type { DonationCauseResolved } from '@/lib/api/donations'

type DynamicCauseCardProps = {
  cause: DonationCauseResolved
  sectionId: string
  sectionTitle: string
  paymentFrequencies?: string[]
  onAfterAddToCart?: () => void
}

export function DynamicCauseCard({
  cause,
  sectionId,
  sectionTitle,
  paymentFrequencies = ['one_time', 'monthly', 'annually'],
  onAfterAddToCart,
}: DynamicCauseCardProps) {
  const { addToCart } = useDonationCart()
  const { showToast } = useToast()
  const [selectedPayment, setSelectedPayment] = useState('one_time')
  const [selectedDonationType, setSelectedDonationType] = useState('general_donation')
  const [sponsorType, setSponsorType] = useState<'full' | 'partial'>('full')
  const [partialAmount, setPartialAmount] = useState('')

  const amountStr = cause.defaultAmount > 0 ? `PKR ${cause.defaultAmount.toLocaleString()}` : ''
  const numericAmount = cause.fullPartial && sponsorType === 'partial' && partialAmount
    ? parseInt(partialAmount.replace(/[^0-9]/g, ''), 10)
    : cause.defaultAmount
  const cartTitle = `${sectionTitle} - ${cause.title}`

  if (!cause.imageUrl) {
    return (
      <DonateCard1
        amount={amountStr}
        cartTitle={cartTitle}
        showFullPartial={cause.fullPartial}
        accordionId={sectionId}
        paymentFrequencies={paymentFrequencies}
        onAfterAddToCart={onAfterAddToCart}
      />
    )
  }

  const canAdd = selectedPayment && selectedDonationType && (cause.fullPartial && sponsorType === 'partial' ? !!partialAmount.trim() : cause.defaultAmount > 0)
  const handleAdd = () => {
    const amt = cause.fullPartial && sponsorType === 'partial' ? parseInt(partialAmount.replace(/[^0-9]/g, ''), 10) : cause.defaultAmount
    if (!amt) { showToast('Please enter a valid amount', 'error'); return }
    addToCart({
      id: cause.id,
      title: cartTitle,
      amount: amt,
      paymentFrequency: selectedPayment,
      donationType: selectedDonationType,
      quantity: 1,
      image: cause.imageUrl,
      accordionId: sectionId,
      sponsor_type: cause.fullPartial ? (sponsorType === 'full' ? 'full_sponsor' : 'partial_sponsor') : undefined,
    })
    showToast('Item added to cart successfully', 'success')
    onAfterAddToCart?.()
  }

  return (
    <div className="relative group border border-gray-300 rounded-lg bg-white h-full overflow-visible">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cause.imageUrl} alt={cause.title} className="w-full h-24 rounded-t-lg object-cover" />
      <div className="bg-[#065D80]/90 p-3 text-white text-center" title={cause.title}>
        <div className="font-bold text-sm line-clamp-2 min-h-[2.5rem]">{cause.title}</div>
      </div>
      <div className="px-4 py-2">
        <div className="font-bold text-xl text-[#88bc44] text-center mb-4">
          {cause.fullPartial && sponsorType === 'partial' && partialAmount ? `PKR ${partialAmount}` : amountStr || `PKR ${cause.defaultAmount.toLocaleString()}`}
        </div>

        <div className="flex justify-center items-end gap-2 mb-3 flex-wrap">
          <label className="flex flex-col items-center cursor-pointer">
            <input type="radio" name={`payment-${cause.id}`} value="one_time" className="hidden peer"
              checked={selectedPayment === 'one_time'} onChange={() => setSelectedPayment('one_time')} />
            <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
              <div className={`w-1 h-1 bg-black rounded-full ${selectedPayment === 'one_time' ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <span className="text-xs capitalize">One time</span>
          </label>
          <span className="relative inline-flex gap-2">
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 z-10 pointer-events-none">Coming soon</span>
            {['monthly', 'annually'].map((freq) => (
              <label key={freq} className="flex flex-col items-center cursor-not-allowed opacity-60">
                <input type="radio" name={`payment-${cause.id}`} value={freq} className="hidden peer" disabled />
                <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full opacity-0" />
                </div>
                <span className="text-xs capitalize">{freq.replace('_', ' ')}</span>
              </label>
            ))}
          </span>
        </div>

        {cause.fullPartial && (
          <div className="flex justify-center gap-4 mb-4">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => { setSponsorType('full'); setPartialAmount('') }}>
              <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                <div className={`w-1 h-1 bg-black rounded-full ${sponsorType === 'full' ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <span className="text-xs text-black">Full Sponsor</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => setSponsorType('partial')}>
              <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                <div className={`w-1 h-1 bg-black rounded-full ${sponsorType === 'partial' ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-600">Partial Sponsor</span>
                {sponsorType === 'partial' && (
                  <input type="text" placeholder="Type your amount here" className="mt-1 w-22 text-xs border border-gray-300 rounded text-center text-gray-500"
                    value={partialAmount} onChange={(e) => setPartialAmount(e.target.value)} />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center gap-2 mb-2">
          {[{ label: 'General', value: 'general_donation' }, { label: 'Zakat', value: 'zakat' }].map(({ value }) => (
            <div key={value} className="flex items-center gap-1 cursor-pointer" onClick={() => setSelectedDonationType(value)}>
              <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center shrink-0">
                <div className={`w-1 h-1 bg-black rounded-full ${selectedDonationType === value ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <span className="text-xs text-black capitalize whitespace-nowrap min-w-[4.5rem]">{value === 'general_donation' ? 'General' : 'Zakat'}</span>
            </div>
          ))}
        </div>

        {canAdd && (
          <div className="flex justify-center pt-3 pb-4">
            <button type="button" className="rounded-full px-3 py-1.5 text-xs text-white bg-[#065D80] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-[#065D80] hover:border cursor-pointer z-[50] border border-transparent"
              onClick={handleAdd}>+ Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  )
}
