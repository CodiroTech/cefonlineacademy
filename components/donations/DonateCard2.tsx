'use client'

import React, { useState } from 'react'
import DonateCard4 from '@/components/donations/DonateCard4'
import { useDonationCart } from '@/context/DonationCartContext'
import { useToast } from '@/context/ToastContext'

type SponsorCard = { id: number; title: string; image: string; amount?: string }

type DonateCard2Props = {
  programTitle: string
  programDescription: string
  readMoreLink?: string
  totalprice: string
  sponsorCards?: SponsorCard[]
  paymentFrequencies?: string[]
  donationTypes?: string[]
  onAmountChange?: (cardTitle: string, value: string) => void
  onPaymentChange?: (cardTitle: string, value: string) => void
  onDonationTypeChange?: (cardTitle: string, value: string) => void
  onAfterAddToCart?: () => void
}

const DonateCard2: React.FC<DonateCard2Props> = ({
  programTitle, programDescription, readMoreLink,
  sponsorCards = [], paymentFrequencies = ['one_time', 'monthly', 'annually'],
  donationTypes = ['general_donation', 'zakat'],
  onAmountChange, onPaymentChange, onDonationTypeChange, onAfterAddToCart,
}) => {
  const [selectedPayments, setSelectedPayments] = useState<Record<string, string>>(() =>
    sponsorCards.filter((c) => c.amount).reduce((acc, c) => { acc[c.title] = paymentFrequencies[0]; return acc }, {} as Record<string, string>)
  )
  const [selectedDonationTypes, setSelectedDonationTypes] = useState<Record<string, string>>(() =>
    sponsorCards.filter((c) => c.amount).reduce((acc, c) => { acc[c.title] = donationTypes[0]; return acc }, {} as Record<string, string>)
  )

  const { addToCart, cart } = useDonationCart()
  const { showToast } = useToast()

  const programTotal = cart
    .filter((item) => item.title.startsWith(programTitle))
    .reduce((sum, item) => sum + item.amount * item.quantity, 0)

  return (
    <div className="relative mx-auto">
      <h3 className="text-2xl font-bold text-[#88bc44] mb-4">{programTitle}</h3>
      <p className="text-[#414141] text-base leading-relaxed mb-6">
        {programDescription}{' '}
        {readMoreLink && <a href={readMoreLink} className="text-[#065D80] hover:underline font-medium">Read More</a>}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {sponsorCards.map((card) => {
          if (!card.amount) {
            return (
              <DonateCard4
                key={card.title}
                title={card.title}
                image={card.image}
                programTitle={programTitle}
                accordionId="support-mission"
                onAmountChange={(v) => onAmountChange?.(card.title, v)}
                onPaymentChange={(v) => onPaymentChange?.(card.title, v)}
                onDonationTypeChange={(v) => onDonationTypeChange?.(card.title, v)}
                onAfterAddToCart={onAfterAddToCart}
              />
            )
          }

          return (
            <div key={card.title} className="relative group border border-gray-300 rounded-lg h-full overflow-visible">
              <div className="overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.title} className="w-full h-24 object-cover" />
                <div className="bg-[#065D80]/80 p-2 text-white text-center" title={card.title}>
                  <div className="font-bold text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{card.title}</div>
                </div>
                <div className="font-bold text-lg text-[#88bc44] text-center">{card.amount}</div>

                <div className="flex justify-center items-end gap-2 my-3 flex-wrap">
                  <label className="flex flex-col items-center cursor-pointer">
                    <input type="radio" name={`payment-${card.title}`} value="one_time" className="hidden peer"
                      checked={selectedPayments[card.title] === 'one_time'}
                      onChange={() => { setSelectedPayments((p) => ({ ...p, [card.title]: 'one_time' })); onPaymentChange?.(card.title, 'one_time') }} />
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

                <div className="flex justify-center px-2 items-center gap-2 text-xs pb-4">
                  {donationTypes.map((type) => (
                    <label key={type} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name={`donationType-${card.title}`} value={type} className="hidden peer"
                        checked={selectedDonationTypes[card.title] === type}
                        onChange={() => { setSelectedDonationTypes((p) => ({ ...p, [card.title]: type })); onDonationTypeChange?.(card.title, type) }} />
                      <div className="w-3 h-3 rounded-full border-2 border-black mb-1 flex items-center justify-center shrink-0">
                        <div className={`w-1 h-1 bg-black rounded-full ${selectedDonationTypes[card.title] === type ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                      <span className="text-xs pb-1 capitalize whitespace-nowrap min-w-[4.5rem]">
                        {type === 'general_donation' ? 'General' : 'Zakat'}
                      </span>
                    </label>
                  ))}
                </div>

                {selectedPayments[card.title] && selectedDonationTypes[card.title] && (
                  <div className="flex justify-center pt-3 pb-4">
                    <button
                      className="rounded-full cursor-pointer hover:bg-white hover:text-[#065D80] hover:border px-3 py-1.5 text-white bg-[#065D80] opacity-0 group-hover:opacity-100 transition-opacity text-xs z-[50] border border-transparent"
                      onClick={() => {
                        const numericAmount = parseInt(card.amount!.replace(/[^0-9]/g, ''), 10)
                        addToCart({
                          id: card.id, title: `${programTitle} - ${card.title}`,
                          amount: numericAmount, paymentFrequency: selectedPayments[card.title],
                          donationType: selectedDonationTypes[card.title], quantity: 1,
                          image: card.image, accordionId: 'support-mission',
                        })
                        showToast('Item added to cart successfully', 'success')
                        onAfterAddToCart?.()
                      }}
                    >+ Add to Cart</button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4 border-t border-b border-gray-300 p-2">
        <div className="text-base font-bold text-[#414141]">Total</div>
        <div className="text-base font-bold text-gray-900">PKR {programTotal.toLocaleString()}</div>
      </div>
    </div>
  )
}

export default DonateCard2
