'use client'

import React, { useState, useTransition } from 'react'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Rocket, Layers } from 'lucide-react'
import { updateSkill } from '../../actions'

export default function EditSkillForm({ skill }: { skill: any }) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [level, setLevel] = useState(skill.level || 85)
    const [color, setColor] = useState(skill.color || 'from-blue-500 to-cyan-400')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.append('level', level.toString())
        formData.append('color', color)

        if (!formData.get('name') || !formData.get('tech')) {
            setError('Le titre et la liste des technologies sont obligatoires.')
            return
        }

        startTransition(async () => {
            try {
                await updateSkill(skill.id, formData)
            } catch (err: any) {
                setError(err.message || 'Une erreur est survenue.')
            }
        })
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] pb-24">
            <nav className="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 h-20">
                        <Link href="/admin/experience" className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-500 dark:text-slate-400" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                                Modifier le Domaine
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">Édition de "{skill.name}"</span>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="pt-12 max-w-2xl">
                <div className="p-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden glass-card">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold">
                                <AlertCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-600 dark:text-slate-300">Titre de l'expertise *</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={skill.name}
                                    placeholder="ex: Mobile Development"
                                    required
                                    className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tech" className="text-sm font-bold text-slate-600 dark:text-slate-300">Stack Technique (Texte libre) *</label>
                                <input
                                    type="text"
                                    name="tech"
                                    id="tech"
                                    defaultValue={skill.tech}
                                    placeholder="ex: Flutter, React Native, Kotlin, Swift"
                                    required
                                    className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Maîtrise (%)</label>
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">{level}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={level}
                                        onChange={(e) => setLevel(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="domain" className="text-sm font-bold text-slate-600 dark:text-slate-300">Domaine global</label>
                                    <select
                                        name="domain"
                                        id="domain"
                                        defaultValue={skill.domain}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium appearance-none"
                                    >
                                        <option value="Logiciel">Logiciel / Mobile</option>
                                        <option value="Web">Web / Fullstack</option>
                                        <option value="Cloud">Cloud / DevOps</option>
                                        <option value="UI/UX">Design / UI/UX</option>
                                        <option value="Management">Management / Agile</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Thème Visuel (Couleur)</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { name: 'Bleu', class: 'from-blue-500 to-cyan-400' },
                                        { name: 'Violet', class: 'from-purple-600 to-pink-500' },
                                        { name: 'Orange', class: 'from-orange-500 to-yellow-400' },
                                        { name: 'Vert', class: 'from-emerald-500 to-teal-400' }
                                    ].map((c) => (
                                        <button
                                            key={c.name}
                                            type="button"
                                            onClick={() => setColor(c.class)}
                                            className={`p-1 rounded-2xl border-2 transition-all ${color === c.class ? 'border-slate-900 dark:border-white' : 'border-transparent'}`}
                                        >
                                            <div className={`h-12 w-full rounded-xl bg-gradient-to-br ${c.class}`} />
                                            <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 mt-2 block">{c.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex items-center justify-end gap-4 border-t border-slate-200 dark:border-white/10">
                            <Link href="/admin/experience">
                                <Button type="button" className="bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 shadow-none border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3 font-medium">
                                    Annuler
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className={`bg-blue-600 hover:bg-blue-500 border-none px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-600/20 transition-all ${isPending ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                            >
                                <Save size={18} />
                                Enregistrer les modifications
                            </Button>

                            {isPending && (
                                <div className="px-8 py-3 rounded-xl bg-blue-600/50 text-white font-bold flex items-center gap-2 cursor-wait font-medium">
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
