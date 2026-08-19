'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { PRODUCT_ICON_OPTIONS } from '@/lib/product-icons'
import type { Product } from '@/types/database'
import { createProduct, updateProduct } from './actions'

type ProductFormProps = {
    mode: 'create' | 'edit'
    product?: Product
}

function linesFromArray(values?: string[] | null) {
    return (values || []).join('\n')
}

function specsToLines(specs?: Record<string, string> | null) {
    if (!specs) return ''
    return Object.entries(specs)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
}

export function ProductForm({ mode, product }: ProductFormProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const isEdit = mode === 'edit'

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const formData = new FormData(event.currentTarget)
        if (!formData.get('name')) {
            setError('Le nom est obligatoire.')
            return
        }

        startTransition(async () => {
            try {
                if (isEdit && product) {
                    await updateProduct(product.id, formData)
                } else {
                    await createProduct(formData)
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
                    href="/admin/products"
                    className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isEdit ? 'Modifier le produit' : 'Nouveau produit'}
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isEdit ? product?.name : 'Le produit apparaîtra sur /products et l’accueil une fois publié.'}
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
                            <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Nom *
                            </label>
                            <input
                                id="name"
                                name="name"
                                required
                                defaultValue={product?.name}
                                placeholder="Ex: zeltrix ERP"
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
                                defaultValue={product?.slug}
                                placeholder="erp, crm, chatsdk…"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="icon_name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Icône
                            </label>
                            <select
                                id="icon_name"
                                name="icon_name"
                                defaultValue={product?.icon_name || 'Package'}
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            >
                                {PRODUCT_ICON_OPTIONS.map((icon) => (
                                    <option key={icon} value={icon}>
                                        {icon}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="badge" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Badge / catégorie
                            </label>
                            <input
                                id="badge"
                                name="badge"
                                defaultValue={product?.badge || ''}
                                placeholder="Enterprise Suite"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="target" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Cible
                            </label>
                            <input
                                id="target"
                                name="target"
                                defaultValue={product?.target || ''}
                                placeholder="PME, ETI…"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="tagline" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Accroche
                            </label>
                            <input
                                id="tagline"
                                name="tagline"
                                defaultValue={product?.tagline || ''}
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
                                defaultValue={product?.description || ''}
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="highlight_metric" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Métrique (accueil)
                            </label>
                            <input
                                id="highlight_metric"
                                name="highlight_metric"
                                defaultValue={product?.highlight_metric || ''}
                                placeholder="40%"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="highlight_label" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Libellé métrique
                            </label>
                            <input
                                id="highlight_label"
                                name="highlight_label"
                                defaultValue={product?.highlight_label || ''}
                                placeholder="de gain de productivité"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-6 pt-6 border-t border-slate-200 dark:border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="image_file" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-blue-600 dark:text-blue-400" />
                                        Image de couverture (Upload)
                                    </label>
                                    <input
                                        type="file"
                                        id="image_file"
                                        name="image_file"
                                        accept="image/*"
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-3 text-sm text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                                    />
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Recommandé : 1200x800px</p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="image_url" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <ImageIcon size={16} className="text-blue-600 dark:text-blue-400" />
                                        Ou URL de l&apos;image
                                    </label>
                                    <input
                                        type="url"
                                        id="image_url"
                                        name="image_url"
                                        defaultValue={product?.image_url || ''}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {product?.image_url && (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Aperçu actuel :</p>
                                    <div className="relative aspect-video w-48 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={product.image_url} alt="" className="object-cover w-full h-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:col-span-2">
                            <div className="space-y-2">
                                <label htmlFor="status" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Statut
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={product?.status || 'published'}
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
                                    defaultValue={product?.sort_order ?? 0}
                                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="modules" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Modules fonctionnels (1 par ligne)
                            </label>
                            <textarea
                                id="modules"
                                name="modules"
                                rows={6}
                                defaultValue={linesFromArray(product?.modules)}
                                placeholder="Authentification MFA&#10;Cloud Sync&#10;API REST"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="technologies" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Stack Technique (1 par ligne)
                            </label>
                            <textarea
                                id="technologies"
                                name="technologies"
                                rows={6}
                                defaultValue={linesFromArray(product?.technologies)}
                                placeholder="Next.js&#10;PostgreSQL&#10;TailwindCSS"
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="specs" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Spécifications techniques (clé: valeur, 1 par ligne)
                            </label>
                            <textarea
                                id="specs"
                                name="specs"
                                rows={4}
                                defaultValue={specsToLines(product?.specs)}
                                placeholder={'deployment: Cloud SaaS\nsecurity: AES-256'}
                                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-y"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3">
                        <Link href="/admin/products">
                            <Button type="button" variant="outline">
                                Annuler
                            </Button>
                        </Link>
                        <Button type="submit" variant="primary" disabled={isPending}>
                            <Save size={16} />
                            <span>{isPending ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Créer le produit'}</span>
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}
