import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, value, onChange, placeholder, type, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <input
          type={type}
          className={cn(
            'flex w-full h-16 rounded-md border border-gray-400 bg-white px-4 pt-6 pb-2 text-sm shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065D80]/30 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder=" "
          {...props}
        />
        <span className="absolute top-2 left-4 text-gray-500 text-xs leading-tight pointer-events-none transition-all">
          {placeholder}
        </span>
      </div>
    )
  },
)
FormInput.displayName = 'FormInput'

export { FormInput }
