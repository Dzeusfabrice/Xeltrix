'use client'

import React from 'react'
import { Container, Button } from '../ui'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Clock } from 'lucide-react'

export const CTASection = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-14 lg:p-16 backdrop-blur-xl text-center space-y-7 max-w-5xl mx-auto shadow-lg dark:shadow-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                        <Sparkles size={13} className="text-blue-500 animate-pulse" />
                        <span>Prêt à accélérer votre feuille de route technique ?</span>
                    </div>

                    <div className="space-y-3.5 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Transformons votre vision en un produit logiciel d&apos;exception
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                            Échangez directement avec nos ingénieurs pour cadrer vos besoins, évaluer l&apos;architecture cible et obtenir une estimation budgétaire détaillée sous 24h.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                        <Link href="/quote" className="w-full sm:w-auto">
                            <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-600/25">
                                <span>Simulateur de Devis Gratuit</span>
                                <ArrowRight size={16} />
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Prendre contact avec l&apos;équipe
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-white/[0.06] flex flex-wrap justify-center gap-6 sm:gap-8 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-blue-600 dark:text-blue-400" />
                            <span>Réponse garantie sous 24 heures</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
                            <span>Confidentialité & NDA sur demande</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
                            <span>Audit d&apos;architecture offert</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
