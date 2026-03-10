'use client'

import React, { useState } from 'react'
import { Container, Button } from '@/components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, Smartphone, Globe, Layers, ArrowRight } from 'lucide-react'

const categories = ['Tous', 'Mobile', 'Web', 'Desktop', 'API', 'Design']

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [activeCategory, setActiveCategory] = useState('Tous')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProjects = initialProjects.filter(p => {
        const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Hero Section - Refined */}
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 right-0 w-full lg:w-3/4 pointer-events-none select-none z-0"
                >
                    {/* Mobile specific gradient to protect text visibility */}
                    <div className="absolute inset-0 bg-[#020617]/80 lg:hidden z-10" />
                    <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#020617_80%)] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1600&auto=format&fit=crop"
                        alt="Portfolio Symbiosis"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <Container className="relative z-10 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black uppercase tracking-widest mx-auto lg:mx-0">
                            <Layers size={14} />
                            Portfolio d'Exceptions
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                            Nos <span className="text-gradient">Réalisations</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
                            Découvrez notre portfolio de projets innovants conçus avec passion pour répondre aux défis numériques d'aujourd'hui.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Sticky Filter Bar - Modernized */}
            <section className="sticky top-20 z-40 py-6 glass !bg-slate-900/40 border-b border-white/5 shadow-2xl">
                <Container>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        {/* Categories Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-xl text-sm font-black transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-white text-slate-950 shadow-xl'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Modern Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher par projet ou techno..."
                                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-slate-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Projects Grid */}
            <section className="py-24 relative">
                <Container>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            >
                                {filteredProjects.map((p) => (
                                    <motion.div
                                        layout
                                        key={p.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4 }}
                                        className="group flex flex-col h-full bg-slate-900/30 rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_20px_50px_-10px_rgba(124,58,237,0.15)] glass-card"
                                    >
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={p.image_url || 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=800&auto=format&fit=crop'}
                                                alt={p.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />
                                            {/* Category Badge */}
                                            <div className="absolute top-6 left-6 px-4 py-2 glass !bg-slate-900/60 rounded-full text-xs font-black uppercase tracking-widest text-purple-400 border border-white/10 flex items-center gap-2">
                                                {p.category === 'Mobile' && <Smartphone size={14} />}
                                                {p.category === 'Web' && <Globe size={14} />}
                                                {p.category === 'Desktop' && <Layers size={14} />}
                                                {p.category}
                                            </div>
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                <a href={p.project_url || '#'} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-950 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 hover:bg-slate-200">
                                                    <ExternalLink size={24} />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="p-10 flex flex-col flex-grow space-y-6">
                                            <div className="space-y-3">
                                                <h3 className="text-3xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">
                                                    {p.title}
                                                </h3>
                                                <p className="text-slate-400 leading-relaxed font-medium">
                                                    {p.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {p.technologies?.map((t: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:border-purple-500/20 group-hover:text-purple-300 transition-colors">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-slate-500 font-bold text-sm italic">Projet Confirmé</span>
                                                {p.project_url && (
                                                    <a href={p.project_url} target="_blank" rel="noopener noreferrer">
                                                        <Button
                                                            variant="ghost"
                                                            className="p-0 h-auto hover:bg-transparent text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 group/btn"
                                                        >
                                                            Voir Projet
                                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                                        </Button>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-40 bg-slate-900/20 rounded-[4rem] border border-dashed border-white/10"
                            >
                                <div className="w-24 h-24 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-purple-500">
                                    <Search size={40} />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4">Aucune pépite trouvée</h3>
                                <p className="text-slate-500 text-lg mb-10 max-w-sm mx-auto font-medium">Affinez votre recherche pour découvrir nos trésors numériques.</p>
                                <Button
                                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-10 h-14 font-black"
                                    onClick={() => { setActiveCategory('Tous'); setSearchQuery('') }}
                                >
                                    Réinitialiser tout
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Container>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-24">
                <Container>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-12 md:p-24 rounded-[4rem] border border-white/5 text-center space-y-10 relative overflow-hidden glass-card">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
                        <h2 className="text-4xl md:text-6xl font-black text-white max-w-3xl mx-auto leading-tight">
                            Vous avez une <span className="text-gradient">vision</span> ? Nous avons le code.
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                            Travaillons ensemble pour créer la prochaine réalisation phare de ce portfolio.
                        </p>
                        <div className="pt-6">
                            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100 rounded-2xl px-12 h-16 font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-white/10">
                                Démarrer un projet
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
