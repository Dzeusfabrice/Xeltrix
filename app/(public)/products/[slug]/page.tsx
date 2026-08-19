import { createClient } from '@/lib/supabase/server'
import { Container, Button, Badge } from '@/components/ui'
import { ArrowLeft, ArrowRight, ExternalLink, Zap, Shield, Cpu, Star, ShieldCheck, CheckCircle2, Share2, Info } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductIcon } from '@/lib/product-icons'

export const revalidate = 3600;

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient()

    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!product) {
        notFound()
    }

    const Icon = getProductIcon(product.icon_name)
    const rating = 4.9; 
    const screenshots = [
        '/assets/im2.jpg', 
        '/assets/im3.jpg', 
        '/assets/im4.jpg', 
        '/assets/im5.jpg'
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#050811] pb-24 transition-colors duration-300">
            <Container className="pt-8">
                {/* Main Product Header - Play Store Style */}
                <header className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start mb-12">
                    <div className="md:col-span-3 flex justify-center md:justify-start">
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-white/10 ring-4 ring-slate-50 dark:ring-white/5 animate-in fade-in zoom-in duration-700">
                            <img
                                src={product.image_url || "/assets/im1.jpg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-9 flex flex-col justify-center space-y-4 text-center md:text-left">
                        <div className="space-y-1">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
                                <Link href="/about" className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm">ZELTRIX Technologies</Link>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{rating}</span>
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i: number) => <Star key={i} size={10} className="fill-current" />)}
                                    </div>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">(12k avis)</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95 px-8">
                                    Installer maintenant
                                    <ExternalLink size={14} />
                                </Button>
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full h-11 rounded-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black tracking-widest uppercase text-[10px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    Essai gratuit
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-white/5 max-w-xl mx-auto md:mx-0">
                            <div className="text-center md:text-left">
                                <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Catégorie</div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">Logiciel SaaS</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Stabilité</div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">Ultra-stable</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Support</div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">24/7 Premium</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Licence</div>
                                <div className="text-xs font-bold text-slate-900 dark:text-white">Pro / Entreprise</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Screenshots Gallery - Play Store Style */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Captures d&apos;écran</h3>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {screenshots.map((src: string, idx: number) => (
                            <div key={idx} className="flex-shrink-0 w-[240px] h-[426px] rounded-[1.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg snap-start bg-slate-100 dark:bg-slate-900">
                                <img
                                    src={src}
                                    alt={`Screenshot ${idx}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: About & Details */}
                    <div className="lg:col-span-8 space-y-12">
                        <section className="space-y-4">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">À propos de ce produit</h3>
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                            {product.modules && product.modules.length > 0 && (
                                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.modules.map((mod: string) => (
                                        <div key={mod} className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 size={16} className="text-blue-500" />
                                            <span>{mod}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="space-y-6 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white">Sécurité Maximale</h4>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Audit de sécurité ZELTRIX validé</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                Toutes nos briques logicielles sont soumises à des tests d'intrusion rigoureux et respectent les normes RGPD et ISO 27001. Vos données sont chiffrées de bout en bout.
                            </p>
                        </section>
                    </div>

                    {/* Right: Technical Stats & Ratings */}
                    <div className="lg:col-span-4 space-y-8 sticky top-28">
                         <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg">
                            <h4 className="text-base font-black text-slate-900 dark:text-white mb-4">Notes</h4>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{rating}</div>
                                    <div className="flex text-amber-400 justify-center mt-0.5">
                                        <Star size={8} className="fill-current" />
                                        <Star size={8} className="fill-current" />
                                        <Star size={8} className="fill-current" />
                                        <Star size={8} className="fill-current" />
                                        <Star size={8} className="fill-current" />
                                    </div>
                                    <div className="text-[9px] text-slate-500 font-black uppercase mt-1">12k avis</div>
                                </div>
                                <div className="flex-grow space-y-1">
                                    {[5, 4, 3, 2, 1].map((star: number) => (
                                        <div key={star} className="flex items-center gap-2">
                                            <span className="text-[8px] font-bold text-slate-400 w-2">{star}</span>
                                            <div className="flex-grow h-1 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-600 rounded-full" 
                                                    style={{ width: `${star === 5 ? 85 : star === 4 ? 12 : 1}%` }} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 space-y-1.5 border border-slate-100 dark:border-white/5">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-900 dark:text-white">Expert Tech</span>
                                    <span className="text-[8px] text-slate-400">Il y a 2 j</span>
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                    "La brique logicielle la plus robuste que nous ayons intégrée cette année."
                                </p>
                            </div>
                         </div>

                         <div className="p-6 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden group">
                            <h5 className="text-base font-black mb-1 relative z-10">Besoin d'aide ?</h5>
                            <p className="text-white/70 text-xs font-medium mb-6 relative z-10">Contactez nos ingénieurs pour une intégration sur mesure.</p>
                            <Link href="/contact">
                                <Button className="w-full h-11 rounded-xl bg-white text-blue-900 font-black tracking-widest uppercase text-[10px] shadow-lg active:scale-95 transition-all">
                                    Nous contacter
                                    <ArrowRight size={14} className="ml-1.5" />
                                </Button>
                            </Link>
                         </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
