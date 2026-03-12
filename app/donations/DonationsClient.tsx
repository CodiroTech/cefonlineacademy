'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Button } from '@/components/ui/button'
import { AboutHeader } from '@/components/common/aboutHeader'
import DonationSection2 from '@/components/donations/DonationSection2'
import { DonationSubtotal } from '@/components/donations/DonationSubtotal'
import { DonationCartModal } from '@/components/donations/DonationCartModal'
import { useDonationCart } from '@/context/DonationCartContext'
import { sanitizeApiContent } from '@/lib/sanitizeApiContent'
import type { DonationsResponse } from '@/lib/types/donations'
import type { DonationAccordionData } from '@/lib/api/donations'

const DEFAULT_HEADER_IMAGE = '/About Us Header.png'

interface Props {
  donationData: DonationsResponse | null
  accordionData: DonationAccordionData
}

export default function DonationsClient({ donationData, accordionData }: Props) {
  const { setCartModalOpen, isCartModalOpen } = useDonationCart()
  const [fatwOpen, setFatwOpen] = useState(false)

  const description = donationData?.['donation-desc'] || ''
  const infoText = donationData?.['donations-info'] || ''
  const contactText = donationData?.['quires-support'] || 'For queries and support, call us at +92 300 0444734'

  const generalDonations = donationData?.['donation-banks-relation']?.filter((b) => b['donation-type'] === 'General Donation') || []
  const zakatDonations = donationData?.['donation-banks-relation']?.filter((b) => b['donation-type'] === 'Zakat Donation') || []

  const certImage = donationData?.image?.full_url || ''
  const headerImage = typeof donationData?.['header-image'] === 'string' ? donationData['header-image'] : donationData?.['header-image']?.full_url || ''
  const pageHeaderImage = headerImage || DEFAULT_HEADER_IMAGE

  return (
    <>
      <DonationCartModal isOpen={isCartModalOpen} onOpenChange={setCartModalOpen} />

      <div className="min-h-screen">
        {/* Cart bar first (donations-only), then same green page header as other pages (same width container as navbar) */}
        <DonationSubtotal onOpenCart={() => setCartModalOpen(true)} />
        <div className="w-full max-w-[1600px] mx-auto px-0 lg:px-20">
          <div className="relative z-[100] mt-2 pb-1">
            <AboutHeader
              title="Donations"
              imageSrc={pageHeaderImage}
              imageAlt="Donations"
              embedded
            />
          </div>
        </div>

        <div className="container mx-auto w-[90%] py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-[80%] lg:pl-10">
              {description && (
                <div className="mb-8 sm:mb-12">
                  <div className="text-[#414141] font-medium text-base 2xl:text-lg leading-snug text-justify"
                    dangerouslySetInnerHTML={{ __html: sanitizeApiContent(description) }} />
                </div>
              )}

              <Heading textSize="text-2xl sm:text-3xl">For Donations Via Bank To Bank Transfer</Heading>

              {generalDonations.length > 0 && (
                <div className="mb-2 mt-2 animate-slide-left delay-500">
                  <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold mb-2">
                    <span className="text-secondary font-bold">For General Donations</span>
                  </h2>
                  <div className="overflow-x-auto scrollbar-hide -mx-4 xl:-mx-2 px-4 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[600px] 2xl:min-w-[650px] sm:min-w-0">
                      <thead>
                        <tr>
                          <th className="text-left py-2 px-1 sm:px-2 font-bold text-[#88bc44] text-xs sm:text-sm xl:text-xl 2xl:text-2xl">Bank</th>
                          <th className="text-left py-2 px-1 sm:px-2 font-bold text-[#88bc44] text-xs sm:text-sm xl:text-xl 2xl:text-2xl">Account Title</th>
                          <th className="text-left py-2 px-1 sm:px-2 font-bold text-[#88bc44] text-xs sm:text-sm xl:text-xl 2xl:text-2xl">IBAN #</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generalDonations.map((bank, i) => (
                          <tr key={i}>
                            <td className="py-2 px-1 sm:px-2 font-bold text-[#065D80] text-xs sm:text-sm 2xl:text-lg">{bank['bank-name'] || ''}</td>
                            <td className="py-2 px-1 sm:px-2 font-bold text-[#414141] text-xs sm:text-sm 2xl:text-lg">{bank['account-title'] || ''}</td>
                            <td className="py-2 px-1 sm:px-2 font-bold text-[#414141] text-xs sm:text-sm 2xl:text-lg">{bank.iban || ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {zakatDonations.length > 0 && (
                <div className="mb-2 animate-slide-left delay-500">
                  <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">
                    <span className="text-secondary">For Zakat Donations</span>
                  </h2>
                  <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 xl:-mx-2 sm:px-0">
                    <table className="w-full min-w-[600px] 2xl:min-w-[650px] sm:min-w-0">
                      <thead>
                        <tr>
                          <th className="text-left py-2 px-1 sm:px-2 font-bold text-[#88bc44] text-xs sm:text-sm xl:text-xl 2xl:text-2xl">Bank</th>
                          <th className="text-left py-2 px-1 sm:px-2 font-bold text-[#88bc44] text-xs sm:text-sm xl:text-xl 2xl:text-2xl">Account Title</th>
                          <th className="text-left py-2 px-1 sm:px-2 font-bold text-[#88bc44] text-xs sm:text-sm xl:text-xl 2xl:text-2xl">IBAN #</th>
                        </tr>
                      </thead>
                      <tbody>
                        {zakatDonations.map((bank, i) => (
                          <tr key={i}>
                            <td className="py-2 px-1 sm:px-2 font-bold text-[#065D80] text-xs sm:text-sm 2xl:text-lg">{bank['bank-name'] || ''}</td>
                            <td className="py-2 px-1 sm:px-2 font-bold text-[#414141] text-xs sm:text-sm 2xl:text-lg">{bank['account-title'] || ''}</td>
                            <td className="py-2 px-1 sm:px-2 font-bold text-[#414141] text-xs sm:text-sm 2xl:text-lg">{bank.iban || ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {certImage && (
              <div className="w-full lg:w-[20%] flex flex-col items-center mt-8 lg:mt-0 animate-zoom-in delay-700">
                <div className="relative mb-2">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-60 lg:h-[22rem] 2xl:w-70 2xl:h-[24rem] bg-secondary rounded-full flex items-center justify-center p-2 sm:p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={certImage} alt="Certificate" className="w-[90%] 2xl:w-[85%] h-[80%] object-cover" />
                  </div>
                </div>
                <Button type="button" variant="primary" onClick={() => setFatwOpen(true)} className="rounded-full px-4 2xl:px-3 text-xs 2xl:text-[14px]">
                  View Fatwa for Zakat
                </Button>
              </div>
            )}
          </div>

          {fatwOpen && certImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setFatwOpen(false)}>
              <div className="bg-white rounded-lg w-[90%] sm:w-[30%] h-[70%] relative flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                <Image src={certImage} alt="Certificate Large" width={600} height={800} className="max-w-full max-h-full object-contain rounded-md" />
              </div>
            </div>
          )}

          {infoText && (
            <div className="mt-2 border-b lg:pl-10 border-gray-400">
              <div className="bg-primary mx-auto text-white px-3 sm:py-1 rounded-lg mb-3">
                <p className="lg:text-[13px] text-xs 2xl:text-[16px] xl:text-center lg:whitespace-nowrap font-medium leading-relaxed">{infoText}</p>
              </div>
              <div className="mb-6 lg:mb-8">
                <p className="text-[#414141] text-base sm:text-lg font-bold">{contactText}</p>
              </div>
            </div>
          )}

          <DonationSection2 accordionData={accordionData} onCartOpenChange={setCartModalOpen} />
        </div>
      </div>
    </>
  )
}
