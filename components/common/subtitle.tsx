'use client'

import React from 'react'

type SubtitleProps = {
  className?: string
  children: React.ReactNode
}

export const Subtitle = ({ className = '', children }: SubtitleProps) => {
  return (
    <span
      className={`block text-center font-semibold text-[#414141] ${className}`}
    >
      {children}
    </span>
  )
}
