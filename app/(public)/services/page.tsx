import React from 'react'
import { Metadata } from 'next'
import { Container, SectionHeader, Badge, Button } from '@/components/ui'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getServiceIcon } from '@/lib/service-icons'
import { getServiceImage } from '@/lib/service-images'
import type { Service } from '@/types/database'

export const metadata: Metadata = {
    title: 'Services & Expertises Logicielles',
    description: 'Découvrez nos pôles d\'expertise : Développement Web, Mobile, Desktop, SaaS, ERP sur mesure, Intelligence Artificielle et DevOps.',
}

export const revalidate = 3600

const steps = [
    {
        num: '01',
        title: 'Cadrage & Architecture',
        desc: 'Analyse approfondie de vos besoins, spécifications techniques, choix de la stack et modélisation de la base de données.'
    },
    {
        num: '02',
        title: 'Design UI/UX & Prototypage',
        desc: 'Conception d\'interfaces modernes, ergonomiques et fidèles à votre marque sur Figma avant tout développement.'
    },
    {
        num: '03',
        title: 'Développement Agile en Sprints',
        desc: 'Développement itératif avec des livraisons hebdomadaires sur un environnement de prévisualisation accessible 24/7.'
    },
    {
        num: '04',
        title: 'Assurance Qualité & Tests',
        desc: 'Audit de sécurité, tests de charge, vérification du responsive et validation de conformité sur tous les navigateurs.'
    },
    {
        num: '05',
        title: 'Déploiement & Garantie',
        desc: 'Mise en production sans coupure de service, transmission de la documentation et support technique garanti.'
    }
]

export default async function ServicesPage() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true })

    const services = (data || []) as Service[]

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            <section className="relative py-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] bg-grid-pattern">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-5 max-w-4xl">
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        Ingénierie & Services
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Des expertises pointues pour chaque étape de votre <span className="text-gradient-primary">croissance technologique</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Du prototype rapide à l&apos;infrastructure d&apos;entreprise haute disponibilité, XELTRIX déploie des solutions pérennes conçues pour supporter votre passage à l&apos;échelle.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3.5 pt-3">
                        <Link href="/quote">
                            <Button variant="primary" size="lg">
                                <span>Estimer un projet en ligne</span>
                                <ArrowRight size={16} />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">
                                Discuter avec un architecte logiciel
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            <section className="py-16">
                <Container className="space-y-12">
                    {services.length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-10 text-center text-slate-600 dark:text-slate-300">
                            Les services seront bientôt disponibles. Revenez un peu plus tard.
                        </div>
                    ) : (
                        services.map((service) => {
                            const Icon = getServiceIcon(service.icon_name)
                            const features = service.features || []
                            const stack = service.stack || []
                            const deliverables = service.deliverables || []

                            return (
                                <div
                                    key={service.id}
                                    id={service.slug}
                                    className="scroll-mt-28 rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 p-7 sm:p-10 backdrop-blur-md shadow-sm dark:shadow-xl"
                                >
                                    {/* Bandeau illustré : le texte reste sur un voile sombre pour garantir le contraste */}
                                    <div className="relative -m-7 sm:-m-10 mb-7 sm:mb-10 h-48 sm:h-60 overflow-hidden rounded-t-3xl">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={getServiceImage(service)}
                                            alt=""
                                            aria-hidden="true"
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/50" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/10" />
                                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-6 sm:p-8">
                                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md">
                                                <Icon size={24} />
                                            </span>
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:0_1px_12px_rgba(2,6,23,0.7)]">
                                                    {service.title}
                                                </h2>
                                                {service.tagline && (
                                                    <p className="text-xs sm:text-sm font-medium text-white/85 [text-shadow:0_1px_8px_rgba(2,6,23,0.7)]">
                                                        {service.tagline}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                                        <div className="lg:col-span-7 space-y-5">
                                            {service.description && (
                                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                                    {service.description}
                                                </p>
                                            )}

                                            {features.length > 0 && (
                                                <div className="space-y-2.5 pt-1">
                                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                        Ce que comprend la prestation :
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                        {features.map((feat) => (
                                                            <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                                <CheckCircle2 size={15} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                                                <span>{feat}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {stack.length > 0 && (
                                                <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                        Technologies privilégiées :
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {stack.map((s) => (
                                                            <span key={s} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200">
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-7 space-y-5">
                                            {deliverables.length > 0 && (
                                                <div>
                                                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-3">
                                                        Livrables types
                                                    </div>
                                                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                        {deliverables.map((del) => (
                                                            <li key={del} className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                                                                <span>{del}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {service.timeline && (
                                                <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">Délai estimé</span>
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white font-mono">{service.timeline}</span>
                                                </div>
                                            )}

                                            <Link href={`/quote?service=${service.slug}`} className="block">
                                                <Button variant="primary" size="md" className="w-full">
                                                    <span>Demander un devis pour ce service</span>
                                                    <ArrowRight size={15} />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </Container>
            </section>

            <section className="py-16 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-white/[0.08]">
                <Container>
                    <SectionHeader
                        badge="Notre Processus"
                        title={
                            <>
                                Une méthode de livraison <span className="text-gradient-primary">transparente et cadrée</span>
                            </>
                        }
                        description="Chaque projet suit une démarche agile éprouvée pour garantir le respect des délais, des coûts et du niveau d'exigence technique."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {steps.map((step) => (
                            <div
                                key={step.num}
                                className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/[0.08] space-y-2.5 relative shadow-sm dark:shadow-none hover:border-blue-500/30 transition-all"
                            >
                                <span className="text-3xl font-black font-mono text-blue-600/30 dark:text-blue-500/30">
                                    {step.num}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="pt-16">
                <Container>
                    <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-blue-900/20 dark:via-slate-900 dark:to-indigo-900/20 p-8 sm:p-12 text-center space-y-5 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            Vous avez un cahier des charges ou une idée précise ?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                            Notre équipe technique analyse vos spécifications et vous fournit une proposition d&apos;architecture et un chiffrage sous 24h.
                        </p>
                        <div className="flex justify-center gap-3.5 pt-2">
                            <Link href="/contact">
                                <Button variant="primary" size="lg">
                                    Contact direct
                                </Button>
                            </Link>
                            <Link href="/quote">
                                <Button variant="outline" size="lg">
                                    Calculateur de budget
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
