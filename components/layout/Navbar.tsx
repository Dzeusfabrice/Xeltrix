'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../shared/Logo'
import { Menu, X, ArrowRight } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Expérience', href: '/experience' },
    { name: 'Projets', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Technologies', href: '/technologies' },
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
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
                isScrolled
                    ? 'glass !bg-slate-900/60 py-3 shadow-2xl'
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/">
                    <Logo />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-sm font-bold transition-all hover:text-purple-400',
                                pathname === link.href
                                    ? 'text-purple-500 font-black'
                                    : 'text-white/80 hover:text-white'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 group shadow-lg hover:shadow-purple-500/25"
                    >
                        Contact
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'absolute top-full left-0 right-0 bg-slate-900 border-t border-white/5 shadow-2xl overflow-hidden transition-all duration-300 md:hidden',
                    isOpen ? 'max-h-[600px] py-10 opacity-100' : 'max-h-0 py-0 opacity-0'
                )}
            >
                <div className="flex flex-col gap-4 px-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-xl font-bold py-3 transition-colors',
                                pathname === link.href
                                    ? 'text-purple-500'
                                    : 'text-gray-300 hover:text-purple-400'
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="bg-purple-600 text-white text-center py-4 rounded-xl mt-4 font-bold active:scale-95 transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                        Parlons de votre projet
                    </Link>
                </div>
            </div>
        </nav>
    )
}
