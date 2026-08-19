'use client'

import React from 'react'
import { Container, Button, Badge } from '../ui'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Smartphone, Globe, Monitor, ArrowUpRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProductIcon } from '@/lib/product-icons'

export const FeaturedProjects = ({ products }: { products: any[] }) => {
    const displayProducts = products || []

    if (displayProducts.length === 0) return null;

    return (
        <section className="relative py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
            {/* Stealthy Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.05] dark:opacity-[0.1] grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-950" />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Briques <span className="text-gradient-primary">logicielles ZELTRIX</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                            Découvrez nos produits logiciels prêts à propulser votre croissance.
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
                    {displayProducts.slice(0, 3).map((p: any) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.slug}`}
                                    className="group block focus-visible:outline-none h-full"
                                >
                                    <article className="relative h-full flex flex-col bg-white dark:bg-slate-900/30 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1.5">
                                        {/* Watermark Icon */}
                                        <div className="absolute bottom-6 right-6 text-slate-100 dark:text-white/[0.03] pointer-events-none transform translate-x-4 translate-y-4 rotate-12">
                                            {(() => {
                                                const ProductIcon = getProductIcon(p.icon_name)
                                                return <ProductIcon size={120} strokeWidth={1} />
                                            })()}
                                        </div>

                                        {/* Play Store Style Icon Area */}
                                        <div className="p-6 pb-0 flex items-start gap-4">
                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-[1.25rem] shadow-md border border-slate-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-500 bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={p.image_url || "/assets/im1.jpg"}
                                                    alt={p.name || p.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-grow pt-1 space-y-0.5">
                                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {p.name || p.title}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{p.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-[10px] font-black text-slate-700 dark:text-slate-300">{p.rating || '4.9'}</span>
                                                        <Star size={8} className="fill-amber-400 text-amber-400" />
                                                    </div>
                                                </div>
                                                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Prêt à l&apos;emploi</p>
                                            </div>
                                        </div>

                                        {/* Description & Mini Screenshots */}
                                        <div className="p-6 pt-4 flex-grow flex flex-col space-y-4">
                                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                                                {p.description}
                                            </p>
                                            
                                            <div className="grid grid-cols-3 gap-2 h-24 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                                                {[1, 2, 3].map((idx) => (
                                                    <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 relative aspect-[9/16]">
                                                         <img
                                                            src={`/assets/im${(idx + (p.id.length % 4))}.jpg`}
                                                            alt=""
                                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{p.tagline || 'Innovation Logicielle'}</span>
                                                </div>
                                                <Button variant="outline" className="rounded-full px-3 h-7 text-[9px] font-black border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all uppercase tracking-widest">
                                                    DÉTAILS
                                                </Button>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
