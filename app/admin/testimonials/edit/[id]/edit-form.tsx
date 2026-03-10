'use client'

import React, { useState, useTransition } from 'react'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Star, Heart, Image as ImageIcon } from 'lucide-react'
import { updateTestimonial } from '../../actions'

export default function EditTestimonialForm({ testimonial }: { testimonial: any }) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [rating, setRating] = useState(testimonial.rating || 5)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.append('rating', rating.toString())

        if (!formData.get('name') || !formData.get('message')) {
            setError('Le nom et le message sont obligatoires.')
            return
        }

        startTransition(async () => {
            try {
                await updateTestimonial(testimonial.id, formData)
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
                        <Link href="/admin/testimonials" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-400" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                Modifier le Témoignage
                            </span>
                            <span className="text-xs text-slate-400 font-medium tracking-wide">De "{testimonial.name}"</span>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="pt-12 max-w-3xl">
                <div className="p-8 bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden glass-card">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold">
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-300">Nom du Client *</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={testimonial.name}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="position" className="text-sm font-bold text-slate-300">Position / Entreprise</label>
                                <input
                                    type="text"
                                    name="position"
                                    id="position"
                                    defaultValue={testimonial.position}
                                    placeholder="ex: CEO @ StartupX"
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-300">Note (Étoiles)</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        className={`transition-all ${rating >= s ? "scale-125" : "grayscale opacity-30"}`}
                                    >
                                        <Star size={32} className={`fill-yellow-500 text-yellow-500`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-bold text-slate-300">Témoignage (Message) *</label>
                            <textarea
                                name="message"
                                id="message"
                                defaultValue={testimonial.message}
                                required
                                rows={4}
                                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-medium resize-none shadow-inner"
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="photo_url" className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <ImageIcon size={16} className="text-pink-400" />
                                Photo (URL)
                            </label>
                            <input
                                type="url"
                                name="photo_url"
                                id="photo_url"
                                defaultValue={testimonial.photo_url}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-3">
                                <Heart size={20} className={`group-hover:scale-110 transition-transform ${rating > 3 ? "text-pink-500 fill-pink-500" : "text-slate-500"}`} />
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm">Mettre en avant</span>
                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Affichage prioritaire</span>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                name="is_featured"
                                defaultChecked={testimonial.is_featured}
                                className="w-6 h-6 rounded-lg bg-black border-white/10 accent-pink-500 cursor-pointer"
                            />
                        </div>

                        <div className="pt-8 flex items-center justify-end gap-4 border-t border-white/10">
                            <Link href="/admin/testimonials">
                                <Button type="button" className="bg-transparent hover:bg-white/5 text-slate-300 shadow-none border border-white/10 rounded-xl px-6 py-3">
                                    Annuler
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className={`bg-pink-600 hover:bg-pink-500 border-none px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-pink-600/20 transition-all ${isPending ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                            >
                                <Save size={18} />
                                Enregistrer les modifications
                            </Button>

                            {isPending && (
                                <div className="px-8 py-3 rounded-xl bg-pink-600/50 text-white font-bold flex items-center gap-2 cursor-wait">
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
