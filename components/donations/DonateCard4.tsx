'use client'

import React, { useState } from 'react'
import { useDonationCart } from '@/context/DonationCartContext'
import { useToast } from '@/context/ToastContext'

type DonateCard4Props = {
  title: string
  image: string
  programTitle: string
  accordionId: string
  onAmountChange?: (value: string) => void
  onPaymentChange?: (value: string) => void
  onDonationTypeChange?: (value: string) => void
  onAfterAddToCart?: () => void
}

const DonateCard4: React.FC<DonateCard4Props> = ({
  title, image, programTitle, accordionId,
  onAmountChange, onPaymentChange, onDonationTypeChange, onAfterAddToCart,
}) => {
  const [amount, setAmount] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('one_time')
  const [selectedDonationType, setSelectedDonationType] = useState('general_donation')
  const donationTypes = ['general_donation', 'zakat']
  const isSelectable = selectedPayment && selectedDonationType
  const { addToCart } = useDonationCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    if (!amount.trim()) { showToast('Please enter a valid amount', 'error'); return }
    const numericAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10)
    if (!numericAmount) { showToast('Amount must be a number', 'error'); return }
    addToCart({
      id: 1,
      title: `${programTitle} - ${title}`,
      amount: numericAmount,
      paymentFrequency: selectedPayment,
      donationType: selectedDonationType,
      quantity: 1, image, accordionId,
    })
    showToast('Item added to cart successfully', 'success')
    onAfterAddToCart?.()
  }

  return (
    <div className="relative mx-auto group">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="w-full h-24 object-cover" />
        <div className="bg-[#065D80]/80 text-white text-center font-bold flex flex-col justify-center items-center text-xs px-2" style={{ minHeight: '60px' }}>
          Any Other Amount
          <input type="text" className="w-full mt-1 text-xs rounded-sm border-2 border-gray-300 h-5 text-center text-black bg-white"
            value={amount} onChange={(e) => { setAmount(e.target.value); onAmountChange?.(e.target.value) }} />
        </div>
        <div className="font-bold text-lg text-[#88bc44] text-center">PKR {amount}</div>

        <div className="flex justify-center items-end gap-2 mb-3 mt-2 flex-wrap">
          <label className="flex flex-col items-center cursor-pointer">
            <input type="radio" name={`payment-${title}`} value="one_time" className="hidden peer"
              checked={selectedPayment === 'one_time'} onChange={() => { setSelectedPayment('one_time'); onPaymentChange?.('one_time') }} />
            <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
              <div className={`w-1 h-1 bg-black rounded-full ${selectedPayment === 'one_time' ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <span className="text-xs capitalize">One time</span>
          </label>
          <span className="relative inline-flex gap-2">
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 z-10 pointer-events-none">Coming soon</span>
            {['monthly', 'annually'].map((freq) => (
              <label key={freq} className="flex flex-col items-center cursor-not-allowed opacity-60">
                <input type="radio" name={`payment-${title}`} value={freq} className="hidden peer" disabled />
                <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full opacity-0" />
                </div>
                <span className="text-xs capitalize">{freq.replace('_', ' ')}</span>
              </label>
            ))}
          </span>
        </div>

        <div className="flex justify-center px-2 items-center gap-2 text-xs pb-4 mt-0">
          {donationTypes.map((type) => (
            <label key={type} className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name={`donationType-${title}`} value={type} className="hidden peer"
                checked={selectedDonationType === type} onChange={() => { setSelectedDonationType(type); onDonationTypeChange?.(type) }} />
              <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                <div className={`w-1 h-1 bg-black rounded-full ${selectedDonationType === type ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <div className="text-xs pb-1 text-black capitalize">{type === 'general_donation' ? 'General' : 'Zakat'}</div>
            </label>
          ))}
        </div>

        {isSelectable && (
          <div className="flex justify-center pt-3 pb-4">
            <button className="rounded-full cursor-pointer hover:bg-white hover:text-[#065D80] hover:border px-3 py-1.5 text-white bg-[#065D80] opacity-0 group-hover:opacity-100 transition-opacity text-xs z-[50] border border-transparent"
              onClick={handleAddToCart}>+ Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonateCard4
