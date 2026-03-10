import { createClient } from '@/lib/supabase/server'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, Cpu, ArrowLeft, Star } from 'lucide-react'
import { DeleteTechButton } from './delete-button'

export default async function AdminTechnologiesPage() {
    const supabase = await createClient()

    const { data: technologies, error } = await supabase
        .from('technologies')
        .select('*')
        .order('proficiency', { ascending: false })

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
                                    <Cpu size={18} className="text-orange-500" />
                                    Stack Technique
                                </span>
                                <span className="text-xs text-slate-400">Gestion de l'expertise</span>
                            </div>
                        </div>

                        <Link href="/admin/technologies/new">
                            <Button className="bg-orange-600 hover:bg-orange-500 border-none px-6">
                                <Plus size={16} className="mr-2" />
                                Ajouter une techno
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
                ) : technologies?.length === 0 ? (
                    <div className="text-center py-24 border border-white/10 border-dashed rounded-3xl bg-slate-900/30">
                        <div className="w-16 h-16 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Cpu size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Aucune technologie</h3>
                        <p className="text-slate-400 mb-6">Définissez votre stack technique pour l'afficher sur le site.</p>
                        <Link href="/admin/technologies/new">
                            <Button className="bg-orange-600 hover:bg-orange-500">Ajouter ma première techno</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-slate-400 font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Technologie</th>
                                        <th className="px-6 py-4">Catégorie</th>
                                        <th className="px-6 py-4">Maîtrise</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {technologies?.map((tech) => (
                                        <tr key={tech.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden shrink-0 border border-white/10 p-2 flex items-center justify-center">
                                                        {tech.logo_url ? (
                                                            <img src={tech.logo_url} alt={tech.name} className="w-full h-full object-contain" />
                                                        ) : (
                                                            <Cpu size={20} className="text-slate-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white">{tech.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-xs font-medium">
                                                    {tech.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-orange-500 fill-orange-500" />
                                                    <span className="text-sm font-bold text-white">{tech.proficiency}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <DeleteTechButton id={tech.id} />
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
