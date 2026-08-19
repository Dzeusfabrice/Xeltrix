import { createClient } from '@/lib/supabase/server'
import { Container, Button } from '@/components/ui'
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const revalidate = 3600;

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient()

    const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!article) {
        notFound()
    }

    // Function to calculate estimated read time conceptually based on content length
    const getReadTime = (content: string = '') => {
        const wordsPerMinute = 200;
        const noOfWords = content.split(/\s/g).length;
        const minutes = noOfWords / wordsPerMinute;
        const readTime = Math.ceil(minutes);
        return `${readTime} min`;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] pb-32 transition-colors duration-300">
            {/* Minimalist Hero for Article */}
            <header className="relative py-48 overflow-hidden border-b border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 z-0">
                    <img
                        src={article.cover_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop"}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#020617] to-transparent" />
                </div>

                <Container className="relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] animate-pulse" />
                            {article.category || 'Actualité'}
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-t border-b border-white/5 py-8">
                            <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-purple-500" />
                                {format(new Date(article.published_at || article.created_at), 'dd MMMM yyyy', { locale: fr })}
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={14} className="text-purple-500" />
                                {getReadTime(article.content)} de lecture
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                                    X
                                </div>
                                <span className="text-white">L'équipe zeltrix</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </header>

            <Container className="pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Floating Sidebar (Desktop) */}
                    <aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
                        <div className="flex flex-col gap-6 items-center">
                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 [writing-mode:vertical-lr]">Partager</span>
                            <div className="w-px h-12 bg-slate-200 dark:bg-white/5" />
                            <Link href="#" className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/5">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/5">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/5">
                                <Share2 size={18} />
                            </Link>
                        </div>
                    </aside>

                    {/* Article Body */}
                    <article className="lg:col-span-8 space-y-12">
                        {article.excerpt && (
                            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed italic border-l-4 border-purple-600 pl-8 py-4 bg-purple-600/5 rounded-r-3xl">
                                {article.excerpt}
                            </p>
                        )}

                        <div
                            className="prose dark:prose-invert prose-purple max-w-none text-xl text-slate-500 dark:text-slate-400 font-medium leading-[1.8] space-y-8"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        >
                            {/* The dangerouslySetInnerHTML is used because we allowed basic HTML in our admin form */}
                        </div>

                        <div className="pt-24 border-t border-slate-200 dark:border-white/5">
                            <div className="p-12 rounded-[3.5rem] bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden group glass-card">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <div className="space-y-8 relative z-10 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="w-24 h-24 rounded-4xl bg-gradient-to-br from-purple-600 to-blue-600 p-1 shrink-0">
                                            <div className="w-full h-full rounded-[inherit] bg-white dark:bg-slate-900 flex items-center justify-center font-black text-4xl text-slate-900 dark:text-white">X</div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-2xl font-black text-slate-900 dark:text-white">À propos de zeltrix</h4>
                                            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                                                Laboratoire d'innovation digitale spécialisé dans l'ingénierie logicielle et le design visionnaire. Nous créons les standards de demain.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Link href="/contact">
                                            <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 uppercase tracking-widest text-xs font-black">
                                                Travaillons ensemble
                                                <ArrowRight size={16} className="ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Right Info Section */}
                    <aside className="lg:col-span-3 space-y-12">
                        <section className="space-y-6">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-500" />
                                Newsletter
                            </h4>
                            <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-6">
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Rejoignez 500+ décideurs tech pour nos analyses exclusives.</p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Votre email..."
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                    />
                                    <Button className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-500 font-black uppercase text-[10px] tracking-widest">
                                        S'inscrire
                                    </Button>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6 sticky top-32">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white" />
                                Exploration
                            </h4>
                            <div className="space-y-3">
                                {['Technologie', 'Design', 'Cloud', 'Business'].map((tag: string) => (
                                    <Link key={tag} href={`/blog?filter=${tag.toLowerCase()}`} className="block p-4 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-black uppercase tracking-widest group">
                                        <div className="flex justify-between items-center">
                                            {tag}
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </Container>
        </div>
    )
}
