'use client'

import React from 'react'
import { Container, Button, Badge } from '../ui'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Smartphone, Globe, Monitor, ArrowUpRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export const FeaturedProjects = ({ projects }: { projects: any[] }) => {
    const displayProjects = projects && projects.length > 0 ? projects : [
        {
            id: 'demo-1',
            slug: 'fintech-saas-platform',
            title: 'Fintech Core Gateway',
            category: 'Web',
            rating: 4.9,
            description: 'Passerelle de paiement multi-devises haute résilience avec dashboard analytique pour les commerçants.',
            image_url: '/assets/im1.jpg',
            screenshots: ['/assets/im2.jpg', '/assets/im3.jpg', '/assets/im4.jpg', '/assets/im5.jpg', '/assets/im6.jpg', '/assets/im7.jpg'],
            technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind']
        },
        {
            id: 'demo-2',
            slug: 'telemed-mobile-app',
            title: 'HealthCare Sync Mobile',
            category: 'Mobile',
            rating: 4.8,
            description: 'Application mobile de téléconsultation médicale avec messagerie temps réel et dossiers cryptés.',
            image_url: '/assets/im2.jpg',
            screenshots: ['/assets/im4.jpg', '/assets/im5.jpg'],
            technologies: ['React Native', 'WebSockets', 'Supabase']
        },
        {
            id: 'demo-3',
            slug: 'logistics-erp-desktop',
            title: 'TransLogix Enterprise ERP',
            category: 'Desktop',
            rating: 5.0,
            description: 'Logiciel de gestion de flotte, traçabilité de fret en temps réel et facturation automatisée.',
            image_url: '/assets/im3.jpg',
            screenshots: ['/assets/im6.jpg', '/assets/im7.jpg'],
            technologies: ['Tauri', 'Rust', 'PostgreSQL']
        }
    ]

    return (
        <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Briques <span className="text-gradient-primary">logicielles récentes</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                            Découvrez nos dernières réalisations prêtes à être déployées.
                        </p>
                    </div>
                    <Link href="/projects">
                        <Button variant="outline" size="sm" className="h-10 rounded-xl text-xs font-black tracking-widest uppercase px-6">
                            Portfolio complet
                            <ArrowRight size={14} />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProjects.slice(0, 3).map((p: any, i) => (
                                <Link
                                    key={p.id}
                                    href={`/projects/${p.slug}`}
                                    className="group block focus-visible:outline-none h-full"
                                >
                                    <article className="relative h-full flex flex-col bg-white dark:bg-slate-900/30 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1.5">
                                        {/* Play Store Style Icon/Header Area */}
                                        <div className="p-6 pb-0 flex items-start gap-4">
                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-[1.25rem] shadow-md border border-slate-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-500 bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={p.image_url || "/assets/im1.jpg"}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-grow pt-1 space-y-0.5">
                                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {p.title}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{p.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-[10px] font-black text-slate-700 dark:text-slate-300">{p.rating || '4.9'}</span>
                                                        <Star size={8} className="fill-amber-400 text-amber-400" />
                                                    </div>
                                                </div>
                                                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Prêt à l&apos;emploi</p>
                                            </div>
                                        </div>

                                        {/* Description & Screenshots Placeholder */}
                                        <div className="p-6 pt-4 flex-grow flex flex-col space-y-4">
                                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                                                {p.description}
                                            </p>
                                            
                                            <div className="grid grid-cols-3 gap-2 h-24 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                                                {(p.screenshots || [p.image_url, p.image_url, p.image_url]).slice(0, 3).map((shot: string, idx: number) => (
                                                    <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 relative aspect-[9/16]">
                                                         <img
                                                            src={shot}
                                                            alt=""
                                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-2 flex items-center justify-between">
                                                <div className="flex -space-x-1.5">
                                                    {p.technologies?.slice(0, 3).map((tech: string) => (
                                                        <div key={tech} className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                                                            <div className="w-full h-full rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                                                <span className="text-[5px] font-black text-blue-600 dark:text-blue-400 uppercase">{tech[0]}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Button variant="outline" className="rounded-full px-3 h-7 text-[9px] font-black border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all uppercase tracking-widest">
                                                    VOIR
                                                </Button>
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
