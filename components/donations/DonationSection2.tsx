'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Heading } from '@/components/common/heading'
import DonateCard1 from '@/components/donations/DonateCard1'
import DonateCard2 from '@/components/donations/DonateCard2'
import DonateCard3, { type Sponsor3Card } from '@/components/donations/DonateCard3'
import { FormInput } from '@/components/ui/form-input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useDonationCart } from '@/context/DonationCartContext'
import { ShoppingCart } from 'lucide-react'

const sponsorImage = '/Trainer-01.png'

interface DonationSection2Props {
  onCartOpenChange?: (open: boolean) => void
}

const GRADIENT_STYLE = {
  background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #085c7c 0%, #88bc44 100%) border-box',
  border: '3px solid transparent',
}

export default function DonationSection2({ onCartOpenChange }: DonationSection2Props) {
  const [openItem, setOpenItem] = useState<string | null>('wherever-needed')
  const [, setInternalCartOpen] = useState(false)
  const setIsCartOpen = onCartOpenChange ?? setInternalCartOpen
  const { cart, isLoaded } = useDonationCart()

  const isTestMode = useMemo(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'test',
    [],
  )
  const firstAccordionFrequencies = isTestMode ? ['one_time', 'monthly', 'annually', 'daily'] : undefined

  const getAccordionTotal = (id: string) => {
    if (id === 'wherever-needed') {
      return cart.filter((i) => i.title === 'Wherever Most Needed').reduce((s, i) => s + i.amount * i.quantity, 0)
    }
    if (id === 'support-mission') {
      const progs = ['Character Building', 'Youth Leadership', 'Mentor Development', 'Community Development']
      return cart.filter((i) => progs.some((p) => i.title.includes(p))).reduce((s, i) => s + i.amount * i.quantity, 0)
    }
    return 0
  }

  const collectiveSubtotal = cart.reduce((s, i) => s + i.amount * i.quantity, 0)

  const sponsorCards: Sponsor3Card[] = [
    { id: 1001, title: 'Sponsor a CE Academy', image: sponsorImage, amount: 'PKR 6,000,000' },
    { id: 1002, title: 'Sponsor a CE Institute', image: sponsorImage, amount: 'PKR 6,000,000' },
    { id: 1003, title: 'Sponsor a CE Home', image: sponsorImage, amount: 'PKR 6,000,000' },
  ]

  return (
    <div className="mt-2 pt-2">
      <div className="text-center mb-8">
        <Heading textSize="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl">Donate Online Now</Heading>
        <h2 className="text-xl sm:text-2xl lg:text-2xl 2xl:text-3xl xl:mt-4 font-bold text-[#065D80] mb-8">
          Please Select Type of Donation
        </h2>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <Accordion type="single" collapsible value={openItem || ''} onValueChange={(val) => setOpenItem(val || null)} className="space-y-4">
          {/* ACCORDION 1 */}
          <AccordionItem value="wherever-needed" className="rounded-[1rem] shadow-sm bg-white relative" style={GRADIENT_STYLE}>
            <AccordionTrigger className="text-lg lg:text-2xl font-bold lg:h-20 2xl:h-24 text-[#414141] hover:no-underline">
              Wherever Most Needed
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4">
                {isTestMode && (
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-4">
                    Test mode: Daily recurrence is available for Meezan testing.
                  </p>
                )}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <DonateCard1 amount="PKR 100,000" accordionId="wherever-needed" paymentFrequencies={firstAccordionFrequencies} onAfterAddToCart={() => setIsCartOpen(true)} />
                  <DonateCard1 amount="PKR 50,000" accordionId="wherever-needed" paymentFrequencies={firstAccordionFrequencies} onAfterAddToCart={() => setIsCartOpen(true)} />
                  <DonateCard1 amount="PKR 25,000" accordionId="wherever-needed" paymentFrequencies={firstAccordionFrequencies} onAfterAddToCart={() => setIsCartOpen(true)} />
                  <DonateCard1 showInput accordionId="wherever-needed" paymentFrequencies={firstAccordionFrequencies} onAfterAddToCart={() => setIsCartOpen(true)} />
                </div>
                <div className="flex items-center justify-between border-t border-b mt-2 border-gray-300 p-2">
                  <div className="text-base font-bold text-[#414141]">Total</div>
                  <div className="text-base font-bold text-gray-900">PKR {getAccordionTotal('wherever-needed').toLocaleString()}</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ACCORDION 2 */}
          <AccordionItem value="support-mission" className="rounded-[1rem] shadow-sm bg-white relative" style={GRADIENT_STYLE}>
            <AccordionTrigger className="text-lg lg:text-2xl lg:h-20 2xl:h-24 font-bold text-[#414141] hover:no-underline">Support the Mission</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-12 p-4">
                <DonateCard2 programTitle="Character Building Program" programDescription="Develops character through value-based books, kids clubs, story-based videos, engaging educational apps, along with teachers and parents training guides and workshops." readMoreLink="/cbp" totalprice="200,000" onAfterAddToCart={() => setIsCartOpen(true)}
                  sponsorCards={[
                    { id: 11, title: 'Sponsor a Trainer', image: sponsorImage, amount: 'PKR 75,000' },
                    { id: 12, title: 'Sponsor Books', image: sponsorImage, amount: 'PKR 50,000' },
                    { id: 13, title: 'Sponsor Animation Series', image: sponsorImage, amount: 'PKR 100,000' },
                    { id: 14, title: 'Sponsor App Development', image: sponsorImage, amount: 'PKR 75,000' },
                    { id: 15, title: 'Custom Amount', image: sponsorImage },
                  ]}
                />
                <DonateCard2 programTitle="Youth Leadership Program" programDescription="Empowers young individuals with leadership skills, team-building activities, and mentorship opportunities to develop their potential." readMoreLink="/ylp" totalprice="200,000" onAfterAddToCart={() => setIsCartOpen(true)}
                  sponsorCards={[
                    { id: 21, title: 'Sponsor a Trainer', image: sponsorImage, amount: 'PKR 80,000' },
                    { id: 22, title: 'Sponsor Books', image: sponsorImage, amount: 'PKR 60,000' },
                    { id: 23, title: 'Sponsor Animation Series', image: sponsorImage, amount: 'PKR 90,000' },
                    { id: 24, title: 'Sponsor App Development', image: sponsorImage, amount: 'PKR 85,000' },
                    { id: 25, title: 'Custom Amount', image: sponsorImage },
                  ]}
                />
                <DonateCard2 programTitle="Mentor Development Program" programDescription="Trains and supports mentors to effectively guide youth through structured programs, workshops, and one-on-one mentoring sessions." readMoreLink="/mdp" totalprice="200,000" onAfterAddToCart={() => setIsCartOpen(true)}
                  sponsorCards={[
                    { id: 31, title: 'Sponsor a Trainer', image: sponsorImage, amount: 'PKR 80,000' },
                    { id: 32, title: 'Sponsor Books', image: sponsorImage, amount: 'PKR 60,000' },
                    { id: 33, title: 'Sponsor Animation Series', image: sponsorImage, amount: 'PKR 90,000' },
                    { id: 34, title: 'Sponsor App Development', image: sponsorImage, amount: 'PKR 85,000' },
                    { id: 35, title: 'Custom Amount', image: sponsorImage },
                  ]}
                />
                <DonateCard2 programTitle="Quran & Sunnah Program" programDescription="Develops character through value-based books, kids clubs, story-based videos, engaging educational apps, along with teachers and parents training guides and workshops." readMoreLink="/qsp" totalprice="200,000" onAfterAddToCart={() => setIsCartOpen(true)}
                  sponsorCards={[
                    { id: 41, title: 'Sponsor a Trainer', image: sponsorImage, amount: 'PKR 75,000' },
                    { id: 42, title: 'Sponsor Books', image: sponsorImage, amount: 'PKR 50,000' },
                    { id: 43, title: 'Sponsor Animation Series', image: sponsorImage, amount: 'PKR 100,000' },
                    { id: 44, title: 'Sponsor App Development', image: sponsorImage, amount: 'PKR 75,000' },
                    { id: 45, title: 'Custom Amount', image: sponsorImage },
                  ]}
                />
                <DonateCard2 programTitle="Community Development Program" programDescription="Supports community initiatives, local projects, and volunteer programs to strengthen social development and engagement." readMoreLink="/cdp" totalprice="200,000" onAfterAddToCart={() => setIsCartOpen(true)}
                  sponsorCards={[
                    { id: 51, title: 'Sponsor a Trainer', image: sponsorImage, amount: 'PKR 80,000' },
                    { id: 52, title: 'Sponsor Books', image: sponsorImage, amount: 'PKR 60,000' },
                    { id: 53, title: 'Sponsor Animation Series', image: sponsorImage, amount: 'PKR 90,000' },
                    { id: 54, title: 'Sponsor App Development', image: sponsorImage, amount: 'PKR 85,000' },
                    { id: 55, title: 'Custom Amount', image: sponsorImage },
                  ]}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ACCORDION 3 */}
          <AccordionItem value="sponsorships-appeals" className="rounded-[1rem] shadow-sm bg-white relative" style={GRADIENT_STYLE}>
            <AccordionTrigger className="text-lg lg:text-2xl lg:h-20 2xl:h-24 font-bold text-[#414141] hover:no-underline">Sponsorships &amp; Appeals</AccordionTrigger>
            <AccordionContent>
              <div className="py-2 px-4">
                <DonateCard3 sectionTitle="Sponsorships" price="200,000" sponsorCards={sponsorCards} onAfterAddToCart={() => setIsCartOpen(true)} />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ACCORDION 4 */}
          <AccordionItem value="in-kind-donations" className="rounded-[1rem] shadow-sm bg-white relative" style={GRADIENT_STYLE}>
            <AccordionTrigger className="text-lg lg:text-2xl lg:h-20 2xl:h-24 font-bold text-[#414141] hover:no-underline">In-Kind Donations</AccordionTrigger>
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
                    <FormInput placeholder="Country / Region *" />
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
                    <button className="bg-[#88bc44] mt-4 mx-4 sm:mx-6 md:mx-8 text-white cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-md lg:text-lg">
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
              <button disabled={!isLoaded || cart.length === 0}
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
