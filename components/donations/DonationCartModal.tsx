'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Trash2, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Heading } from '@/components/common/heading'
import { useDonationCart } from '@/context/DonationCartContext'

interface DonationCartModalProps {
  trigger?: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const GRADIENT_BORDER = {
  background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #085c7c 0%, #88bc44 100%) border-box',
  border: '2px solid transparent',
}

export function DonationCartModal({ trigger, isOpen, onOpenChange }: DonationCartModalProps) {
  const { cart, removeFromCart, subtotal, clearCart, cartActionLoading } = useDonationCart()
  const isLoadingItem = (id: number) => cartActionLoading?.id === id
  const [customMessage, setCustomMessage] = useState('')

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger != null && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-md w-[95%] sm:w-full mx-auto p-0 rounded-xl border-2 border-gray-200 bg-white overflow-hidden">
        <div className="p-4 sm:p-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              <Heading textSize="text-xl sm:text-2xl">Your Donations</Heading>
            </DialogTitle>
            {cart.length > 0 && (
              <button type="button" onClick={clearCart}
                className="flex items-center gap-2 mr-6 lg:mr-8 px-3 py-1.5 sm:mr-4 text-xs lg:text-sm font-semibold rounded-md bg-red-600 text-white cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition-colors">
                <Trash2 size={14} /><span>Empty Cart</span>
              </button>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 max-h-[40vh] sm:max-h-[30vh] overflow-y-auto">
          <div className="space-y-6 sm:space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex flex-row gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-tight">{item.title}</h3>
                    <div className="flex flex-col mt-1">
                      <span className="text-[10px] sm:text-xs text-gray-500 uppercase">{item.paymentFrequency} &bull; {item.donationType}</span>
                      <span className="font-bold text-[#5a8ba8] text-sm sm:text-base">PKR {item.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 w-fit mt-2 relative">
                      {isLoadingItem(item.id) && (
                        <div className="absolute inset-0 rounded-md bg-white/80 flex items-center justify-center z-10">
                          <Loader2 className="w-5 h-5 animate-spin text-[#065D80]" />
                        </div>
                      )}
                      <button type="button" disabled={isLoadingItem(item.id)} onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 sm:w-6 sm:h-6 rounded text-red-500 hover:bg-red-50 flex items-center justify-center cursor-pointer disabled:opacity-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
          </div>
        </div>

        <div className="px-4 sm:px-6 mb-2">
          <textarea style={GRADIENT_BORDER} value={customMessage} onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Add a custom message"
            className="w-full h-18 sm:h-24 p-3 rounded-lg text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-gray-200" />
        </div>

        <div className="px-6 py-3 bg-[#f8fbfc] rounded-lg mx-4 mb-4 lg:mx-6 lg:mb-6" style={GRADIENT_BORDER}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-gray-800"><Heading textSize="text-lg">Donations Subtotal</Heading></span>
            <span className="font-bold text-lg text-[#065D80]">PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button onClick={() => onOpenChange?.(false)}
              className="w-full sm:flex-1 cursor-pointer text-white bg-[#88bc44] rounded-lg font-bold py-3 text-sm order-2 sm:order-1 hover:bg-[#88bc44]/90">
              Add Another
            </button>
            {cart.length > 0 ? (
              <Link href="/checkout" className="w-full sm:flex-1 order-1 sm:order-2" onClick={() => onOpenChange?.(false)}>
                <button className="w-full cursor-pointer text-white bg-[#065D80] rounded-lg font-bold py-3 text-sm hover:bg-[#065D80]/90">Checkout</button>
              </Link>
            ) : (
              <div className="w-full sm:flex-1 order-1 sm:order-2">
                <button disabled className="w-full rounded-lg font-bold py-3 text-sm cursor-not-allowed opacity-60 bg-[#065D80] text-white">Checkout</button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
