'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { setAuthCookie } from '@/lib/auth-cookie'

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://dev.cefonlineacademy.com/api'
const LOGIN_URL = `${BACKEND_BASE.replace(/\/$/, '')}/login`

type LoginPopupProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  portalUrl: string
  stayOnPage?: boolean
  onJoinNow?: () => void
}

export function LoginPopup({ open, onOpenChange, portalUrl, stayOnPage = false, onJoinNow }: LoginPopupProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || 'Invalid email or password.')
        setLoading(false)
        return
      }
      if (data.token && data.role != null) {
        setAuthCookie(data.token, String(data.role))
        onOpenChange(false)
        if (stayOnPage) {
          router.refresh()
          return
        }
        const base = portalUrl.replace(/#.*$/, '')
        const hash = `token=${encodeURIComponent(data.token)}&role=${encodeURIComponent(String(data.role))}`
        window.location.href = `${base}#${hash}`
        return
      }
      setError('Login failed. Please try again.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-md p-6 gap-4 rounded-2xl"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">Student Login</DialogTitle>
        <h2 className="text-lg font-bold text-[#065D80]">Student Login</h2>
        <p className="text-sm text-gray-600">Sign in to access your dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-800 mb-1">
              Email or Phone
            </label>
            <input
              id="login-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#065D80]"
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-800 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#065D80] pr-10"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-2.5 bg-[#065D80] hover:bg-[#054a66] text-white disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
          {onJoinNow && (
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false)
                  onJoinNow()
                }}
                className="font-medium text-[#065D80] hover:underline cursor-pointer"
              >
                Join Now
              </button>
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
