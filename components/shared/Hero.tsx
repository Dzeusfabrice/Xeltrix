'use client'

import React from 'react'
import { Container, Button } from '../ui'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { VideoBackground } from './VideoBackground'

export const Hero = () => {
    return (
        <section className="relative min-h-[75vh] flex items-center pt-24 pb-16 overflow-hidden bg-grid-pattern transition-colors duration-300">
            <VideoBackground
                sources="/videos/hero.mp4"
                overlayClassName="bg-gradient-to-b from-white/70 via-white/50 to-white/80 dark:from-slate-950/70 dark:via-slate-950/50 dark:to-slate-950/80"
            />

            {/* Subtle ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        {/* Main Headline */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight text-slate-900 dark:text-white">
                            Des idées. Des solutions. <br />
                            De l&apos;impact. <br />
                            <span className="text-gradient-primary">Faites-nous confiance</span>.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                            Nous transformons vos défis technologiques en produits digitaux d&apos;exception.
                        </p>

                        {/* CTA Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button variant="primary" size="md" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-blue-600/20 group">
                                    <span>Demander un devis</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/projects" className="w-full sm:w-auto">
                                <Button variant="outline" size="md" className="w-full sm:w-auto h-14 px-8 text-base border-2 font-bold">
                                    Réalisations
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Key Trust Signals */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-white/[0.08] max-w-lg mx-auto"
                    >
                        <div className="space-y-0.5">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">100%</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Code propriétaire</div>
                        </div>
                        <div className="space-y-0.5">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">99.9%</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Disponibilité</div>
                        </div>
                        <div className="space-y-0.5">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">&lt; 24h</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Cadrage</div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
