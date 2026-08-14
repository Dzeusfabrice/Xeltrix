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
            <div className={cn("w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900/50", className)} />
        )
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
            className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer",
                "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
                "dark:bg-slate-900/60 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-white/10 dark:hover:text-white",
                className
            )}
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
            {theme === 'dark' ? (
                <Sun size={17} className="text-amber-400 animate-spin-slow transition-transform hover:rotate-45" />
            ) : (
                <Moon size={17} className="text-slate-700 transition-transform hover:-rotate-12" />
            )}
        </button>
    )
}
