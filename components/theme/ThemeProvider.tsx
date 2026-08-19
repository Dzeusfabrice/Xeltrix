'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'zeltrix-theme'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/** Applique le thème sur <html> : classe pour les variantes dark:* et color-scheme pour les contrôles natifs. */
function applyTheme(theme: Theme) {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.style.colorScheme = theme
}

function readInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'light'

    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved

    // Le script inline du layout a déjà tranché : on s'aligne sur le DOM.
    if (document.documentElement.classList.contains('dark')) return 'dark'

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('light')

    useEffect(() => {
        const initialTheme = readInitialTheme()
        setThemeState(initialTheme)
        applyTheme(initialTheme)
    }, [])

    // Suit la préférence système tant que l'utilisateur n'a pas choisi explicitement.
    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (event: MediaQueryListEvent) => {
            if (window.localStorage.getItem(STORAGE_KEY)) return
            const nextTheme: Theme = event.matches ? 'dark' : 'light'
            setThemeState(nextTheme)
            applyTheme(nextTheme)
        }

        media.addEventListener('change', handleChange)
        return () => media.removeEventListener('change', handleChange)
    }, [])

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme)
        window.localStorage.setItem(STORAGE_KEY, newTheme)
        applyTheme(newTheme)
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark')
    }, [setTheme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
