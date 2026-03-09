'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/shared/Logo'
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    Star,
    Settings,
    Cpu,
    FileText,
    TrendingUp,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Bell
} from 'lucide-react'

const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
    { icon: <Briefcase size={20} />, label: "Projets", href: "/admin/projects" },
    { icon: <FileText size={20} />, label: "Blog", href: "/admin/blog" },
    { icon: <Star size={20} />, label: "Témoignages", href: "/admin/testimonials" },
    { icon: <Cpu size={20} />, label: "Technologies", href: "/admin/technologies" },
    { icon: <MessageSquare size={20} />, label: "Messages", href: "/admin/messages" },
    { icon: <TrendingUp size={20} />, label: "Statistiques", href: "/admin/stats" },
    { icon: <Settings size={20} />, label: "Paramètres", href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

    if (pathname === '/admin/login') return <>{children}</>

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 bottom-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-50 flex flex-col ${collapsed ? 'w-20' : 'w-72'}`}
            >
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {!collapsed && <Logo className="scale-75 origin-left" />}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-secondary"
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <nav className="flex-grow p-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${pathname === item.href
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 group'
                                }`}
                        >
                            <span className={pathname === item.href ? 'text-white' : 'text-slate-400 group-hover:text-secondary'}>
                                {item.icon}
                            </span>
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="flex items-center gap-4 p-4 w-full rounded-xl font-bold text-error hover:bg-error/5 transition-all">
                        <LogOut size={20} />
                        {!collapsed && <span>Déconnexion</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-grow transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-72'}`}>
                {/* Top bar */}
                <header className="sticky top-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-8 flex items-center justify-between z-40">
                    <h2 className="text-xl font-black text-primary dark:text-white">
                        {navItems.find(i => i.href === pathname)?.label || "Dashboard"}
                    </h2>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-secondary">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
                        </button>
                        <div className="flex items-center gap-4 border-l border-slate-100 dark:border-slate-800 pl-6">
                            <div className="text-right">
                                <p className="text-sm font-black text-primary dark:text-white">Admin Xeltrix</p>
                                <p className="text-[10px] uppercase font-bold text-slate-400">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-black">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
