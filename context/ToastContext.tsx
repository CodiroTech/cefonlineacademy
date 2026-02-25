'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error'
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

function Toast({ id, message, type, onClose }: ToastItem & { onClose: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3500)
    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div
      className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white transition-all animate-in slide-in-from-right ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {message}
    </div>
  )
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-[200]">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
