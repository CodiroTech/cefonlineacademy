'use client'

import PhoneInput, { type Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { cn } from '@/lib/utils'

type PhoneInputWrapperProps = {
  value?: string
  onChange?: (value: string | undefined) => void
  onCountryChange?: (country: Country) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function PhoneInputWrapper({
  value,
  onChange,
  onCountryChange,
  placeholder = 'Enter phone number',
  disabled,
  className,
}: PhoneInputWrapperProps) {
  return (
    <PhoneInput
      international
      defaultCountry="PK"
      value={value}
      onChange={(v) => onChange?.(v ?? '')}
      onCountryChange={onCountryChange}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        'flex rounded-lg border border-gray-300 overflow-hidden',
        'focus-within:ring-2 focus-within:ring-[#065D80]/50 focus-within:border-[#065D80]',
        'transition-colors',
        className
      )}
      numberInputProps={{
        className:
          'w-full border-0 rounded-r-lg px-3 py-2 text-sm focus:ring-0 focus:outline-none',
      }}
      countrySelectProps={{
        className: 'border-0 bg-gray-50 px-2 py-2 text-sm',
      }}
    />
  )
}
