'use client'

import React from 'react'
import { Container, Button } from '../ui'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { VideoBackground } from './VideoBackground'

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-grid-pattern transition-colors duration-300">
            <VideoBackground
                sources="/videos/hero.mp4"
                overlayClassName="bg-gradient-to-b from-white/70 via-white/50 to-white/80 dark:from-slate-950/70 dark:via-slate-950/50 dark:to-slate-950/80"
            />

            {/* Subtle ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-slate-900 dark:text-white">
                            Des idées. Des solutions. <br />
                            De l&apos;impact. <br />
                            <span className="text-gradient-primary">Faites-nous confiance</span>.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-normal">
                            Nous transformons vos défis technologiques en produits digitaux d&apos;exception.
                        </p>

                        {/* CTA Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button variant="primary" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg shadow-xl shadow-blue-600/20 group">
                                    <span>Demander un devis</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/projects" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg border-2">
                                    Explorer les réalisations
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Key Trust Signals */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-slate-200 dark:border-white/[0.08] max-w-2xl mx-auto"
                    >
                        <div className="space-y-1">
                            <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">100%</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Code propriétaire</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">99.9%</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">SLA & Disponibilité</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">&lt; 24h</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Délai de cadrage</div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
