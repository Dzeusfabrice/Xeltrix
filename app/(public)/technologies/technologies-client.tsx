'use client'

import React, { useState } from 'react'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import {
    Search,
    Cpu,
    Globe,
    Smartphone,
    Database,
    Cloud,
    Box,
    Zap,
    Code2,
    Layers,
    Layout,
    Network,
    Server,
    Terminal,
    Wind
} from 'lucide-react'

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Cloud', 'DevOps', 'Design', 'Outils']

const WallIcon = ({ icon, delay = 0 }: { icon: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        className="tech-icon-item reflection w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-3xl shadow-2xl backdrop-blur-sm"
    >
        {icon}
    </motion.div>
)

export default function TechnologiesClient({ initialTech }: { initialTech: any[] }) {
    const [activeTab, setActiveTab] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredTech = initialTech.filter(tech => {
        const matchesTab = activeTab === 'All' || tech.category === activeTab
        const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] pt-12 pb-24 overflow-hidden">
            {/* Header Section */}
            <section className="relative py-24 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 right-0 w-full lg:w-full pointer-events-none select-none z-0"
                >
                    {/* Mobile specific gradient to protect text visibility */}
                    <div className="absolute inset-0 bg-[#020617]/80 lg:hidden z-10" />
                    <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#020617_80%)] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
                        alt="Technologies Symbiosis"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 text-center lg:text-left max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-black uppercase tracking-widest mx-auto lg:mx-0">
                            <Cpu size={14} />
                            Stack Technologique
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                            Technologies <span className="text-gradient">Catalog</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                            Explorez notre stack technologique de pointe. Nous utilisons les meilleurs outils pour transformer vos idées en réalité numérique.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <Container className="relative z-10">
                {/* 3D Icon Wall Component */}
                <div className="mt-20 mb-32 relative py-20 tech-icon-wall text-center">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl mx-auto">
                        <WallIcon icon={<Cpu className="text-blue-600 dark:text-blue-400" size={32} />} delay={0.1} />
                        <WallIcon icon={<Globe className="text-purple-600 dark:text-purple-400" size={32} />} delay={0.2} />
                        <WallIcon icon={<Smartphone className="text-cyan-600 dark:text-cyan-400" size={32} />} delay={0.3} />
                        <WallIcon icon={<Database className="text-emerald-600 dark:text-emerald-400" size={32} />} delay={0.4} />
                        <WallIcon icon={<Cloud className="text-orange-600 dark:text-orange-400" size={32} />} delay={0.5} />
                        <WallIcon icon={<Terminal className="text-pink-600 dark:text-pink-400" size={32} />} delay={0.6} />
                        <WallIcon icon={<Server className="text-indigo-600 dark:text-indigo-400" size={32} />} delay={0.7} />
                        <WallIcon icon={<Network className="text-teal-600 dark:text-teal-400" size={32} />} delay={0.8} />
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-white dark:bg-slate-900/40 p-4 rounded-3xl border border-slate-200 dark:border-white/5 backdrop-blur-xl">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === cat
                                    ? 'bg-white text-slate-950 shadow-lg'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher une technologie..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold placeholder:text-slate-500 dark:placeholder:text-slate-700"
                        />
                    </div>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {filteredTech.map((tech, index) => (
                        <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group p-8 rounded-[2rem] bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all glass-card flex flex-col h-full"
                        >
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 p-3">
                                    {tech.logo_url ? (
                                        <img src={tech.logo_url} alt={tech.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <Cpu size={32} />
                                    )}
                                </div>
                                <div className="space-y-1 pt-1">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{tech.name}</h3>
                                    <p className="text-[10px] uppercase font-black text-blue-600 dark:text-blue-400 tracking-[0.2em]">{tech.category}</p>
                                </div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium mb-6 flex-grow">
                                {tech.description}
                            </p>
                            <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">Maîtrise</span>
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{tech.proficiency}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${tech.proficiency}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredTech.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-xl font-black italic tracking-tight">Aucune technologie ne correspond à votre recherche.</p>
                    </div>
                )}
            </Container>
        </div>
    )
}
