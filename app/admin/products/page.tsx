import React from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { Package, Plus, CheckCircle2, Shield, ArrowUpRight, Tablet, Database, Users, MessageSquare, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const defaultProducts = [
    {
        id: 'xeltrix-erp',
        name: 'Xeltrix ERP',
        category: 'Enterprise Suite',
        tagline: 'Progiciel de gestion intégrée agile, modulaire et ultra-performant',
        status: 'Disponible',
        icon: Database,
        modulesCount: 5,
        target: 'PME, ETI, Grandes Entreprises'
    },
    {
        id: 'xeltrix-crm',
        name: 'Xeltrix CRM',
        category: 'Sales Acceleration',
        tagline: 'Générateur de closing et fidélisation client assisté par IA',
        status: 'Disponible',
        icon: Users,
        modulesCount: 5,
        target: 'Équipes commerciales, Startups, B2B'
    },
    {
        id: 'xeltrix-chatsdk',
        name: 'Xeltrix Chat SDK',
        category: 'Developer Infrastructure',
        tagline: 'Moteur de messagerie instantanée temps réel & assistant IA embarqué',
        status: 'Nouvelle version',
        icon: MessageSquare,
        modulesCount: 5,
        target: 'Développeurs, Apps Web & Mobile'
    },
    {
        id: 'xeltrix-kiosk',
        name: 'Xeltrix Kiosk',
        category: 'Hardware & Retail',
        tagline: 'Système tactile et autonome pour bornes interactives et points de vente',
        status: 'Sur mesure',
        icon: Tablet,
        modulesCount: 5,
        target: 'Retail, Restauration, Salons, Hôpitaux'
    },
    {
        id: 'xeltrix-analytics',
        name: 'Xeltrix Analytics',
        category: 'Business Intelligence',
        tagline: 'Observabilité opérationnelle et tableaux de bord décisionnels en temps réel',
        status: 'Disponible',
        icon: BarChart3,
        modulesCount: 5,
        target: 'Directions générales, DAF, Ops'
    }
]

export default function AdminProductsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Package size={26} className="text-blue-600 dark:text-blue-400" />
                        <span>Gestion des Produits XELTRIX</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Catalogue des 5 solutions logicielles et briques propriétaires.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/products" target="_blank">
                        <Button variant="outline" size="sm">
                            <span>Voir le catalogue public</span>
                            <ArrowUpRight size={14} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Products List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {defaultProducts.map((p) => {
                    const Icon = p.icon
                    return (
                        <Card key={p.id} className="p-6 flex flex-col justify-between space-y-5">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Icon size={22} />
                                    </div>
                                    <Badge variant="primary" className="text-[10px]">
                                        {p.status}
                                    </Badge>
                                </div>

                                <div>
                                    <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                        {p.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                                        {p.name}
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                                        {p.tagline}
                                    </p>
                                </div>

                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 space-y-1.5 text-xs">
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Modules intégrés :</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{p.modulesCount} modules</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Cible :</span>
                                        <span className="font-medium text-slate-900 dark:text-white truncate max-w-[140px]">{p.target}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                    <CheckCircle2 size={13} /> Actif sur le site
                                </span>
                                <Link href={`/products#${p.id}`} target="_blank" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                                    Consulter <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
