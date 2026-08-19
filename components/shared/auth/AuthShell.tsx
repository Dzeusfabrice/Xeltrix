import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Cpu, ShieldCheck, Sparkles } from 'lucide-react'

const HIGHLIGHTS = [
    {
        icon: ShieldCheck,
        title: 'Sécurité de niveau entreprise',
        description: 'Sessions chiffrées, RLS et journalisation des accès.',
    },
    {
        icon: Cpu,
        title: 'Pilotage centralisé',
        description: 'Projets, publications, technologies et messages.',
    },
    {
        icon: Sparkles,
        title: 'Expérience sur mesure',
        description: 'Une console pensée pour la précision et la vitesse.',
    },
]

export const AuthShell = ({ children }: { children: React.ReactNode }) => (
    <div className="relative min-h-screen overflow-hidden bg-[#05070D] text-white">
        {/* Trame dorée d’ambiance */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-amber-300/[0.07] blur-[130px]"
        />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-blue-500/[0.08] blur-[130px]"
        />

        <div className="relative grid min-h-screen lg:grid-cols-2">
            {/* Vitrine de marque */}
            <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-white/[0.06] p-12 lg:flex xl:p-16">
                <Image
                    src="/assets/backgroundheader.jpg"
                    alt=""
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover opacity-40"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-[#05070D] via-[#05070D]/85 to-[#05070D]/60"
                />

                <div className="relative">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-amber-200"
                    >
                        <ArrowLeft size={14} />
                        Retour au site
                    </Link>
                </div>

                <div className="relative max-w-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-200/70">
                        zeltrix — Console privée
                    </p>
                    <h2 className="mt-5 font-display text-5xl font-light leading-[1.08] tracking-tight text-white xl:text-6xl">
                        L’excellence
                        <br />
                        <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text italic text-transparent">
                            se pilote
                        </span>
                        <br />
                        en coulisses.
                    </h2>
                    <div
                        aria-hidden="true"
                        className="my-8 h-px w-24 bg-gradient-to-r from-amber-200/70 to-transparent"
                    />
                    <ul className="space-y-5">
                        {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                            <li key={title} className="flex items-start gap-3.5">
                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-200/20 bg-amber-200/10 text-amber-200">
                                    <Icon size={16} />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-white/90">{title}</span>
                                    <span className="block text-xs leading-relaxed text-white/40">{description}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-[11px] uppercase tracking-[0.2em] text-white/25">
                    © {new Date().getFullYear()} zeltrix Technologies
                </p>
            </aside>

            {/* Panneau formulaire */}
            <section className="relative flex flex-col items-center justify-center px-5 py-14 sm:px-10">
                <div className="mb-10 lg:hidden">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-amber-200"
                    >
                        <ArrowLeft size={14} />
                        Retour au site
                    </Link>
                </div>
                {children}
            </section>
        </div>
    </div>
)
