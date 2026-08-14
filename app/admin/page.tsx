import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, Button, Badge } from '@/components/ui'
import { 
    Layers, 
    MessageSquare, 
    BookOpen, 
    Quote, 
    Cpu, 
    Package, 
    Wrench,
    Users,
    ArrowRight, 
    Plus, 
    Clock, 
    CheckCircle2, 
    Mail, 
    Sparkles, 
    TrendingUp 
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Fetch stats and latest messages
    const [
        { count: projectsCount },
        { count: articlesCount },
        { count: messagesCount },
        { count: unreadMessagesCount },
        { count: techCount },
        { count: testimonialsCount },
        { data: recentMessages }
    ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
        supabase.from('technologies').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5)
    ])

    const kpiCards = [
        {
            title: 'Projets Portfolio',
            value: projectsCount || 0,
            icon: Layers,
            href: '/admin/projects',
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
        },
        {
            title: 'Messages & Devis',
            value: messagesCount || 0,
            unread: unreadMessagesCount || 0,
            icon: MessageSquare,
            href: '/admin/messages',
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20'
        },
        {
            title: 'Articles / Blog',
            value: articlesCount || 0,
            icon: BookOpen,
            href: '/admin/articles',
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20'
        },
        {
            title: 'Témoignages Clients',
            value: testimonialsCount || 0,
            icon: Quote,
            href: '/admin/testimonials',
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
        },
        {
            title: 'Stack & Technologies',
            value: techCount || 0,
            icon: Cpu,
            href: '/admin/technologies',
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
        },
        {
            title: 'Produits SaaS Xeltrix',
            value: 5,
            icon: Package,
            href: '/admin/products',
            color: 'text-sky-600 dark:text-sky-400',
            bg: 'bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/20'
        }
    ]

    return (
        <div className="space-y-8">
            {/* Header Title & Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Tableau de bord
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Supervision et gestion centralisée de la plateforme XELTRIX.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                    <Link href="/admin/projects/new">
                        <Button variant="primary" size="sm" className="shadow-sm">
                            <Plus size={14} />
                            <span>Nouveau Projet</span>
                        </Button>
                    </Link>
                    <Link href="/admin/articles/new">
                        <Button variant="outline" size="sm">
                            <Plus size={14} />
                            <span>Nouvel Article</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* KPI Summary Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {kpiCards.map((kpi, idx) => {
                    const Icon = kpi.icon
                    return (
                        <Link key={idx} href={kpi.href}>
                            <Card className="p-6 h-full flex flex-col justify-between group hover:border-blue-500/30 transition-all">
                                <div className="flex items-center justify-between">
                                    <div className={`w-11 h-11 rounded-xl ${kpi.bg} border flex items-center justify-center ${kpi.color}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {kpi.unread !== undefined && kpi.unread > 0 && (
                                            <Badge variant="warning" className="text-[10px]">
                                                {kpi.unread} non lu(s)
                                            </Badge>
                                        )}
                                        <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
                                            {kpi.value}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {kpi.title}
                                    </span>
                                    <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            {/* Middle Section: Activity Overview & Recent Inbox */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Health & Activity Status */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
                                <span>État de la plateforme</span>
                            </h2>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Opérationnel
                            </span>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 space-y-1">
                                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                                    <span>Base de Données Supabase</span>
                                    <span className="text-emerald-600 dark:text-emerald-400">Connecté</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-[11px]">PostgreSQL temps réel & Auth RLS actif</p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 space-y-1">
                                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                                    <span>Taux de conversion formulaire</span>
                                    <span className="text-blue-600 dark:text-blue-400 font-mono">14.2%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-[11px]">Leads qualifiés via le simulateur de devis</p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 space-y-1">
                                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                                    <span>Moteur Next.js App Router</span>
                                    <span className="text-slate-900 dark:text-white font-mono">v16.1</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-[11px]">Server Components & Revalidation horaire</p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link href="/admin/messages" className="block">
                                <Button variant="outline" size="sm" className="w-full">
                                    <span>Consulter tous les messages & devis</span>
                                    <ArrowRight size={14} />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Right: Latest Messages & Leads Feed */}
                <div className="lg:col-span-7">
                    <Card className="p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Mail size={16} className="text-purple-600 dark:text-purple-400" />
                                <span>Dernières demandes reçues</span>
                            </h2>
                            <Link href="/admin/messages" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                Voir tout
                            </Link>
                        </div>

                        {recentMessages && recentMessages.length > 0 ? (
                            <div className="space-y-3">
                                {recentMessages.map((msg: any) => (
                                    <div
                                        key={msg.id}
                                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 transition-all space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">{msg.name}</span>
                                                {msg.status === 'unread' ? (
                                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                                                        Nouveau
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                        Traité
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                                                <Clock size={11} />
                                                {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                        </div>

                                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
                                            {msg.subject}
                                        </p>

                                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                                <MessageSquare size={28} className="text-slate-400 mx-auto mb-2" />
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Aucun message pour l&apos;instant</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Les demandes de devis et messages apparaîtront ici.</p>
                            </div>
                        )}
                    </Card>
                </div>

            </div>
        </div>
    )
}
