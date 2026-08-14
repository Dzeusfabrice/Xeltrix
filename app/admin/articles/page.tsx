import { createClient } from '@/lib/supabase/server'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, BookOpen, ArrowLeft } from 'lucide-react'
import { DeleteArticleButton } from './delete-button'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default async function AdminArticlesPage() {
    const supabase = await createClient()

    const { data: articles, error } = await supabase
        .from('articles')
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
                            <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <span>Blog & Publications</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Rédigez et publiez vos articles d&apos;expertise technique.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/articles/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Nouvel article</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Error state */}
            {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                    Erreur lors du chargement des articles : {error.message}
                </div>
            )}

            {/* Empty state */}
            {articles?.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                        <BookOpen size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Aucun article publié</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Partagez votre première analyse ou actualité.</p>
                    <Link href="/admin/articles/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Rédiger un article</span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Titre</th>
                                    <th className="px-6 py-4">Catégorie</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {articles?.map((a) => (
                                    <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 dark:text-white">{a.title}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{a.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="purple" className="text-[10px]">
                                                {a.category || 'Général'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                a.status === 'published'
                                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            }`}>
                                                {a.status === 'published' ? 'Publié' : a.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                                            {a.published_at ? format(new Date(a.published_at), 'dd MMM yyyy', { locale: fr }) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/articles/edit/${a.id}`} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
                                                    <Edit2 size={16} />
                                                </Link>
                                                <DeleteArticleButton id={a.id} title={a.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    )
}
