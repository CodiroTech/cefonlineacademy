'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CountryItem = { country_id: number; country_name: string }

type CountrySelectProps = {
  countries: CountryItem[]
  value: number | ''
  onChange: (countryId: number | '') => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function CountrySelect({
  countries,
  value,
  onChange,
  placeholder = 'Select country',
  className,
  disabled = false,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = countries.find((c) => c.country_id === value)
  const displayValue = selected?.country_name ?? ''

  const filtered = query.trim()
    ? countries.filter((c) =>
        c.country_name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : countries

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setHighlightIndex(0)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, close])

  useEffect(() => {
    if (!open || filtered.length === 0) return
    setHighlightIndex(0)
  }, [open, query])

  useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.querySelector(`[data-index="${highlightIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex, open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'Escape') {
      close()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((i) => (i + 1) % Math.max(1, filtered.length))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length))
      return
    }
    if (e.key === 'Enter' && filtered[highlightIndex]) {
      e.preventDefault()
      onChange(filtered[highlightIndex].country_id)
      close()
    }
  }

  const handleSelect = (c: CountryItem) => {
    onChange(c.country_id)
    close()
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onKeyDown={handleKeyDown}
    >
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="country-listbox"
        aria-activedescendant={open ? `country-option-${highlightIndex}` : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-[#065D80]/50 focus:border-[#065D80]',
          'cursor-pointer transition-colors',
          disabled && 'cursor-not-allowed opacity-50',
          open && 'border-[#065D80] ring-2 ring-[#065D80]/20'
        )}
      >
        <span className={cn(!displayValue && 'text-gray-500')}>
          {displayValue || placeholder}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-gray-500 transition-transform', open && 'rotate-180')}
        />
      </div>

      {open && (
        <div
          id="country-listbox"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          <div className="border-b border-gray-100 p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries..."
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm focus:border-[#065D80] focus:outline-none focus:ring-1 focus:ring-[#065D80]/50"
              autoFocus
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
          <ul ref={listRef} className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-500">No countries found</li>
            ) : (
              filtered.map((c, i) => (
                <li
                  key={c.country_id}
                  data-index={i}
                  id={`country-option-${i}`}
                  role="option"
                  aria-selected={value === c.country_id}
                  onClick={() => handleSelect(c)}
                  className={cn(
                    'cursor-pointer px-3 py-2 text-sm transition-colors',
                    i === highlightIndex && 'bg-[#065D80]/10',
                    value === c.country_id && 'bg-[#065D80]/15 font-medium',
                    'hover:bg-gray-100'
                  )}
                >
                  {c.country_name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
