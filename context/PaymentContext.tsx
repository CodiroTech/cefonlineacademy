'use client'

import React, { createContext, useContext, useState } from 'react'
import { DONATION_ENDPOINTS } from '@/lib/api/donations'
import { useToast } from '@/context/ToastContext'

interface PaymentFormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  company_name: string
  country: string
  address: string
  area: string
  city: string
  postal_code: string
}

interface PaymentContextType {
  formData: PaymentFormData
  updateField: (field: keyof PaymentFormData, value: string) => void
  isProcessing: boolean
  initiatePayment: (cartSessionId: string, method: 'payfast' | 'meezan_bank') => Promise<void>
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<PaymentFormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_details')
      if (saved) {
        try { return JSON.parse(saved) } catch { /* ignore */ }
      }
    }
    return {
      first_name: '', last_name: '', country: 'Pakistan', phone: '',
      email: '', company_name: '', address: '', area: '', city: '', postal_code: '',
    }
  })

  const updateField = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_details', JSON.stringify(newData))
      }
      return newData
    })
  }

  const initiatePayment = async (cartSessionId: string, method: 'payfast' | 'meezan_bank') => {
    if (!formData.first_name || !formData.email || !formData.phone) {
      showToast('Please fill in all required fields (*)', 'error')
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch(DONATION_ENDPOINTS.CHECKOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cart_session_id: cartSessionId,
          payment_method: method === 'payfast' ? 'faysal_bank' : 'meezan_bank',
          success_url: `${window.location.origin}/payment-status/success/${cartSessionId}`,
          cancel_url: `${window.location.origin}/payment-status/failure/${cartSessionId}`,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Payment initiation failed.')

      if (method === 'meezan_bank') {
        const meezanData = Array.isArray(data) ? data[0] : data
        if (meezanData?.meezan_payment_flow_redirect_url) {
          window.location.href = meezanData.meezan_payment_flow_redirect_url
        } else {
          showToast('Meezan redirect URL not found in API response', 'error')
        }
      } else {
        const payfastData = Array.isArray(data) ? data[0] : data
        if (payfastData['frontend_form-action_url']) {
          const form = document.createElement('form')
          form.method = 'POST'
          form.action = payfastData['frontend_form-action_url']
          Object.entries(payfastData['form_required_parameters_values']).forEach(([key, value]) => {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = String(value)
            form.appendChild(input)
          })
          document.body.appendChild(form)
          form.submit()
        } else {
          showToast('PayFast configuration not found', 'error')
        }
      }
    } catch (error: any) {
      showToast(error.message || 'Server error. Check your connection.', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <PaymentContext.Provider value={{ formData, updateField, isProcessing, initiatePayment }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayment = () => {
  const context = useContext(PaymentContext)
  if (!context) throw new Error('usePayment must be used within PaymentProvider')
  return context
}
