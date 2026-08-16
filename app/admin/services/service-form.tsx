'use client'

import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, ImageIcon, Save } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { SERVICE_ICON_OPTIONS } from '@/lib/service-icons'
import { getServiceImage } from '@/lib/service-images'
import type { Service } from '@/types/database'
import { createService, updateService } from './actions'

type ServiceFormProps = {
    mode: 'create' | 'edit'
    service?: Service
}

function linesFromArray(values?: string[] | null) {
    return (values || []).join('\n')
}

export function ServiceForm({ mode, service }: ServiceFormProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState(service?.image_url || '')
    const [filePreview, setFilePreview] = useState<string | null>(null)
    const isEdit = mode === 'edit'

    // Libère l'URL temporaire du fichier sélectionné pour éviter les fuites mémoire.
    useEffect(() => {
        return () => {
            if (filePreview) URL.revokeObjectURL(filePreview)
        }
    }, [filePreview])

    const fallbackPreview = getServiceImage({ slug: service?.slug || '', image_url: null })
    const previewSrc = filePreview || imageUrl || fallbackPreview

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (filePreview) URL.revokeObjectURL(filePreview)
        setFilePreview(file ? URL.createObjectURL(file) : null)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)
        if (!formData.get('title')) {
            setError('Le titre est obligatoire.')
            return
        }

        startTransition(async () => {
            try {
                if (isEdit && service) {
                    await updateService(service.id, formData)
                } else {
                    await createService(formData)
                }
            } catch (err: unknown) {
                const digest = typeof err === 'object' && err && 'digest' in err ? String((err as { digest?: string }).digest) : ''
                if (digest.startsWith('NEXT_REDIRECT')) throw err
                const message = err instanceof Error ? err.message : 'Une erreur est survenue.'
                setError(message)
            }
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
                <Link
                    href="/admin/services"
                    className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isEdit ? 'Modifier le service' : 'Nouveau service'}
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isEdit ? service?.title : 'Le service apparaîtra sur /services et l’accueil une fois publié.'}
                    </p>
                </div>
            </div>

            <Container className="max-w-4xl !px-0">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 sm:p-8 space-y-6"
                >
                    {error && (
                        <div className="p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-center gap-2.5 text-red-600 dark:text-red-400 text-xs font-semibold">
                            <AlertCircle size={16} className="shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Titre *
                            </label>
                            <input
                                id="title"
                                name="title"
                                required
                                defaultValue={service?.title}
                                placeholder="Ex: Développement Web & SaaS"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="slug" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Slug (ancre URL)
                            </label>
                            <input
                                id="slug"
                                name="slug"
                                defaultValue={service?.slug}
                                placeholder="web, mobile, erp…"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                            <p className="text-[11px] text-slate-500">Utilisé pour /services#slug. Auto-généré depuis le titre si vide.</p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="icon_name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Icône
                            </label>
                            <select
                                id="icon_name"
                                name="icon_name"
                                defaultValue={service?.icon_name || 'Wrench'}
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            >
                                {SERVICE_ICON_OPTIONS.map((icon) => (
                                    <option key={icon} value={icon}>
                                        {icon}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3 md:col-span-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-slate-950/40 p-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                <ImageIcon size={16} className="text-blue-600 dark:text-blue-400" />
                                <span>Image d&apos;illustration de la carte</span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="image_url" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Lien de l&apos;image
                                    </label>
                                    <input
                                        id="image_url"
                                        name="image_url"
                                        type="url"
                                        value={imageUrl}
                                        onChange={(event) => setImageUrl(event.target.value)}
                                        placeholder="https://images.unsplash.com/photo-..."
                                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                                    />

                                    <label htmlFor="image_file" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 pt-2">
                                        Ou importer un fichier
                                    </label>
                                    <input
                                        id="image_file"
                                        name="image_file"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 py-2.5 text-xs text-slate-600 dark:text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-blue-700"
                                    />
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        Le fichier importé remplace le lien. Sans image, l&apos;illustration par défaut du pôle est utilisée.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Aperçu de la carte
                                    </span>
                                    <div className="relative h-44 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={previewSrc}
                                            alt={`Aperçu de l'illustration de ${service?.title || 'ce service'}`}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/45" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 p-4">
                                            <p className="text-base font-bold text-white drop-shadow">
                                                {service?.title || 'Titre du service'}
                                            </p>
                                            <p className="text-xs text-white/80">
                                                {service?.tagline || 'Accroche affichée sous le titre'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="tagline" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Accroche
                            </label>
                            <input
                                id="tagline"
                                name="tagline"
                                defaultValue={service?.tagline || ''}
                                placeholder="Une phrase courte sous le titre"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                defaultValue={service?.description || ''}
                                placeholder="Description détaillée du service"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="timeline" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Délai estimé
                            </label>
                            <input
                                id="timeline"
                                name="timeline"
                                defaultValue={service?.timeline || ''}
                                placeholder="3 à 8 semaines"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="status" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Statut
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={service?.status || 'published'}
                                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="published">Publié</option>
                                    <option value="draft">Brouillon</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="sort_order" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Ordre
                                </label>
                                <input
                                    id="sort_order"
                                    name="sort_order"
                                    type="number"
                                    defaultValue={service?.sort_order ?? 0}
                                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="features" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Prestations (1 par ligne)
                            </label>
                            <textarea
                                id="features"
                                name="features"
                                rows={5}
                                defaultValue={linesFromArray(service?.features)}
                                placeholder={'Architecture SSR\nOptimisation SEO\n...'}
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="deliverables" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Livrables (1 par ligne)
                            </label>
                            <textarea
                                id="deliverables"
                                name="deliverables"
                                rows={5}
                                defaultValue={linesFromArray(service?.deliverables)}
                                placeholder={'Code source\nDocumentation\n...'}
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y font-mono"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="stack" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Stack / tags (1 par ligne)
                            </label>
                            <textarea
                                id="stack"
                                name="stack"
                                rows={3}
                                defaultValue={linesFromArray(service?.stack)}
                                placeholder={'Next.js\nTypeScript\nPostgreSQL'}
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y font-mono"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3">
                        <Link href="/admin/services">
                            <Button type="button" variant="outline">
                                Annuler
                            </Button>
                        </Link>
                        <Button type="submit" variant="primary" disabled={isPending}>
                            <Save size={16} />
                            <span>{isPending ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Créer le service'}</span>
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}
