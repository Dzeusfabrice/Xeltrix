'use client'

import React from 'react'
import { Container, SectionHeader, Card } from '../ui'
import { Globe, Smartphone, Monitor, Cloud, Database, Bot, Wrench, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
    {
        id: 'web',
        icon: Globe,
        title: 'Développement Web & SaaS',
        description: 'Applications web réactives, portails B2B et plateformes SaaS multi-tenants avec Next.js et architectures scalables.',
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind']
    },
    {
        id: 'mobile',
        icon: Smartphone,
        title: 'Applications Mobiles',
        description: 'Applications iOS & Android fluides et intuitives, avec synchronisation hors-ligne et intégration matérielle complète.',
        tags: ['React Native', 'Flutter', 'iOS & Android']
    },
    {
        id: 'desktop',
        icon: Monitor,
        title: 'Logiciels Desktop',
        description: 'Logiciels de bureau légers et sécurisés pour Windows, macOS et Linux conçus avec Tauri & Rust.',
        tags: ['Tauri', 'Rust', 'Electron']
    },
    {
        id: 'erp',
        icon: Database,
        title: 'ERP & Outils Métiers',
        description: 'Progiciels de gestion sur mesure (stocks, facturation, RH, logistique) adaptés précisément à vos processus.',
        tags: ['PostgreSQL', 'Workflow Engine', 'API Gateway']
    },
    {
        id: 'ai',
        icon: Bot,
        title: 'Intelligence Artificielle & LLM',
        description: 'Agents intelligents connectés à vos données (RAG), automatisation documentaire et modèles prédictifs.',
        tags: ['OpenAI', 'LangChain', 'RAG', 'Python']
    },
    {
        id: 'devops',
        icon: Cloud,
        title: 'DevOps & Cloud Architecture',
        description: 'Infrastructures haute disponibilité, déploiements CI/CD sans interruption et conteneurisation Docker.',
        tags: ['Docker', 'Kubernetes', 'AWS', 'Supabase']
    },
    {
        id: 'maintenance',
        icon: Wrench,
        title: 'Tierce Maintenance & SLA',
        description: 'Surveillance proactive 24/7, audits de sécurité et maintien en conditions opérationnelles avec engagement SLA 99.9%.',
        tags: ['SLA 99.9%', 'Monitoring', 'Support H24']
    }
]

export const ServicesOverview = () => {
    return (
        <section className="py-20 bg-slate-50/50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-white/[0.08] relative transition-colors duration-300">
            <Container>
                <SectionHeader
                    badge="Pôles d'expertise"
                    title={
                        <>
                            Des solutions logicielles conçues pour <span className="text-gradient-primary">durer et scaler</span>
                        </>
                    }
                    description="Une maîtrise de l'ensemble du cycle de vie logiciel, de l'architecture préliminaire jusqu'au maintien en conditions opérationnelles."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = service.icon
                        return (
                            <Link key={service.id} href={`/services#${service.id}`}>
                                <Card className="h-full flex flex-col justify-between group hover:border-blue-500/30 transition-all p-7">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-1.5 items-center justify-between">
                                        <div className="flex flex-wrap gap-1.5">
                                            {service.tags.map((tag) => (
                                                <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Card>
                            </Link>
                        )
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        <span>Découvrir notre méthodologie et l&apos;ensemble de nos services</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </Container>
        </section>
    )
}
