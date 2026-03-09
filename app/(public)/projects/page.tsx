'use client'

import React, { useState } from 'react'
import { Container, Button } from '@/components/ui'
import { Search, Filter, ExternalLink, Smartphone, Globe, Layers } from 'lucide-react'

const categories = ['Tous', 'Mobile', 'Web', 'Desktop', 'API']

const projects = [
    { id: 1, title: "PresenS App", category: "Mobile", tech: ["Flutter", "Firebase"], image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "EcoDrive Portal", category: "Web", tech: ["Next.js", "Supabase"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Nova CRM", category: "Desktop", tech: ["React", "Electron"], image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Xeltrix API", category: "API", tech: ["Node.js", "PostgreSQL"], image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "FinTech Dashboard", category: "Web", tech: ["React", "Chart.js"], image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop" },
    { id: 6, title: "HealthTrack", category: "Mobile", tech: ["React Native", "HealthKit"], image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=800&auto=format&fit=crop" }
]

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('Tous')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProjects = projects.filter(p => {
        const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    return (
        <div className="pb-24">
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl space-y-6">
                            <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white leading-tight">
                                Nos <span className="text-gradient">Réalisations</span>.
                            </h1>
                            <p className="text-xl text-muted leading-relaxed">
                                Explorez notre portfolio de projets innovants conçus pour répondre aux défis numériques d'aujourd'hui.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-12 border-b border-slate-100 dark:border-slate-800 sticky top-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-30">
                <Container>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        {/* Categories */}
                        <div className="flex flex-wrap items-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                        ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
                                        : 'bg-slate-100 dark:bg-slate-800 text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher un projet ou une techno..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-secondary/50 outline-none text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-24">
                <Container>
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredProjects.map((p) => (
                                <div key={p.id} className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                            {p.category === 'Mobile' && <Smartphone size={14} />}
                                            {p.category === 'Web' && <Globe size={14} />}
                                            {p.category === 'Desktop' && <Layers size={14} />}
                                            {p.category}
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-black text-primary dark:text-white mb-4 group-hover:text-secondary transition-colors">{p.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {p.tech.map((t, i) => (
                                                <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-500">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                                            <Button variant="ghost" className="w-full justify-between px-0 hover:bg-transparent text-secondary italic">
                                                En savoir plus
                                                <ExternalLink size={18} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 space-y-6">
                            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                                <Filter className="text-muted" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary dark:text-white">Aucun projet trouvé</h3>
                            <p className="text-muted">Essayez de modifier vos filtres ou votre recherche.</p>
                            <Button variant="outline" onClick={() => { setActiveCategory('Tous'); setSearchQuery('') }}>
                                Réinitialiser
                            </Button>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}
