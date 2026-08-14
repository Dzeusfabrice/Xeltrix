'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../shared/Logo'
import { 
    LayoutDashboard, 
    Layers, 
    Package, 
    Wrench, 
    BookOpen, 
    MessageSquare, 
    Quote, 
    Cpu, 
    Users, 
    Power, 
    Menu, 
    X,
    ChevronRight
} from 'lucide-react'
import { ThemeToggle } from '../theme/ThemeToggle'
import { cn } from '../ui'

interface AdminSidebarProps {
    userEmail?: string
    logoutAction: () => Promise<void>
}

const navItems = [
    { name: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
    { name: 'Projets', href: '/admin/projects', icon: Layers },
    { name: 'Produits', href: '/admin/products', icon: Package },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Articles / Blog', href: '/admin/articles', icon: BookOpen },
    { name: 'Messages & Devis', href: '/admin/messages', icon: MessageSquare },
    { name: 'Témoignages', href: '/admin/testimonials', icon: Quote },
    { name: 'Technologies', href: '/admin/technologies', icon: Cpu },
    { name: 'Utilisateurs & Rôles', href: '/admin/users', icon: Users },
]

export const AdminSidebar = ({ userEmail, logoutAction }: AdminSidebarProps) => {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <>
            {/* Topbar for Mobile & Tablet */}
            <header className="lg:hidden sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
                <Link href="/admin" className="flex items-center">
                    <Logo className="scale-90" />
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
                        aria-label="Toggle admin sidebar"
                    >
                        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* Backdrop for Mobile */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Desktop & Mobile Drawer Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/[0.08] flex flex-col justify-between transition-transform duration-300",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Header Logo */}
                <div>
                    <div className="p-6 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                        <Link href="/admin" onClick={() => setIsMobileOpen(false)}>
                            <Logo />
                        </Link>
                        <div className="hidden lg:block">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-3.5 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={cn(
                                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group",
                                        isActive
                                            ? "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-500/20"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} className={isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"} />
                                        <span>{item.name}</span>
                                    </div>
                                    {isActive && <ChevronRight size={14} className="text-blue-600 dark:text-blue-400" />}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Footer User Info & Logout */}
                <div className="p-4 border-t border-slate-100 dark:border-white/[0.08] space-y-3">
                    {userEmail && (
                        <div className="px-2">
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Connecté en tant que</p>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{userEmail}</p>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex-1 text-center py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            Voir le site
                        </Link>
                        <form action={logoutAction} className="flex-1">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-xs font-bold transition-all"
                            >
                                <Power size={13} />
                                Quitter
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    )
}
