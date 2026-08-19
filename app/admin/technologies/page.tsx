import { createClient } from '@/lib/supabase/server'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, Cpu, ArrowLeft } from 'lucide-react'
import { DeleteTechButton } from './delete-button'

export default async function AdminTechnologiesPage() {
    const supabase = await createClient()

    const { data: technologies, error } = await supabase
        .from('technologies')
        .select('*')
        .order('sort_order', { ascending: true })

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
                            <Cpu size={24} className="text-amber-600 dark:text-amber-400" />
                            <span>Stack & Technologies</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Gérez les frameworks, langages et outils présentés sur le site.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/technologies/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Ajouter une techno</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Error state */}
            {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                    Erreur lors du chargement des technologies : {error.message}
                </div>
            )}

            {/* Empty state */}
            {technologies?.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
                        <Cpu size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Aucune technologie répertoriée</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Ajoutez les briques de votre stack technique.</p>
                    <Link href="/admin/technologies/new">
                        <Button variant="primary" size="sm">
                            <Plus size={14} />
                            <span>Ajouter une technologie</span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Technologie</th>
                                    <th className="px-6 py-4">Catégorie</th>
                                    <th className="px-6 py-4">Niveau</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {technologies?.map((tech: any) => (
                                    <tr key={tech.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                            {tech.logo_url && (
                                                <img src={tech.logo_url} alt={tech.name} className="w-6 h-6 object-contain" />
                                            )}
                                            <span>{tech.name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="default" className="text-[10px]">
                                                {tech.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="warning" className="text-[10px]">
                                                {tech.proficiency ?? 0}%
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/technologies/edit/${tech.id}`} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white transition-colors">
                                                    <Edit2 size={16} />
                                                </Link>
                                                <DeleteTechButton id={String(tech.id)} name={String(tech.name ?? '')} />
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
