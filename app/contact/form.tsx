'use client'

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

export default function ContactSection() {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
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

      <div className="max-w-7xl mx-auto px-11 grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start">
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

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[#065D80] px-7 py-2 text-white font-medium hover:opacity-90 hover:bg-white hover:text-[#065D80] border-2 cursor-pointer transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* ================= RIGHT SOCIAL CARD ================= */}
        <div className="lg:col-span-5 mt-16">
          <div className="bg-gray-100 rounded-[40px] p-10 sm:p-14 lg:p-19 flex flex-col items-center justify-center">
            <h3 className="text-[#065D80] text-xl font-semibold mb-8">
              Follow Us
            </h3>

            {/* ✅ RESPONSIVE ICON ROW */}
            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
              {[
                FaFacebookF,
                FaInstagram,
                FaYoutube,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <div
                  key={index}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#8DC63F] flex items-center justify-center text-white text-lg sm:text-xl cursor-pointer hover:scale-105 transition"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
