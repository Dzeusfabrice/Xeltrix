'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../shared/Logo'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '../ui'
import { ThemeToggle } from '../theme/ThemeToggle'

const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Produits', href: '/products' },
    { name: 'Réalisations', href: '/projects' },
    { name: 'Études de cas', href: '/case-studies' },
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
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8',
                isScrolled
                    ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] py-3.5 shadow-sm dark:shadow-lg dark:shadow-black/30'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Logo />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200 dark:border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200',
                                    isActive
                                        ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* CTA Buttons & Theme Toggle */}
                <div className="hidden sm:flex items-center gap-3">
                    <ThemeToggle />

                    <Link
                        href="/quote"
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                        Simuler un projet
                    </Link>
                    
                    <Link
                        href="/contact"
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-blue-500/20 border border-blue-400/30"
                    >
                        Demander un devis
                        <ArrowRight className="w-3.5 h-3.5" />
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
                    'lg:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300 overflow-hidden',
                    isOpen ? 'max-h-[85vh] py-6 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
                )}
            >
                <div className="flex flex-col gap-1.5 px-6 max-w-lg mx-auto">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-sm font-medium px-4 py-2.5 rounded-xl transition-colors',
                                    isActive
                                        ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold'
                                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                    
                    <div className="pt-4 mt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
                        <Link
                            href="/quote"
                            className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 text-center py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            Générateur de devis interactif
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                            onClick={() => setIsOpen(false)}
                        >
                            Prendre contact
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
