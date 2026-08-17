import React from 'react'
import Link from 'next/link'
import { Logo } from '../shared/Logo'
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/types/database'

const FALLBACK_SERVICES = [
    { slug: 'web', title: 'Développement Web & SaaS' },
    { slug: 'mobile', title: 'Applications Mobiles' },
    { slug: 'desktop', title: 'Logiciels Desktop' },
    { slug: 'erp', title: 'ERP & Systèmes Métiers' },
    { slug: 'ai', title: 'Intelligence Artificielle' },
    { slug: 'devops', title: 'Cloud & DevOps' },
]

export const Footer = async () => {
    const currentYear = new Date().getFullYear()
    const supabase = await createClient()
    const [
        { data: servicesData },
        { data: productsData },
        { data: technologiesData },
    ] = await Promise.all([
        supabase
            .from('services')
            .select('slug, title')
            .eq('status', 'published')
            .order('sort_order', { ascending: true })
            .limit(6),
        supabase
            .from('products')
            .select('slug, name')
            .eq('status', 'published')
            .order('sort_order', { ascending: true })
            .limit(6),
        supabase
            .from('technologies')
            .select('name')
            .order('sort_order', { ascending: true })
            .limit(8),
    ])

    const serviceLinks = ((servicesData as Pick<Service, 'slug' | 'title'>[] | null) || []).length > 0
        ? (servicesData as Pick<Service, 'slug' | 'title'>[])
        : FALLBACK_SERVICES

    const productLinks = (productsData as { slug: string; name: string }[] | null) || []

    const techLinks = ((technologiesData as { name: string }[] | null) || [])

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/[0.08] pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
                    <div className="sm:col-span-2 space-y-6">
                        <Logo />
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                            Startup technologique et pôle d&apos;ingénierie logicielle. Nous concevons, développons et déployons des solutions sur mesure (Web, Mobile, Cloud, SaaS, ERP & IA) pour propulser les entreprises modernes.
                        </p>

                        <div className="flex items-center gap-3">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:border-blue-500/40 transition-all shadow-sm"
                            >
                                <Linkedin size={16} />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-500/40 transition-all shadow-sm"
                            >
                                <Github size={16} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all shadow-sm"
                            >
                                <Twitter size={16} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                            Services
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {serviceLinks.map((service) => (
                                <li key={service.slug}>
                                    <Link
                                        href={`/services#${service.slug}`}
                                        className="hover:text-blue-600 dark:hover:text-white transition-colors"
                                    >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                            Produits
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {productLinks.map((product) => (
                                <li key={product.slug}>
                                    <Link
                                        href={`/products#${product.slug}`}
                                        className="hover:text-blue-600 dark:hover:text-white transition-colors"
                                    >
                                        {product.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                            Technologies
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {techLinks.length > 0 ? (
                                techLinks.map((tech) => (
                                    <li key={tech.name}>
                                        <Link
                                            href={`/technologies`}
                                            className="hover:text-blue-600 dark:hover:text-white transition-colors"
                                        >
                                            {tech.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <Link href="/technologies" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                                        Voir notre stack
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href="/technologies" className="text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center gap-1">
                                    Toute la stack <ArrowUpRight size={12} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                            Entreprise
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">À propos</Link></li>
                            <li><Link href="/projects" className="hover:text-blue-600 dark:hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact</Link></li>
                        </ul>

                        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/5 space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Mail size={13} className="text-blue-600 dark:text-blue-400" />
                                <span>contact@xeltrix.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <MapPin size={13} className="text-blue-600 dark:text-blue-400" />
                                <span>Ngaoundéré, Cameroun</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-white/[0.08] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>
                        © {currentYear} XELTRIX Technologies. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Confidentialité</Link>
                        <Link href="/legal" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Mentions légales</Link>
                        <Link href="/admin" className="text-blue-600 dark:text-slate-500 hover:text-blue-700 dark:hover:text-slate-300 font-medium transition-colors">Espace Administration</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
