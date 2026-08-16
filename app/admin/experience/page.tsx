import { createClient } from '@/lib/supabase/server'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { Plus, Edit2, BookOpen, ArrowLeft, Star, Trash2 } from 'lucide-react'
import { DeleteSkillButton } from '@/app/admin/experience/delete-button'

export default async function AdminExperiencePage() {
    const supabase = await createClient()

    const { data: skills, error } = await supabase
        .from('experience_skills')
        .select('*')
        .order('level', { ascending: false })

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] pb-24">
            <nav className="border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                                <ArrowLeft size={20} className="text-slate-500 dark:text-slate-400" />
                            </Link>
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                                    <BookOpen size={18} className="text-blue-600 dark:text-blue-500" />
                                    Expérience & Compétences
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Gérez votre expertise technique</span>
                            </div>
                        </div>

                        <Link href="/admin/experience/new">
                            <Button className="bg-blue-600 hover:bg-blue-500 border-none px-6">
                                <Plus size={16} className="mr-2" />
                                Ajouter un domaine
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <Container className="pt-12">
                {error ? (
                    <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl">
                        Erreur: {error.message}
                        <p className="text-xs mt-2 opacity-70 italic font-medium tracking-tight">Assurez-vous que la table 'experience_skills' existe dans Supabase.</p>
                    </div>
                ) : skills?.length === 0 ? (
                    <div className="text-center py-24 border border-slate-200 dark:border-white/10 border-dashed rounded-3xl bg-slate-50 dark:bg-slate-900/30">
                        <div className="w-16 h-16 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucun domaine trouvé</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">Définissez vos domaines d'expertise (ex: Mobile, Web, Cloud).</p>
                        <Link href="/admin/experience/new">
                            <Button className="bg-blue-600">Ajouter mon premier domaine</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {skills?.map((s) => (
                            <div key={s.id} className="p-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all glass-card group">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${s.color || 'from-blue-500 to-cyan-400'} text-white shadow-lg`}>
                                        <BookOpen size={24} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DeleteSkillButton id={s.id} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all">{s.name}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-full h-1.5 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${s.color || 'from-blue-500 to-cyan-400'}`}
                                            style={{ width: `${s.level}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{s.level}%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic mb-6">"{s.tech}"</p>
                                <span className="px-3 py-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400">
                                    {s.domain || 'Expertise'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}
