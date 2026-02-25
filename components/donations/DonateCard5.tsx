'use client'

import React, { useState } from 'react'
import { useDonationCart } from '@/context/DonationCartContext'
import { useToast } from '@/context/ToastContext'

type DonateCard5Props = {
  title: string
  image: string
  programTitle: string
  accordionId: string
  onAmountChange?: (value: string) => void
  onSponsorTypeChange?: (type: 'full' | 'partial') => void
  onDonationTypeChange?: (type: string) => void
  onPaymentChange?: (value: string) => void
  onAfterAddToCart?: () => void
}

const DonateCard5: React.FC<DonateCard5Props> = ({
  title, image, programTitle, accordionId,
  onAmountChange, onSponsorTypeChange, onDonationTypeChange, onAfterAddToCart,
}) => {
  const [amount, setAmount] = useState('')
  const [partialAmount, setPartialAmount] = useState('')
  const [selectedSponsorType, setSelectedSponsorType] = useState<'full' | 'partial'>('full')
  const [selectedDonationType, setSelectedDonationType] = useState('general_donation')
  const [paymentFrequency] = useState('one_time')

  const { addToCart } = useDonationCart()
  const { showToast } = useToast()

  const rawAmount = selectedSponsorType === 'full' ? amount : partialAmount
  const numericAmount = parseInt(rawAmount.replace(/[^0-9]/g, ''), 10)

  const handleAddToCart = () => {
    if (!numericAmount) { showToast('Please enter a valid amount', 'error'); return }
    addToCart({
      id: 9999, title: `${programTitle} - ${title}`, amount: numericAmount,
      paymentFrequency, sponsor_type: selectedSponsorType === 'full' ? 'full_sponsor' : 'partial_sponsor',
      donationType: selectedDonationType, quantity: 1, image, accordionId,
    })
    showToast('Item added to cart successfully', 'success')
    onAfterAddToCart?.()
  }

  return (
    <div className="relative mx-auto group">
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="w-full h-24 object-cover" />
        <div className="bg-[#065D80]/80 text-white text-center font-bold flex flex-col justify-center items-center text-xs px-2" style={{ minHeight: '60px' }}>
          Any other Amount
          <input type="text" className="w-full mt-1 text-xs rounded-sm border-2 border-gray-300 h-5 text-center text-black bg-white"
            value={amount} onChange={(e) => { setAmount(e.target.value); onAmountChange?.(e.target.value) }} />
        </div>
        <div className="font-bold text-lg text-[#88bc44] text-center">PKR {rawAmount || '0'}</div>

        <div className="px-4 py-2">
          <div className="flex justify-center gap-4 mb-4">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => { setSelectedSponsorType('full'); onSponsorTypeChange?.('full') }}>
              <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                <div className={`w-1 h-1 bg-black rounded-full ${selectedSponsorType === 'full' ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <span className="text-xs text-black">Full Sponsor</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => { setSelectedSponsorType('partial'); onSponsorTypeChange?.('partial') }}>
              <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                <div className={`w-1 h-1 bg-black rounded-full ${selectedSponsorType === 'partial' ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-600">Partial Sponsor</span>
                {selectedSponsorType === 'partial' && (
                  <input type="text" placeholder="Type your amount here"
                    className="mt-1 w-22 text-xs border border-gray-300 rounded text-center text-gray-500"
                    value={partialAmount} onChange={(e) => { setPartialAmount(e.target.value); onAmountChange?.(e.target.value) }} />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mb-2">
            {[{ label: 'General', value: 'general_donation' }, { label: 'Zakat', value: 'zakat' }].map(({ label, value }) => (
              <div key={value} className="flex items-center gap-1 cursor-pointer" onClick={() => { setSelectedDonationType(value); onDonationTypeChange?.(value) }}>
                <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center shrink-0">
                  <div className={`w-1 h-1 bg-black rounded-full ${selectedDonationType === value ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                <span className="text-xs text-black capitalize whitespace-nowrap min-w-[4.5rem]">{label}</span>
              </div>
            ))}
          </div>

          {selectedSponsorType && selectedDonationType && (
            <div className="flex justify-center pt-3 pb-4">
              <button className="rounded-full px-3 py-1.5 text-xs text-white bg-[#065D80] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-[#065D80] hover:border cursor-pointer z-[50] border border-transparent"
                onClick={handleAddToCart}>+ Add to Cart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DonateCard5
