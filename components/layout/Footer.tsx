import React from 'react'
import Link from 'next/link'
import { Logo } from '../shared/Logo'
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from 'lucide-react'

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/[0.08] pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
            {/* Ambient subtle glow in footer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
                    {/* Brand Info & Mission */}
                    <div className="lg:col-span-2 space-y-6">
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

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                            Expertises & Services
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/services#web" className="hover:text-blue-600 dark:hover:text-white transition-colors">Développement Web & SaaS</Link></li>
                            <li><Link href="/services#mobile" className="hover:text-blue-600 dark:hover:text-white transition-colors">Applications Mobiles</Link></li>
                            <li><Link href="/services#desktop" className="hover:text-blue-600 dark:hover:text-white transition-colors">Logiciels Desktop</Link></li>
                            <li><Link href="/services#erp" className="hover:text-blue-600 dark:hover:text-white transition-colors">ERP & Systèmes Métiers</Link></li>
                            <li><Link href="/services#ai" className="hover:text-blue-600 dark:hover:text-white transition-colors">Intelligence Artificielle</Link></li>
                            <li><Link href="/services#devops" className="hover:text-blue-600 dark:hover:text-white transition-colors">Cloud & DevOps</Link></li>
                        </ul>
                    </div>

                    {/* Products & Resources */}
                    <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                            Produits & Solutions
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/products#erp" className="hover:text-blue-600 dark:hover:text-white transition-colors">Xeltrix ERP</Link></li>
                            <li><Link href="/products#crm" className="hover:text-blue-600 dark:hover:text-white transition-colors">Xeltrix CRM</Link></li>
                            <li><Link href="/products#chatsdk" className="hover:text-blue-600 dark:hover:text-white transition-colors">Xeltrix Chat SDK</Link></li>
                            <li><Link href="/products#kiosk" className="hover:text-blue-600 dark:hover:text-white transition-colors">Xeltrix Kiosk</Link></li>
                            <li><Link href="/products#analytics" className="hover:text-blue-600 dark:hover:text-white transition-colors">Xeltrix Analytics</Link></li>
                            <li><Link href="/quote" className="text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center gap-1">Simulateur de Devis <ArrowUpRight size={12} /></Link></li>
                        </ul>
                    </div>

                    {/* Company & Contact */}
                    <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                            Entreprise
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">À propos de Xeltrix</Link></li>
                            <li><Link href="/projects" className="hover:text-blue-600 dark:hover:text-white transition-colors">Portfolio & Réalisations</Link></li>
                            <li><Link href="/case-studies" className="hover:text-blue-600 dark:hover:text-white transition-colors">Études de cas</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-white transition-colors">Blog & Insights Tech</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact & Support</Link></li>
                        </ul>

                        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/5 space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Mail size={13} className="text-blue-600 dark:text-blue-400" />
                                <span>contact@xeltrix.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <MapPin size={13} className="text-blue-600 dark:text-blue-400" />
                                <span>Ngaoundéré, Cameroun / International</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
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
