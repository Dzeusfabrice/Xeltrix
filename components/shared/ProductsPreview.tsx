'use client'

import React from 'react'
import { Container, Button } from '../ui'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { getProductIcon } from '@/lib/product-icons'
import type { Product } from '@/types/database'

export const ProductsPreview = ({ products = [] }: { products?: Product[] }) => {
    // If no products, we show demo products to maintain the Play Store look
    const displayProducts = products.length > 0 ? products : [
        {
            id: 'p1',
            slug: 'zeltrix-erp',
            name: 'zeltrix ERP',
            tagline: 'Gestion d\'entreprise intégrée',
            description: 'Solution complète pour automatiser vos processus métier, de la finance aux stocks.',
            icon_name: 'Layers',
            image_url: '/assets/im1.jpg',
            rating: 5.0
        },
        {
            id: 'p2',
            slug: 'zeltrix-crm',
            name: 'zeltrix CRM',
            tagline: 'Relation client optimisée',
            description: 'Centralisez vos interactions clients et boostez votre force de vente avec l\'IA.',
            icon_name: 'Users',
            image_url: '/assets/im2.jpg',
            rating: 4.9
        },
        {
            id: 'p3',
            slug: 'zeltrix-chat',
            name: 'Chat SDK',
            tagline: 'Messagerie temps réel',
            description: 'Intégrez une messagerie sécurisée et scalable directement dans vos applications.',
            icon_name: 'MessageSquare',
            image_url: '/assets/im3.jpg',
            rating: 4.8
        }
    ]

    return (
        <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Écosystème de <span className="text-gradient-primary">produits logiciels</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                            Des briques technologiques éprouvées pour accélérer votre développement.
                        </p>
                    </div>
                    <Link href="/products">
                        <Button variant="outline" size="sm" className="h-10 rounded-xl text-xs font-black tracking-widest uppercase px-6">
                            Tous les produits
                            <ArrowRight size={14} />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProducts.slice(0, 3).map((p: any, i: number) => {
                        const Icon = getProductIcon(p.icon_name)
                        return (
                            <Link
                                key={p.id}
                                href={`/products#${p.slug}`}
                                className="group block focus-visible:outline-none h-full"
                            >
                                <article className="relative h-full flex flex-col bg-white dark:bg-slate-900/30 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1.5">
                                    {/* Play Store Style Icon/Header Area */}
                                    <div className="p-6 pb-0 flex items-start gap-4">
                                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-[1.25rem] shadow-md border border-slate-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-500 bg-slate-100 dark:bg-slate-800">
                                            <img
                                                src={p.image_url || "/assets/im1.jpg"}
                                                alt={p.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow pt-1 space-y-0.5">
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {p.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Solution</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-300">{(p as any).rating || '4.9'}</span>
                                                    <Star size={8} className="fill-amber-400 text-amber-400" />
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Installation Rapide</p>
                                        </div>
                                    </div>

                                    {/* Description & Screenshots Placeholder */}
                                    <div className="p-6 pt-4 flex-grow flex flex-col space-y-4">
                                        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                                            {p.description}
                                        </p>
                                        
                                        <div className="grid grid-cols-3 gap-2 h-24 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                                            {[1, 2, 3].map((idx) => (
                                                <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 relative aspect-[9/16]">
                                                     <img
                                                        src={`/assets/im${(i % 2 === 0 ? idx + 3 : idx + 1)}.jpg`}
                                                        alt=""
                                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                    <Icon size={12} />
                                                </div>
                                                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{p.tagline}</span>
                                            </div>
                                            <Button variant="outline" className="rounded-full px-3 h-7 text-[9px] font-black border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all uppercase tracking-widest">
                                                INSTALL
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
