'use client'

import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useDonationCart } from '@/context/DonationCartContext'

interface DonationSubtotalProps {
  onOpenCart?: () => void
}

export function DonationSubtotal({ onOpenCart }: DonationSubtotalProps) {
  const { cart } = useDonationCart()
  const collectiveSubtotal = cart.reduce((sum, item) => sum + item.amount * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={`w-full px-2 lg:px-10 mb-2 relative ${onOpenCart ? 'z-10' : '-z-50'}`}>
      <div
        role={onOpenCart ? 'button' : undefined}
        tabIndex={onOpenCart ? 0 : undefined}
        onClick={onOpenCart}
        onKeyDown={onOpenCart ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenCart() } } : undefined}
        className={`bg-gray-100 container pt-7 pb-8 h-12 mx-auto rounded-4xl flex items-center justify-end px-10 ${onOpenCart ? 'cursor-pointer hover:opacity-90 transition-opacity select-none' : ''}`}
      >
        <div className="flex items-center gap-1 sm:px-24 lg:px-26 xl:px-26 2xl:px-28 text-[#414141] font-medium text-md leading-none pointer-events-none">
          <div className="relative inline-flex">
            <ShoppingCart className="size-7 md:size-8 lg:size-10 text-[#065D80]" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-[#065D80] text-white text-xs font-bold"
                aria-label={`${itemCount} items in cart`}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
          <span className="flex items-center mt-2 h-full">PKR {collectiveSubtotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default DonationSubtotal
