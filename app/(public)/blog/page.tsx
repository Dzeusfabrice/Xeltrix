import React from 'react'
import { Container, Button } from '@/components/ui'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

const articles = [
    {
        title: "Comment choisir entre Flutter et React Native en 2025 ?",
        excerpt: "Le débat continue. Nous analysons les performances, l'écosystème et la productivité pour vous aider à trancher.",
        date: "12 Juin 2025",
        readTime: "8 min",
        category: "Technologie",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Le futur de Next.js et de la performance web",
        excerpt: "Découvrez comment les Server Components et les nouvelles API de routing transforment l'expérience utilisateur.",
        date: "05 Juin 2025",
        readTime: "6 min",
        category: "Actualité",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Sécuriser vos applications SaaS avec Supabase",
        excerpt: "Guide complet sur la mise en œuvre de l'authentification et des politiques RLS pour une sécurité maximale.",
        date: "28 Mai 2025",
        readTime: "12 min",
        category: "Tutoriel",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop"
    }
]

export default function BlogPage() {
    return (
        <div className="pb-24">
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <Container>
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white leading-tight">
                            Blog & <span className="text-gradient">Actualités</span>.
                        </h1>
                        <p className="text-xl text-muted leading-relaxed">
                            Partage d'expertise, analyses technologiques et nouveautés de l'univers Xeltrix.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {articles.map((a, i) => (
                            <article key={i} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                                <Link href={`/blog/${a.title.toLowerCase().replace(/ /g, '-')}`} className="block relative aspect-video overflow-hidden">
                                    <img
                                        src={a.image}
                                        alt={a.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-xs font-black uppercase tracking-widest text-primary">
                                        {a.category}
                                    </div>
                                </Link>

                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-6 text-sm text-slate-400 mb-6">
                                        <div className="font-bold flex items-center gap-2">
                                            <Calendar size={14} className="text-secondary" />
                                            {a.date}
                                        </div>
                                        <div className="font-bold flex items-center gap-2">
                                            <Clock size={14} className="text-secondary" />
                                            {a.readTime}
                                        </div>
                                    </div>

                                    <Link href={`/blog/${a.title.toLowerCase().replace(/ /g, '-')}`}>
                                        <h2 className="text-2xl font-black text-primary dark:text-white mb-4 group-hover:text-secondary transition-colors leading-snug">
                                            {a.title}
                                        </h2>
                                    </Link>

                                    <p className="text-muted leading-relaxed mb-8 line-clamp-3">
                                        {a.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                                        <Link href={`/blog/${a.title.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-primary dark:text-white font-black hover:text-secondary transition-colors italic">
                                            Lire l'article
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Button variant="outline" size="lg">
                            Charger plus d'articles
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    )
}
