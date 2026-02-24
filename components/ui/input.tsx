'use client'

import React from 'react'

type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
  disabled?: boolean
  required?: boolean
}

export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  name,
  disabled = false,
  required = false,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-[#414141]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 rounded-lg border border-gray-300
          text-sm text-black
          outline-none transition
          focus:border-primary focus:ring-1 focus:ring-primary
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
      />
    </div>
  )
}
