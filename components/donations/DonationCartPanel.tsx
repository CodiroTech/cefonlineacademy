'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Loader2 } from 'lucide-react'
import { Heading } from '@/components/common/heading'
import { useDonationCart } from '@/context/DonationCartContext'
import { useToast } from '@/context/ToastContext'

const GRADIENT_BORDER = {
  background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #085c7c 0%, #88bc44 100%) border-box',
  border: '2px solid transparent',
}

export function DonationCartPanel() {
  const { cart, removeFromCart, subtotal, cartActionLoading } = useDonationCart()
  const { showToast } = useToast()
  const isLoadingItem = (id: number) => cartActionLoading?.id === id
  const [customMessage, setCustomMessage] = useState('')

  return (
    <aside className="max-w-3xl w-full mx-auto p-0 rounded-xl border-2 border-gray-200 bg-white">
      <section className="px-4 sm:px-6 py-4 space-y-4 h-[24rem] sm:max-h-[16rem] overflow-y-auto">
        {cart.map((item) => (
          <article key={item.id}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 leading-tight">{item.title}</h3>
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase">{item.paymentFrequency} &bull; {item.donationType}</span>
                  <span className="font-bold text-[#5a8ba8] text-sm sm:text-base">PKR {item.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-0">
                <div className="flex items-center gap-1 relative">
                  {isLoadingItem(item.id) && (
                    <div className="absolute inset-0 rounded-md bg-white/80 flex items-center justify-center z-10">
                      <Loader2 className="w-4 h-4 animate-spin text-[#065D80]" />
                    </div>
                  )}
                  <button type="button" disabled={isLoadingItem(item.id)} onClick={() => removeFromCart(item.id)}
                    className="w-6 h-6 rounded text-red-500 hover:bg-red-50 flex items-center justify-center cursor-pointer disabled:opacity-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Trash2 size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Cart is Empty</h3>
            <p className="text-sm text-gray-500 mt-1">You haven&apos;t added any donations yet.</p>
          </div>
        )}
      </section>

      <section className="px-2 sm:px-6">
        <textarea style={GRADIENT_BORDER} value={customMessage} onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Add a custom message"
          className="w-full h-20 p-3 rounded-lg text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#5a8ba8]/30" />
      </section>

      <footer className="px-2 sm:px-6 py-3 bg-[#f8fbfc] rounded-lg mx-2 sm:mx-6 mb-2 sm:mb-4" style={GRADIENT_BORDER}>
        <div className="flex items-center justify-between sm:mb-4 pb-3">
          <span className="font-bold text-lg text-gray-800">
            <Heading textSize="text-sm sm:text-md md:text-lg lg:text-xl">Donations Subtotal</Heading>
          </span>
          <span className="font-bold text-sm sm:text-md lg:text-lg text-[#065D80]">PKR {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex gap-3 justify-start w-full max-w-xs">
          <Link href="/donations" className="flex-1 cursor-pointer">
            <button className="text-sm sm:text-md cursor-pointer xl:text-lg text-white bg-[#88bc44] rounded-lg font-bold py-3 px-4 hover:bg-[#88bc44]/90 w-full">Add Another</button>
          </Link>
          {cart.length > 0 && (
            <button type="button"
              className="text-sm sm:text-md cursor-pointer xl:text-lg bg-red-600 hover:bg-white hover:text-red-600 border border-red-600 text-white rounded-lg font-bold py-3 px-4 transition-colors"
              onClick={() => { cart.forEach((item) => removeFromCart(item.id)); showToast('Cart emptied', 'success') }}>
              Empty Cart
            </button>
          )}
        </div>
      </footer>
    </aside>
  )
}
