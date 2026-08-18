import React from 'react'
import { Metadata } from 'next'
import { Container, SectionHeader, Card, Badge, Button } from '@/components/ui'
import { Target, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'À Propos de XELTRIX | Vision & Ingénierie',
    description: 'Découvrez l\'histoire, la vision et les standards d\'ingénierie qui font de XELTRIX le partenaire de référence pour les projets logiciels ambitieux.',
}

const pillars = [
    {
        icon: Target,
        title: 'Mission',
        description: 'Concevoir des logiciels fiables, évolutifs et performants qui confèrent un avantage concurrentiel décisif à nos clients.'
    },
    {
        icon: Eye,
        title: 'Vision',
        description: 'Bâtir le pôle d\'ingénierie logicielle de référence pour la transformation digitale et l\'accélération technologique.'
    },
    {
        icon: ShieldCheck,
        title: 'Exigence & Rigueur',
        description: 'Zéro compromis sur la qualité du code, la sécurité des données et la tenue de nos engagements contractuels.'
    }
]

const engineeringStandards = [
    {
        title: 'Architecture Pérenne',
        desc: 'Nous rejetons le code jetable. Chaque composant est typé, modularisé et pensé pour évoluer avec la croissance de votre entreprise.'
    },
    {
        title: 'Performance par Conception',
        desc: 'Optimisation chirurgicale des requêtes SQL, du rendu SSR, de la taille des bundles et du temps de réponse API.'
    },
    {
        title: 'Sécurité & Confidentialité',
        desc: 'Application systématique des principes du moindre privilège, chiffrement des données au repos et en transit, et audits réguliers.'
    },
    {
        title: 'Transparence Totale',
        desc: 'Accès permanent à l\'environnement de staging, rapports d\'avancement hebdomadaires et suivi clair des budgets engagés.'
    }
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] bg-grid-pattern">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-5 max-w-4xl">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Bâtisseurs de solutions logicielles <span className="text-gradient-primary">sans compromis</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        XELTRIX rassemble des ingénieurs logiciels, architectes cloud et concepteurs UI/UX animés par la passion de l&apos;artisanat technique et de la valeur client.
                    </p>
                </Container>
            </section>

            {/* Pillars Grid */}
            <section className="py-16">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pillars.map((p, idx) => {
                            const Icon = p.icon
                            return (
                                <Card key={idx} className="p-7 space-y-3.5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{p.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {p.description}
                                    </p>
                                </Card>
                            )
                        })}
                    </div>
                </Container>
            </section>

            {/* Engineering Standards */}
            <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-white/[0.08]">
                <Container>
                    <SectionHeader
                        title={
                            <>
                                Les standards de développement <span className="text-gradient-primary">XELTRIX</span>
                            </>
                        }
                        description="Nous traitons chaque ligne de code comme un actif stratégique pour votre entreprise."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {engineeringStandards.map((std, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/[0.08] space-y-2.5 shadow-sm dark:shadow-none hover:border-blue-500/30 transition-all">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{std.title}</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-10">
                                    {std.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Bottom CTA */}
            <section className="pt-16">
                <Container>
                    <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-12 text-center space-y-5 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            Envie de collaborer avec une équipe technique de confiance ?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                            Discutons ensemble de votre projet autour d&apos;un échange technique approfondi.
                        </p>
                        <div className="flex justify-center gap-3.5 pt-2">
                            <Link href="/contact">
                                <Button variant="primary" size="lg">
                                    Prendre contact
                                </Button>
                            </Link>
                            <Link href="/projects">
                                <Button variant="outline" size="lg">
                                    Voir nos réalisations
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
