import React from 'react'
import { Metadata } from 'next'
import { Container, Badge, Button } from '@/components/ui'
import { Database, Users, MessageSquare, Tablet, BarChart3, ArrowRight, CheckCircle2, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Produits & Solutions Logicielles',
    description: 'Explorez la gamme de produits XELTRIX : Xeltrix ERP, CRM, Chat SDK, Kiosk et Analytics. Des briques logicielles prêtes à accélérer votre entreprise.',
}

const productsList = [
    {
        id: 'erp',
        name: 'Xeltrix ERP',
        badge: 'Enterprise Suite',
        tagline: 'Progiciel de gestion intégrée agile, modulaire et ultra-performant',
        icon: Database,
        description: 'Xeltrix ERP centralise et automatise l\'ensemble des processus opérationnels : achats, ventes, facturation électronique, gestion des stocks multi-entrepôts, suivi de trésorerie et conformité fiscale.',
        modules: [
            'Facturation & Comptabilité analytique automatisée',
            'Gestion des stocks en temps réel & alertes de réapprovisionnement',
            'Ressources Humaines : paie, congés, plannings & contrats',
            'Gestion de la chaîne logistique et traçabilité des livraisons',
            'API REST & Webhooks pour interconnecter vos outils existants'
        ],
        specs: {
            deployment: 'Cloud SaaS managé ou On-Premise',
            database: 'PostgreSQL avec réplication temps réel',
            security: 'Chiffrement AES-256, 2FA, conformité RGPD / OHADA',
            integrations: 'Banques, Stripe, PayPal, Factur-X, Sage, WhatsApp'
        }
    },
    {
        id: 'crm',
        name: 'Xeltrix CRM',
        badge: 'Sales Acceleration',
        tagline: 'Générateur de closing et fidélisation client assisté par IA',
        icon: Users,
        description: 'Un CRM moderne conçu pour les équipes commerciales et support. Suivez chaque opportunité de vente, automatisez les relances par email et WhatsApp, et bénéficiez d\'un scoring prédictif des leads.',
        modules: [
            'Pipeline commercial Kanban personnalisable par équipe',
            'Suivi omnicanal des interactions (Email, WhatsApp, Téléphone)',
            'Scoring prédictif des prospects basé sur l\'activité',
            'Automatisation des devis, relances et signatures électroniques',
            'Rapports de performance commerciale et prévisions de revenus'
        ],
        specs: {
            deployment: 'Cloud SaaS sécurisé',
            database: 'PostgreSQL / Redis cache',
            security: 'Contrôle d\'accès par rôle (RBAC)',
            integrations: 'Gmail, Outlook, WhatsApp Business API, Zapier'
        }
    },
    {
        id: 'chatsdk',
        name: 'Xeltrix Chat SDK',
        badge: 'Developer Infrastructure',
        tagline: 'Moteur de messagerie instantanée temps réel & assistant IA embarqué',
        icon: MessageSquare,
        description: 'Intégrez en quelques lignes de code une expérience de chat complète (1-to-1, groupes, salons, vocaux, partage de fichiers) au sein de vos applications web et mobiles avec une latence mondiale < 50ms.',
        modules: [
            'Messagerie temps réel par WebSockets & MQTT haute résilience',
            'Support complet des messages vocaux, médias riches et réactions',
            'Chiffrement de bout en bout (E2EE) côté client',
            'Intégration d\'un bot IA de support client (RAG prêt à l\'emploi)',
            'SDK natifs pour React, React Native, Flutter, Swift et Kotlin'
        ],
        specs: {
            deployment: 'Multi-région Edge Cloud',
            latency: '< 50ms mondialement',
            security: 'Chiffrement E2EE Signal Protocol',
            integrations: 'Webhooks, Push notifications (FCM / APNs)'
        }
    },
    {
        id: 'kiosk',
        name: 'Xeltrix Kiosk',
        badge: 'Hardware & Retail',
        tagline: 'Système tactile et autonome pour bornes interactives et points de vente',
        icon: Tablet,
        description: 'Une solution logicielle robuste conçue pour les bornes en libre-service, les caisses tactiles de restaurants/magasins et les bornes d\'accueil. Fonctionne parfaitement en mode hors-ligne sans interruption.',
        modules: [
            'Architecture Offline-First avec synchronisation différée',
            'Mode Kiosk Lockdown anti-intrusion au niveau système d\'exploitation',
            'Intégration transparente avec les terminaux de paiement (TPE) et scanners',
            'Impression thermique instantanée des tickets et reçus',
            'Supervision et maintenance de la flotte à distance'
        ],
        specs: {
            deployment: 'Linux / Windows Embedded / Android',
            offline: '100% autonome sans connexion internet',
            hardware: 'Compatible TPE Ingenico, Verifone, imprimantes ESC/POS',
            telemetry: 'Monitoring d\'état de santé du matériel en direct'
        }
    },
    {
        id: 'analytics',
        name: 'Xeltrix Analytics',
        badge: 'Business Intelligence',
        tagline: 'Observabilité opérationnelle et tableaux de bord décisionnels en temps réel',
        icon: BarChart3,
        description: 'Plateforme d\'ingestion et de visualisation de données d\'entreprise. Connectez vos bases de données opérationnelles, définissez vos KPI stratégiques et recevez des alertes intelligentes sur les anomalies.',
        modules: [
            'Connecteurs prêts à l\'emploi pour PostgreSQL, MySQL, REST APIs et fichiers CSV',
            'Tableaux de bord dynamiques interactifs (ventes, trésorerie, rétention)',
            'Génération et envoi automatisé de rapports exécutifs par email',
            'Détection automatique d\'anomalies par machine learning',
            'Gestion fine des droits de consultation par département'
        ],
        specs: {
            deployment: 'Cloud SaaS ou Docker privé',
            performance: 'Requêtes analytiques sub-seconde indexées',
            security: 'Masquage automatique des données sensibles',
            export: 'PDF haute résolution, Excel, CSV, API JSON'
        }
    }
]

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            {/* Header Hero */}
            <section className="relative py-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] bg-grid-pattern">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-5 max-w-4xl">
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        Écosystème Logiciel
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Des produits conçus pour la performance et <span className="text-gradient-primary">la fiabilité opérationnelle</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Découvrez notre suite de solutions logicielles clés en main, hautement personnalisables et taillées pour les exigences des organisations en pleine croissance.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3.5 pt-3">
                        <Link href="/contact?subject=Demande+de+d%C3%A9mo">
                            <Button variant="primary" size="lg">
                                <span>Demander une démonstration guidée</span>
                                <ArrowRight size={16} />
                            </Button>
                        </Link>
                        <Link href="/quote">
                            <Button variant="outline" size="lg">
                                Estimer les coûts de déploiement
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* Products List */}
            <section className="py-16">
                <Container className="space-y-16">
                    {productsList.map((product) => {
                        const Icon = product.icon
                        return (
                            <div
                                key={product.id}
                                id={product.id}
                                className="scroll-mt-28 rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 p-7 sm:p-10 backdrop-blur-md shadow-sm dark:shadow-2xl space-y-8"
                            >
                                {/* Top Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.08]">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                            <Icon size={26} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2.5">
                                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                                    {product.name}
                                                </h2>
                                                <Badge variant="primary" className="text-xs">
                                                    {product.badge}
                                                </Badge>
                                            </div>
                                            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                                                {product.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <Link href={`/contact?subject=Demo+${encodeURIComponent(product.name)}`} className="w-full md:w-auto">
                                            <Button variant="primary" size="md" className="w-full md:w-auto">
                                                <span>Planifier une démo</span>
                                                <ArrowRight size={14} />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                                    {/* Left: Description & Modules */}
                                    <div className="lg:col-span-7 space-y-5">
                                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                            {product.description}
                                        </p>

                                        <div className="space-y-2.5 pt-1">
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Modules & Fonctionnalités clés :
                                            </h4>
                                            <div className="space-y-2">
                                                {product.modules.map((mod, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                        <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                                        <span>{mod}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Technical Specs */}
                                    <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
                                        <div className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                            <Shield size={14} className="text-blue-600 dark:text-blue-400" />
                                            Spécifications & Architecture
                                        </div>

                                        <div className="space-y-2.5 text-xs">
                                            {Object.entries(product.specs).map(([key, val]) => (
                                                <div key={key} className="p-2.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-0.5 shadow-sm">
                                                    <div className="text-slate-500 font-mono capitalize text-[11px]">
                                                        {key}
                                                    </div>
                                                    <div className="text-slate-800 dark:text-slate-200 font-medium">
                                                        {val}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                                            Possibilité d&apos;adaptation sur mesure selon vos contraintes d&apos;infrastructure.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Container>
            </section>
        </div>
    )
}
