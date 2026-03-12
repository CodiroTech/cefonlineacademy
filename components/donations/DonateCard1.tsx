'use client'

import React, { useState } from 'react'
import { useDonationCart } from '@/context/DonationCartContext'
import type { DonationCartItem } from '@/lib/types/donations'
import { useToast } from '@/context/ToastContext'

type DonateCardProps = {
  amount?: string
  showInput?: boolean
  /** Cart item title (e.g. cause title or section name). Default "Wherever Most Needed". */
  cartTitle?: string
  /** When true, show Full Sponsor / Partial Sponsor radios and partial amount input. */
  showFullPartial?: boolean
  paymentFrequencies?: string[]
  donationTypes?: string[]
  accordionId?: string
  onAmountChange?: (value: string) => void
  onPaymentChange?: (value: string) => void
  onDonationTypeChange?: (value: string) => void
  onAfterAddToCart?: () => void
}

const DonateCard1: React.FC<DonateCardProps> = ({
  amount,
  showInput = false,
  cartTitle = 'Wherever Most Needed',
  showFullPartial = false,
  paymentFrequencies = ['one_time', 'monthly', 'annually'],
  donationTypes = ['general_donation', 'zakat'],
  onAmountChange,
  onPaymentChange,
  accordionId,
  onDonationTypeChange,
  onAfterAddToCart,
}) => {
  const [selectedPayment, setSelectedPayment] = useState(paymentFrequencies[0])
  const [selectedDonationType, setSelectedDonationType] = useState(donationTypes[0])
  const [inputAmount, setInputAmount] = useState('')
  const [sponsorType, setSponsorType] = useState<'full' | 'partial'>('full')
  const [partialAmount, setPartialAmount] = useState('')
  const effectiveAmount = showFullPartial && sponsorType === 'partial' ? partialAmount : (amount ?? inputAmount)
  const isSelectable = selectedPayment && selectedDonationType && (showFullPartial && sponsorType === 'partial' ? !!partialAmount.trim() : !!(amount || inputAmount.trim()))

  const { addToCart } = useDonationCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    const donationAmount = effectiveAmount?.toString().trim() ?? ''
    if (!donationAmount) { showToast('Please enter a valid amount', 'error'); return }
    const numericAmount = parseInt(donationAmount.replace(/[^0-9]/g, ''))
    if (!numericAmount) { showToast('Amount must be a number', 'error'); return }

    const toNumericId = (value: string) =>
      value.split('').reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0)

    const item: DonationCartItem = {
      id: toNumericId(`${cartTitle}-${donationAmount}-${selectedPayment}-${selectedDonationType}`),
      title: cartTitle,
      amount: numericAmount,
      paymentFrequency: selectedPayment,
      donationType: selectedDonationType,
      quantity: 1,
      image: '',
      accordionId,
      ...(showFullPartial && { sponsor_type: sponsorType === 'full' ? 'full_sponsor' : 'partial_sponsor' }),
    }

    try {
      addToCart({ ...item, image: item.image || '' })
      showToast('Item added to cart successfully', 'success')
      onAfterAddToCart?.()
    } catch (err: any) {
      showToast(err.message || 'Failed to add item', 'error')
    }
  }

  return (
    <div className="relative mx-auto group pb-6">
      <div className="flex-1 border border-gray-300 rounded-lg">
        <div
          className={`bg-[#065D80] rounded-t-lg text-white text-center font-bold flex flex-col justify-center items-center ${showInput ? 'text-xs px-2' : 'text-xl'}`}
          style={{ minHeight: '60px' }}
        >
          {amount ? amount : (
            <>
              Any Other Amount
              <input
                type="text"
                className="w-full mt-1 text-xs px-2 rounded-sm border-2 border-gray-300 h-5 text-black"
                value={inputAmount}
                onChange={(e) => { setInputAmount(e.target.value); onAmountChange?.(e.target.value) }}
              />
            </>
          )}
        </div>

        <div className="flex lg:px-5 px-3 justify-center items-end gap-2 mb-3 mt-2 flex-wrap">
          {paymentFrequencies.map((freq) => {
            if (freq === 'one_time') {
              return (
                <label key={freq} className="flex flex-col items-center cursor-pointer">
                  <input type="radio" name={`payment-${amount || 'custom'}`} value={freq} className="hidden peer"
                    checked={selectedPayment === freq}
                    onChange={() => { setSelectedPayment(freq); onPaymentChange?.(freq) }}
                  />
                  <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                    <div className={`w-1 h-1 bg-black rounded-full ${selectedPayment === freq ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <span className="text-xs capitalize">{freq.replace('_', ' ')}</span>
                </label>
              )
            }
            return null
          })}
          <span className="relative inline-flex gap-2">
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 z-10 pointer-events-none">Coming soon</span>
            {['monthly', 'annually'].map((freq) => (
              <label key={freq} className="flex flex-col items-center cursor-not-allowed opacity-60">
                <input type="radio" name={`payment-${amount || 'custom'}`} value={freq} className="hidden peer" disabled />
                <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full opacity-0" />
                </div>
                <span className="text-xs capitalize">{freq.replace('_', ' ')}</span>
              </label>
            ))}
          </span>
        </div>

        {showFullPartial && (
          <div className="flex justify-center gap-4 mb-3 flex-wrap">
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
                  <input type="text" placeholder="Amount" className="mt-1 w-20 text-xs border border-gray-300 rounded text-center text-gray-500"
                    value={partialAmount} onChange={(e) => setPartialAmount(e.target.value)} />
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center gap-2 text-xs pb-4 mt-0">
          {donationTypes.map((type) => (
            <label key={type} className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name={`donationType-${amount || 'custom'}-${cartTitle}`} value={type} className="hidden peer"
                checked={selectedDonationType === type}
                onChange={() => { setSelectedDonationType(type); onDonationTypeChange?.(type) }}
              />
              <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                <div className={`w-1 h-1 bg-black rounded-full ${selectedDonationType === type ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <div className="text-xs pb-1 capitalize">{type.replace('_', ' ')}</div>
            </label>
          ))}
        </div>
      </div>
      {isSelectable && (
        <button
          className="absolute -bottom-3 left-1/2 rounded-full cursor-pointer hover:bg-white hover:text-[#065D80] hover:border transform -translate-x-1/2 px-3 py-1 text-white bg-[#065D80] opacity-0 group-hover:opacity-100 transition-opacity text-xs z-[50]"
          onClick={handleAddToCart}
        >
          + Add to Cart
        </button>
      )}
    </div>
  )
}

export default DonateCard1
