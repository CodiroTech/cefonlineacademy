'use client'

import { useState, useMemo, Fragment } from 'react'
import Link from 'next/link'
import { Heading } from '@/components/common/heading'
import { CountryDropdown } from '@/components/common/CountryDropdown'
import DonateCard1 from '@/components/donations/DonateCard1'
import DonateCard4 from '@/components/donations/DonateCard4'
import { DynamicCauseCard } from '@/components/donations/DynamicCauseCard'
import { FormInput } from '@/components/ui/form-input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useDonationCart } from '@/context/DonationCartContext'
import { ShoppingCart } from 'lucide-react'
import type { DonationAccordionData } from '@/lib/api/donations'

const GRADIENT_STYLE = {
  background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #085c7c 0%, #88bc44 100%) border-box',
  border: '3px solid transparent',
}

const IN_KIND_VALUE = 'in-kind-donations'

interface DonationSection2Props {
  accordionData: DonationAccordionData
  onCartOpenChange?: (open: boolean) => void
}

export default function DonationSection2({
  accordionData,
  onCartOpenChange,
}: DonationSection2Props) {
  const [openItem, setOpenItem] = useState<string | null>(() => {
    const first = accordionData.sections[0]
    return first ? `section-${first.id}` : IN_KIND_VALUE
  })
  const [, setInternalCartOpen] = useState(false)
  const setIsCartOpen = onCartOpenChange ?? setInternalCartOpen
  const { cart, isLoaded } = useDonationCart()

  const isTestMode = useMemo(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'test',
    [],
  )
  const paymentFrequencies = isTestMode ? ['one_time', 'monthly', 'annually', 'daily'] : undefined

  const getAccordionTotal = (sectionId: string) => {
    return cart
      .filter((i) => i.accordionId === sectionId)
      .reduce((s, i) => s + i.amount * i.quantity, 0)
  }

  const collectiveSubtotal = cart.reduce((s, i) => s + i.amount * i.quantity, 0)

  const defaultImage = '/Trainer-01.png'

  return (
    <div className="mt-2 pt-2 animate-slide-up delay-500">
      <div className="text-center mb-8">
        <Heading textSize="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl">Donate Online Now</Heading>
        <h2 className="text-xl sm:text-2xl lg:text-2xl 2xl:text-3xl xl:mt-4 font-bold text-[#065D80] mb-8">
          Please Select Type of Donation
        </h2>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <Accordion type="single" collapsible value={openItem || ''} onValueChange={(val) => setOpenItem(val || null)} className="space-y-4">
          {/* Dynamic accordions from API */}
          {accordionData.sections.map((section) => {
            const sectionId = `section-${section.id}`
            const hasCategories = section.categories.length > 0
            const allCauses = hasCategories
              ? section.categories.flatMap((cat) => cat.causes)
              : section.uncategorizedCauses
            const allCausesInSection = [...section.categories.flatMap((cat) => cat.causes), ...section.uncategorizedCauses]
            const sectionHasAnyCauseWithImage = allCausesInSection.some((c) => c.imageUrl != null && c.imageUrl.trim() !== '')
            const hasUncategorized = section.uncategorizedCauses.length > 0

            return (
              <AccordionItem key={sectionId} value={sectionId} className="rounded-[1rem] shadow-sm bg-white relative" style={GRADIENT_STYLE}>
                <AccordionTrigger className="text-lg lg:text-2xl font-bold lg:h-20 2xl:h-24 text-[#414141] hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4">
                    {isTestMode && (
                      <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-4">
                        Test mode: Daily recurrence is available for Meezan testing.
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-2">
                      {hasCategories ? (
                        <>
                          {section.categories.map((category) => (
                            <Fragment key={category.id}>
                              <div className="col-span-full">
                                <h3 className="text-2xl font-bold text-[#88bc44] mb-4">{category.title}</h3>
                                {category.description && (
                                  <p className="text-[#414141] text-base leading-relaxed mb-6">{category.description}</p>
                                )}
                              </div>
                              {category.causes.map((cause) => (
                                <DynamicCauseCard
                                  key={cause.id}
                                  cause={cause}
                                  sectionId={sectionId}
                                  sectionTitle={section.title}
                                  paymentFrequencies={paymentFrequencies}
                                  onAfterAddToCart={() => setIsCartOpen(true)}
                                />
                              ))}
                            </Fragment>
                          ))}
                          {hasUncategorized &&
                              section.uncategorizedCauses.map((cause) => (
                                <DynamicCauseCard
                                  key={cause.id}
                                  cause={cause}
                                  sectionId={sectionId}
                                  sectionTitle={section.title}
                                  paymentFrequencies={paymentFrequencies}
                                  onAfterAddToCart={() => setIsCartOpen(true)}
                                />
                              ))}
                        </>
                      ) : (
                        <>
                          {section.uncategorizedCauses.length === 0 && (
                            <p className="text-[#414141] text-sm col-span-full">No causes in this section yet.</p>
                          )}
                          {section.uncategorizedCauses.map((cause) => (
                            <DynamicCauseCard
                              key={cause.id}
                              cause={cause}
                              sectionId={sectionId}
                              sectionTitle={section.title}
                              paymentFrequencies={paymentFrequencies}
                              onAfterAddToCart={() => setIsCartOpen(true)}
                            />
                          ))}
                        </>
                      )}

                      {/* Custom Amount card: with image if any cause has image, else same no-image style as other cards */}
                      {sectionHasAnyCauseWithImage ? (
                        <DonateCard4
                          title="Any Other Amount"
                          image={defaultImage}
                          programTitle={section.title}
                          accordionId={sectionId}
                          onAfterAddToCart={() => setIsCartOpen(true)}
                        />
                      ) : (
                        <DonateCard1
                          cartTitle={`${section.title} - Any Other Amount`}
                          accordionId={sectionId}
                          paymentFrequencies={paymentFrequencies}
                          onAfterAddToCart={() => setIsCartOpen(true)}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-b mt-2 border-gray-300 p-2">
                      <div className="text-base font-bold text-[#414141]">Total</div>
                      <div className="text-base font-bold text-gray-900">PKR {getAccordionTotal(sectionId).toLocaleString()}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}

          {/* In-Kind Donations (static) */}
          <AccordionItem value={IN_KIND_VALUE} className="rounded-[1rem] shadow-sm bg-white relative" style={GRADIENT_STYLE}>
            <AccordionTrigger className="text-lg lg:text-2xl lg:h-20 2xl:h-24 font-bold text-[#414141] hover:no-underline">
              In-Kind Donations
            </AccordionTrigger>
            <AccordionContent>
              <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2 flex flex-col gap-2">
                    <Heading textSize="text-xl sm:text-2xl lg:text-3xl">Personal Detail</Heading>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="w-full sm:w-1/2"><FormInput placeholder="First name *" /></div>
                      <div className="w-full sm:w-1/2"><FormInput placeholder="Last name *" /></div>
                    </div>
                    <FormInput placeholder="Company Name" />
                    <CountryDropdown placeholder="Select Country / Region *" />
                    <FormInput placeholder="Address *" />
                    <FormInput placeholder="Area" />
                    <FormInput placeholder="Town / City" />
                    <FormInput placeholder="Postcode / ZIP" />
                    <FormInput placeholder="Phone number" />
                    <FormInput placeholder="Email address" />
                  </div>
                  <div className="w-full sm:w-1/2 flex flex-col gap-2">
                    <Heading textSize="text-xl sm:text-2xl lg:text-3xl">Donation Details</Heading>
                    <FormInput placeholder="Briefly state your qualifications, skills, areas of expertise, and the services you can offer." className="!h-48 sm:!h-[20rem] md:!h-[35rem] lg:!h-[40rem]" />
                    <button type="button" className="bg-[#88bc44] mt-4 mx-4 sm:mx-6 md:mx-8 text-white cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-md lg:text-lg">
                      Submit Form
                    </button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* BOTTOM CONTROLS */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4 my-4 mx-auto">
          <div className="w-full 2xl:px-2">
            <h1 className="font-bold text-md 2xl:text-xl text-[#065D80]">Confidentiality Disclaimer</h1>
            <p className="text-xs mt-1">Your personal information will be treated with the utmost confidentiality and used solely in accordance with privacy standards.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-end items-center w-full mt-2 lg:mt-4">
            <button type="button" onClick={() => setIsCartOpen(true)}
              className="bg-[#065D80] px-4 cursor-pointer sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-md 2xl:text-lg flex items-center gap-1 w-full sm:w-auto text-white">
              View Cart
              <span className="relative inline-flex">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <span className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold"
                  aria-label={`${cart.reduce((s, i) => s + i.quantity, 0)} items in cart`}>
                  {(() => { const n = cart.reduce((s, i) => s + i.quantity, 0); return n > 99 ? '99+' : n })()}
                </span>
              </span>
            </button>
            <Link href="/checkout" className={`inline-block w-full sm:w-auto ${(!isLoaded || cart.length === 0) ? 'pointer-events-none' : 'cursor-pointer'}`}>
              <button type="button" disabled={!isLoaded || cart.length === 0}
                className={`bg-[#88bc44] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-md 2xl:text-lg w-full sm:w-auto ${(!isLoaded || cart.length === 0) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-2 flex flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h3 className="text-lg sm:text-xl 2xl:px-4 lg:text-2xl font-bold text-[#065D80]">Subtotal</h3>
          </div>
          <div className="text-right">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#065D80]">
              {!isLoaded ? 'Loading...' : `PKR ${collectiveSubtotal.toLocaleString()}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
