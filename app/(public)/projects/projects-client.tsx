'use client'

import React, { useState } from 'react'
import { Container, Button, Badge } from '@/components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Smartphone, Globe, Monitor, ArrowUpRight, Cpu, Package } from 'lucide-react'
import Link from 'next/link'
import type { Technology } from '@/types/database'

const categories = ['Tous', 'Produit', 'Web', 'Mobile', 'Desktop', 'API']

type ProjectRow = {
    id: string
    slug: string
    title: string
    category?: string
    description?: string
    image_url?: string | null
    technologies?: string[] | null
    is_product?: boolean
}

export default function ProjectsClient({
    initialProjects,
    technologies = [],
}: {
    initialProjects: ProjectRow[]
    technologies?: Technology[]
}) {
    const [activeCategory, setActiveCategory] = useState('Tous')
    const [activeTech, setActiveTech] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const projectsList = initialProjects || []

    const filteredProjects = projectsList.filter((p) => {
        const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory || (activeCategory === 'Produit' && p.is_product)
        const matchesTech =
            !activeTech ||
            (p.technologies || []).some((t) => t.toLowerCase() === activeTech.toLowerCase())
        const q = searchQuery.toLowerCase()
        const matchesSearch =
            !q ||
            p.title.toLowerCase().includes(q) ||
            (p.description && p.description.toLowerCase().includes(q)) ||
            (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(q)))
        return matchesCategory && matchesTech && matchesSearch
    })

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            {/* Header Hero */}
            <section className="relative py-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08]">
                {/* Stealthy Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" 
                        alt="" 
                        className="w-full h-full object-cover opacity-[0.05] dark:opacity-[0.1] grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-5 max-w-4xl">
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        Écosystème Technologique
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        L&apos;art de l&apos;ingénierie, du <span className="text-gradient-primary">sur-mesure</span> au <span className="text-gradient-primary">SaaS</span>.
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                        Découvrez notre double expertise : des projets stratégiques déployés pour nos partenaires et nos propres solutions logicielles prêtes à l&apos;emploi. 
                        <strong> Du service d&apos;exception au produit d&apos;impact.</strong>
                    </p>
                </Container>
            </section>

            {/* Stack utilisée */}
            {technologies.length > 0 && (
                <section className="py-10 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-slate-900/30">
                    <Container className="space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                                    Stack & outils
                                </p>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                                    Technologies maîtrisées sur nos projets
                                </h2>
                            </div>
                            <Link
                                href="/technologies"
                                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                            >
                                Voir toute la stack <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveTech(null)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                    !activeTech
                                        ? 'bg-blue-600 text-white border-blue-500/30 shadow-sm'
                                        : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-blue-500/30'
                                }`}
                            >
                                Toutes
                            </button>
                            {technologies.map((tech: Technology) => {
                                const isActive = activeTech === tech.name
                                return (
                                    <button
                                        key={tech.id}
                                        type="button"
                                        onClick={() => setActiveTech(isActive ? null : tech.name)}
                                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-blue-600 text-white border-blue-500/30 shadow-sm'
                                                : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-blue-500/30'
                                        }`}
                                    >
                                        {tech.logo_url ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={tech.logo_url} alt="" className="w-4 h-4 object-contain" />
                                        ) : (
                                            <Cpu size={14} className={isActive ? 'text-white/80' : 'text-blue-500'} />
                                        )}
                                        <span>{tech.name}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </Container>
                </section>
            )}

            {/* Filters Bar */}
            <section className="sticky top-16 z-30 py-4 bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.08] shadow-sm">
                <Container>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-white/10 w-full sm:w-auto">
                            {categories.map((cat: string) => (
                                <button
                                    key={cat}
                                    type="button"
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

            {/* Projects/Products Grid */}
            <section className="py-14">
                <Container>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProjects.map((p: ProjectRow) => (
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
                                            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={p.image_url || (p.is_product ? '/assets/im1.jpg' : 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=800&auto=format&fit=crop')}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                />
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md rounded-full text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/10 flex items-center gap-1.5 shadow-sm">
                                                    {p.is_product ? <Package size={12} /> : (
                                                        <>
                                                            {p.category === 'Mobile' && <Smartphone size={12} />}
                                                            {p.category === 'Web' && <Globe size={12} />}
                                                            {p.category === 'Desktop' && <Monitor size={12} />}
                                                        </>
                                                    )}
                                                    <span>{p.category}</span>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-4">
                                                <div className="space-y-1.5">
                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {p.title}
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                                                        {p.description}
                                                    </p>
                                                </div>

                                                {(p.technologies || []).length > 0 && (
                                                    <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                                                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                                                            <Cpu size={10} className="text-blue-500" />
                                                            Stack Technique
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {p.technologies!.map((t: string) => (
                                                                <span
                                                                    key={t}
                                                                    className="px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded text-[10px] font-bold text-blue-700 dark:text-blue-300"
                                                                >
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/5 mt-4 flex items-center justify-between">
                                            <Link
                                                href={p.is_product ? `/products#${p.slug}` : `/projects/${p.slug}`}
                                                className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 inline-flex items-center gap-1.5 transition-colors"
                                            >
                                                {p.is_product ? 'Voir le produit' : 'Détails du projet'} <ArrowUpRight size={14} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                                <Search size={30} className="text-slate-400 mx-auto mb-2.5" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                    {projectsList.length === 0 ? 'Aucun projet publié' : 'Aucun projet correspondant'}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mb-5 max-w-xs mx-auto">
                                    {projectsList.length === 0
                                        ? 'Les réalisations apparaîtront ici dès leur publication.'
                                        : 'Essayez d’ajuster vos filtres ou la technologie sélectionnée.'}
                                </p>
                                {(activeCategory !== 'Tous' || activeTech || searchQuery) && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setActiveCategory('Tous')
                                            setActiveTech(null)
                                            setSearchQuery('')
                                        }}
                                    >
                                        Réinitialiser les filtres
                                    </Button>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </Container>
            </section>
        </div>
    )
}
