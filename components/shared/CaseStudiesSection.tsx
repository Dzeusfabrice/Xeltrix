'use client'

import React from 'react'
import { Container, Card, Badge, Button } from '../ui'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
    {
        id: 'fintech-gateway',
        client: 'FinAfrique Gateway',
        sector: 'Fintech & Paiement',
        title: 'Refonte d\'une infrastructure de paiement traitant +2M transactions / mois',
        summary: 'Migration complète d\'un monolithe vers des microservices haute résilience avec latence API inférieure à 80ms.',
        metrics: [
            { label: 'Disponibilité', value: '99.99%' },
            { label: 'Latence API', value: '-65%' },
            { label: 'Transactions/sec', value: '1 200+' }
        ],
        tags: ['Next.js', 'PostgreSQL', 'Docker', 'Redis']
    },
    {
        id: 'logistics-erp',
        client: 'TransLogix Global',
        sector: 'Logistique & Transport',
        title: 'ERP de traçabilité de fret et gestion de flotte connectée en temps réel',
        summary: 'Plateforme unifiée web et mobile intégrant la télématique GPS et la facturation instantanée pour 350+ camions.',
        metrics: [
            { label: 'Gain admin', value: '+50%' },
            { label: 'Flotte connectée', value: '350+ camions' },
            { label: 'Délai facturation', value: '24h' }
        ],
        tags: ['Flutter', 'Tauri', 'FastAPI', 'PostGIS']
    },
    {
        id: 'medtech-platform',
        client: 'HealthSync Portal',
        sector: 'Santé & Télémédecine',
        title: 'Plateforme sécurisée de téléconsultation et dossier patient crypté',
        summary: 'Application médicale avec messagerie instantanée chiffrée, visioconférence WebRTC et prescriptions certifiées.',
        metrics: [
            { label: 'Patients actifs', value: '45 000+' },
            { label: 'Consultations', value: '10k / mois' },
            { label: 'Satisfaction', value: '4.9/5' }
        ],
        tags: ['WebRTC', 'Supabase', 'React Native', 'E2EE']
    }
]

export const CaseStudiesSection = () => {
    return (
        <section className="py-20 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-white/[0.08] relative transition-colors duration-300">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                    <div>
                        <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold mb-3">
                            Études de cas
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Des résultats concrets, <span className="text-gradient-primary">mesurables</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-2 max-w-2xl">
                            Découvrez comment nos interventions techniques résolvent des problématiques métiers critiques et génèrent un retour sur investissement tangible.
                        </p>
                    </div>
                    <Link href="/case-studies">
                        <Button variant="outline" size="md">
                            Toutes les études de cas
                            <ArrowRight size={15} />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {caseStudies.map((study) => (
                        <Card key={study.id} className="flex flex-col justify-between p-7 group hover:border-blue-500/40 transition-all">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                        {study.sector}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        {study.client}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                    {study.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {study.summary}
                                </p>

                                {/* Key Metrics Grid */}
                                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl">
                                    {study.metrics.map((m, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono text-gradient-primary">
                                                {m.value}
                                            </div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                                {m.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex flex-wrap gap-1.5">
                                    {study.tags.map((t) => (
                                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={`/case-studies#${study.id}`}
                                    className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
                                >
                                    Lire l&apos;étude <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    )
}
