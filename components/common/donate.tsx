'use client'

import { useState } from 'react'
import Image from 'next/image'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/common/heading'

export const Donate = () => {
  const [donationType, setDonationType] = useState('general')
  const [purpose, setPurpose] = useState('most')
  const [currency, setCurrency] = useState('PKR')
  const [amount, setAmount] = useState('')
  const [donationMsg, setDonationMsg] = useState<{
    text: string
    type: 'success' | 'fail'
  } | null>(null)

  const handleDonate = () => {
    const amt = amount.trim()

    if (!amt || isNaN(Number(amt)) || Number(amt) <= 0) {
      setDonationMsg({ text: 'Please enter a valid amount', type: 'fail' })
      setTimeout(() => setDonationMsg(null), 3000)
      return
    }

    setDonationMsg({ text: 'Donation Submitted (Demo)', type: 'success' })
    setAmount('')
    setTimeout(() => setDonationMsg(null), 3000)
  }

  return (
    <section className="w-full bg-[#EAF7E5] py-6">
      <div className="container mx-auto w-[90%]">

        {/* ================= Desktop / Tablet ================= */}
        <div className="hidden xl:flex items-center justify-center gap-2 w-full">

          {/* Heart + Heading */}
          <div className="flex items-center gap-2 shrink-0">
            <Image
              src="/heart.svg"
              alt="heart"
              width={48}
              height={48}
              className="w-7 h-7 lg:w-8 lg:h-8 xl:w-12 xl:h-12"
            />
            <Heading textSize="text-lg md:text-2xl lg:text-[1.5rem]">
              QUICK DONATE
            </Heading>
          </div>

          {/* Donation Type */}
          <Select value={donationType} onValueChange={setDonationType}>
            <SelectTrigger className="h-12 bg-white w-46 text-[#414141] [&>svg]:text-[#8DC63F]">
              <SelectValue placeholder="General Donation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Donation</SelectItem>
              <SelectItem value="zakat">Zakat</SelectItem>
              <SelectItem value="sadqah">Sadqah</SelectItem>
            </SelectContent>
          </Select>

          {/* Purpose */}
          <Select value={purpose} onValueChange={setPurpose}>
            <SelectTrigger className="h-12 bg-white w-56 text-[#414141] [&>svg]:text-[#8DC63F]">
              <SelectValue placeholder="Wherever Most Needed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most">Wherever Most Needed</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>

          {/* Currency + Amount */}
          <div className="flex items-center bg-white rounded-xl h-12 overflow-hidden w-55">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-12 w-14 border-0 rounded-none text-sm text-[#414141] [&>svg]:text-[#8DC63F]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">PKR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-0 rounded-none focus-visible:ring-0 text-sm"
            />
          </div>

          {/* Button */}
          <Button variant="danger" onClick={handleDonate} className="h-12 px-5">
            Donate Now
          </Button>
        </div>

        {/* Message */}
        {donationMsg && (
          <p
            className={`text-sm text-center mt-3 ${
              donationMsg.type === 'success'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {donationMsg.text}
          </p>
        )}

        {/* ================= Mobile ================= */}
        <div className="block xl:hidden space-y-4 mt-6">

          <div className="flex items-center justify-center gap-2">
            <Image
              src="/heart.svg"
              alt="heart"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <Heading textSize="text-2xl">QUICK DONATE</Heading>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select value={donationType} onValueChange={setDonationType}>
              <SelectTrigger className="h-12 bg-white text-sm text-gray-500 [&>svg]:text-[#8BC34A]">
                <SelectValue placeholder="General Donation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Donation</SelectItem>
                <SelectItem value="zakat">Zakat</SelectItem>
                <SelectItem value="sadqah">Sadqah</SelectItem>
              </SelectContent>
            </Select>

            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger className="h-12 bg-white text-sm text-gray-500 [&>svg]:text-[#8BC34A]">
                <SelectValue placeholder="Wherever Most Needed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most">Wherever Most Needed</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-12 bg-white text-sm text-gray-500 [&>svg]:text-[#8BC34A]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">PKR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant="danger"
              onClick={handleDonate}
              className="w-1/2 h-12"
            >
              Donate Now
            </Button>
          </div>

          {donationMsg && (
            <p
              className={`text-sm text-center ${
                donationMsg.type === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {donationMsg.text}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
