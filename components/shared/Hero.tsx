'use client'

import React from 'react'
import { Container, Button } from '../ui'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Cpu, Sparkles, CheckCircle2, GitBranch, FileCode2 } from 'lucide-react'
import Link from 'next/link'
import { VideoBackground } from './VideoBackground'

const CODE_LINES: React.ReactNode[] = [
    <><span className="text-slate-500">// Socle applicatif déployé pour nos clients</span></>,
    <><span className="text-purple-400">import</span> {"{"} <span className="text-blue-300">defineArchitecture</span> {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;@xeltrix/core&apos;</span></>,
    null,
    <><span className="text-purple-400">export const</span> <span className="text-blue-300">platform</span> = <span className="text-amber-300">defineArchitecture</span>({"{"}</>,
    <>{"  "}<span className="text-slate-400">produit:</span> <span className="text-emerald-300">&apos;ERP & SaaS sur mesure&apos;</span>,</>,
    <>{"  "}<span className="text-slate-400">stack:</span> [<span className="text-emerald-300">&apos;Next.js&apos;</span>, <span className="text-emerald-300">&apos;FastAPI&apos;</span>, <span className="text-emerald-300">&apos;PostgreSQL&apos;</span>],</>,
    <>{"  "}<span className="text-slate-400">securite:</span> [<span className="text-emerald-300">&apos;RBAC&apos;</span>, <span className="text-emerald-300">&apos;AES-256&apos;</span>, <span className="text-emerald-300">&apos;RGPD&apos;</span>],</>,
    <>{"  "}<span className="text-slate-400">infrastructure:</span> <span className="text-emerald-300">&apos;Cloud HA&apos;</span>,</>,
    <>{"  "}<span className="text-slate-400">ia:</span> <span className="text-blue-400">true</span>,</>,
    <>{"})"}</>,
]

const PIPELINE_STEPS = [
    { label: 'Compilation & typage strict', detail: '0 erreur', live: false },
    { label: 'Tests unitaires & end-to-end', detail: '128 passés', live: false },
    { label: 'Déploiement continu', detail: 'en direct', live: true },
]

export const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 overflow-hidden bg-grid-pattern transition-colors duration-300">
            <VideoBackground
                sources="/videos/hero.mp4"
                overlayClassName="bg-gradient-to-r from-white via-white/85 to-white/55 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950/60"
            />

            {/* Subtle ambient lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Value Proposition & CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7 space-y-7 text-center lg:text-left"
                    >
                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white">
                            L&apos;ingénierie logicielle <br className="hidden sm:inline" />
                            pour les entreprises <br className="hidden sm:inline" />
                            <span className="text-gradient-primary">hautement exigeantes</span>.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                            De la conception d&apos;architectures complexes (Web, Mobile, Cloud) au déploiement d&apos;ERP et d&apos;IA sur mesure, XELTRIX accélère votre compétitivité technologique avec une rigueur de production sans compromis.
                        </p>

                        {/* CTA Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-600/20 group">
                                    <span>Demander un devis</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/projects" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    Explorer les réalisations
                                </Button>
                            </Link>
                        </div>

                        {/* Key Trust Signals */}
                        <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-200 dark:border-white/[0.08] max-w-lg mx-auto lg:mx-0">
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">100%</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Code propriétaire</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">99.9%</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">SLA & Disponibilité</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">&lt; 24h</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Délai de cadrage</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Code & Tech Architecture Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-slate-950/90 shadow-xl dark:shadow-2xl overflow-hidden">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/60">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                                    <GitBranch size={12} className="text-blue-500" />
                                    <span>main</span>
                                    <span className="text-slate-400 dark:text-slate-600">·</span>
                                    <span>synchronisé</span>
                                </div>
                            </div>

                            {/* File Tabs */}
                            <div className="flex items-stretch text-[11px] font-mono bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/[0.08]">
                                <span className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-950 text-slate-100 border-r border-slate-200 dark:border-white/[0.08]">
                                    <FileCode2 size={12} className="text-blue-400" />
                                    xeltrix.config.ts
                                </span>
                                <span className="flex items-center px-3.5 py-2 text-slate-500 dark:text-slate-500 border-r border-slate-200 dark:border-white/[0.08]">
                                    deploy.yml
                                </span>
                            </div>

                            {/* Window Code Content */}
                            <div className="bg-slate-950 py-4 font-mono text-[11.5px] leading-6 text-slate-200 overflow-x-auto">
                                {CODE_LINES.map((line, index) => (
                                    <div key={index} className="flex gap-4 px-4 hover:bg-white/[0.03]">
                                        <span className="w-4 shrink-0 text-right text-slate-600 select-none">{index + 1}</span>
                                        <span className="whitespace-pre">{line}</span>
                                    </div>
                                ))}
                                <div className="flex gap-4 px-4">
                                    <span className="w-4 shrink-0 text-right text-slate-600 select-none">{CODE_LINES.length + 1}</span>
                                    <span className="inline-block w-[7px] h-[15px] bg-blue-400/80 animate-pulse" aria-hidden="true" />
                                </div>
                            </div>

                            {/* Delivery Pipeline */}
                            <div className="px-4 py-3.5 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/[0.08] space-y-2">
                                {PIPELINE_STEPS.map((step, index) => (
                                    <motion.div
                                        key={step.label}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                                        className="flex items-center justify-between text-[11px]"
                                    >
                                        <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                            {step.live ? (
                                                <span className="flex h-3.5 w-3.5 items-center justify-center">
                                                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                                                </span>
                                            ) : (
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                            )}
                                            {step.label}
                                        </span>
                                        <span className={step.live
                                            ? 'font-semibold text-blue-600 dark:text-blue-400'
                                            : 'font-mono text-slate-500 dark:text-slate-400'}>
                                            {step.detail}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Live Modules Cards */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-white/[0.08] grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.06] space-y-1 shadow-sm">
                                    <div className="text-[11px] font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <Cpu size={13} className="text-blue-600 dark:text-blue-400" />
                                        Modèles IA & NLP
                                    </div>
                                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Automatisation des workflows</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.06] space-y-1 shadow-sm">
                                    <div className="text-[11px] font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
                                        Souveraineté des données
                                    </div>
                                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Conformité RGPD & Chiffrement</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Highlight Badge */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 px-4 py-2.5 rounded-xl shadow-lg dark:shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-slate-900 dark:text-white">Prise en charge complète</div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400">De l&apos;architecture à la maintenance</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </Container>
        </section>
    )
}
