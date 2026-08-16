import React from 'react'
import type { LucideIcon } from 'lucide-react'

type AuthFieldProps = {
    icon: LucideIcon
    label: string
    name: string
    type: 'email' | 'password' | 'text'
    placeholder: string
    autoComplete?: string
    minLength?: number
    required?: boolean
}

export const AuthField = ({
    icon: Icon,
    label,
    name,
    type,
    placeholder,
    autoComplete,
    minLength,
    required = true,
}: AuthFieldProps) => (
    <div className="space-y-2">
        <label
            htmlFor={name}
            className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100/50"
        >
            {label}
        </label>
        <div className="relative group">
            <Icon
                aria-hidden="true"
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100/40 transition-colors group-focus-within:text-amber-200"
            />
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                minLength={minLength}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/25 transition-all focus:border-amber-200/50 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-amber-200/30"
            />
        </div>
    </div>
)
