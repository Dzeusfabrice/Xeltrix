import { createClient } from '@/lib/supabase/server'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, Layers, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DeleteProjectButton } from './delete-button'

export default async function AdminProjectsPage() {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
        .from('projects')
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
                            <Layers size={24} className="text-blue-600 dark:text-blue-400" />
                            <span>Portfolio & Projets</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Gestion des réalisations présentées sur le site.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/projects/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Nouveau projet</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Error state */}
            {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                    Erreur lors du chargement des projets : {error.message}
                </div>
            )}

            {/* Empty state */}
            {projects?.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                        <Layers size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Aucun projet enregistré</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Ajoutez votre première réalisation au portfolio.</p>
                    <Link href="/admin/projects/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Créer un projet</span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Projet</th>
                                    <th className="px-6 py-4">Catégorie</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {projects?.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {p.image_url ? (
                                                    <img src={p.image_url} alt={p.title} className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500">
                                                        <Layers size={18} />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white">{p.title}</div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{p.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="primary" className="text-[10px]">
                                                {p.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                p.status === 'online'
                                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            }`}>
                                                {p.status === 'online' ? 'En ligne' : p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/projects/edit/${p.id}`} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">
                                                    <Edit2 size={16} />
                                                </Link>
                                                <DeleteProjectButton id={String(p.id)} title={String(p.title ?? '')} />
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
