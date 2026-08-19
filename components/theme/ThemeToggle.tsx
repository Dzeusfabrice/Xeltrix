'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'
import { cn } from '../ui'

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className={cn("w-8 h-8", className)} />
        )
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
            className={cn(
                "w-8 h-8 flex items-center justify-center transition-all duration-300 cursor-pointer",
                "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                className
            )}
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
            {theme === 'dark' ? (
                <Sun size={20} className="text-amber-400 transition-transform hover:rotate-45" />
            ) : (
                <Moon size={20} className="text-slate-700 dark:text-slate-400 transition-transform hover:-rotate-12" />
            )}
        </button>
    )
}
