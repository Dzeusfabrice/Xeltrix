'use client'

import React from 'react'
import { Container } from '../ui'
import CountUp from 'react-countup'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const Stats = ({ counts }: { counts: { projects: number, clients: number, tech: number, articles: number } }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const stats = [
        { label: 'Projets livrés', value: counts?.projects || 0, suffix: '+' },
        { label: 'Clients satisfaits', value: counts?.clients || 0, suffix: '+' },
        { label: "Techno Stack", value: counts?.tech || 0, suffix: '' },
        { label: 'Articles Blog', value: counts?.articles || 0, suffix: '+' },
    ]

    return (
        <section ref={ref} className="py-24 bg-background relative overflow-hidden">
            {/* Background glow for stats */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 glass-card space-y-3 hover:border-purple-500/30 transition-all group shadow-xl">
                            <h3 className="text-4xl md:text-5xl font-black text-white group-hover:text-purple-400 transition-colors">
                                {isInView && (
                                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                                )}
                            </h3>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
