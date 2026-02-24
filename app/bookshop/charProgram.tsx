'use client'

import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Text } from '@/components/common/text'

export default function BOOKDETAILS() {
  return (
    <section className="w-full pb-10 font-poppins">
      <div className="w-full max-w-7xl mx-auto px-2">

        {/* ================= MOBILE & TABLET FILTERS ================= */}
        <div className="xl:hidden w-full mb-6 flex flex-col gap-4 px-2">
          <FilterBlock title="Categories" showClear>
            <FilterItem label="Nazirah/Tajweed-ul-Quran" name="category" />
            <FilterItem label="Fahm-ul-Quran" name="category" />
            <FilterItem label="Character Building" name="category" />
            <FilterItem label="Best Sellers" name="category" />
          </FilterBlock>

          <FilterBlock title="Price">
            <div className="flex gap-2 text-[11px] text-gray-700">
              <input
                type="number"
                placeholder="Min: 200 PKR"
                className="w-1/2 rounded-lg border border-gray-400 px-2 py-1 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max: 2000 PKR"
                className="w-1/2 rounded-lg border border-gray-400 px-2 py-1 focus:outline-none"
              />
            </div>
          </FilterBlock>

          <FilterBlock title="Discount">
            <FilterItem label="5 % or more" name="discount" />
            <FilterItem label="10 % or more" name="discount" />
            <FilterItem label="25 % or more" name="discount" />
            <FilterItem label="50 % or more" name="discount" />
            <FilterItem label="70 % or more" name="discount" />
          </FilterBlock>

          <FilterBlock title="Rating">
            <FilterItem label="5 star" name="rating" />
            <FilterItem label="4 star or above" name="rating" />
            <FilterItem label="3 star or above" name="rating" />
            <FilterItem label="2 star or above" name="rating" />
            <FilterItem label="1 star or above" name="rating" />
          </FilterBlock>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex flex-col md:flex-row items-start">

          {/* ================= DESKTOP FILTER SIDEBAR ================= */}
          <aside className="hidden xl:block w-60 text-[14px] font-semibold self-start ml-12">

            <FilterBlock title="Categories" showClear>
              <FilterItem label="Nazirah/Tajweed-ul-Quran" name="category" />
              <FilterItem label="Fahm-ul-Quran" name="category" />
              <FilterItem label="Character Building" name="category" />
              <FilterItem label="Best Sellers" name="category" />
            </FilterBlock>

            <FilterBlock title="Price">
              <div className="flex gap-2 text-[11px] text-gray-700">
                <input
                  type="number"
                  placeholder="Min: 200 PKR"
                  className="w-1/2 rounded-lg border border-gray-400 px-2 py-1 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max: 2000 PKR"
                  className="w-1/2 rounded-lg border border-gray-400 px-2 py-1 focus:outline-none"
                />
              </div>
            </FilterBlock>

            <FilterBlock title="Discount">
              <FilterItem label="5 % or more" name="discount" />
              <FilterItem label="10 % or more" name="discount" />
              <FilterItem label="25 % or more" name="discount" />
              <FilterItem label="50 % or more" name="discount" />
              <FilterItem label="70 % or more" name="discount" />
            </FilterBlock>

            <FilterBlock title="Rating">
              <FilterItem label="5 star" name="rating" />
              <FilterItem label="4 star or above" name="rating" />
              <FilterItem label="3 star or above" name="rating" />
              <FilterItem label="2 star or above" name="rating" />
              <FilterItem label="1 star or above" name="rating" />
            </FilterBlock>
          </aside>

          {/* ================= CONTENT ================= */}
          <div className="flex-1 xl:-ml-24">

            {/* BEST SELLERS */}
            <div className="text-center mb-10">
              <Heading textSize="text-[34px] sm:text-[36px] md:text-[38px]">
                Our Best Sellers
              </Heading>
              <div className="flex justify-center mt-4">
                <Image src="/Book 1.png" alt="Best Sellers" width={450} height={280} />
              </div>
            </div>

            {/* NAZIRAH */}
            <div className="text-center mb-10">
              <Heading textSize="text-[34px] sm:text-[36px] md:text-[38px]">
                Nazirah Quran
              </Heading>
              <div className="flex justify-center mt-4">
                <Image src="/Nazirah Quran.png" alt="Nazirah Quran" width={450} height={280} />
              </div>
            </div>

            {/* FAHM */}
            <div className="text-center mb-10">
              <Heading textSize="text-[34px] sm:text-[36px] md:text-[38px]">
                Fahm-ul-Quran
              </Heading>
              <div className="flex justify-center mt-4">
                <Image src="/Fahm Ul Quran.png" alt="Fahm-ul-Quran" width={450} height={280} />
              </div>
            </div>

            {/* CHARACTER */}
            <div className="text-center">
              <Heading textSize="text-[34px] sm:text-[36px] md:text-[38px]">
                Character Building
              </Heading>
              <div className="flex justify-center mt-4">
                <Image src="/Character Building.png" alt="Character Building" width={450} height={280} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= FILTER COMPONENTS ================= */

function FilterBlock({
  title,
  children,
  showClear = false,
}: {
  title: string
  children: React.ReactNode
  showClear?: boolean
}) {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="flex items-center justify-between mb-1">
        <Text className="font-semibold text-[12px]">{title}</Text>
        {showClear && <button className="text-[10px] font-bold">Clear</button>}
      </div>
      <div className="space-y-1.5">{children}</div>
      <hr className="border-black border-t-2 mt-2" />
    </div>
  )
}

function FilterItem({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex items-center gap-2 text-gray-700 text-[11px] cursor-pointer">
      <input
        type="radio"
        name={name}
        className="
          relative
          appearance-none
          w-3 h-3
          rounded-full
          bg-gray-400
          checked:after:content-['']
          checked:after:absolute
          checked:after:top-1/2
          checked:after:left-1/2
          checked:after:-translate-x-1/2
          checked:after:-translate-y-1/2
          checked:after:w-1.5
          checked:after:h-1.5
          checked:after:rounded-full
          checked:after:bg-black
        "
      />
      {label}
    </label>
  )
}
