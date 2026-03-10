import { createClient } from '@/lib/supabase/server'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, Quote, ArrowLeft, Star, Heart } from 'lucide-react'
import { DeleteTestimonialButton } from '@/app/admin/testimonials/delete-button'

export default async function AdminTestimonialsPage() {
    const supabase = await createClient()

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <ArrowLeft size={20} className="text-slate-400" />
                            </Link>
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                    <Quote size={18} className="text-pink-500" />
                                    Témoignages Clients
                                </span>
                                <span className="text-xs text-slate-400">Dites ce que vos clients pensent</span>
                            </div>
                        </div>

                        <Link href="/admin/testimonials/new">
                            <Button className="bg-pink-600 hover:bg-pink-500 border-none px-6">
                                <Plus size={16} className="mr-2" />
                                Nouveau témoignage
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <Container className="pt-12">
                {error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                        Erreur: {error.message}
                    </div>
                ) : testimonials?.length === 0 ? (
                    <div className="text-center py-24 border border-white/10 border-dashed rounded-3xl bg-slate-900/30">
                        <div className="w-16 h-16 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Quote size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Aucun témoignage trouvé</h3>
                        <p className="text-slate-400 mb-6">Ajoutez les retours clients les plus impactants pour rassurer vos prospects.</p>
                        <Link href="/admin/testimonials/new">
                            <Button className="bg-pink-600 hover:bg-pink-500">Ajouter mon premier témoignage</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials?.map((t) => (
                            <div key={t.id} className="p-8 bg-slate-900/40 border border-white/10 rounded-[2.5rem] relative overflow-hidden group hover:border-pink-500/30 transition-all glass-card">
                                {t.is_featured && (
                                    <div className="absolute top-6 right-6">
                                        <Heart size={20} className="text-pink-500 fill-pink-500" />
                                    </div>
                                )}

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-800 overflow-hidden border border-white/10">
                                        {t.photo_url ? (
                                            <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-500 font-black text-xl">{t.name[0]}</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white tracking-tight">{t.name}</div>
                                        <div className="text-[10px] uppercase font-black text-pink-400 tracking-widest">{t.position || 'Client'}</div>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < (t.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-slate-800"}
                                        />
                                    ))}
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-10 italic">
                                    "{t.message}"
                                </p>

                                <div className="pt-8 border-t border-white/5 flex items-center justify-end gap-3">
                                    <Link href={`/admin/testimonials/edit/${t.id}`}>
                                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/5">
                                            <Edit2 size={16} />
                                        </button>
                                    </Link>
                                    <DeleteTestimonialButton id={t.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}
