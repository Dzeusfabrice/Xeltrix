import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
        {children}
    </div>
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
}

export const Button = ({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-medium shadow-sm hover:shadow-blue-500/20 border border-blue-500/30',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-750 dark:text-slate-100 dark:border-white/10',
        outline: 'bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30',
        ghost: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5',
        glow: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.35)] border border-blue-400/30'
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-xs rounded-lg',
        md: 'px-5 py-2.5 text-sm rounded-xl',
        lg: 'px-7 py-3.5 text-base rounded-xl font-semibold'
    }

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export const Badge = ({
    children,
    variant = 'default',
    className
}: {
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'purple'
    className?: string
}) => {
    const variants = {
        default: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-white/10',
        primary: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
        success: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
        warning: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
        purple: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20'
    }

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border tracking-wide",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    )
}

export const SectionHeader = ({
    badge,
    title,
    description,
    centered = true,
    className
}: {
    badge?: string
    title: string | React.ReactNode
    description?: string | React.ReactNode
    centered?: boolean
    className?: string
}) => {
    return (
        <div className={cn("space-y-3.5 mb-14", centered && "text-center max-w-3xl mx-auto", className)}>
            {badge && (
                <div className={cn("flex", centered ? "justify-center" : "justify-start")}>
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        {badge}
                    </Badge>
                </div>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {title}
            </h2>
            {description && (
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
                    {description}
                </p>
            )}
        </div>
    )
}

export const Card = ({
    children,
    className,
    hoverEffect = true
}: {
    children: React.ReactNode
    className?: string
    hoverEffect?: boolean
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-6 md:p-8 backdrop-blur-sm transition-all duration-300 shadow-sm dark:shadow-none",
                hoverEffect && "hover:border-blue-500/30 dark:hover:border-white/15 hover:shadow-md dark:hover:shadow-xl dark:hover:shadow-black/40",
                className
            )}
        >
            {children}
        </div>
    )
}
