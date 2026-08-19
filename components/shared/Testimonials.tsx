'use client'

import React from 'react'
import { Container, Badge } from '../ui'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

type Testimonial = {
    id: string
    name: string
    position: string | null
    photo_url: string | null
    message: string
    rating: number | null
    is_featured: boolean | null
}

const defaultTestimonials: Testimonial[] = [
    {
        id: 't1',
        name: 'Marc-Alexandre V.',
        position: 'CTO & Co-fondateur - PayAfrique',
        photo_url: null,
        message: "L'équipe de zeltrix a conçu notre passerelle de paiement avec une rigueur d'ingénierie rare. Temps de réponse divisé par trois et zéro interruption de service depuis la mise en production.",
        rating: 5,
        is_featured: true
    },
    {
        id: 't2',
        name: 'Aminata Diallo',
        position: 'Directrice des Opérations - TransLogix',
        photo_url: null,
        message: "L'ERP sur mesure développé par zeltrix a totalement fluidifié notre gestion de flotte et de facturation. Le retour sur investissement a été atteint en moins de 6 mois.",
        rating: 5,
        is_featured: true
    },
    {
        id: 't3',
        name: 'Dr. David Nguemo',
        position: 'Fondateur - HealthSync Care',
        photo_url: null,
        message: "Un travail remarquable sur l'interface et la sécurité des données médicales. La réactivité et la force de proposition technique de zeltrix font toute la différence.",
        rating: 5,
        is_featured: true
    }
]

function TestimonialCard({ t }: { t: Testimonial }) {
    const rating = t.rating ?? 5

    return (
        <div className="flex-shrink-0 w-[320px] sm:w-[380px] p-7 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 backdrop-blur-md hover:border-blue-500/30 dark:hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-sm dark:shadow-none">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}
                            />
                        ))}
                    </div>
                    <Quote size={20} className="text-slate-400 dark:text-slate-600" />
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    &ldquo;{t.message}&rdquo;
                </p>
            </div>

            <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    {t.photo_url ? (
                        <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                        t.name.charAt(0).toUpperCase()
                    )}
                </div>
                <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{t.name}</div>
                    {t.position && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                            {t.position}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function InfiniteMarquee({ testimonials }: { testimonials: Testimonial[] }) {
    const doubled = [...testimonials, ...testimonials, ...testimonials]

    return (
        <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ['0%', '-33.333%'] }}
                transition={{
                    duration: Math.max(testimonials.length * 8, 25),
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {doubled.map((t, i) => (
                    <TestimonialCard key={`${t.id}-${i}`} t={t} />
                ))}
            </motion.div>
        </div>
    )
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
    const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
            <Container className="mb-10 text-center space-y-3.5">
                {/* <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                    Confiance & Retours d&apos;expérience
                </Badge> */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Recommandé par des <span className="text-gradient-primary">dirigeants & équipes techniques</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                    La satisfaction de nos partenaires repose sur notre engagement sans compromis sur la qualité de livraison.
                </p>
            </Container>

            <InfiniteMarquee testimonials={list} />

            <Container className="mt-10 text-center">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 shadow-sm">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">4.9 / 5</span>
                    <span className="text-slate-500 dark:text-slate-400">• Note moyenne sur l&apos;ensemble de nos livrables</span>
                </div>
            </Container>
        </section>
    )
}
