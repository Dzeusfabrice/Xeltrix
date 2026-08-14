'use client'

import React, { useRef } from 'react'
import { Container } from '../ui'
import CountUp from 'react-countup'
import { useInView } from 'framer-motion'

export const Stats = ({ counts }: { counts: { projects: number, clients: number, tech: number, articles: number } }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const stats = [
        { label: 'Projets déployés avec succès', value: counts?.projects || 45, suffix: '+' },
        { label: 'Entreprises & partenaires', value: counts?.clients || 32, suffix: '+' },
        { label: 'Technologies maîtrisées', value: counts?.tech || 20, suffix: '+' },
        { label: 'Taux de satisfaction client', value: 99, suffix: '%' },
    ]

    return (
        <section ref={ref} className="py-14 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-white/[0.08] relative transition-colors duration-300">
            <Container>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-white dark:bg-slate-900/30 text-center space-y-1.5 shadow-sm dark:shadow-none hover:border-blue-500/30 transition-all"
                        >
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-slate-900 dark:text-white tracking-tight text-gradient-primary">
                                {isInView ? (
                                    <CountUp end={stat.value} duration={2.2} suffix={stat.suffix} />
                                ) : (
                                    `0${stat.suffix}`
                                )}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-snug">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
