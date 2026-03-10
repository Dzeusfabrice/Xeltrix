import { createClient } from '@/lib/supabase/server'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, LayoutDashboard, ArrowLeft } from 'lucide-react'
import { DeleteProjectButton } from './delete-button'

export default async function AdminProjectsPage() {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Top Navigation */}
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <ArrowLeft size={20} className="text-slate-400" />
                            </Link>
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                    <LayoutDashboard size={18} className="text-blue-500" />
                                    Portfolio Xeltrix
                                </span>
                                <span className="text-xs text-slate-400">Gestion des réalisations</span>
                            </div>
                        </div>

                        <Link href="/admin/projects/new">
                            <Button className="bg-blue-600 hover:bg-blue-500 border-none px-6">
                                <Plus size={16} className="mr-2" />
                                Nouveau projet
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <Container className="pt-12">
                {error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                        Erreur lors du chargement des projets: {error.message}
                    </div>
                ) : projects?.length === 0 ? (
                    <div className="text-center py-24 border border-white/10 border-dashed rounded-3xl bg-slate-900/30">
                        <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <LayoutDashboard size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Aucun projet trouvé</h3>
                        <p className="text-slate-400 mb-6">Commencez par ajouter votre première réalisation au portfolio.</p>
                        <Link href="/admin/projects/new">
                            <Button>Ajouter un projet</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-slate-400 font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Projet</th>
                                        <th className="px-6 py-4">Catégorie</th>
                                        <th className="px-6 py-4">Statut</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {projects?.map((project) => (
                                        <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10">
                                                        {project.image_url ? (
                                                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">IMG</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white">{project.title}</div>
                                                        <div className="text-xs text-slate-500">{project.description?.substring(0, 50)}...</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
                                                    {project.category || 'Non classé'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                                    Online
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button disabled className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 opacity-50 cursor-not-allowed" title="Pas encore disponible">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <DeleteProjectButton id={project.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}
