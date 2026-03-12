'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heading } from '@/components/common/heading'
import { Button } from '@/components/ui/button'
import { sanitizeApiContent } from '@/lib/sanitizeApiContent'
import type { DonationFAQResponse } from '@/lib/api/donations'

const HEADLESS_BASE = process.env.NEXT_PUBLIC_HEADLESS_BASE_URL || ''

interface Props {
  data: DonationFAQResponse | null
}

export default function DonationQueriesClient({ data }: Props) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    message: '',
  })

  const faqData = data?.['donation-faqs'] || []
  const headerImage =
    typeof data?.['header-image'] === 'string'
      ? data['header-image']
      : data?.['header-image']?.full_url || ''

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.message) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }
    setSubmitting(true)
    setSubmitStatus(null)
    try {
      const res = await fetch(`${HEADLESS_BASE}/queries-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'query-name': formData.fullName,
          'query-phone': formData.phoneNumber,
          email: formData.emailAddress,
          message: formData.message,
          'query-page-type': 'donation-queries',
        }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitStatus('success')
      setFormData({ fullName: '', phoneNumber: '', emailAddress: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 3000)
    }
  }

  const descriptionHtml = data?.description
    ? sanitizeApiContent(
        (data.description || '').replace(
          /Donation/g,
          '<a href="/donations" class="font-bold underline cursor-pointer">Donation</a>',
        ),
      )
    : ''

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="container mx-auto w-[90%] sm:w-[85%] py-6 sm:py-8">
        <div className="rounded-3xl overflow-hidden bg-card shadow-sm flex flex-col md:flex-row items-center gap-6 p-4 sm:p-6">
          {headerImage && (
            <div className="relative w-full md:w-2/5 aspect-[4/3] max-h-64 md:max-h-72 shrink-0">
              <Image
                src={headerImage}
                alt="Donation Queries"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-primary">
              Donation Queries
            </h1>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="w-[90%] sm:w-[80%] lg:w-[80%] mx-auto text-left sm:text-center py-8">
        {data?.title && (
          <Heading textSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            {data.title}
          </Heading>
        )}
        {descriptionHtml && (
          <div
            className="!text-sm sm:!text-md !text-[#414141] 2xl:!text-lg xl:w-[95%] sm:w-[80%] w-full mx-auto space-y-4 text-left sm:text-justify sm:[text-align-last:center] !font-medium mt-4 2xl:mt-6"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}
      </div>

      {/* FAQ */}
      <div className="w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[80%] mx-auto pb-12">
        <div className="text-center">
          <Heading textSize="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Frequently Asked Questions
          </Heading>
        </div>
        <div className="mt-4 space-y-4 text-left">
          {faqData.map((faq, index) => (
            <div
              key={faq.id ?? index}
              className="bg-[#f0f7e8] rounded-xl overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-start hover:bg-[#eaf4e0] transition-colors border border-gray-300 rounded-xl"
              >
                <span className="font-bold text-[#10637b] text-base sm:text-lg md:text-xl leading-relaxed pr-4">
                  Q: {faq.question ?? ''}
                </span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-[#10637b] flex-shrink-0 mt-1 ml-4 transition-transform duration-200 ${
                    openQuestion === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openQuestion === index && (
                <div className="px-4 sm:px-6 py-2 bg-[#f3f3f3] pb-4">
                  <p className="text-[#414141] font-medium leading-6 text-base sm:text-lg md:text-xl">
                    <span className="font-bold text-gray-800">A:</span> {faq.answer ?? ''}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ask Us form */}
      <div className="w-[90%] md:w-[70%] lg:w-[50%] xl:w-[60%] sm:px-4 mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 text-left">
          Ask Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col text-left">
              <label htmlFor="fullName" className="mb-1 font-medium text-secondary text-sm sm:text-lg 2xl:text-xl">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className="h-12 bg-[#e8f4e8] border border-[#d3d3d3] rounded-xl px-3 w-full"
                required
              />
            </div>
            <div className="flex flex-col text-left">
              <label htmlFor="phoneNumber" className="mb-1 font-medium text-secondary text-sm sm:text-lg 2xl:text-xl">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="h-12 bg-[#e8f4e8] border border-[#d3d3d3] rounded-xl px-3 w-full"
              />
            </div>
            <div className="flex flex-col text-left">
              <label htmlFor="emailAddress" className="mb-1 font-medium text-secondary text-sm sm:text-lg 2xl:text-xl">
                Email Address
              </label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="h-12 bg-[#e8f4e8] border border-[#d3d3d3] rounded-xl px-3 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="message" className="mb-1 font-medium text-secondary text-sm sm:text-lg 2xl:text-xl">
              Your Query
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 sm:p-4 bg-[#e8f4e8] border border-[#d3d3d3] rounded-xl resize-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
            />
          </div>
          <div className="text-left sm:mt-4 xl:mt-6">
            <Button type="submit" disabled={submitting} variant="primary" className="px-6 sm:px-8 py-2 sm:py-3 xl:py-5 text-sm sm:text-base lg:text-lg">
              {submitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
          {submitStatus && (
            <p className={`my-4 text-sm font-medium ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus === 'success' ? 'Query submitted successfully!' : 'Failed to submit. Please check required fields.'}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
