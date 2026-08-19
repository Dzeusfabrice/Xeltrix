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
        <section className="relative py-24 bg-slate-50 dark:bg-[#050811] border-t border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
            {/* Stealthy Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.05] dark:opacity-[0.1] grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#050811]" />
            </div>

            <Container className="relative z-10">
                <SectionHeader
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
                                    className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 h-full"
                                >
                                    <article className="relative h-full flex flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-blue-500/10">
                                        {/* Header Image */}
                                        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={getServiceImage(service)}
                                                alt=""
                                                aria-hidden="true"
                                                loading="lazy"
                                                decoding="async"
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        </div>

                                        {/* Content Area: Black text on White background */}
                                        <div className="flex-grow p-6 sm:p-8 flex flex-col justify-between space-y-4 relative">
                                            {/* Watermark Icon */}
                                            <div className="absolute bottom-6 right-6 text-slate-100 dark:text-white/[0.03] pointer-events-none transform translate-x-4 translate-y-4 rotate-12">
                                                <Icon size={120} strokeWidth={1} />
                                            </div>

                                            <div className="space-y-3 relative z-10">
                                                <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 font-medium">
                                                    {service.tagline || service.description}
                                                </p>
                                            </div>

                                            {tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5 items-center justify-between">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="rounded-lg px-2 py-0.5 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <ArrowRight
                                                        size={16}
                                                        className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1"
                                                    />
                                                </div>
                                            )}
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
