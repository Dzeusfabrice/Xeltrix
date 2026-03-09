'use client'

import React from 'react'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import { Database, Layout, Smartphone, Cloud, Code2, Figma } from 'lucide-react'

const skills = [
    { icon: <Smartphone />, name: "Mobile Development", level: 95, tech: "Flutter, React Native, Kotlin" },
    { icon: <Layout />, name: "Web Development", level: 98, tech: "Next.js, React, Tailwind, Node.js" },
    { icon: <Figma />, name: "UI/UX Design", level: 90, tech: "Figma, Prototyping, Design Systems" },
    { icon: <Cloud />, name: "Cloud Solutions", level: 85, tech: "Supabase, Firebase, AWS" },
    { icon: <Database />, name: "Database Design", level: 92, tech: "PostgreSQL, MySQL, MongoDB" },
    { icon: <Code2 />, name: "DevOps", level: 80, tech: "Vercel, Docker, GitHub Actions" }
]

export default function ExperiencePage() {
    return (
        <div className="pb-24">
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <Container>
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white leading-tight">
                            Notre Expertise <span className="text-gradient">Technique</span>.
                        </h1>
                        <p className="text-xl text-muted leading-relaxed">
                            Nous maîtrisons les technologies les plus modernes pour garantir la performance, la sécurité et l'évolutivité de vos produits numériques.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {skills.map((skill, i) => (
                            <div key={i} className="space-y-6 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center group-hover:bg-secondary transition-colors">
                                            {React.cloneElement(skill.icon as any, { size: 24 })}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-primary dark:text-white">{skill.name}</h3>
                                            <p className="text-sm text-muted">{skill.tech}</p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-black text-secondary">{skill.level}%</span>
                                </div>

                                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950 rounded-[4rem] mx-6">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-primary dark:text-white">Pourquoi choisir notre stack ?</h2>
                            <div className="space-y-6">
                                {[
                                    { t: "Vitesse de développement", d: "Nous utilisons des frameworks modernes comme Next.js et Flutter pour livrer rapidement vos projets sans sacrifier la qualité." },
                                    { t: "Maintenance facilitée", d: "Notre code est propre, documenté et suit les meilleurs standards pour assurer une longévité maximale à vos applications." },
                                    { t: "Performance native", d: "Que ce soit sur le web ou sur mobile, nous visons l'expérience la plus fluide possible pour vos utilisateurs." }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <h4 className="font-bold text-lg text-primary dark:text-white flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-secondary" />
                                            {item.t}
                                        </h4>
                                        <p className="text-muted leading-relaxed pl-4 border-l border-slate-200 dark:border-slate-800">
                                            {item.d}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-primary p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
                            <blockquote className="relative z-10 space-y-6">
                                <p className="text-2xl font-medium text-slate-200 italic leading-relaxed">
                                    "La technologie n'est qu'un outil. Notre métier est de l'utiliser pour résoudre des problèmes concrets et créer de la valeur pour votre business."
                                </p>
                                <footer className="text-white">
                                    <p className="font-black text-xl italic uppercase tracking-wider">Xeltrix Direction Technique</p>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
