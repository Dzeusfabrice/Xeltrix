'use client'

import React, { useState } from 'react'
import { Container, Button, Badge } from '@/components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Smartphone, Globe, Monitor, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const categories = ['Tous', 'Web', 'Mobile', 'Desktop', 'API']

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [activeCategory, setActiveCategory] = useState('Tous')
    const [searchQuery, setSearchQuery] = useState('')

    const projectsList = initialProjects && initialProjects.length > 0 ? initialProjects : [
        {
            id: 'proj-1',
            slug: 'fintech-saas-platform',
            title: 'Fintech Core Gateway',
            category: 'Web',
            description: 'Passerelle de paiement haute disponibilité, multi-devises et conforme aux normes bancaires avec portail commerçant temps réel.',
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
            technologies: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Tailwind CSS']
        },
        {
            id: 'proj-2',
            slug: 'telemed-mobile-app',
            title: 'HealthCare Sync Mobile',
            category: 'Mobile',
            description: 'Application mobile de téléconsultation médicale avec visio WebRTC sécurisée et carnet de santé numérique crypté.',
            image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
            technologies: ['React Native', 'WebRTC', 'Supabase Auth']
        },
        {
            id: 'proj-3',
            slug: 'logistics-erp-desktop',
            title: 'TransLogix Enterprise ERP',
            category: 'Desktop',
            description: 'Logiciel de gestion de flotte, traçabilité de fret en direct et facturation automatisée pour transporteurs internationaux.',
            image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
            technologies: ['Tauri', 'Rust', 'PostgreSQL']
        },
        {
            id: 'proj-4',
            slug: 'ecommerce-marketplace-b2b',
            title: 'AgriMarket B2B Platform',
            category: 'Web',
            description: 'Marketplace agricole connectant producteurs et centrales d\'achat avec gestion automatisée des stocks et factures.',
            image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
            technologies: ['Next.js', 'Stripe', 'Supabase', 'Node.js']
        },
        {
            id: 'proj-5',
            slug: 'realtime-chat-sdk-demo',
            title: 'SecureChat Instant Messaging',
            category: 'Mobile',
            description: 'Système de messagerie instantanée d\'entreprise avec chiffrement de bout en bout et appels vocaux/vidéo.',
            image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
            technologies: ['Flutter', 'WebSockets', 'Go', 'Docker']
        },
        {
            id: 'proj-6',
            slug: 'ai-document-analyzer-api',
            title: 'DocuParse AI Engine',
            category: 'API',
            description: 'API d\'extraction et d\'analyse automatique de documents légaux et factures par modèles de vision & LLM.',
            image_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
            technologies: ['Python', 'FastAPI', 'OpenAI', 'LangChain']
        }
    ]

    const filteredProjects = projectsList.filter(p => {
        const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.technologies && p.technologies.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())))
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] bg-grid-pattern">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-5 max-w-4xl">
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        Portfolio Technique
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Nos réalisations et <span className="text-gradient-primary">projets déployés</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Explorez nos applications web, mobiles, logiciels desktop et intégrations logicielles sur mesure conçus pour des clients ambitieux.
                    </p>
                </Container>
            </section>

            {/* Filter & Search Toolbar */}
            <section className="sticky top-16 z-30 py-4 bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.08] shadow-sm">
                <Container>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Categories Tabs */}
                        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-white/10 w-full sm:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        activeCategory === cat
                                            ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                            <input
                                type="text"
                                placeholder="Rechercher (projet, stack)..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Projects Grid */}
            <section className="py-14">
                <Container>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredProjects.map((p) => (
                                    <motion.div
                                        layout
                                        key={p.id}
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.25 }}
                                        className="group flex flex-col h-full bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/30 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-xl flex-grow justify-between"
                                    >
                                        <div>
                                            {/* Thumbnail */}
                                            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                                                <img
                                                    src={p.image_url || 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=800&auto=format&fit=crop'}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                />
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md rounded-full text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/10 flex items-center gap-1.5 shadow-sm">
                                                    {p.category === 'Mobile' && <Smartphone size={12} />}
                                                    {p.category === 'Web' && <Globe size={12} />}
                                                    {p.category === 'Desktop' && <Monitor size={12} />}
                                                    <span>{p.category}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 space-y-3.5">
                                                <div className="space-y-1.5">
                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {p.title}
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                                                        {p.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {p.technologies?.map((t: string, i: number) => (
                                                        <span key={i} className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded text-[11px] font-mono text-slate-700 dark:text-slate-300">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/5 mt-4 flex items-center justify-between">
                                            <Link
                                                href={`/projects/${p.slug}`}
                                                className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 inline-flex items-center gap-1.5 transition-colors"
                                            >
                                                Détails du projet <ArrowUpRight size={14} />
                                            </Link>
                                            <Link
                                                href="/quote"
                                                className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-slate-200 transition-colors"
                                            >
                                                Projet similaire ?
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                                <Search size={30} className="text-slate-400 mx-auto mb-2.5" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Aucun projet correspondant</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mb-5 max-w-xs mx-auto">Essayez d&apos;ajuster vos mots-clés ou réinitialisez les filtres.</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => { setActiveCategory('Tous'); setSearchQuery('') }}
                                >
                                    Réinitialiser les filtres
                                </Button>
                            </div>
                        )}
                    </AnimatePresence>
                </Container>
            </section>
        </div>
    )
}
