'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../shared/Logo'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '../ui'
import { ThemeToggle } from '../theme/ThemeToggle'

const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Produits', href: '/products' },
    { name: 'Réalisations', href: '/projects' },
    { name: 'À propos', href: '/about' },
    { name: 'Blog', href: '/blog' },
]

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full border-b',
                isScrolled
                    ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200 dark:border-white/[0.06] py-3 shadow-sm'
                    : 'bg-transparent border-transparent py-5'
            )}
        >
            <div className="w-full px-6 md:px-10 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center shrink-0">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation Links - Simple & Pro */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-[13px] font-black uppercase tracking-[0.15em] transition-all duration-300 relative py-1 group',
                                        isActive
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform origin-left transition-transform duration-300",
                                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    )} />
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* CTA Buttons & Theme Toggle */}
                <div className="hidden sm:flex items-center gap-8">
                    <ThemeToggle />

                    <Link
                        href="/contact"
                        className="text-blue-600 dark:text-blue-400 text-[13px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-all duration-300"
                    >
                        Demander un devis
                    </Link>
                </div>

                {/* Mobile Toggle & Theme Toggle */}
                <div className="flex lg:hidden items-center gap-2">
                    <ThemeToggle />
                    <button
                        className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={cn(
                    'lg:hidden fixed inset-x-0 top-[70px] bg-white/98 dark:bg-slate-950/98 backdrop-blur-3xl border-b border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-500 overflow-hidden',
                    isOpen ? 'max-h-screen py-8 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
                )}
            >
                <div className="flex flex-col gap-4 px-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-xl font-black uppercase tracking-[0.2em] transition-all',
                                    isActive
                                        ? 'text-blue-600 dark:text-blue-400 translate-x-2'
                                        : 'text-slate-500 dark:text-slate-400'
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                    
                    <div className="pt-8 mt-4 border-t border-slate-200 dark:border-white/10">
                        <Link
                            href="/contact"
                            className="text-blue-600 dark:text-blue-400 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center py-2 hover:opacity-80 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Demander un devis
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
