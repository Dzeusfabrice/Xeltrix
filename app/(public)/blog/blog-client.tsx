'use client'

import React from 'react'
import { Container, Button } from '@/components/ui'
import { Calendar, Clock, ArrowRight, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function BlogClient({ articles }: { articles: any[] }) {

    // Function to calculate estimated read time conceptually based on content length
    const getReadTime = (content: string = '') => {
        const wordsPerMinute = 200;
        const noOfWords = content.split(/\s/g).length;
        const minutes = noOfWords / wordsPerMinute;
        const readTime = Math.ceil(minutes);
        return `${readTime} min`;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] pb-24 transition-colors duration-300">
            {/* Minimalist Dark Header */}
            <section className="relative py-32 overflow-hidden border-b border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 to-transparent" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 right-0 w-full lg:w-3/4 pointer-events-none select-none z-0"
                >
                    {/* Mobile specific gradient to protect text visibility */}
                    <div className="absolute inset-0 bg-[#020617]/80 lg:hidden z-10" />
                    <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#020617_80%)] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop"
                        alt="Blog Symbiosis"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <Container className="relative z-10 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black uppercase tracking-widest mx-auto lg:mx-0">
                            <MessageSquare size={14} />
                            Intelligence & Vision
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                            Blog & <span className="text-gradient">Actualités</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                            Partage d'expertise, analyses technologiques et nouveautés de l'univers zeltrix.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Articles Grid */}
            <section className="py-32">
                <Container>
                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {articles.map((a, i) => (
                                <motion.article
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={a.id}
                                    className="group flex flex-col bg-slate-50 dark:bg-slate-900/30 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-500 hover:border-purple-500/40 glass-card"
                                >
                                    <Link href={`/blog/${a.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={a.cover_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop'}
                                            alt={a.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute top-6 left-6 px-4 py-2 glass !bg-slate-900/60 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 border border-white/10">
                                            {a.category || 'Non classé'}
                                        </div>
                                    </Link>

                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-8">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-purple-500" />
                                                {format(new Date(a.published_at || a.created_at), 'dd MMMM yyyy', { locale: fr })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-purple-500" />
                                                {getReadTime(a.content)}
                                            </div>
                                        </div>

                                        <Link href={`/blog/${a.slug}`}>
                                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                                                {a.title}
                                            </h2>
                                        </Link>

                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 line-clamp-3 font-medium">
                                            {a.excerpt}
                                        </p>

                                        <div className="mt-auto pt-8 border-t border-slate-200 dark:border-white/5">
                                            <Link href={`/blog/${a.slug}`} className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-black hover:text-purple-600 dark:hover:text-purple-400 transition-all group/link text-xs uppercase tracking-widest">
                                                Lire la suite
                                                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 border border-slate-200 dark:border-white/10 border-dashed rounded-3xl bg-slate-50 dark:bg-slate-900/30">
                            <div className="w-16 h-16 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <MessageSquare size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Le blog est encore vide</h3>
                            <p className="text-slate-500 dark:text-slate-400">Revenez bientôt pour découvrir nos premiers articles passionnants.</p>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}
