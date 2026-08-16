import React from 'react'
import { Metadata } from 'next'
import { Container, Badge, Button } from '@/components/ui'
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getProductIcon } from '@/lib/product-icons'
import type { Product } from '@/types/database'

export const metadata: Metadata = {
    title: 'Produits & Solutions Logicielles',
    description: 'Explorez la gamme de produits XELTRIX : Xeltrix ERP, CRM, Chat SDK, Kiosk et Analytics. Des briques logicielles prêtes à accélérer votre entreprise.',
}

export const revalidate = 3600

export default async function ProductsPage() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true })

    const products = (data || []) as Product[]

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
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

            <section className="py-16">
                <Container className="space-y-16">
                    {products.length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-10 text-center text-slate-600 dark:text-slate-300">
                            Les produits seront bientôt disponibles.
                        </div>
                    ) : (
                        products.map((product) => {
                            const Icon = getProductIcon(product.icon_name)
                            const modules = product.modules || []
                            const specs = product.specs || {}

                            return (
                                <div
                                    key={product.id}
                                    id={product.slug}
                                    className="scroll-mt-28 rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 p-7 sm:p-10 backdrop-blur-md shadow-sm dark:shadow-2xl space-y-8"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.08]">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                                <Icon size={26} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2.5 flex-wrap">
                                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                                        {product.name}
                                                    </h2>
                                                    {product.badge && (
                                                        <Badge variant="primary" className="text-xs">
                                                            {product.badge}
                                                        </Badge>
                                                    )}
                                                </div>
                                                {product.tagline && (
                                                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                                                        {product.tagline}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <Link href={`/contact?subject=Demo+${encodeURIComponent(product.name)}`} className="w-full md:w-auto">
                                            <Button variant="primary" size="md" className="w-full md:w-auto">
                                                <span>Planifier une démo</span>
                                                <ArrowRight size={14} />
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                                        <div className="lg:col-span-7 space-y-5">
                                            {product.description && (
                                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                                    {product.description}
                                                </p>
                                            )}

                                            {modules.length > 0 && (
                                                <div className="space-y-2.5 pt-1">
                                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                        Modules & Fonctionnalités clés :
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {modules.map((mod) => (
                                                            <div key={mod} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                                                <span>{mod}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
                                            <div className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                                <Shield size={14} className="text-blue-600 dark:text-blue-400" />
                                                Spécifications & Architecture
                                            </div>

                                            <div className="space-y-2.5 text-xs">
                                                {Object.entries(specs).map(([key, val]) => (
                                                    <div key={key} className="p-2.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-0.5 shadow-sm">
                                                        <div className="text-slate-500 dark:text-slate-400 font-mono capitalize text-[11px]">
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
                        })
                    )}
                </Container>
            </section>
        </div>
    )
}
