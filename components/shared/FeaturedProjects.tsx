'use client'

import React from 'react'
import { Container, Button } from '../ui'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const projects = [
    {
        title: "PresenS App",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
        tech: ["Flutter", "Firebase", "Node.js"]
    },
    {
        title: "EcoDrive Portal",
        category: "Web Platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        tech: ["Next.js", "Supabase", "Tailwind"]
    },
    {
        title: "Nova CRM",
        category: "Cloud Solution",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
        tech: ["React", "PostgreSQL", "Docker"]
    }
]

export const FeaturedProjects = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-sm font-black text-secondary uppercase tracking-[0.2em]">Portfolio</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-primary dark:text-white">Nos dernières créations</h3>
                        <p className="text-muted text-lg">Découvrez comment nous aidons nos clients à transformer leur métier grâce au numérique.</p>
                    </div>
                    <Link href="/projects">
                        <Button variant="outline">
                            Voir tout le portfolio
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <div key={i} className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8">
                                <div className="text-sm font-bold text-secondary mb-2">{p.category}</div>
                                <h4 className="text-2xl font-black mb-4 text-primary dark:text-white">{p.title}</h4>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {p.tech.map((t, ti) => (
                                        <span key={ti} className="text-[10px] uppercase font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <Link href={`/projects/${p.title.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-primary dark:text-white font-bold hover:text-secondary transition-colors text-sm">
                                    Voir les détails
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
