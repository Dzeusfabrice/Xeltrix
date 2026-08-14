'use client'

import React, { useState } from 'react'
import { Container, SectionHeader, Badge, Button } from '../ui'
import { Database, Users, MessageSquare, Tablet, BarChart3, ArrowRight, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const products = [
    {
        id: 'erp',
        name: 'Xeltrix ERP',
        tagline: 'Système de gestion intégrée nouvelle génération',
        description: 'Solution complète pour orchestrer vos opérations : facturation automatisée, gestion des stocks multi-entrepôts, suivi des commandes et comptabilité analytique.',
        icon: Database,
        status: 'Disponible',
        features: [
            'Architecture modulaire et personnalisable',
            'Gestion multi-devises et multi-sociétés',
            'Workflows d&apos;approbation automatisés',
            'Tableaux de bord financiers temps réel'
        ],
        highlightMetric: '40%',
        highlightLabel: 'de gain de productivité opérationnelle'
    },
    {
        id: 'crm',
        name: 'Xeltrix CRM',
        tagline: 'Pipeline commercial & relations clients automatisées',
        description: 'Optimisez chaque interaction avec vos prospects et clients grâce à un pipeline de vente visuel, des relances automatisées et un scoring prédictif des leads.',
        icon: Users,
        status: 'Disponible',
        features: [
            'Pipeline commercial Kanban interactif',
            'Synchronisation emails & appels',
            'Scoring prédictif des leads par IA',
            'Rapports d&apos;activité commerciale'
        ],
        highlightMetric: 'x2.5',
        highlightLabel: 'd&apos;accélération sur le cycle de vente'
    },
    {
        id: 'chatsdk',
        name: 'Xeltrix Chat SDK',
        tagline: 'Messagerie instantanée & support IA pour vos apps',
        description: 'Intégrez en quelques minutes un moteur de chat temps réel ultra-sécurisé, avec support des salons de discussion, messages vocaux et assistant IA conversationnel.',
        icon: MessageSquare,
        status: 'Nouvelle version',
        features: [
            'WebSockets basse latence (< 50ms)',
            'Chiffrement de bout en bout (E2EE)',
            'Intégration d&apos;agents IA de support',
            'SDK React, React Native & Flutter'
        ],
        highlightMetric: '< 50ms',
        highlightLabel: 'de latence temps réel mondiale'
    },
    {
        id: 'kiosk',
        name: 'Xeltrix Kiosk',
        tagline: 'Système interactif pour bornes et points de vente',
        description: 'Interface tactile dédiée aux bornes interactives, commandes sur place, enregistrement des visiteurs et caisses autonomes, avec résistance aux pannes réseau.',
        icon: Tablet,
        status: 'Sur mesure',
        features: [
            'Fonctionnement 100% offline-first',
            'Verrouillage système (Kiosk Lockdown)',
            'Intégration terminaux de paiement (TPE)',
            'Administration et télémétrie à distance'
        ],
        highlightMetric: '99.99%',
        highlightLabel: 'de disponibilité en environnement physique'
    },
    {
        id: 'analytics',
        name: 'Xeltrix Analytics',
        tagline: 'Observabilité business & intelligence décisionnelle',
        description: 'Centralisez vos métriques clés, visualisez vos données métiers en direct et obtenez des prévisions automatisées pour guider vos choix stratégiques.',
        icon: BarChart3,
        status: 'Disponible',
        features: [
            'Connecteurs SQL, PostgreSQL & API',
            'Visualisations graphiques interactives',
            'Alerting intelligent sur anomalies',
            'Export automatisé de rapports exécutifs'
        ],
        highlightMetric: '0 latence',
        highlightLabel: 'sur les requêtes décisionnelles'
    }
]

export const ProductsPreview = () => {
    const [selectedTab, setSelectedTab] = useState(products[0].id)
    const activeProduct = products.find(p => p.id === selectedTab) || products[0]
    const Icon = activeProduct.icon

    return (
        <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
            <Container className="relative z-10">
                <SectionHeader
                    badge="Catalogue Produits"
                    title={
                        <>
                            L&apos;écosystème de produits logiciels <span className="text-gradient-primary">XELTRIX</span>
                        </>
                    }
                    description="Des briques logicielles robustes et prêtes à l'emploi conçues par notre équipe technique pour accélérer la digitalisation de votre entreprise."
                />

                {/* Product Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {products.map((p) => {
                        const TabIcon = p.icon
                        const isActive = p.id === selectedTab
                        return (
                            <button
                                key={p.id}
                                onClick={() => setSelectedTab(p.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 border border-blue-500/30'
                                        : 'bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-white/5'
                                }`}
                            >
                                <TabIcon size={16} />
                                <span>{p.name}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Active Product Showcase */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-7 sm:p-12 backdrop-blur-xl shadow-sm dark:shadow-2xl"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                            {/* Left Content */}
                            <div className="lg:col-span-7 space-y-5">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                                {activeProduct.name}
                                            </h3>
                                            <Badge variant="primary" className="text-[10px]">
                                                {activeProduct.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                                            {activeProduct.tagline}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                    {activeProduct.description}
                                </p>

                                {/* Features List */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                    {activeProduct.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                            <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check size={11} />
                                            </div>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-3">
                                    <Link href="/contact?subject=Demande+de+d%C3%A9mo">
                                        <Button variant="primary" size="md">
                                            Demander une démonstration
                                            <ArrowRight size={15} />
                                        </Button>
                                    </Link>
                                    <Link href={`/products#${activeProduct.id}`}>
                                        <Button variant="outline" size="md">
                                            En savoir plus
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Metric & Visual Card */}
                            <div className="lg:col-span-5">
                                <div className="rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 p-7 space-y-5 text-center shadow-sm">
                                    <div className="space-y-1.5">
                                        <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-mono text-gradient-primary">
                                            {activeProduct.highlightMetric}
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            {activeProduct.highlightLabel}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1 text-left">
                                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-300 flex items-center gap-1.5">
                                            <Sparkles size={14} className="text-blue-500" />
                                            Déploiement flexible
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Disponible en Cloud SaaS managé par Xeltrix ou en On-Premise sur votre infrastructure privée.
                                        </p>
                                    </div>

                                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
                                        Support dédié & SLA contractuel inclus
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </section>
    )
}
