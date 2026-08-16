'use client'

import { useState } from 'react'
import { createArticle } from '../actions'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Image as ImageIcon } from 'lucide-react'
import { useTransition } from 'react'

export default function NewArticlePage() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)

        if (!formData.get('title') || !formData.get('content')) {
            setError('Veuillez remplir les champs obligatoires (Titre, Contenu).')
            return
        }

        startTransition(async () => {
            try {
                await createArticle(formData)
            } catch (err: any) {
                setError(err.message || "Une erreur est survenue lors de l\'enregistrement.")
            }
        })
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] pb-24">
            <nav className="border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 h-20">
                        <Link href="/admin/articles" className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-500 dark:text-slate-400" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                                Rédiger un article
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Publier une nouvelle actualité</span>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="pt-12 max-w-4xl">
                <div className="p-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold">
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-bold text-slate-600 dark:text-slate-300">Titre de l'article *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        placeholder="Ex: Le futur du Cloud Computing"
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-slate-500 dark:placeholder:text-slate-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-bold text-slate-600 dark:text-slate-300">Catégorie</label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium appearance-none"
                                    >
                                        <option value="Technologie">Technologie</option>
                                        <option value="Design">Design</option>
                                        <option value="Business">Business</option>
                                        <option value="Tutoriel">Tutoriel</option>
                                        <option value="Actualité">Actualité Xeltrix</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="excerpt" className="text-sm font-bold text-slate-600 dark:text-slate-300">Extrait (Résumé court)</label>
                                <textarea
                                    name="excerpt"
                                    id="excerpt"
                                    rows={2}
                                    placeholder="En 2 phrases, de quoi parle cet article ?"
                                    className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-slate-500 dark:placeholder:text-slate-400 resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="content" className="text-sm font-bold text-slate-600 dark:text-slate-300">Contenu de l'article * (Supporte l'HTML basique)</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    required
                                    rows={10}
                                    placeholder="<p>Rédigez votre contenu ici...</p>"
                                    className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-slate-500 dark:placeholder:text-slate-400 font-mono text-sm"
                                ></textarea>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Format accepté pour le moment : texte simple ou balises HTML (&lt;h2&gt;, &lt;p&gt;, &lt;br&gt;, &lt;strong&gt;, etc.)</p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="cover_file" className="text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-purple-600 dark:text-purple-400" />
                                        Uploader une couverture
                                    </label>
                                    <input
                                        type="file"
                                        name="cover_file"
                                        id="cover_file"
                                        accept="image/*"
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-3 px-4 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all cursor-pointer"
                                    />
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">L'image sera stockée sur Supabase Storage.</p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="cover_url" className="text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-purple-600 dark:text-purple-400" />
                                        Ou utiliser une URL
                                    </label>
                                    <input
                                        type="url"
                                        name="cover_url"
                                        id="cover_url"
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-slate-500 dark:placeholder:text-slate-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex items-center justify-end gap-4 border-t border-slate-200 dark:border-white/10">
                            <Link href="/admin/articles">
                                <Button type="button" className="bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 shadow-none border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3">
                                    Annuler
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className={`bg-purple-600 hover:bg-purple-500 border-none px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all ${isPending ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                            >
                                <Save size={18} />
                                Publier l'article
                            </Button>

                            {isPending && (
                                <div className="px-8 py-3 rounded-xl bg-purple-600/50 text-white font-bold flex items-center gap-2 cursor-wait">
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
