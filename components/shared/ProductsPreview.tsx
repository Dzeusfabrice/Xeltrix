'use client'

import React, { useState } from 'react'
import { Container, SectionHeader, Badge, Button } from '../ui'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getProductIcon } from '@/lib/product-icons'
import { getProductImage } from '@/lib/product-images'
import type { Product } from '@/types/database'

export const ProductsPreview = ({ products = [] }: { products?: Product[] }) => {
    const [selectedSlug, setSelectedSlug] = useState(products[0]?.slug ?? '')
    const activeProduct = products.find((p) => p.slug === selectedSlug) || products[0]

    if (!activeProduct) {
        return (
            <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08]">
                <Container>
                    <SectionHeader
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
                        className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-blue-500/30 group/card"
                    >
                        {/* Product Image Header */}
                        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={getProductImage(activeProduct)}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 sm:left-12 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 shadow-lg">
                                    <Icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                                        {activeProduct.name}
                                    </h3>
                                    {activeProduct.tagline && (
                                        <p className="text-sm sm:text-base text-white/90 font-medium drop-shadow-sm">
                                            {activeProduct.tagline}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 sm:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-7 space-y-6">
                                    {activeProduct.description && (
                                        <p className="text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                                            {activeProduct.description}
                                        </p>
                                    )}

                                    {features.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                            {features.map((feat) => (
                                                <div key={feat} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 dark:text-slate-200">
                                                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                                        <Check size={12} strokeWidth={3} />
                                                    </div>
                                                    <span className="font-medium">{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-4 pt-6">
                                        <Link href={`/contact?subject=Demo+${encodeURIComponent(activeProduct.name)}`}>
                                            <Button variant="primary" size="lg" className="h-14 px-8">
                                                Demander une démonstration
                                                <ArrowRight size={18} />
                                            </Button>
                                        </Link>
                                        <Link href={`/products#${activeProduct.slug}`}>
                                            <Button variant="outline" size="lg" className="h-14 px-8 border-2 text-slate-900 dark:text-white border-slate-200 dark:border-white/10">
                                                En savoir plus
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="lg:col-span-5">
                                    <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 p-8 space-y-6 shadow-sm">
                                        <div className="space-y-2 text-center">
                                            <div className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter font-mono">
                                                {activeProduct.highlight_metric || '—'}
                                            </div>
                                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest">
                                                {activeProduct.highlight_label || 'Indicateur clé'}
                                            </p>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/5">
                                            <div className="p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2 shadow-sm">
                                                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                    <Sparkles size={16} className="text-blue-500" />
                                                    Déploiement flexible
                                                </div>
                                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                                                    Disponible en Cloud SaaS managé par Xeltrix ou en On-Premise sur votre infrastructure privée.
                                                </p>
                                            </div>

                                            <div className="text-center">
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-500/20">
                                                    <Check size={12} strokeWidth={3} />
                                                    Support dédié & SLA inclus
                                                </span>
                                            </div>
                                        </div>
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
