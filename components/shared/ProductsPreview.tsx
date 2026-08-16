'use client'

import React, { useState } from 'react'
import { Container, SectionHeader, Badge, Button } from '../ui'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getProductIcon } from '@/lib/product-icons'
import type { Product } from '@/types/database'

export const ProductsPreview = ({ products = [] }: { products?: Product[] }) => {
    const [selectedSlug, setSelectedSlug] = useState(products[0]?.slug ?? '')
    const activeProduct = products.find((p) => p.slug === selectedSlug) || products[0]

    if (!activeProduct) {
        return (
            <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08]">
                <Container>
                    <SectionHeader
                        badge="Catalogue Produits"
                        title={<>L&apos;écosystème de produits logiciels <span className="text-gradient-primary">XELTRIX</span></>}
                        description="Les produits seront bientôt listés ici."
                    />
                </Container>
            </section>
        )
    }

    const Icon = getProductIcon(activeProduct.icon_name)
    const features = (activeProduct.modules || []).slice(0, 4)

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

                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {products.map((p) => {
                        const TabIcon = getProductIcon(p.icon_name)
                        const isActive = p.slug === activeProduct.slug
                        return (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => setSelectedSlug(p.slug)}
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
                            <div className="lg:col-span-7 space-y-5">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                                {activeProduct.name}
                                            </h3>
                                            {activeProduct.badge && (
                                                <Badge variant="primary" className="text-[10px]">
                                                    {activeProduct.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        {activeProduct.tagline && (
                                            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                                                {activeProduct.tagline}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {activeProduct.description && (
                                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                        {activeProduct.description}
                                    </p>
                                )}

                                {features.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                        {features.map((feat) => (
                                            <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check size={11} />
                                                </div>
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 pt-3">
                                    <Link href={`/contact?subject=Demo+${encodeURIComponent(activeProduct.name)}`}>
                                        <Button variant="primary" size="md">
                                            Demander une démonstration
                                            <ArrowRight size={15} />
                                        </Button>
                                    </Link>
                                    <Link href={`/products#${activeProduct.slug}`}>
                                        <Button variant="outline" size="md">
                                            En savoir plus
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 p-7 space-y-5 text-center shadow-sm">
                                    <div className="space-y-1.5">
                                        <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-mono text-gradient-primary">
                                            {activeProduct.highlight_metric || '—'}
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            {activeProduct.highlight_label || 'Indicateur clé'}
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
