'use client'

import { useState } from 'react'
import { updateTechnology } from '../../actions'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Image as ImageIcon, Cpu } from 'lucide-react'
import { useTransition } from 'react'

export default function EditTechForm({ technology }: { technology: any }) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)

        if (!formData.get('name') || !formData.get('category')) {
            setError('Veuillez remplir les champs obligatoires (Nom, Catégorie).')
            return
        }

        startTransition(async () => {
            try {
                await updateTechnology(technology.id, formData)
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
                        <Link href="/admin/technologies" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-400" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                Modifier la Technologie
                            </span>
                            <span className="text-xs text-slate-400 font-medium tracking-wide italic">"{technology.name}"</span>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="pt-12 max-w-3xl">
                <div className="p-8 bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden glass-card">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold">
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-300">Nom de la technologie *</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={technology.name}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-bold text-slate-300">Catégorie *</label>
                                <select
                                    name="category"
                                    id="category"
                                    defaultValue={technology.category}
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium appearance-none"
                                >
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Cloud">Cloud</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Design">Design</option>
                                    <option value="Outils">Outils</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-bold text-slate-300">Description / Rôle technique</label>
                            <textarea
                                name="description"
                                id="description"
                                defaultValue={technology.description}
                                rows={3}
                                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label htmlFor="proficiency" className="text-sm font-bold text-slate-300">Niveau de maîtrise (%)</label>
                                <span className="text-cyan-400 font-bold">100% (Expert)</span>
                            </div>
                            <input
                                type="range"
                                name="proficiency"
                                id="proficiency"
                                min="0"
                                max="100"
                                defaultValue={technology.proficiency}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="logo_url" className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <ImageIcon size={16} className="text-cyan-400" />
                                Logo URL
                            </label>
                            <input
                                type="url"
                                name="logo_url"
                                id="logo_url"
                                defaultValue={technology.logo_url}
                                placeholder="https://cdn.worldvectorlogo.com/..."
                                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="pt-8 flex items-center justify-end gap-4 border-t border-white/10">
                            <Link href="/admin/technologies">
                                <Button type="button" className="bg-transparent hover:bg-white/5 text-slate-300 shadow-none border border-white/10 rounded-xl px-6 py-3">
                                    Annuler
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className={`bg-cyan-600 hover:bg-cyan-500 border-none px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-all ${isPending ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                            >
                                <Save size={18} />
                                Enregistrer
                            </Button>

                            {isPending && (
                                <div className="px-8 py-3 rounded-xl bg-cyan-600/50 text-white font-bold flex items-center gap-2 cursor-wait">
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
