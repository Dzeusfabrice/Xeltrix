'use client'

import React from 'react'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import { BookOpen, Cpu, GraduationCap, Zap } from 'lucide-react'

interface Skill {
    id: string
    name: string
    domain: string
    tech: string
    level: number
    color: string
}

export default function ExperienceClient({ skills }: { skills: Skill[] }) {
    // Fallback skills if db is empty (for a good first impression)
    const displaySkills = skills.length > 0 ? skills : [
        { id: '1', name: "Mobile Development", domain: "Logiciel", tech: "Flutter, React Native, Kotlin", level: 95, color: "from-blue-500 to-cyan-400" },
        { id: '2', name: "Web Development", domain: "Web", tech: "Next.js, React, Tailwind, Node.js", level: 98, color: "from-purple-600 to-pink-500" },
        { id: '3', name: "UI/UX Design", domain: "UI/UX", tech: "Figma, Prototyping, Design Systems", level: 90, color: "from-orange-500 to-yellow-400" },
        { id: '4', name: "Cloud Solutions", domain: "Cloud", tech: "Supabase, Firebase, AWS", level: 85, color: "from-blue-600 to-indigo-500" },
        { id: '5', name: "Database Design", domain: "Web", tech: "PostgreSQL, MySQL, MongoDB", level: 92, color: "from-emerald-500 to-teal-400" },
        { id: '6', name: "DevOps", domain: "Cloud", tech: "Vercel, Docker, GitHub Actions", level: 80, color: "from-slate-400 to-slate-600" }
    ]

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Header section with perspective and glow */}
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 right-0 w-full lg:w-3/4 pointer-events-none select-none z-0"
                >
                    <div className="absolute inset-0 bg-[#020617]/80 lg:hidden z-10" />
                    <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#020617_80%)] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop"
                        alt="Expertise Technique Symbiosis"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black uppercase tracking-widest">
                            <Zap size={14} />
                            Ingénierie de pointe
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                            Notre Expertise <span className="text-gradient">Technique</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-2xl">
                            Nous maîtrisons les technologies les plus modernes pour garantir la performance, la sécurité et l'évolutivité de vos produits numériques.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Skills Grid with progress bars - FROM DATABASE */}
            <section className="py-32">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {displaySkills.map((skill, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                key={skill.id}
                                className="space-y-8 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 glass-card group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color || 'from-blue-500 to-cyan-400'} text-white flex items-center justify-center p-3 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                                            <BookOpen size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white tracking-tight">{skill.name}</h3>
                                            <p className="text-sm font-bold text-slate-500 italic uppercase tracking-wider">{skill.tech}</p>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black text-white/20 group-hover:text-purple-500/50 transition-colors">{skill.level}%</div>
                                </div>

                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 p-1">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 2, ease: "circOut" }}
                                            className={`h-full bg-gradient-to-r ${skill.color || 'from-blue-500 to-cyan-400'} rounded-full`}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                                        <span>Débutant</span>
                                        <span>Expert</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Philosophy Section - Ultra Professional Glass Card */}
            <section className="py-32 relative">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Pourquoi choisir notre <span className="text-purple-500">Architecture</span> ?</h2>
                            <div className="space-y-10">
                                {[
                                    { icon: <Cpu />, t: "Vitesse de développement", d: "Nous utilisons des frameworks modernes comme Next.js et Flutter pour livrer rapidement vos projets sans sacrifier la qualité." },
                                    { icon: <GraduationCap />, t: "Ingénierie de Code", d: "Notre code est propre, documenté et suit les meilleurs standards pour assurer une longévité maximale à vos applications." },
                                    { icon: <Zap />, t: "Performance Native", d: "Que ce soit sur le web ou sur mobile, nous visons l'expérience la plus fluide possible pour vos utilisateurs." }
                                ].map((item, i) => (
                                    <motion.div
                                        whileInView={{ opacity: 1, x: 0 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        transition={{ delay: i * 0.2 }}
                                        key={i}
                                        className="flex gap-8 group"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-xl shadow-purple-600/5">
                                            {React.cloneElement(item.icon as any, { size: 24 })}
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-black text-xl text-white">
                                                {item.t}
                                            </h4>
                                            <p className="text-slate-400 leading-relaxed font-medium">
                                                {item.d}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
                                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                                className="bg-gradient-to-br from-slate-900 via-slate-950 to-purple-900/40 p-16 md:p-24 rounded-[4rem] shadow-full border border-white/10 relative overflow-hidden group glass-card"
                            >
                                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />

                                <blockquote className="relative z-10 space-y-10">
                                    <div className="text-6xl text-purple-500 opacity-30 font-serif leading-none">"</div>
                                    <p className="text-3xl md:text-4xl font-black text-slate-100 italic leading-snug tracking-tight">
                                        La technologie n'est qu'un outil. Notre métier est de l'utiliser pour résoudre des problèmes concrets et créer de la valeur réelle.
                                    </p>
                                    <footer className="flex items-center gap-4">
                                        <div className="h-1px w-10 bg-purple-500" />
                                        <p className="font-black text-sm italic uppercase tracking-[0.3em] text-purple-500">Xeltrix Engineering</p>
                                    </footer>
                                </blockquote>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
