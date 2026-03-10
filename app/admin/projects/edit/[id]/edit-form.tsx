'use client'

import { useState } from 'react'
import { updateProject } from '../../actions'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Image as ImageIcon, Zap, Globe, Smartphone, Layers } from 'lucide-react'
import { useTransition } from 'react'

export default function EditProjectForm({ project }: { project: any }) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)

        if (!formData.get('title') || !formData.get('description')) {
            setError('Le titre et la description sont obligatoires.')
            return
        }

        startTransition(async () => {
            try {
                await updateProject(project.id, formData)
            } catch (err: any) {
                setError(err.message || 'Une erreur est survenue.')
            }
        })
    }

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 h-20">
                        <Link href="/admin/projects" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-400" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                Modifier le projet
                            </span>
                            <span className="text-xs text-slate-400 font-medium tracking-wide italic">"{project.title}"</span>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="pt-12 max-w-5xl">
                <div className="p-10 md:p-16 bg-slate-900/40 border border-white/10 rounded-[3.5rem] shadow-3xl relative overflow-hidden glass-card">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                        {error && (
                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-400 text-sm font-bold animate-pulse">
                                <AlertCircle size={24} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label htmlFor="title" className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-1">Titre de l'expérience</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        defaultValue={project.title}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-700"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="category" className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-1">Catégorie Technologique</label>
                                    <select
                                        name="category"
                                        id="category"
                                        defaultValue={project.category}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold appearance-none cursor-pointer"
                                    >
                                        <option value="Web">Web Platform</option>
                                        <option value="Mobile">Mobile Application</option>
                                        <option value="Desktop">Desktop Software</option>
                                        <option value="Cloud">Cloud Infrastructure</option>
                                        <option value="AI">Artificial Intelligence</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="project_url" className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-1 flex items-center gap-2">
                                        <Globe size={14} className="text-blue-400" />
                                        URL de démonstration
                                    </label>
                                    <input
                                        type="url"
                                        name="project_url"
                                        id="project_url"
                                        defaultValue={project.project_url}
                                        placeholder="https://votre-projet.com"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label htmlFor="image_url" className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-1 flex items-center gap-2">
                                        <ImageIcon size={14} className="text-blue-400" />
                                        Visuel principal (URL)
                                    </label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        id="image_url"
                                        defaultValue={project.image_url}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-700"
                                    />
                                    {project.image_url && (
                                        <div className="mt-4 aspect-video rounded-3xl overflow-hidden border border-white/5 bg-black/40 relative group">
                                            <img src={project.image_url} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white/50">Aperçu actuel</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="description" className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-1">Narratif & Challenge technique</label>
                            <textarea
                                name="description"
                                id="description"
                                defaultValue={project.description}
                                required
                                rows={6}
                                placeholder="Quel problème ce projet a-t-il résolu ?"
                                className="w-full bg-black/40 border border-white/10 rounded-3xl py-6 px-8 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-700 resize-none leading-relaxed"
                            ></textarea>
                        </div>

                        <div className="pt-12 flex flex-col sm:flex-row items-center justify-end gap-6 border-t border-white/5">
                            <Link href="/admin/projects" className="w-full sm:w-auto">
                                <Button type="button" className="w-full h-16 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white shadow-none border border-white/10 rounded-2xl px-10 text-xs font-black uppercase tracking-widest transition-all">
                                    Annuler les changements
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className={`w-full sm:w-auto h-16 bg-blue-600 hover:bg-blue-500 border-none px-12 rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-xs shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.4)] transition-all ${isPending ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                            >
                                <Save size={18} />
                                Sauvegarder l'évolution
                            </Button>

                            {isPending && (
                                <div className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-blue-600/50 text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 cursor-wait">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Synchronisation...
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}
