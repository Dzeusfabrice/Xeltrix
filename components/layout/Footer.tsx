import React from 'react'
import Link from 'next/link'
import { Logo } from '../shared/Logo'
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin } from 'lucide-react'

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-950 text-white border-t border-white/5 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Logo />
                        <p className="text-slate-400 leading-relaxed italic">
                            Xeltrix est une startup technologique spécialisée dans le développement de solutions logicielles innovantes. Nous transformons vos idées en produits numériques d'exception.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all shadow-xl">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all shadow-xl">
                                <Github size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all shadow-xl">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-purple-500">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-slate-400 hover:text-white transition-colors font-medium">Accueil</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors font-medium">À propos</Link></li>
                            <li><Link href="/projects" className="text-slate-400 hover:text-white transition-colors font-medium">Nos Projets</Link></li>
                            <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors font-medium">Blog & Actualités</Link></li>
                            <li><Link href="/technologies" className="text-slate-400 hover:text-white transition-colors font-medium">Stack Tech</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-purple-500">Contact</h4>
                        <ul className="space-y-5">
                            <li className="flex items-center gap-4 text-slate-400">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Mail className="text-purple-500" size={18} />
                                </div>
                                <span className="font-medium">contact@xeltrix.com</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-400">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <MapPin className="text-purple-500" size={18} />
                                </div>
                                <span className="font-medium">Abidjan, Côte d'Ivoire</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div>
                        <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-purple-500">Newsletter</h4>
                        <p className="text-slate-400 mb-6 text-sm italic">Restez informé de nos dernières innovations.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                            />
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20">
                                OK
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500 font-medium">
                        © {currentYear} Xeltrix International - Tous droits réservés.
                    </p>
                    <div className="flex gap-8 text-sm text-slate-500 font-medium">
                        <Link href="/legal" className="hover:text-white transition-colors">Mentions Légales</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
