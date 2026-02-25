'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { DonationCartItem } from '@/lib/types/donations'
import { DONATION_ENDPOINTS } from '@/lib/api/donations'
import { useToast } from '@/context/ToastContext'

const getOrCreateSessionId = () => {
  if (typeof window === 'undefined') return '00000'
  let id = localStorage.getItem('donationSessionId')
  if (!id) {
    id = Math.floor(10000 + Math.random() * 90000).toString()
    localStorage.setItem('donationSessionId', id)
  }
  return id
}

export type CartActionLoading = { type: 'update' | 'remove'; id: number } | null

interface DonationCartContextType {
  cart: DonationCartItem[]
  sessionId: string
  addToCart: (item: DonationCartItem) => void
  removeFromCart: (id: number) => Promise<void>
  updateQuantity: (id: number, quantity: number, message?: string) => Promise<boolean>
  clearCart: () => void
  subtotal: number
  isLoaded: boolean
  cartActionLoading: CartActionLoading
  isCartModalOpen: boolean
  setCartModalOpen: (open: boolean) => void
}

const DonationCartContext = createContext<DonationCartContextType | undefined>(undefined)

export const DonationCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<DonationCartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [sessionId] = useState(getOrCreateSessionId)
  const [cartActionLoading, setCartActionLoading] = useState<CartActionLoading>(null)
  const [isCartModalOpen, setCartModalOpen] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchRemoteCart = async () => {
      try {
        const response = await fetch(DONATION_ENDPOINTS.CART_VIEW(sessionId))
        const data = await response.json()
        if (data.success && data.cart_list) {
          const mappedCart: DonationCartItem[] = data.cart_list.map((item: any) => ({
            id: Number(item.sr_no),
            title: item.item_name,
            amount: parseFloat(item.main_price),
            quantity: item.quantity,
            paymentFrequency: item.cycle,
            donationType: item.type,
            sponsor_type: item.sponsor_type,
          }))
          setCart(mappedCart)
        }
      } catch {
        // Cart might not exist yet
      } finally {
        setIsLoaded(true)
      }
    }
    fetchRemoteCart()
  }, [sessionId])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('donationCart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const hashCode = (str: string) =>
    str.split('').reduce((prev, curr) => (prev * 31 + curr.charCodeAt(0)) >>> 0, 0)

  const addToCart = async (item: DonationCartItem) => {
    const payload = {
      cart_session_id: sessionId,
      item_id: hashCode(`${item.title}-${item.paymentFrequency}-${item.donationType}-${item.sponsor_type}`),
      item_name: item.title,
      item_price: item.amount.toString(),
      cycle: item.paymentFrequency,
      type: item.donationType,
      sponsor_type: item.sponsor_type,
    }

    try {
      const response = await fetch(DONATION_ENDPOINTS.CART_ADD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (data.success) {
        const viewResponse = await fetch(DONATION_ENDPOINTS.CART_VIEW(sessionId))
        const viewData = await viewResponse.json()
        if (viewData.success) {
          const mappedCart: DonationCartItem[] = viewData.cart_list.map((apiItem: any) => ({
            id: Number(apiItem.sr_no),
            title: apiItem.item_name,
            amount: parseFloat(apiItem.main_price),
            quantity: apiItem.quantity,
            paymentFrequency: apiItem.cycle,
            donationType: apiItem.type,
            image: item.image,
          }))
          setCart(mappedCart)
        }
      }
    } catch {
      throw new Error('Could not sync with server')
    }
  }

  const removeFromCart = async (id: number) => {
    const itemToDelete = cart.find((i) => i.id === id)
    if (!itemToDelete) return

    setCartActionLoading({ type: 'remove', id })
    const payload = {
      cart_session_id: sessionId,
      item_name: itemToDelete.title,
      item_price: itemToDelete.amount.toString(),
      cycle: itemToDelete.paymentFrequency,
      type: itemToDelete.donationType,
      sponsor_type: itemToDelete.sponsor_type,
    }

    try {
      const response = await fetch(DONATION_ENDPOINTS.CART_DELETE_ITEM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (data.success) {
        setCart((prev) => prev.filter((i) => i.id !== id))
      } else {
        showToast('Failed to remove item from server', 'error')
      }
    } catch {
      showToast('Error removing item', 'error')
    } finally {
      setCartActionLoading(null)
    }
  }

  const updateQuantity = async (id: number, newQuantity: number, customMessage?: string): Promise<boolean> => {
    const itemToUpdate = cart.find((i) => i.id === id)
    if (!itemToUpdate) return false

    setCartActionLoading({ type: 'update', id })
    const isIncrement = newQuantity > itemToUpdate.quantity ? 1 : 0
    const payload = {
      cart_session_id: sessionId,
      item_name: itemToUpdate.title,
      item_price: itemToUpdate.amount.toString(),
      cycle: itemToUpdate.paymentFrequency,
      type: itemToUpdate.donationType,
      is_increment: isIncrement,
      custom_message: customMessage || '',
    }

    try {
      const response = await fetch(DONATION_ENDPOINTS.CART_UPDATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (data.success) {
        setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i)))
        return true
      }
      return false
    } catch {
      showToast('Failed to update', 'error')
      return false
    } finally {
      setCartActionLoading(null)
    }
  }

  const clearCart = useCallback(async () => {
    if (cart.length === 0) return
    const payload = { cart_session_id: sessionId }

    try {
      const response = await fetch(DONATION_ENDPOINTS.CART_DELETE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (data.success) {
        setCart([])
        localStorage.removeItem('donationCart')
        showToast('Cart cleared successfully', 'success')
      } else {
        showToast('Failed to clear cart on server', 'error')
      }
    } catch {
      showToast('Error connecting to server', 'error')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length, sessionId])

  const subtotal = cart.reduce((sum, i) => sum + i.amount * i.quantity, 0)

  return (
    <DonationCartContext.Provider
      value={{
        cart, sessionId, addToCart, removeFromCart, updateQuantity,
        clearCart, subtotal, isLoaded, cartActionLoading,
        isCartModalOpen, setCartModalOpen,
      }}
    >
      {children}
    </DonationCartContext.Provider>
  )
}

export const useDonationCart = () => {
  const context = useContext(DonationCartContext)
  if (!context) throw new Error('useDonationCart must be used within DonationCartProvider')
  return context
}
