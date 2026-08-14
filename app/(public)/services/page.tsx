import React from 'react'
import { Metadata } from 'next'
import { Container, SectionHeader, Card, Badge, Button } from '@/components/ui'
import { Globe, Smartphone, Monitor, Database, Bot, Cloud, Wrench, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Services & Expertises Logicielles',
    description: 'Découvrez nos pôles d\'expertise : Développement Web, Mobile, Desktop, SaaS, ERP sur mesure, Intelligence Artificielle et DevOps.',
}

const detailedServices = [
    {
        id: 'web',
        icon: Globe,
        title: 'Développement Web, Plateformes & SaaS',
        tagline: 'Des applications web réactives, modulaires et pensées pour la montée en charge',
        description: 'Nous concevons des portails B2B, des applications SaaS multi-tenants et des plateformes transactionnelles sécurisées en exploitant le plein potentiel de Next.js, React 19, TypeScript et des Server Components.',
        features: [
            'Architecture modulaire et Server-Side Rendering (SSR)',
            'Optimisation SEO technique et Core Web Vitals (> 90)',
            'Gestion d\'états complexes et intégration d\'APIs REST / GraphQL',
            'Tableaux de bord analytiques et passerelles de paiement'
        ],
        deliverables: ['Code source TypeScript documenté', 'Tests unitaires & E2E', 'Pipeline CI/CD', 'Documentation API OpenAPI'],
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        timeline: '3 à 8 semaines'
    },
    {
        id: 'mobile',
        icon: Smartphone,
        title: 'Applications Mobiles iOS & Android',
        tagline: 'Expérience native 120Hz et performance sans compromis',
        description: 'Développement d\'applications mobiles hybrides et cross-platform à haute fluidité. Synchronisation hors-ligne, notifications push ciblées et intégration fine avec les capteurs matériels.',
        features: [
            'Expérience utilisateur soignée avec animations 60/120 FPS',
            'Architecture Offline-First avec base de données locale sécurisée',
            'Publication et gestion des versions sur App Store et Google Play',
            'Authentification biométrique (Face ID, Touch ID, Fingerprint)'
        ],
        deliverables: ['Binaires IPA / APK & AAB', 'Configuration stores', 'Codebase unifiée iOS/Android'],
        stack: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin', 'Supabase'],
        timeline: '4 à 10 semaines'
    },
    {
        id: 'desktop',
        icon: Monitor,
        title: 'Logiciels Desktop & Systèmes Embarqués',
        tagline: 'Puissance native et empreinte mémoire minimale',
        description: 'Création de logiciels de bureau modernes et ultra-légers pour Windows, macOS et Linux via Tauri et Rust, évitant la surcharge des technologies traditionnelles.',
        features: [
            'Exécutables ultra-légers (< 15 Mo) et démarrage instantané',
            'Communication directe avec le matériel (ports séries, imprimantes, scanners)',
            'Système de mise à jour automatique chiffré (Auto-Updater)',
            'Sécurité renforcée par le typage strict et la mémoire sécurisée de Rust'
        ],
        deliverables: ['Installateurs signés (.msi, .dmg, .deb)', 'Mises à jour OTA', 'Logs et télémétrie'],
        stack: ['Tauri', 'Rust', 'TypeScript', 'Electron', 'SQLite'],
        timeline: '4 à 12 semaines'
    },
    {
        id: 'erp',
        icon: Database,
        title: 'ERP & Systèmes d\'Information sur Mesure',
        tagline: 'Digitalisez et automatisez l\'ensemble de vos processus métiers',
        description: 'Finies les solutions génériques rigides. Nous construisons des progiciels de gestion intégrés parfaitement alignés sur vos flux opérationnels : stocks, RH, CRM, logistique et facturation.',
        features: [
            'Modélisation personnalisée des entités métiers et workflows',
            'Gestion granulaire des permissions et audit trail complet',
            'Synchronisation multi-filiales et multi-devises',
            'Génération automatisée de rapports comptables et factures PDF'
        ],
        deliverables: ['ERP déployé', 'Formation des équipes', 'Guide administrateur', 'Export de données'],
        stack: ['PostgreSQL', 'Prisma / Drizzle', 'FastAPI / NestJS', 'Docker', 'Redis'],
        timeline: '6 à 16 semaines'
    },
    {
        id: 'ai',
        icon: Bot,
        title: 'Intelligence Artificielle & Automatisation LLM',
        tagline: 'Propulsez votre productivité grâce à des agents IA entraînés sur vos données',
        description: 'Intégration d\'architectures RAG (Retrieval-Augmented Generation), d\'agents autonomes pour le service client, de classification documentaire automatique et de modèles de prédiction business.',
        features: [
            'Recherche sémantique vectorielle sur votre base de connaissances',
            'Agents IA conversationnels connectés à vos bases de données',
            'Extraction structurée de données depuis des documents PDF/factures',
            'Protection stricte de la confidentialité (données privées non réinjectées)'
        ],
        deliverables: ['Moteur RAG opérationnel', 'Connecteurs de données', 'Dashboard de monitoring des coûts IA'],
        stack: ['Python', 'LangChain', 'OpenAI / Claude API', 'pgvector', 'Ollama'],
        timeline: '2 à 6 semaines'
    },
    {
        id: 'devops',
        icon: Cloud,
        title: 'DevOps, Cloud & Haute Disponibilité',
        tagline: 'Infrastructures infogérées résilientes et pipelines automatisés',
        description: 'Déploiement et gestion d\'infrastructures cloud scalables. Nous configurons des pipelines de déploiement continu sans interruption de service (Zero-Downtime), avec surveillance proactive et sauvegardes automatiques.',
        features: [
            'Infrastructure as Code (Terraform, Docker Compose)',
            'Pipelines CI/CD GitHub Actions & GitLab CI',
            'Monitoring 24/7, alertes d\'incidents et métriques Prometheus/Grafana',
            'Stratégie de reprise après sinistre (Disaster Recovery Plan)'
        ],
        deliverables: ['Scripts IaC', 'Monitoring en direct', 'Certificats SSL & configurations de sécurité'],
        stack: ['Docker', 'Kubernetes', 'AWS', 'DigitalOcean', 'Supabase', 'GitHub Actions'],
        timeline: '1 à 4 semaines'
    },
    {
        id: 'maintenance',
        icon: Wrench,
        title: 'Tierce Maintenance Applicative (TMA) & SLA',
        tagline: 'Assurez la continuité, la sécurité et l\'évolution permanente de vos logiciels',
        description: 'Un partenariat sur le long terme pour garantir la disponibilité de vos applications critiques avec des engagements de temps de réponse stricts (GTI / GTR) et des montées de versions régulières.',
        features: [
            'Intervention prioritaire en cas d\'incident (SLA 99.9%)',
            'Mises à jour de sécurité et correctifs de dépendances',
            'Optimisation continue des performances et de la base de données',
            'Crédit d\'heures mensuel dédié aux nouvelles fonctionnalités'
        ],
        deliverables: ['Rapport mensuel d\'activité', 'Dashboard de santé du système', 'Canal Slack/WhatsApp direct'],
        stack: ['Monitoring Sentry', 'Datadog', 'Uptime Kuma', 'PostgreSQL Tune'],
        timeline: 'Contrat mensuel ou annuel'
    }
]

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

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            {/* Header Hero */}
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

            {/* Detailed Services Section */}
            <section className="py-16">
                <Container className="space-y-12">
                    {detailedServices.map((service) => {
                        const Icon = service.icon
                        return (
                            <div
                                key={service.id}
                                id={service.id}
                                className="scroll-mt-28 rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 p-7 sm:p-10 backdrop-blur-md shadow-sm dark:shadow-xl"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                                    {/* Left main info */}
                                    <div className="lg:col-span-7 space-y-5">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                                    {service.title}
                                                </h2>
                                                <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                                                    {service.tagline}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-2.5 pt-1">
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Ce que comprend la prestation :
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                {service.features.map((feat, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                        <CheckCircle2 size={15} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                                        <span>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stack */}
                                        <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Technologies privilégiées :
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {service.stack.map((s) => (
                                                    <span key={s} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right card: Deliverables & Action */}
                                    <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-7 space-y-5">
                                        <div>
                                            <div className="text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-3">
                                                Livrables types
                                            </div>
                                            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                {service.deliverables.map((del, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                                                        <span>{del}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                                            <span className="text-xs text-slate-500 dark:text-slate-400">Délai estimé</span>
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white font-mono">{service.timeline}</span>
                                        </div>

                                        <Link href={`/quote?service=${service.id}`} className="block">
                                            <Button variant="primary" size="md" className="w-full">
                                                <span>Demander un devis pour ce service</span>
                                                <ArrowRight size={15} />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Container>
            </section>

            {/* Agile Process / Methodology */}
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
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
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

            {/* Bottom Callout */}
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
