'use client'

import Image from 'next/image'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import type { ContactInfo } from '@/lib/api/contact'
import { stripHtml } from '@/lib/headless'

interface Props {
  data?: ContactInfo | null
}

export default function OfficeInfoSection({ data }: Props) {
  const officeName = stripHtml(data?.description) || 'Head Office, Islamabad'
  const address = data?.address || '2nd Floor, Landmark Heights, Service Road (East), Islamabad Expressway, Islamabad 44000, Pakistan'
  const phone = data?.phone || '+92-51-8435553, +92-51-8435554, +92 300 8594256'
  const email = data?.email || 'info@cef.org.pk'

  const mapShareUrl = 'https://maps.app.goo.gl/xDDRTY7GtmDr7AHE7'
  const mapAddressHtml = data?.['map-address'] ?? ''
  const mapEmbedSrc =
    (typeof mapAddressHtml === 'string' && /src=["']([^"']+)["']/.test(mapAddressHtml))
      ? (mapAddressHtml.match(/src=["']([^"']+)["']/) ?? [])[1]
      : ''
  const mapIframeSrc = mapEmbedSrc && mapEmbedSrc.startsWith('http') ? mapEmbedSrc : mapShareUrl

  return (
    <section className="w-full py-6 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6">

          <div className="shrink-0 flex items-end pt-2 lg:pt-4">
            <div className="relative w-40 h-36 sm:w-48 sm:h-40 lg:w-55 lg:h-48">
              <Image
                src="/Boy and Girl.png"
                alt="Students"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <div className="bg-[#F4F4F4] rounded-3xl lg:rounded-4xl px-5 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-end">

              <div className="shrink-0 self-start md:self-end">
                <Image
                  src="/Faisal Mosque.png"
                  alt="Faisal Mosque"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <div className="flex-1 flex gap-3 sm:gap-4">

                <div className="hidden md:flex flex-col items-center gap-1.5 pt-20">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80]">
                    <FaPhoneAlt className="text-white text-xs" />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80] mt-1">
                    <FaEnvelope className="text-white text-xs" />
                  </span>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-[#414141] font-bold text-lg sm:text-xl">
                    {officeName}
                  </h3>

                  <p className="text-[14px] sm:text-[16px] font-medium text-[#414141] leading-snug">
                    {address}
                  </p>

                  <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#414141] mt-1 md:hidden">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80] shrink-0">
                      <FaPhoneAlt className="text-white text-xs" />
                    </span>
                    <span>{phone}</span>
                  </div>

                  <div className="hidden md:block text-[14px] sm:text-[15px] text-[#414141] mt-1">
                    {phone}
                  </div>

                  <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#414141] md:hidden">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80] shrink-0">
                      <FaEnvelope className="text-white text-xs" />
                    </span>
                    <span>{email}</span>
                  </div>

                  <div className="hidden md:block text-[14px] sm:text-[15px] text-[#414141]">
                    {email}
                  </div>
                </div>

              </div>

              <div className="shrink-0 self-end">
                <div className="relative w-28 h-24 sm:w-44 sm:h-32 lg:w-50 lg:h-35 rounded overflow-hidden border border-gray-200">
                  <iframe
                      src={mapIframeSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Head Office location on Google Maps"
                      className="absolute inset-0 w-full h-full"
                    />
                    <a
                      href={mapShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-0.5 right-0.5 z-10 px-1.5 py-0.5 bg-black/60 hover:bg-black/80 text-white text-[10px] rounded opacity-90"
                      aria-label="Open in Google Maps"
                    >
                      Open in new tab
                    </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
