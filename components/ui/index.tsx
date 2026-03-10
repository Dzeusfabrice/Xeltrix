import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("max-w-7xl mx-auto px-6", className)}>
        {children}
    </div>
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
}

export const Button = ({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) => {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20',
        secondary: 'bg-secondary text-slate-950 hover:bg-secondary/90 shadow-lg shadow-secondary/20',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-slate-950',
        ghost: 'text-primary hover:bg-slate-100 dark:hover:bg-slate-800'
    }

    const sizes = {
        sm: 'px-4 py-1.5 text-sm',
        md: 'px-6 py-2.5',
        lg: 'px-8 py-3.5 text-lg'
    }

    return (
        <button
            className={cn(
                "rounded-full font-bold transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2",
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
