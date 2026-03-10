import { createClient } from '@/lib/supabase/server'
import { Container, Button } from '@/components/ui'
import { ArrowLeft, ArrowRight, ExternalLink, Smartphone, Globe, Layers, Zap, Shield, Cpu } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const supabase = await createClient()

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#020617] pb-32">
            {/* Project Hero - Glassmorphism style */}
            <header className="relative h-[80vh] flex items-end pb-32 overflow-hidden bg-black/60">
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[0.3] brightness-[0.4]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                </div>

                <Container className="relative z-10">
                    <div className="max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="px-6 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md">
                                {project.category}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                Étude de cas ultra-détaillée
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                            {project.title}
                        </h1>

                        <div className="max-w-2xl">
                            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </Container>
            </header>

            <Container className="pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    {/* Left: Detailed Info */}
                    <div className="lg:col-span-7 space-y-24">
                        <section className="space-y-10 group">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                                        <Zap size={18} />
                                    </div>
                                    Vision du Projet
                                </h3>
                                <div className="h-1 w-20 bg-blue-600 rounded-full group-hover:w-40 transition-all duration-700" />
                            </div>
                            <p className="text-xl text-slate-400 font-medium leading-loose italic bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 glass-card relative overflow-hidden">
                                <span className="absolute top-4 left-6 text-8xl text-white/5 font-black pointer-events-none">"</span>
                                {project.description} Nous avons conçu une architecture robuste permettant de répondre aux enjeux de performance et de scalabilité les plus exigeants de nos clients.
                            </p>
                        </section>

                        <section className="space-y-10 group">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                                        <Cpu size={18} />
                                    </div>
                                    Stack Technologique
                                </h3>
                                <div className="h-1 w-20 bg-purple-600 rounded-full group-hover:w-40 transition-all duration-700" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {['Supabase', 'Next.js', 'Framer Motion', 'Tailwind', 'TypeScript', 'Node.js'].map((tech, i) => (
                                    <div key={i} className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all text-center glass-card">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white/40">
                                            <Cpu size={24} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-10 group">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                                        <Shield size={18} />
                                    </div>
                                    Impact & Innovation
                                </h3>
                                <div className="h-1 w-20 bg-emerald-600 rounded-full group-hover:w-40 transition-all duration-700" />
                            </div>
                            <div className="p-12 md:p-16 rounded-[4rem] bg-slate-900 border border-white/5 shadow-2xl relative overflow-hidden glass-card">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-[80px]" />
                                <div className="relative z-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-2">
                                            <div className="text-4xl font-black text-white">400k+</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Utilisateurs actifs</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-4xl font-black text-white">99.9%</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Temps de disponibilité</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 font-medium leading-[1.8] text-lg">
                                        L'intégration de solutions de monitoring proactives et d'architectures orientées services a permis d'optimiser radicalement l'expérience utilisateur tout en réduisant les coûts d'infrastructure.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Sidebar Meta */}
                    <div className="lg:col-span-5 space-y-12 sticky top-32">
                        <div className="p-10 md:p-16 rounded-[4rem] bg-gradient-to-br from-slate-900 via-slate-950 to-[#020617] border border-white/5 shadow-3xl glass-card">
                            <h4 className="text-xl font-black text-white mb-12 tracking-tight">Détails de l'aventure</h4>

                            <div className="space-y-10">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-600 italic">Plateforme</span>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white">
                                            {project.category === 'Mobile' ? <Smartphone size={18} /> : project.category === 'Web' ? <Globe size={18} /> : <Layers size={18} />}
                                        </div>
                                        <span className="text-lg font-bold text-white">{project.category} Native</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-600 italic">Délai de réalisation</span>
                                    <div className="text-2xl font-black text-white tracking-tighter">18 Semaines d'ingénierie</div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-600 italic">Statut actuel</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                                        <span className="text-lg font-black text-emerald-400 tracking-tight">Déploiement en Production</span>
                                    </div>
                                </div>

                                <div className="pt-8 flex flex-col gap-6">
                                    <a href={project.url || "#"} target="_blank" rel="noopener noreferrer" className="w-full h-20 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.3em] shadow-2xl transition-all group">
                                        Visiter le site vivant
                                        <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>

                                    <Link href="/contact" className="w-full text-center py-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors">
                                        Demander un audit similaire
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* More Work Promotion */}
                        <div className="p-10 rounded-[3rem] bg-blue-600/5 border border-blue-500/10 backdrop-blur-3xl overflow-hidden relative group">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                            <h5 className="text-lg font-black text-white mb-2 relative z-10">Intéressé par {project.title} ?</h5>
                            <p className="text-slate-400 text-sm font-medium mb-8 relative z-10">Partagez votre problématique et recevez une étude technique personnalisée sous 48h.</p>
                            <Link href="/contact">
                                <Button className="w-full h-14 rounded-2xl bg-white text-blue-900 font-black tracking-widest uppercase text-xs">
                                    Parlons-en
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Footer Navigation */}
            <aside className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 p-3 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <Link href="/projects" className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-300 hover:text-white transition-all">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="px-6 border-x border-white/5 h-10 flex items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Navigation Portfolio</span>
                    </div>
                    <Link href="/projects" className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-300 hover:text-white transition-all">
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </aside>
        </div>
    )
}
