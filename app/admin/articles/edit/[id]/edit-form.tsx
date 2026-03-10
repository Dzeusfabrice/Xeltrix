'use client'

import { useState } from 'react'
import { updateArticle } from '../../actions'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Image as ImageIcon, MessageSquare } from 'lucide-react'
import { useTransition } from 'react'

export default function EditArticleForm({ article }: { article: any }) {
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
                await updateArticle(article.id, formData)
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
                        <Link href="/admin/articles" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-400" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                Modifier l'article
                            </span>
                            <span className="text-xs text-slate-400 font-medium tracking-wide italic">"{article.title}"</span>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="pt-12 max-w-4xl">
                <div className="p-8 bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden glass-card">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold">
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-bold text-slate-300">Titre de l'article *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        defaultValue={article.title}
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-bold text-slate-300">Catégorie</label>
                                    <select
                                        name="category"
                                        id="category"
                                        defaultValue={article.category}
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium appearance-none"
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
                                <label htmlFor="excerpt" className="text-sm font-bold text-slate-300">Extrait (Résumé court)</label>
                                <textarea
                                    name="excerpt"
                                    id="excerpt"
                                    defaultValue={article.excerpt}
                                    rows={2}
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="content" className="text-sm font-bold text-slate-300">Contenu de l'article *</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    defaultValue={article.content}
                                    required
                                    rows={10}
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium font-mono text-sm"
                                ></textarea>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="cover_file" className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-purple-400" />
                                        Changer la couverture (Upload)
                                    </label>
                                    <input
                                        type="file"
                                        name="cover_file"
                                        id="cover_file"
                                        accept="image/*"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-3 px-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all cursor-pointer"
                                    />
                                    <p className="text-[10px] text-slate-500 font-medium">L'image sera stockée sur Supabase Storage.</p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="cover_url" className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-purple-400" />
                                        Ou modifier l'URL actuelle
                                    </label>
                                    <input
                                        type="url"
                                        name="cover_url"
                                        id="cover_url"
                                        defaultValue={article.cover_url}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex items-center justify-end gap-4 border-t border-white/10">
                            <Link href="/admin/articles">
                                <Button type="button" className="bg-transparent hover:bg-white/5 text-slate-300 shadow-none border border-white/10 rounded-xl px-6 py-3">
                                    Annuler
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className={`bg-purple-600 hover:bg-purple-500 border-none px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-all ${isPending ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                            >
                                <Save size={18} />
                                Enregistrer les modifications
                            </Button>

                            {isPending && (
                                <div className="px-8 py-3 rounded-xl bg-purple-600/50 text-white font-bold flex items-center gap-2 cursor-wait">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Mise à jour...
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}
