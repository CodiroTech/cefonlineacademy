'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/** Static list of countries for donation/contact forms (alphabetical). */
const COUNTRY_NAMES = [
  'Afghanistan', 'Australia', 'Bangladesh', 'Canada', 'China', 'Egypt', 'Germany',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Japan', 'Jordan', 'Kuwait', 'Malaysia',
  'Nigeria', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Saudi Arabia',
  'South Africa', 'Sri Lanka', 'Syria', 'Thailand', 'Turkey', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Yemen', 'Other',
]

type CountryDropdownProps = {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function CountryDropdown({
  placeholder = 'Select Country / Region *',
  value,
  onValueChange,
  className,
}: CountryDropdownProps) {
  return (
    <div className={cn('w-full', className)}>
      <Select value={value ?? ''} onValueChange={(v) => onValueChange?.(v)}>
        <SelectTrigger className="h-12 rounded-xl border border-[#d3d3d3] bg-[#e8f4e8] text-left">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {COUNTRY_NAMES.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
