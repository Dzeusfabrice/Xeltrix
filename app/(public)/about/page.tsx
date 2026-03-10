'use client'

import React from 'react'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import { CheckCircle2, Target, Eye, ShieldCheck, Rocket, Award, Users, Zap } from 'lucide-react'

const values = [
    { icon: <Target className="text-purple-500" />, title: "Mission", text: "Propulser l'innovation technologique en Afrique et dans le monde par des solutions logicielles d'exception." },
    { icon: <Eye className="text-purple-500" />, title: "Vision", text: "Devenir le partenaire de référence pour la transformation digitale des entreprises ambitieuses." },
    { icon: <ShieldCheck className="text-purple-500" />, title: "Valeurs", text: "Intégrité, Excellence, Innovation continue et Engagement client sont au cœur de notre ADN." }
]

const timeline = [
    { year: "2023", title: "Fondation de Xeltrix", text: "Création de la startup avec une vision claire : l'excellence logicielle et l'innovation sans limite." },
    { year: "2024", title: "Expansion des Services", text: "Lancement de notre pôle mobile et cloud avec des premiers succès majeurs à l'international." },
    { year: "2025", title: "Innovation Future", text: "Focus sur l'intelligence artificielle générative et l'automatisation intelligente des processus métiers." }
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Hero Section - Refined dark style */}
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent" />
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] opacity-30" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 right-0 w-full lg:w-3/4 pointer-events-none select-none z-0"
                >
                    {/* Mobile specific gradient to protect text visibility */}
                    <div className="absolute inset-0 bg-[#020617]/80 lg:hidden z-10" />
                    <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#020617_80%)] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
                        alt="About Symbiosis"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10 max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black uppercase tracking-widest">
                            <Zap size={14} />
                            L'ADN de Xeltrix
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                            Une équipe passionnée par <span className="text-gradient">l'excellence</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
                            Née d'une volonté de repousser les limites du possible, Xeltrix accompagne les entreprises visionnaires dans leur transition vers le futur.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {["Développement Agile", "Expertise Cloud", "Design Centré Utilisateur", "Architecture Scalable"].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-purple-500/50 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <span className="font-bold text-white text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Values Section - Glass Grid */}
            <section className="py-32 relative">
                <Container>
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-purple-500 font-black uppercase tracking-[0.3em] text-sm">Nos Fondations</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white">Ce qui nous anime au quotidien</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {values.map((v, i) => (
                            <motion.div
                                whileHover={{ y: -10 }}
                                key={i}
                                className="p-10 rounded-[3rem] bg-slate-900/30 border border-white/5 hover:border-purple-500/30 transition-all duration-500 text-center space-y-6 glass-card group"
                            >
                                <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 text-purple-400">
                                    {React.cloneElement(v.icon as any, { size: 36 })}
                                </div>
                                <h3 className="text-2xl font-black text-white">{v.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">{v.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Timeline Section - Premium Dark Timeline */}
            <section className="py-32 bg-slate-900/40 relative overflow-hidden border-y border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 via-transparent to-blue-600/5 opacity-50" />
                <Container className="relative z-10">
                    <div className="text-center mb-32 space-y-4">
                        <h2 className="text-purple-500 font-black uppercase tracking-[0.3em] text-sm">L'Histoire</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white">Notre parcours vers le sommet</h3>
                    </div>

                    <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 space-y-24">
                        {timeline.map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                key={i}
                                className={`relative md:w-1/2 ${i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:ml-auto md:text-left'}`}
                            >
                                {/* Dot with pulse effect */}
                                <div className="absolute top-2 -left-[11px] md:left-auto md:right-auto md:left-1/2 md:-translate-x-1/2">
                                    <div className="w-5 h-5 rounded-full bg-purple-600 z-10 relative">
                                        <div className="absolute inset-0 bg-purple-600 rounded-full animate-ping opacity-40" />
                                    </div>
                                </div>

                                <div className="pl-12 md:pl-0 space-y-4">
                                    <span className="text-purple-500 font-black text-4xl opacity-50 mb-2 block tracking-tighter">{item.year}</span>
                                    <h4 className="text-3xl font-black text-white tracking-tight">{item.title}</h4>
                                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 glass-card">
                                        <p className="text-slate-400 leading-relaxed font-medium">{item.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Team/Features Quick Section */}
            <section className="py-32">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Award />, label: "Excellence", value: "Qualité Premium" },
                            { icon: <Users />, label: "Support", value: "Accompagnement H24" },
                            { icon: <Rocket />, label: "Vitesse", value: "Livraison Agile" },
                            { icon: <ShieldCheck />, label: "Sécurité", value: "Zéro Compromis" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center space-y-4 group p-6 rounded-3xl hover:bg-white/5 transition-all">
                                <div className="text-purple-500 mb-2 flex justify-center group-hover:scale-125 transition-transform duration-500">
                                    {React.cloneElement(stat.icon, { size: 32 })}
                                </div>
                                <div className="font-black text-white text-lg tracking-tight">{stat.value}</div>
                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
