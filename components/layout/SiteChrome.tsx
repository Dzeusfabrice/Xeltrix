'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '../ui'

type SiteChromeProps = {
    navbar: React.ReactNode
    footer: React.ReactNode
    children: React.ReactNode
}

/** Masque la navigation publique sur tout l’espace admin. */
function isChromelessPath(pathname: string) {
    return pathname.startsWith('/admin')
}

export const SiteChrome = ({ navbar, footer, children }: SiteChromeProps) => {
    const pathname = usePathname()
    const isChromeless = isChromelessPath(pathname)

    return (
        <>
            {!isChromeless && navbar}
            <div className={cn('min-h-screen', !isChromeless && 'pt-16')}>{children}</div>
            {!isChromeless && footer}
        </>
    )
}
