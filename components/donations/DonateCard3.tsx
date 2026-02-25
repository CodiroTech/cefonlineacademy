'use client'

import React, { useState } from 'react'
import DonateCard5 from '@/components/donations/DonateCard5'
import { useDonationCart } from '@/context/DonationCartContext'
import { useToast } from '@/context/ToastContext'

export type Sponsor3Card = { id: number; title: string; image: string; amount: string }

type DonateCard3Props = {
  sectionTitle: string
  price: string
  sponsorCards?: Sponsor3Card[]
  onAmountChange?: (cardTitle: string, value: string) => void
  onSponsorTypeChange?: (cardTitle: string, type: 'full' | 'partial') => void
  onDonationTypeChange?: (cardTitle: string, type: string) => void
  onPaymentChange?: (cardTitle: string, value: string) => void
  onAfterAddToCart?: () => void
}

const DonateCard3: React.FC<DonateCard3Props> = ({
  sectionTitle, sponsorCards = [],
  onAmountChange, onSponsorTypeChange, onDonationTypeChange, onAfterAddToCart,
}) => {
  const [selectedPayments, setSelectedPayments] = useState<Record<string, string>>(() =>
    sponsorCards.reduce((acc, c) => { acc[c.title] = 'one_time'; return acc }, {} as Record<string, string>)
  )
  const [selectedSponsorType, setSelectedSponsorType] = useState<Record<string, 'full' | 'partial'>>(() =>
    sponsorCards.reduce((acc, c) => { acc[c.title] = 'full'; return acc }, {} as Record<string, 'full' | 'partial'>)
  )
  const [partialAmounts, setPartialAmounts] = useState<Record<string, string>>(() =>
    sponsorCards.reduce((acc, c) => { acc[c.title] = ''; return acc }, {} as Record<string, string>)
  )
  const [selectedDonationType, setSelectedDonationType] = useState<Record<string, string>>(() =>
    sponsorCards.reduce((acc, c) => { acc[c.title] = 'general_donation'; return acc }, {} as Record<string, string>)
  )

  const originalAmounts = sponsorCards.reduce((acc, c) => { acc[c.title] = c.amount; return acc }, {} as Record<string, string>)
  const { addToCart, cart } = useDonationCart()
  const { showToast } = useToast()
  const ACCORDION_ID = 'sponsorships-appeals'

  const accordionTotal = cart
    .filter((item) => item.accordionId === ACCORDION_ID || item.title.startsWith(sectionTitle))
    .reduce((sum, item) => sum + item.amount * item.quantity, 0)

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#88bc44] mb-4">{sectionTitle}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 mb-6">
        {sponsorCards.map((card) => {
          const rawAmount = selectedSponsorType[card.title] === 'partial' ? partialAmounts[card.title] : card.amount
          const numericAmount = parseInt(rawAmount.replace(/[^0-9]/g, ''), 10)

          return (
            <div key={card.title} className="relative group border border-gray-300 rounded-lg bg-white h-full overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image} alt={card.title} className="w-full h-24 rounded-t-lg object-cover" />
              <div className="bg-[#065D80]/90 p-3 text-white text-center" title={card.title}>
                <div className="font-bold text-sm line-clamp-2 min-h-[2.5rem]">{card.title}</div>
              </div>
              <div className="px-4 py-2">
                <div className="font-bold text-xl text-[#88bc44] text-center mb-4">
                  {selectedSponsorType[card.title] === 'partial' && partialAmounts[card.title] ? `PKR ${partialAmounts[card.title]}` : card.amount}
                </div>

                <div className="flex justify-center items-end gap-2 mb-3 flex-wrap">
                  <label className="flex flex-col items-center cursor-pointer">
                    <input type="radio" name={`payment-${card.title}`} value="one_time" className="hidden peer"
                      checked={selectedPayments[card.title] === 'one_time'}
                      onChange={() => setSelectedPayments((p) => ({ ...p, [card.title]: 'one_time' }))} />
                    <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                      <div className={`w-1 h-1 bg-black rounded-full ${selectedPayments[card.title] === 'one_time' ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className="text-xs capitalize">One time</span>
                  </label>
                  <span className="relative inline-flex gap-2">
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 z-10 pointer-events-none">Coming soon</span>
                    {['monthly', 'annually'].map((freq) => (
                      <label key={freq} className="flex flex-col items-center cursor-not-allowed opacity-60">
                        <input type="radio" name={`payment-${card.title}`} value={freq} className="hidden peer" disabled />
                        <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                          <div className="w-1 h-1 bg-black rounded-full opacity-0" />
                        </div>
                        <span className="text-xs capitalize">{freq.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </span>
                </div>

                <div className="flex justify-center gap-4 mb-4">
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => {
                    setSelectedSponsorType((p) => ({ ...p, [card.title]: 'full' }))
                    setPartialAmounts((p) => ({ ...p, [card.title]: '' }))
                    onAmountChange?.(card.title, originalAmounts[card.title])
                    onSponsorTypeChange?.(card.title, 'full')
                  }}>
                    <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                      <div className={`w-1 h-1 bg-black rounded-full ${selectedSponsorType[card.title] === 'full' ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className="text-xs text-black">Full Sponsor</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => {
                    setSelectedSponsorType((p) => ({ ...p, [card.title]: 'partial' }))
                    onSponsorTypeChange?.(card.title, 'partial')
                  }}>
                    <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center">
                      <div className={`w-1 h-1 bg-black rounded-full ${selectedSponsorType[card.title] === 'partial' ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-600">Partial Sponsor</span>
                      {selectedSponsorType[card.title] === 'partial' && (
                        <input type="text" placeholder="Type your amount here"
                          className="mt-1 w-22 text-xs border border-gray-300 rounded text-center text-gray-500"
                          value={partialAmounts[card.title]}
                          onChange={(e) => { setPartialAmounts((p) => ({ ...p, [card.title]: e.target.value })); onAmountChange?.(card.title, e.target.value) }} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2 mb-2">
                  {[{ label: 'General', value: 'general_donation' }, { label: 'Zakat', value: 'zakat' }].map(({ value }) => (
                    <div key={value} className="flex items-center gap-1 cursor-pointer" onClick={() => {
                      setSelectedDonationType((p) => ({ ...p, [card.title]: value }))
                      onDonationTypeChange?.(card.title, value)
                    }}>
                      <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center shrink-0">
                        <div className={`w-1 h-1 bg-black rounded-full ${selectedDonationType[card.title] === value ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                      <span className="text-xs text-black capitalize whitespace-nowrap min-w-[4.5rem]">
                        {value === 'general_donation' ? 'General' : 'Zakat'}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedSponsorType[card.title] && selectedDonationType[card.title] && (
                  <div className="flex justify-center pt-3 pb-4">
                    <button className="rounded-full px-3 py-1.5 text-xs text-white bg-[#065D80] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-[#065D80] hover:border cursor-pointer z-[50] border border-transparent"
                      onClick={() => {
                        if (!numericAmount) { showToast('Please enter a valid amount', 'error'); return }
                        addToCart({
                          id: card.id, title: `${sectionTitle} - ${card.title}`, amount: numericAmount,
                          paymentFrequency: selectedPayments[card.title],
                          sponsor_type: selectedSponsorType[card.title] === 'full' ? 'full_sponsor' : 'partial_sponsor',
                          donationType: selectedDonationType[card.title], quantity: 1,
                          image: card.image, accordionId: ACCORDION_ID,
                        })
                        showToast('Item added to cart successfully', 'success')
                        onAfterAddToCart?.()
                      }}>+ Add to Cart</button>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <DonateCard5
          title="Custom Sponsorship" image="/Trainer-01.png" programTitle={sectionTitle}
          accordionId={ACCORDION_ID}
          onAmountChange={(v) => onAmountChange?.('Custom Sponsorship', v)}
          onSponsorTypeChange={(t) => onSponsorTypeChange?.('Custom Sponsorship', t)}
          onDonationTypeChange={(t) => onDonationTypeChange?.('Custom Sponsorship', t)}
          onAfterAddToCart={onAfterAddToCart}
        />
      </div>

      <div className="flex items-center justify-between border-t border-b border-gray-300 mt-4 p-2">
        <div className="text-base font-bold text-[#414141]">Total</div>
        <div className="text-base font-bold text-gray-900">PKR {accordionTotal.toLocaleString()}</div>
      </div>
    </div>
  )
}

export default DonateCard3
