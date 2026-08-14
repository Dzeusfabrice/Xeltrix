import React from 'react'
import { Metadata } from 'next'
import { Container, Badge, Button } from '@/components/ui'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Études de Cas & Résultats Clients',
    description: 'Découvrez comment XELTRIX résout des problématiques techniques complexes et génère un retour sur investissement mesurable pour ses clients.',
}

const detailedCaseStudies = [
    {
        id: 'fintech-gateway',
        client: 'FinAfrique Gateway',
        sector: 'Fintech & Paiement',
        title: 'Modernisation d\'une passerelle de paiement traitant +2M de transactions / mois',
        context: 'FinAfrique Gateway opère comme intermédiaire de paiement entre les banques, les opérateurs télécoms (Mobile Money) et les commerçants e-commerce dans 5 pays.',
        challenge: 'Leur ancienne infrastructure monolithique subissait des ralentissements sévères lors des pics de fin de mois (jusqu\'à 4 secondes par requête de paiement) et manquait de traçabilité temps réel.',
        solution: 'Refonte complète par XELTRIX avec une architecture micro-services en Go & Next.js, mise en place d\'un cache distribué Redis et d\'une file de messages Kafka pour absorber les pics sans dégradation.',
        stack: ['Next.js 16', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
        results: [
            { metric: '99.99%', label: 'Disponibilité garantie sur 12 mois' },
            { metric: '< 80ms', label: 'Temps de réponse moyen par transaction (-65%)' },
            { metric: '1 200+', label: 'Transactions supportées par seconde en pic' },
            { metric: '0%', label: 'Pertes de transaction lors des coupures réseau' }
        ],
        testimonial: {
            quote: 'Le passage à l\'architecture conçue par XELTRIX a transformé notre fiabilité. Nous avons pu onboarder 40 nouveaux grands comptes sans aucune instabilité technique.',
            author: 'Marc-Alexandre V., CTO FinAfrique'
        }
    },
    {
        id: 'logistics-erp',
        client: 'TransLogix Global',
        sector: 'Logistique & Fret International',
        title: 'Conception d\'un ERP unifié de traçabilité de fret et gestion de flotte connectée',
        context: 'TransLogix gère une flotte de plus de 350 camions et 5 hubs logistiques régionaux pour le transport de marchandises industrielles.',
        challenge: 'La gestion reposait sur des fichiers Excel dispersés, des bons de livraison papier et un suivi GPS non synchronisé, entraînant des retards de facturation allant jusqu\'à 45 jours.',
        solution: 'Développement d\'une suite logicielle complète : une application web desktop (Tauri/React) pour les répartiteurs, une application mobile hors-ligne pour les chauffeurs (Flutter) et un portail client de suivi en direct.',
        stack: ['Tauri', 'Rust', 'Flutter', 'PostGIS', 'PostgreSQL', 'Supabase', 'Node.js'],
        results: [
            { metric: '+50%', label: 'De gain de temps sur le traitement administratif' },
            { metric: '24h', label: 'Délai d\'émission des factures (vs 45 jours auparavant)' },
            { metric: '350+', label: 'Véhicules géolocalisés et suivis en temps réel' },
            { metric: '100%', label: 'De traçabilité numérique des bons de livraison' }
        ],
        testimonial: {
            quote: 'XELTRIX a parfaitement compris les contraintes terrain de nos chauffeurs. L\'application fonctionne même dans les zones blanches et synchronise tout dès le retour du réseau.',
            author: 'Aminata Diallo, Directrice des Opérations TransLogix'
        }
    },
    {
        id: 'medtech-platform',
        client: 'HealthSync Portal',
        sector: 'Santé & Télémédecine',
        title: 'Plateforme sécurisée de téléconsultation médicale et dossier patient chiffré',
        context: 'Réseau de cliniques privées souhaitant proposer des téléconsultations vidéo et un accès sécurisé aux résultats d\'analyses pour leurs patients.',
        challenge: 'Respecter les normes strictes de conformité des données de santé (chiffrement de bout en bout), tout en assurant une vidéo haute définition même sur connexions mobiles à faible débit.',
        solution: 'Implémentation d\'un système WebRTC optimisé avec routage adaptatif selon la qualité du réseau, stockage d\'ordonnances numériques signées par certificat électronique et messagerie cryptée.',
        stack: ['WebRTC', 'Next.js', 'React Native', 'Supabase Auth', 'AES-256', 'Tailwind CSS'],
        results: [
            { metric: '45 000+', label: 'Patients actifs enregistrés' },
            { metric: '10 000+', label: 'Téléconsultations réalisées par mois' },
            { metric: '4.9 / 5', label: 'Satisfaction usagers et praticiens' },
            { metric: '100%', label: 'Conformité aux règles de protection des données' }
        ],
        testimonial: {
            quote: 'Un projet livré dans les délais et sans accroc technique. La fluidité vidéo et la simplicité de l\'interface ont été plébiscitées par l\'ensemble de nos médecins.',
            author: 'Dr. David Nguemo, Coordinateur Médical'
        }
    }
]

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            {/* Header Hero */}
            <section className="relative py-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] bg-grid-pattern">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-5 max-w-4xl">
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        Impact & REX
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Études de cas : des solutions logicielles qui créent de <span className="text-gradient-primary">la valeur concrète</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Découvrez comment nous abordons chaque défi technique avec une rigueur orientée business et des résultats mesurables.
                    </p>
                </Container>
            </section>

            {/* Case Studies List */}
            <section className="py-16">
                <Container className="space-y-16">
                    {detailedCaseStudies.map((study) => (
                        <div
                            key={study.id}
                            id={study.id}
                            className="scroll-mt-28 rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 p-7 sm:p-10 backdrop-blur-md shadow-sm dark:shadow-2xl space-y-8"
                        >
                            {/* Header info */}
                            <div className="space-y-2.5 pb-5 border-b border-slate-100 dark:border-white/[0.08]">
                                <div className="flex items-center gap-3">
                                    <Badge variant="primary" className="text-xs">
                                        {study.sector}
                                    </Badge>
                                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                        Client : {study.client}
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    {study.title}
                                </h2>
                            </div>

                            {/* Challenge / Solution Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2.5">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        01. Contexte initial
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {study.context}
                                    </p>
                                </div>

                                <div className="space-y-2.5">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                        02. La problématique
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {study.challenge}
                                    </p>
                                </div>

                                <div className="space-y-2.5">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                        03. L&apos;intervention XELTRIX
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {study.solution}
                                    </p>
                                </div>
                            </div>

                            {/* Quantifiable Results Grid */}
                            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 p-6 sm:p-7 space-y-3.5 shadow-sm">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                                    <TrendingUp size={15} className="text-blue-600 dark:text-blue-400" />
                                    Impact & Métriques clés obtenues
                                </h4>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pt-1">
                                    {study.results.map((res, i) => (
                                        <div key={i} className="space-y-0.5">
                                            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white text-gradient-primary">
                                                {res.metric}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                {res.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial & Stack */}
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 pt-5 border-t border-slate-100 dark:border-white/[0.08]">
                                <div className="space-y-0.5 max-w-2xl">
                                    <p className="text-sm italic text-slate-700 dark:text-slate-300">
                                        &ldquo;{study.testimonial.quote}&rdquo;
                                    </p>
                                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                        — {study.testimonial.author}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 shrink-0">
                                    {study.stack.map((tech) => (
                                        <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </Container>
            </section>
        </div>
    )
}
