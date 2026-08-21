'use client'

import React from 'react'
import { Container, Button } from '../ui'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export const CTASection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Text Content Area */}
                <div className="flex-grow flex items-center justify-center py-16 px-6 lg:px-12 lg:w-1/2 relative z-10">
                    <div className="max-w-xl space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                                Transformons votre vision en un <span className="text-gradient-primary">produit logiciel d&apos;exception</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                                Échangez directement avec nos ingénieurs pour cadrer vos besoins, évaluer l&apos;architecture cible et obtenir une estimation budgétaire sous 24h.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center gap-4"
                        >
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button variant="primary" size="lg" className="w-full h-14 px-8 text-base shadow-lg shadow-blue-600/20 group">
                                    <span>Demander un devis</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/projects" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full h-14 px-8 text-base border-2 font-bold hover:bg-slate-50 dark:hover:bg-white/5">
                                    Voir nos réalisations
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-8 border-t border-slate-100 dark:border-white/5"
                        >
                           
                        </motion.div>
                    </div>
                </div>

                {/* Video Area */}
                <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden order-first lg:order-last">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-[0.8] dark:brightness-[0.6]"
                    >
                        <source src="/videos/startup.mp4" type="video/mp4" />
                    </video>
                    
                    {/* Overlays to blend with the layout */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent dark:from-slate-950 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent dark:from-slate-950 lg:hidden" />
                    
                    {/* Visual accent */}
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay pointer-events-none" />
                    
                  
                </div>
            </div>
        </section>
    )
}
