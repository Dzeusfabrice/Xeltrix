import React from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { Wrench, Globe, Smartphone, Monitor, Database, Bot, Cloud, CheckCircle2, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const servicesList = [
    {
        id: 'web',
        name: 'Développement Web & SaaS',
        icon: Globe,
        timeline: '3 à 8 semaines',
        stack: 'Next.js 16, TypeScript, PostgreSQL',
        status: 'Disponible'
    },
    {
        id: 'mobile',
        name: 'Applications Mobiles (iOS / Android)',
        icon: Smartphone,
        timeline: '4 à 10 semaines',
        stack: 'React Native, Flutter, Swift, Kotlin',
        status: 'Disponible'
    },
    {
        id: 'desktop',
        name: 'Logiciels Desktop & Embarqués',
        icon: Monitor,
        timeline: '4 à 12 semaines',
        stack: 'Tauri, Rust, Electron',
        status: 'Disponible'
    },
    {
        id: 'erp',
        name: 'ERP & Systèmes d\'Information Métiers',
        icon: Database,
        timeline: '6 à 16 semaines',
        stack: 'PostgreSQL, FastAPI, NestJS, Docker',
        status: 'Disponible'
    },
    {
        id: 'ai',
        name: 'Intelligence Artificielle & RAG',
        icon: Bot,
        timeline: '2 à 6 semaines',
        stack: 'Python, LangChain, OpenAI, pgvector',
        status: 'Disponible'
    },
    {
        id: 'devops',
        name: 'Cloud, DevOps & Haute Disponibilité',
        icon: Cloud,
        timeline: '1 à 4 semaines',
        stack: 'Docker, Kubernetes, AWS, CI/CD',
        status: 'Disponible'
    },
    {
        id: 'maintenance',
        name: 'Tierce Maintenance Applicative (TMA) & SLA',
        icon: Wrench,
        timeline: 'Contrat mensuel/annuel',
        stack: 'SLA 99.9%, Monitoring 24/7',
        status: 'Disponible'
    }
]

export default function AdminServicesPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Wrench size={26} className="text-blue-600 dark:text-blue-400" />
                        <span>Gestion des Expertises & Services</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Pôles d&apos;ingénierie et fiches d&apos;accompagnement logiciel.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/services" target="_blank">
                        <Button variant="outline" size="sm">
                            <span>Voir la page publique</span>
                            <ArrowUpRight size={14} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Services Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {servicesList.map((srv) => {
                    const Icon = srv.icon
                    return (
                        <Card key={srv.id} className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Icon size={20} />
                                </div>
                                <Badge variant="success" className="text-[10px]">
                                    {srv.status}
                                </Badge>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {srv.name}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                                    Stack: {srv.stack}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                                <span className="text-slate-500 dark:text-slate-400">Délai : <strong className="text-slate-800 dark:text-slate-200">{srv.timeline}</strong></span>
                                <Link href={`/services#${srv.id}`} target="_blank" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-0.5">
                                    Détails <ArrowUpRight size={12} />
                                </Link>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
