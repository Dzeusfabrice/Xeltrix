import { createClient } from '@/lib/supabase/server'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, Quote, ArrowLeft, Star } from 'lucide-react'
import { DeleteTestimonialButton } from './delete-button'

export default async function AdminTestimonialsPage() {
    const supabase = await createClient()

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <Link href="/admin" className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                            <Quote size={24} className="text-emerald-600 dark:text-emerald-400" />
                            <span>Témoignages & Avis Clients</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Gérez les retours d&apos;expérience des clients et partenaires.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/testimonials/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Nouveau témoignage</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Error state */}
            {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                    Erreur lors du chargement des témoignages : {error.message}
                </div>
            )}

            {/* Empty state */}
            {testimonials?.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                        <Quote size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Aucun avis client enregistré</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Ajoutez les premiers retours d&apos;expérience de vos clients.</p>
                    <Link href="/admin/testimonials/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Ajouter un témoignage</span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {testimonials?.map((t) => (
                        <Card key={t.id} className="p-6 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={13} className={i < (t.rating || 5) ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-700"} />
                                        ))}
                                    </div>
                                    {t.is_featured && (
                                        <Badge variant="success" className="text-[10px]">
                                            Mis en avant
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed line-clamp-4">
                                    &ldquo;{t.message}&rdquo;
                                </p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{t.position}</div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Link href={`/admin/testimonials/edit/${t.id}`} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white transition-colors">
                                        <Edit2 size={14} />
                                    </Link>
                                    <DeleteTestimonialButton id={t.id} name={t.name} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
