'use client'

import { Heading } from '@/components/common/heading'
import { FormInput } from '@/components/ui/form-input'
import { DonationCartPanel } from '@/components/donations/DonationCartPanel'
import { DonationSubtotal } from '@/components/donations/DonationSubtotal'
import { PayFastCheckout } from '@/components/checkout/PayFastCheckout'
import { DonationCartModal } from '@/components/donations/DonationCartModal'
import { usePayment } from '@/context/PaymentContext'
import { useDonationCart } from '@/context/DonationCartContext'
import { useState } from 'react'

export default function CheckoutPage() {
  const { formData, updateField } = usePayment()
  const { isCartModalOpen, setCartModalOpen } = useDonationCart()
  const [phoneValue, setPhoneValue] = useState(formData.phone)

  return (
    <>
      <DonationCartModal isOpen={isCartModalOpen} onOpenChange={setCartModalOpen} />
      <div className="w-full min-h-screen">
        <DonationSubtotal onOpenCart={() => setCartModalOpen(true)} />

        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden bg-[#065D80]">
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">Checkout</h1>
          </div>
        </div>

        <div className="w-[90%] mx-auto container">
          <div className="max-w-screen-xl mx-auto mt-10 px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col lg:flex-row mt-6 gap-6 lg:gap-4">
              <div className="w-full lg:w-1/2 flex flex-col gap-3">
                <Heading textSize="text-2xl sm:text-3xl">Personal Detail</Heading>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="w-full sm:w-1/2">
                    <FormInput placeholder="First name *" value={formData.first_name}
                      onChange={(e) => updateField('first_name', e.target.value.trim())} />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <FormInput placeholder="Last name *" value={formData.last_name}
                      onChange={(e) => updateField('last_name', e.target.value.trim())} />
                  </div>
                </div>

                <FormInput placeholder="Country / Region *" value={formData.country}
                  onChange={(e) => updateField('country', e.target.value.trim())} />
                <FormInput placeholder="Phone number" value={phoneValue}
                  onChange={(e) => { setPhoneValue(e.target.value); updateField('phone', e.target.value.trim()) }} />
                <FormInput placeholder="Email address *" value={formData.email}
                  onChange={(e) => updateField('email', e.target.value.trim())} />
                <FormInput placeholder="Company Name" value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value.trim())} />
                <FormInput placeholder="Address" value={formData.address}
                  onChange={(e) => updateField('address', e.target.value.trim())} />
                <FormInput placeholder="Area" value={formData.area}
                  onChange={(e) => updateField('area', e.target.value.trim())} />
                <FormInput placeholder="Town / City" value={formData.city}
                  onChange={(e) => updateField('city', e.target.value.trim())} />
                <FormInput placeholder="Postcode / ZIP" value={formData.postal_code}
                  onChange={(e) => updateField('postal_code', e.target.value.trim())} />
              </div>

              <div className="w-full lg:w-1/2 flex flex-col gap-3">
                <Heading textSize="text-2xl sm:text-3xl">Your Donations</Heading>
                <DonationCartPanel />
                <div className="mt-2">
                  <PayFastCheckout />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-4 sm:mt-6 items-start sm:items-center mb-12">
              <div className="w-full">
                <h1 className="font-bold text-lg sm:text-xl text-center sm:text-left">
                  For queries and support, call us at +92 300 0444734
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
