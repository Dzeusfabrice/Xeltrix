'use client'

import React from 'react'
import { Container } from '../ui'
import CountUp from 'react-countup'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
    { label: 'Projets livrés', value: 45, suffix: '+' },
    { label: 'Clients satisfaits', value: 30, suffix: '+' },
    { label: "Années d'expertise", value: 5, suffix: '' },
    { label: 'Lignes de code', value: 100, suffix: 'k+' },
]

export const Stats = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-20 bg-primary text-white">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="space-y-2">
                            <h3 className="text-4xl md:text-5xl font-black">
                                {isInView && (
                                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                                )}
                            </h3>
                            <p className="text-slate-300 font-medium uppercase tracking-wider text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
