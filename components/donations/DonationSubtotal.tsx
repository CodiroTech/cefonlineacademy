'use client'

import React from 'react'
import { useDonationCart } from '@/context/DonationCartContext'

interface DonationSubtotalProps {
  onOpenCart?: () => void
}

export function DonationSubtotal({ onOpenCart }: DonationSubtotalProps) {
  const { cart } = useDonationCart()
  const collectiveSubtotal = cart.reduce((sum, item) => sum + item.amount * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={`w-full max-w-[1600px] mx-auto px-0 lg:px-20 mb-6 relative ${onOpenCart ? 'z-[100]' : '-z-50'}`}>
      <div
        role={onOpenCart ? 'button' : undefined}
        tabIndex={onOpenCart ? 0 : undefined}
        onClick={onOpenCart}
        onKeyDown={onOpenCart ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenCart() } } : undefined}
        className={`bg-gray-100 w-full pt-2 pb-3 h-12 rounded-full flex items-center justify-end px-10 ${onOpenCart ? 'cursor-pointer hover:opacity-90 transition-opacity select-none' : ''}`}
      >
        <div className="flex items-center gap-1 sm:px-24 lg:px-26 xl:px-26 2xl:px-28 text-[#414141] font-medium text-md leading-none pointer-events-none">
          <div className="relative inline-flex">
            <img
              src="/Coin Box-01.svg"
              alt="Cart"
              className="size-7 md:size-8 lg:size-10 object-contain align-middle"
            />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold"
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
