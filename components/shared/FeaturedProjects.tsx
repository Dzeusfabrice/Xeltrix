'use client'

import React from 'react'
import { Container, Button } from '../ui'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Smartphone, Globe, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

export const FeaturedProjects = ({ projects }: { projects: any[] }) => {
    return (
        <section className="py-24 bg-background border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-8 text-center md:text-left relative z-10">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em]">Portfolio Sélectionné</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">Nos dernières <span className="text-gradient">pépites</span></h3>
                        <p className="text-slate-400 text-lg font-medium">Découvrez comment nous aidons nos clients à transformer leur métier grâce au numérique.</p>
                    </div>
                    <Link href="/projects">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-14 rounded-2xl px-8 font-bold uppercase tracking-widest text-xs">
                            Voir tout le portfolio
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
                    {projects.map((p, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={p.id}
                            className="group flex flex-col h-full bg-slate-900/30 rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.15)] glass-card"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={p.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute top-6 left-6 px-4 py-2 glass !bg-slate-900/60 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 border border-white/10 flex items-center gap-2">
                                    {p.category === 'Mobile' && <Smartphone size={12} />}
                                    {p.category === 'Web' && <Globe size={12} />}
                                    {p.category === 'Desktop' && <Layers size={12} />}
                                    {p.category}
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-grow space-y-6">
                                <div className="space-y-3">
                                    <h4 className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{p.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-3">
                                        {p.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest italic">Success Story</span>
                                    <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-2 text-white font-black hover:text-blue-400 transition-colors text-xs uppercase tracking-widest group/btn">
                                        Détails
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem] bg-slate-900/20">
                        <p className="text-slate-500 font-bold italic">Bientôt de nouveaux projets d'envergure...</p>
                    </div>
                )}
            </Container>
        </section>
    )
}
