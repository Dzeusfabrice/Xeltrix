'use client'

import React from 'react'
import { Container, Button, Badge } from '../ui'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Smartphone, Globe, Monitor, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export const FeaturedProjects = ({ projects }: { projects: any[] }) => {
    const displayProjects = projects && projects.length > 0 ? projects : [
        {
            id: 'demo-1',
            slug: 'fintech-saas-platform',
            title: 'Fintech Core Gateway',
            category: 'Web',
            description: 'Passerelle de paiement multi-devises haute résilience avec dashboard analytique pour les commerçants.',
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
            technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind']
        },
        {
            id: 'demo-2',
            slug: 'telemed-mobile-app',
            title: 'HealthCare Sync Mobile',
            category: 'Mobile',
            description: 'Application mobile de téléconsultation médicale avec messagerie temps réel et dossiers cryptés.',
            image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
            technologies: ['React Native', 'WebSockets', 'Supabase']
        },
        {
            id: 'demo-3',
            slug: 'logistics-erp-desktop',
            title: 'TransLogix Enterprise ERP',
            category: 'Desktop',
            description: 'Logiciel de gestion de flotte, traçabilité de fret en temps réel et facturation automatisée.',
            image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
            technologies: ['Tauri', 'Rust', 'PostgreSQL']
        }
    ]

    return (
        <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                    <div className="space-y-2.5">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Quelques-uns de nos <span className="text-gradient-primary">projets récents</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl">
                            Une ingénierie logicielle sur mesure pensée pour répondre aux défis stratégiques de nos clients.
                        </p>
                    </div>
                    <Link href="/projects">
                        <Button variant="outline" size="md">
                            Voir tout le portfolio
                            <ArrowRight size={15} />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProjects.slice(0, 3).map((p, i) => (
                                <Link
                                    href={`/projects/${p.slug}`}
                                    className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 h-full"
                                >
                                    <article className="relative h-full flex flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-blue-500/10">
                                        {/* Project Thumbnail */}
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-900">
                                            <img
                                                src={p.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[11px] font-semibold text-white border border-white/10 flex items-center gap-1.5 shadow-sm">
                                                {p.category === 'Mobile' && <Smartphone size={12} />}
                                                {p.category === 'Web' && <Globe size={12} />}
                                                {p.category === 'Desktop' && <Monitor size={12} />}
                                                <span>{p.category}</span>
                                            </div>
                                        </div>

                                        {/* Project Details */}
                                        <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between space-y-4">
                                            <div className="space-y-3">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {p.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                                                    {p.description}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {p.technologies?.slice(0, 3).map((tech: string) => (
                                                        <span key={tech} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <ArrowUpRight size={18} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
