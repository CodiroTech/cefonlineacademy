'use client'

import Image from 'next/image'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

export default function OfficeInfoSection() {
  return (
    <section className="w-full py-6 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* MAIN FLEX WRAPPER */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6">

          {/* ================= LEFT IMAGE ================= */}
          <div className="shrink-0 flex items-end pt-6 lg:pt-14">
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

          {/* ================= RIGHT CARD ================= */}
          <div className="w-full lg:flex-1">
            <div className="bg-[#F4F4F4] rounded-3xl lg:rounded-4xl px-5 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-end">

              {/* Mosque icon */}
              <div className="shrink-0 self-start md:self-end">
                <Image
                  src="/Faisal Mosque.png"
                  alt="Faisal Mosque"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>

              {/* TEXT INFO */}
              <div className="flex-1 flex gap-3 sm:gap-4">

                {/* ================= DESKTOP ICON COLUMN ================= */}
                <div className="hidden md:flex flex-col items-center gap-1.5 pt-20">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80]">
                    <FaPhoneAlt className="text-white text-xs" />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80] mt-1">
                    <FaEnvelope className="text-white text-xs" />
                  </span>
                </div>

                {/* ================= TEXT COLUMN ================= */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-[#414141] font-bold text-lg sm:text-xl">
                    Head Office, Islamabad
                  </h3>

                  <p className="text-[14px] sm:text-[16px] font-medium text-[#414141] leading-snug">
                    2nd Floor, Landmark Heights, Service Road (East),
                    Islamabad Expressway, Islamabad 44000, Pakistan
                  </p>

                  {/* ================= MOBILE PHONE ================= */}
                  <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#414141] mt-1 md:hidden">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80] shrink-0">
                      <FaPhoneAlt className="text-white text-xs" />
                    </span>
                    <span>
                      +92-51-8435553, +92-51-8435554, +92 300 8594256
                    </span>
                  </div>

                  {/* ================= DESKTOP PHONE ================= */}
                  <div className="hidden md:block text-[14px] sm:text-[15px] text-[#414141] mt-1">
                    +92-51-8435553, +92-51-8435554, +92 300 8594256
                  </div>

                  {/* ================= MOBILE EMAIL ================= */}
                  <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#414141] md:hidden">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#065D80] shrink-0">
                      <FaEnvelope className="text-white text-xs" />
                    </span>
                    <span>info@cef.org.pk</span>
                  </div>

                  {/* ================= DESKTOP EMAIL ================= */}
                  <div className="hidden md:block text-[14px] sm:text-[15px] text-[#414141]">
                    info@cef.org.pk
                  </div>
                </div>

              </div>

              {/* ================= MAP (NOW VISIBLE ON MOBILE) ================= */}
              <div className="shrink-0 self-end">
                <div className="relative w-28 h-24 sm:w-44 sm:h-32 lg:w-50 lg:h-35">
                  <Image
                    src="/contactmap.png"
                    alt="Map"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
