'use client'

import { useState } from 'react'
import { Heading } from '@/components/common/heading'
import { useForm } from 'react-hook-form'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa'

type FormValues = {
  fullName: string
  phone: string
  email: string
  message: string
}

type SocialUrls = {
  'facebook-url'?: string
  'insta-url'?: string
  'youtube-url'?: string
  'linkedin-url'?: string
}

const socialConfig = [
  { key: 'facebook-url' as const, Icon: FaFacebookF },
  { key: 'insta-url' as const, Icon: FaInstagram },
  { key: 'youtube-url' as const, Icon: FaYoutube },
  { key: 'linkedin-url' as const, Icon: FaLinkedinIn },
]

export default function ContactSection({ socialUrls }: { socialUrls?: SocialUrls }) {
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const onSubmit = async (data: FormValues) => {
    if (
      !data.fullName?.trim() ||
      !data.phone?.trim() ||
      !data.email?.trim() ||
      !data.message?.trim()
    ) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          message: data.message.trim(),
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setMessage({ type: 'error', text: result.message ?? 'Failed to send message' })
        setTimeout(() => setMessage(null), 3000)
        return
      }

      setMessage({ type: 'success', text: result.message ?? 'Message sent successfully!' })
      reset({
        fullName: '',
        phone: '',
        email: '',
        message: '',
      })
      setTimeout(() => setMessage(null), 3000)
    } catch {
      setMessage({ type: 'error', text: 'Error sending message' })
      setTimeout(() => setMessage(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full py-20 font-poppins">
      <div className="text-center justify-center mb-10">
        <Heading
          textSize="text-3xl lg:text-[2.5rem] font-bold"
          leading="leading-tight"
        >
          For Further Queries
        </Heading>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start">
        {/* ================= LEFT FORM ================= */}
        <div className="lg:col-span-7">
          <h2 className="text-[#065D80] text-2xl font-bold mb-2">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-[#8DC63F] font-semibold">
                  Full Name
                </label>
                <input
                  {...register('fullName', { required: true })}
                  className="w-full rounded-xl border border-gray-300 bg-[#F1F6E8] px-4 py-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#8DC63F] font-semibold">
                  Phone Number
                </label>
                <input
                  {...register('phone', { required: true })}
                  className="w-full rounded-xl border border-gray-300 bg-[#F1F6E8] px-4 py-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#8DC63F] font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full rounded-xl border border-gray-300 bg-[#F1F6E8] px-4 py-3 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[#8DC63F] font-semibold">
                Your Message
              </label>
              <textarea
                rows={6}
                {...register('message', { required: true })}
                className="w-full rounded-xl border border-gray-300 bg-[#F1F6E8] px-4 py-4 focus:outline-none resize-none"
              />
            </div>

            {message && (
              <p
                className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
              >
                {message.text}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[#065D80] px-7 py-2 text-white font-medium hover:opacity-90 hover:bg-white hover:text-[#065D80] border-2 cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* ================= RIGHT SOCIAL CARD ================= */}
        <div className="lg:col-span-5 mt-16">
          <div className="bg-gray-100 rounded-[40px] p-10 sm:p-14 lg:p-19 flex flex-col items-center justify-center">
            <h3 className="text-[#065D80] text-xl font-semibold mb-8">
              Follow Us
            </h3>

            {/* Social links from backend (same as header nav) */}
            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
              {socialConfig
                .filter(({ key }) => socialUrls?.[key]?.trim())
                .map(({ key, Icon }) => {
                  const url = socialUrls?.[key]?.trim()
                  if (!url) return null
                  return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#8DC63F] flex items-center justify-center text-white text-lg sm:text-xl cursor-pointer hover:scale-105 transition"
                    aria-label={key.replace('-url', '')}
                  >
                    <Icon />
                  </a>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
