'use client'

import { useState } from 'react'
import { createProject } from '../actions'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, LayoutDashboard, Image as ImageIcon } from 'lucide-react'
import { useTransition } from 'react'

export default function NewProjectPage() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)

        // Very basic client-side validation
        if (!formData.get('title') || !formData.get('description')) {
            setError('Veuillez remplir les champs obligatoires (Titre, Description).')
            return
        }

        startTransition(async () => {
            try {
                // Redirection will be handled by the server action
                await createProject(formData)
            } catch (err: any) {
                setError(err.message || "Une erreur est survenue lors de l\'enregistrement.")
            }
        })
    }

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Top Navigation */}
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 h-20">
                        <Link href="/admin/projects" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-400" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                Nouveau Projet
                            </span>
                            <span className="text-xs text-slate-400">Ajouter une réalisation au portfolio</span>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="pt-12 max-w-4xl">
                <div className="p-8 bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold">
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-bold text-slate-300">Titre du Projet *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        placeholder="Ex: Refonte Dashboard Client"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-slate-600"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-bold text-slate-300">Catégorie</label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium appearance-none"
                                    >
                                        <option value="Web">Développement Web</option>
                                        <option value="Mobile">Application Mobile</option>
                                        <option value="Desktop">Logiciel Desktop</option>
                                        <option value="API">Système & API</option>
                                        <option value="Design">UI/UX Design</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="project_url" className="text-sm font-bold text-slate-300">Lien du projet (URL)</label>
                                    <input
                                        type="url"
                                        name="project_url"
                                        id="project_url"
                                        placeholder="https://www.exemple.com"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2 h-full flex flex-col">
                                    <label htmlFor="description" className="text-sm font-bold text-slate-300">Courte Description *</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        required
                                        rows={4}
                                        placeholder="Un résumé accrocheur des défis relevés..."
                                        className="w-full flex-grow bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-slate-600 resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="image_file" className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-blue-400" />
                                        Uploader une image
                                    </label>
                                    <input
                                        type="file"
                                        name="image_file"
                                        id="image_file"
                                        accept="image/*"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-3 px-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                                    />
                                    <p className="text-[10px] text-slate-500 font-medium">L'image sera stockée sur Supabase Storage.</p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="image_url" className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-blue-400" />
                                        Ou utiliser une URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        id="image_url"
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex items-center justify-end gap-4 border-t border-white/10">
                            <Link href="/admin/projects">
                                <Button type="button" className="bg-transparent hover:bg-white/5 text-slate-300 shadow-none border border-white/10 rounded-xl px-6 py-3">
                                    Annuler
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className={`bg-blue-600 hover:bg-blue-500 border-none px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all ${isPending ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                            >
                                <Save size={18} />
                                Publier le projet
                            </Button>

                            {isPending && (
                                <div className="px-8 py-3 rounded-xl bg-blue-600/50 text-white font-bold flex items-center gap-2 cursor-wait">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Enregistrement...
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}
