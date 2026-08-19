import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { Card, Button, Badge } from '@/components/ui'
import { Users, Shield, ShieldCheck, UserCheck, Key, Lock, Mail, Clock } from 'lucide-react'

export default async function AdminUsersPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const usersList = [
        {
            id: user?.id || 'admin-1',
            email: user?.email || 'admin@zeltrix.com',
            role: 'Super Admin',
            roleBadge: 'primary' as const,
            status: 'Actif',
            lastLogin: 'Session active actuelle',
            permissions: ['CRUD Projets', 'CRUD Produits', 'CRUD Articles', 'Lecture/Gestion Messages', 'Configuration Globale']
        },
        {
            id: 'dev-team-lead',
            email: 'tech-lead@zeltrix.com',
            role: 'Tech Lead / Éditeur',
            roleBadge: 'purple' as const,
            status: 'Actif',
            lastLogin: 'Il y a 2 jours',
            permissions: ['CRUD Projets', 'CRUD Articles', 'Gestion Technologies']
        }
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Users size={26} className="text-blue-600 dark:text-blue-400" />
                        <span>Utilisateurs & Niveaux d&apos;Accès</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Gestion des comptes administrateurs et des permissions d&apos;accès à la plateforme.
                    </p>
                </div>
            </div>

            {/* Security Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-start gap-3.5">
                <ShieldCheck size={22} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-900 dark:text-white">Authentification & Row Level Security (RLS)</div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        L&apos;ensemble des routes d&apos;administration et des opérations de base de données sont protégées par les politiques RLS de Supabase Auth. Seuls les comptes authentifiés peuvent effectuer des opérations d&apos;écriture.
                    </p>
                </div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
                {usersList.map((u) => (
                    <Card key={u.id} className="p-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                                        {u.email.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                                                {u.email}
                                            </h3>
                                            <Badge variant={u.roleBadge} className="text-[10px]">
                                                {u.role}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                                            <Clock size={12} />
                                            <span>Dernière connexion : {u.lastLogin}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2 flex flex-wrap gap-1.5 pl-0 sm:pl-13">
                                    {u.permissions.map((perm, idx) => (
                                        <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                                            {perm}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full lg:w-auto">
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                                    <UserCheck size={13} />
                                    {u.status}
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
