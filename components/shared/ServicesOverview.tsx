'use client'

import React from 'react'
import { Container, SectionHeader } from '../ui'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getServiceIcon } from '@/lib/service-icons'
import { getServiceImage } from '@/lib/service-images'
import type { Service } from '@/types/database'

export const ServicesOverview = ({ services = [] }: { services?: Service[] }) => {
    return (
        <section className="py-20 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
            {/* Background image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            />
            {/* Light mode overlay */}
            <div className="absolute inset-0 z-0 bg-white/88 dark:bg-slate-950/90 transition-colors duration-300" />
            {/* Subtle gradient vignette on edges */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50/60 via-transparent to-slate-50/60 dark:from-slate-950/60 dark:via-transparent dark:to-slate-950/60 pointer-events-none" />
            <Container className="relative z-10">
                <SectionHeader
                    badge="Pôles d'expertise"
                    title={
                        <>
                            Des solutions logicielles conçues pour <span className="text-gradient-primary">durer et scaler</span>
                        </>
                    }
                    description="Une maîtrise de l'ensemble du cycle de vie logiciel, de l'architecture préliminaire jusqu'au maintien en conditions opérationnelles."
                />

                {services.length === 0 ? (
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Les expertises seront bientôt listées ici.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => {
                            const Icon = getServiceIcon(service.icon_name)
                            const tags = (service.stack || []).slice(0, 4)

                            return (
                                <Link
                                    key={service.id}
                                    href={`/services#${service.slug}`}
                                    className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                                >
                                    <article className="relative h-full min-h-[19rem] overflow-hidden rounded-2xl border border-slate-900/10 dark:border-white/10 shadow-lg">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={getServiceImage(service)}
                                            alt=""
                                            aria-hidden="true"
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        {/* Double voile : garantit le contraste du texte quelle que soit l'image */}
                                        <div className="absolute inset-0 bg-slate-950/50" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

                                        <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                                            <div className="flex items-start justify-between">
                                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md transition-colors duration-300 group-hover:bg-blue-600 group-hover:ring-blue-400/40">
                                                    <Icon size={22} />
                                                </span>
                                                <ArrowRight
                                                    size={18}
                                                    className="text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                                                />
                                            </div>

                                            <div className="space-y-2.5">
                                                <h3 className="text-xl font-bold leading-tight text-white [text-shadow:0_1px_12px_rgba(2,6,23,0.7)]">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed text-white/85 line-clamp-3 [text-shadow:0_1px_8px_rgba(2,6,23,0.7)]">
                                                    {service.tagline || service.description}
                                                </p>

                                                {tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                                                        {tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="rounded px-2 py-0.5 text-[11px] font-mono text-white/90 bg-white/10 ring-1 ring-inset ring-white/20 backdrop-blur-sm"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            )
                        })}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        <span>Découvrir notre méthodologie et l&apos;ensemble de nos services</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </Container>
        </section>
    )
}
