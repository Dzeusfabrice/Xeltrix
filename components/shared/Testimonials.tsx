'use client'

import React from 'react'
import { Container } from '../ui'
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

function TestimonialCard({ t }: { t: Testimonial }) {
    const rating = t.rating ?? 5

    return (
        <div className="flex-shrink-0 w-[340px] md:w-[400px] p-8 rounded-[2.5rem] border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-pink-500/30 hover:shadow-[0_20px_40px_-10px_rgba(236,72,153,0.12)] transition-all duration-500 relative overflow-hidden group glass-card">
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Quote icon */}
            <div className="mb-6">
                <Quote size={28} className="text-pink-500/60" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}
                    />
                ))}
            </div>

            {/* Message */}
            <p className="text-slate-300 text-sm leading-relaxed mb-8 italic line-clamp-4">
                "{t.message}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden flex-shrink-0">
                    {t.photo_url ? (
                        <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-black text-lg">
                            {t.name[0].toUpperCase()}
                        </div>
                    )}
                </div>
                <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    {t.position && (
                        <div className="text-[10px] font-black uppercase tracking-widest text-pink-400 mt-0.5">
                            {t.position}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function InfiniteMarquee({ testimonials }: { testimonials: Testimonial[] }) {
    // Duplicate the list so the loop is seamless
    const doubled = [...testimonials, ...testimonials]

    return (
        <div className="relative overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    duration: testimonials.length * 6,
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
    if (!testimonials || testimonials.length === 0) return null

    return (
        <section className="py-28 bg-background relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none" />

            <Container className="mb-16">
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-sm font-black text-pink-500 uppercase tracking-[0.3em] mb-4">
                            Témoignages Clients
                        </p>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                            Ce que disent nos{' '}
                            <span className="text-gradient">clients</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto mt-4">
                            La satisfaction de nos partenaires est notre plus grande fierté. Découvrez leurs retours d'expérience.
                        </p>
                    </motion.div>
                </div>
            </Container>

            {/* Infinite scrolling cards */}
            <InfiniteMarquee testimonials={testimonials} />

            {/* Rating summary */}
            <Container className="mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 items-center"
                >
                    <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900/60 border border-white/10 glass-card">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <span className="text-white font-black text-sm ml-2">5.0</span>
                        <span className="text-slate-400 text-xs font-medium">• {testimonials.length} avis clients</span>
                    </div>
                    <div className="text-slate-500 text-xs font-medium hidden md:block">
                        Tous nos clients recommandent nos services.
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}
