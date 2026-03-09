'use client'

import React from 'react'
import {
    Users,
    Briefcase,
    MessageSquare,
    Eye,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    TrendingUp
} from 'lucide-react'
import { Container } from '@/components/ui'

const stats = [
    { label: "Visiteurs (30j)", value: "1,280", trend: "+12%", icon: <Eye />, color: "bg-blue-500" },
    { label: "Projets actifs", value: "6", trend: "+1", icon: <Briefcase />, color: "bg-purple-500" },
    { label: "Nouveaux messages", value: "12", trend: "-5%", icon: <MessageSquare />, color: "bg-emerald-500" },
    { label: "Taux conversion", value: "3.2%", trend: "+0.5%", icon: <Users />, color: "bg-orange-500" },
]

const recentMessages = [
    { id: 1, name: "Marc Yao", subject: "Demande de devis App Mobile", time: "Il y a 2h", status: "unread" },
    { id: 2, name: "Sarah Koné", subject: "Refonte de site web", time: "Il y a 5h", status: "unread" },
    { id: 3, name: "Jean Koffi", subject: "Collaboration tech", time: "Hier", status: "read" },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            {/* Welcome */}
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-primary dark:text-white">Bonjour, Admin 👋</h1>
                    <p className="text-muted">Voici ce qu'il se passe sur Xeltrix aujourd'hui.</p>
                </div>
                <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                    <Clock size={18} className="text-secondary" />
                    Dernière mise à jour: 11:44
                </button>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl text-white ${s.color}`}>
                                {React.cloneElement(s.icon as any, { size: 24 })}
                            </div>
                            <span className={`text-xs font-black px-2 py-1 rounded-lg ${s.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                {s.trend}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-muted font-bold text-sm uppercase tracking-wider">{s.label}</h3>
                            <p className="text-4xl font-black text-primary dark:text-white">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Chart Placeholder */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm min-h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-primary dark:text-white">Analytique des visites</h3>
                        <select className="bg-slate-50 dark:bg-slate-800 border-none outline-none font-bold text-sm px-4 py-2 rounded-lg">
                            <option>7 derniers jours</option>
                            <option>30 derniers jours</option>
                        </select>
                    </div>
                    <div className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                        <div className="text-center space-y-4">
                            <TrendingUp size={48} className="text-slate-200 mx-auto" />
                            <p className="text-muted font-medium">Graphique en cours de chargement...</p>
                        </div>
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black text-primary dark:text-white">Messages récents</h3>
                        <button className="text-secondary font-black text-sm hover:underline">Voir tout</button>
                    </div>

                    <div className="space-y-4">
                        {recentMessages.map((m) => (
                            <div key={m.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-primary dark:text-white group-hover:text-secondary transition-colors">{m.name}</h4>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{m.time}</span>
                                </div>
                                <p className="text-sm text-slate-500 truncate mb-3">{m.subject}</p>
                                <div className="flex items-center gap-2">
                                    {m.status === 'unread' ? (
                                        <span className="w-2 h-2 rounded-full bg-error" />
                                    ) : (
                                        <CheckCircle2 size={12} className="text-success" />
                                    )}
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{m.status === 'unread' ? 'Nouveau' : 'Lu'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
