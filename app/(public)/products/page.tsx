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
    description: 'Explorez la gamme de produits zeltrix : zeltrix ERP, CRM, Chat SDK, Kiosk et Analytics. Des briques logicielles prêtes à accélérer votre entreprise.',
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
            <section className="relative py-12 md:py-16 overflow-hidden border-b border-slate-200 dark:border-white/[0.08]">
                {/* Stealthy Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
                        alt="" 
                        className="w-full h-full object-cover opacity-[0.05] dark:opacity-[0.1] grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-4 max-w-3xl">
                    <Badge variant="primary" className="text-[10px] uppercase tracking-wider font-semibold">
                        Écosystème Logiciel
                    </Badge>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Des produits conçus pour la performance et <span className="text-gradient-primary">la fiabilité</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium">
                        Découvrez notre suite de solutions logicielles clés en main, hautement personnalisables et taillées pour les exigences des organisations modernes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <Link href="/contact?subject=Demande+de+d%C3%A9mo">
                            <Button variant="primary" size="md" className="h-11 px-6 text-xs">
                                <span>Demander une devis</span>
                                <ArrowRight size={14} />
                            </Button>
                        </Link>
                       
                    </div>
                </Container>
            </section>

            <section className="py-12">
                <Container className="space-y-12">
                    {products.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-10 text-center text-slate-500">
                            Les produits seront bientôt disponibles.
                        </div>
                    ) : (
                        products.map((product: Product) => {
                            const Icon = getProductIcon(product.icon_name)
                            const modules = product.modules || []
                            const specs = product.specs || {}

                            return (
                                <div
                                    key={product.id}
                                    id={product.slug}
                                    className="scroll-mt-28 rounded-[2rem] border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md shadow-sm space-y-6 transition-all hover:border-blue-500/20"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-slate-100 dark:border-white/[0.08]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                                        {product.name}
                                                    </h2>
                                                    {product.badge && (
                                                        <Badge variant="primary" className="text-[9px] py-0 px-2 h-4">
                                                            {product.badge}
                                                        </Badge>
                                                    )}
                                                </div>
                                                {product.tagline && (
                                                    <p className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mt-0.5">
                                                        {product.tagline}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <Link href={`/contact?subject=Demo+${encodeURIComponent(product.name)}`} className="w-full md:w-auto">
                                            <Button variant="primary" size="sm" className="w-full md:w-auto h-9 text-[10px] font-black uppercase tracking-widest">
                                                <span>Planifier une démo</span>
                                                <ArrowRight size={12} />
                                            </Button>
                                        </Link>
                                    </div>

                                    {product.image_url && (
                                        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 shadow-sm">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={product.image_url} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                                        <div className="lg:col-span-7 space-y-4">
                                            {product.description && (
                                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                                    {product.description}
                                                </p>
                                            )}

                                            {modules.length > 0 && (
                                                <div className="space-y-2 pt-1">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                        Fonctionnalités clés
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                                        {modules.map((mod: string) => (
                                                            <div key={mod} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                                                                <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                                                <span>{mod}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-white/5 p-5 space-y-4">
                                            <div className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                                <Shield size={12} className="text-blue-600 dark:text-blue-400" />
                                                Spécifications
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                {Object.entries(specs).slice(0, 4).map(([key, val]: [string, string]) => (
                                                    <div key={key} className="p-2.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-0.5 shadow-sm">
                                                        <div className="text-slate-400 dark:text-slate-500 font-mono capitalize text-[9px]">
                                                            {key}
                                                        </div>
                                                        <div className="text-slate-800 dark:text-slate-200 font-bold text-[10px] line-clamp-1">
                                                            {val}
                                                        </div>
                                                    </div>
                                                ))}
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
