import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Container, Button } from '@/components/ui'
import { logout } from './actions'
import { LayoutDashboard, Users, MessageSquare, Layers, Power, Cpu } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Fetch some stats to show on the dashboard
    const [
        { count: projectsCount },
        { count: articlesCount },
        { count: messagesCount },
        { count: techCount }
    ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('technologies').select('*', { count: 'exact', head: true })
    ])

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Top Navigation */}
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600/20 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/30">
                                <LayoutDashboard size={20} />
                            </div>
                            <span className="font-black text-xl tracking-tight text-white">Xeltrix <span className="text-purple-500">Admin</span></span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-medium text-slate-400 hidden sm:block">
                                Connecté en tant que <span className="text-white">{user.email}</span>
                            </span>
                            <form action={logout}>
                                <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-bold transition-all">
                                    <Power size={16} />
                                    Déconnexion
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <Container className="pt-12">
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Tableau de bord</h1>
                <p className="text-slate-400 mb-10 font-medium">Gestion centralisée de votre écosystème numérique.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Projets Card */}
                    <div className="p-6 bg-slate-900/40 border border-white/10 rounded-3xl hover:border-blue-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-all" />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                <Layers size={24} />
                            </div>
                            <span className="text-3xl font-black text-white">{projectsCount || 0}</span>
                        </div>
                        <h2 className="text-xl font-black text-white mb-2 relative z-10">Projets</h2>
                        <p className="text-slate-400 text-sm mb-8 line-clamp-2 relative z-10 flex-grow">Gérez vos réalisations et votre portfolio.</p>
                        <Link href="/admin/projects" className="block relative z-10 mt-auto">
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl">Gérer</Button>
                        </Link>
                    </div>

                    {/* Blog Card */}
                    <div className="p-6 bg-slate-900/40 border border-white/10 rounded-3xl hover:border-purple-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/20 transition-all" />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20">
                                <MessageSquare size={24} />
                            </div>
                            <span className="text-3xl font-black text-white">{articlesCount || 0}</span>
                        </div>
                        <h2 className="text-xl font-black text-white mb-2 relative z-10">Blog</h2>
                        <p className="text-slate-400 text-sm mb-8 line-clamp-2 relative z-10 flex-grow">Rédigez vos articles et actualités.</p>
                        <Link href="/admin/articles" className="block relative z-10 mt-auto">
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl">Rédiger</Button>
                        </Link>
                    </div>

                    {/* Technologies Card */}
                    <div className="p-6 bg-slate-900/40 border border-white/10 rounded-3xl hover:border-orange-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-600/20 transition-all" />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center border border-orange-500/20">
                                <Cpu size={24} />
                            </div>
                            <span className="text-3xl font-black text-white">{techCount || 0}</span>
                        </div>
                        <h2 className="text-xl font-black text-white mb-2 relative z-10">Stack</h2>
                        <p className="text-slate-400 text-sm mb-8 line-clamp-2 relative z-10 flex-grow">Gérez vos compétences techniques.</p>
                        <Link href="/admin/technologies" className="block relative z-10 mt-auto">
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl">Gérer</Button>
                        </Link>
                    </div>

                    {/* Messages Card */}
                    <div className="p-6 bg-slate-900/40 border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-600/20 transition-all" />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                                <Users size={24} />
                            </div>
                            <span className="text-3xl font-black text-white">{messagesCount || 0}</span>
                        </div>
                        <h2 className="text-xl font-black text-white mb-2 relative z-10">Messages</h2>
                        <p className="text-slate-400 text-sm mb-8 line-clamp-2 relative z-10 flex-grow">Consultez les demandes entrantes.</p>
                        <Link href="/admin/messages" className="block relative z-10 mt-auto">
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-emerald-400 border border-emerald-500/20 rounded-xl">Voir Inbox</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}
