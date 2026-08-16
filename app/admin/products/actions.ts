'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function parseLines(value: FormDataEntryValue | null): string[] {
    return String(value ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
}

function slugify(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}

/** Parse "clé: valeur" lines into a specs object. */
function parseSpecs(value: FormDataEntryValue | null): Record<string, string> {
    const specs: Record<string, string> = {}
    for (const line of parseLines(value)) {
        const sep = line.indexOf(':')
        if (sep === -1) continue
        const key = line.slice(0, sep).trim()
        const val = line.slice(sep + 1).trim()
        if (key && val) specs[key] = val
    }
    return specs
}

function parseProductPayload(formData: FormData) {
    const name = (formData.get('name') as string)?.trim()
    const slugInput = (formData.get('slug') as string)?.trim()
    const badge = (formData.get('badge') as string)?.trim() || null
    const tagline = (formData.get('tagline') as string)?.trim() || null
    const description = (formData.get('description') as string)?.trim() || null
    const icon_name = (formData.get('icon_name') as string)?.trim() || 'Package'
    const target = (formData.get('target') as string)?.trim() || null
    const highlight_metric = (formData.get('highlight_metric') as string)?.trim() || null
    const highlight_label = (formData.get('highlight_label') as string)?.trim() || null
    const status = (formData.get('status') as string) === 'draft' ? 'draft' : 'published'
    const sort_order = Number.parseInt(String(formData.get('sort_order') || '0'), 10) || 0

    if (!name) {
        throw new Error('Le nom du produit est obligatoire')
    }

    const slug = slugify(slugInput || name)
    if (!slug) {
        throw new Error('Le slug du produit est invalide')
    }

    return {
        name,
        slug,
        badge,
        tagline,
        description,
        icon_name,
        modules: parseLines(formData.get('modules')),
        specs: parseSpecs(formData.get('specs')),
        target,
        highlight_metric,
        highlight_label,
        status,
        sort_order,
    }
}

function revalidateProducts() {
    revalidatePath('/admin/products')
    revalidatePath('/products')
    revalidatePath('/')
}

export async function createProduct(formData: FormData) {
    const supabase = await createClient()
    const payload = parseProductPayload(formData)

    const { error } = await supabase.from('products').insert(payload)

    if (error) {
        console.error('Erreur création produit:', error)
        if (error.code === '23505') {
            throw new Error('Ce slug est déjà utilisé par un autre produit')
        }
        throw new Error('Impossible de créer le produit')
    }

    revalidateProducts()
    redirect('/admin/products')
}

export async function updateProduct(id: string, formData: FormData) {
    const supabase = await createClient()
    const payload = parseProductPayload(formData)

    const { error } = await supabase
        .from('products')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Erreur mise à jour produit:', error)
        if (error.code === '23505') {
            throw new Error('Ce slug est déjà utilisé par un autre produit')
        }
        throw new Error('Impossible de mettre à jour le produit')
    }

    revalidateProducts()
    redirect('/admin/products')
}

export async function deleteProduct(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
        console.error('Erreur suppression produit:', error)
        throw new Error('Impossible de supprimer le produit')
    }

    revalidateProducts()
}
