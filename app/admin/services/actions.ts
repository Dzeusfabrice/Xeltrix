'use server'

import { createClient } from '@/lib/supabase/server'
import { uploadFile } from '@/lib/storage'
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

async function parseServicePayload(formData: FormData) {
    const title = (formData.get('title') as string)?.trim()
    const slugInput = (formData.get('slug') as string)?.trim()
    const tagline = (formData.get('tagline') as string)?.trim() || null
    const description = (formData.get('description') as string)?.trim() || null
    const icon_name = (formData.get('icon_name') as string)?.trim() || 'Wrench'
    const timeline = (formData.get('timeline') as string)?.trim() || null
    const status = (formData.get('status') as string) === 'draft' ? 'draft' : 'published'
    const sort_order = Number.parseInt(String(formData.get('sort_order') || '0'), 10) || 0

    if (!title) {
        throw new Error('Le titre du service est obligatoire')
    }

    const slug = slugify(slugInput || title)
    if (!slug) {
        throw new Error('Le slug du service est invalide')
    }

    // L'import de fichier prend le dessus sur le lien saisi manuellement.
    let image_url = (formData.get('image_url') as string)?.trim() || null
    const imageFile = formData.get('image_file') as File | null

    if (imageFile && imageFile.size > 0) {
        const uploadedUrl = await uploadFile(imageFile, 'xeltrix', 'services')
        if (uploadedUrl) image_url = uploadedUrl
    }

    return {
        title,
        slug,
        tagline,
        description,
        icon_name,
        image_url,
        features: parseLines(formData.get('features')),
        deliverables: parseLines(formData.get('deliverables')),
        stack: parseLines(formData.get('stack')),
        timeline,
        status,
        sort_order,
    }
}

function revalidateServices() {
    revalidatePath('/admin/services')
    revalidatePath('/services')
    revalidatePath('/')
}

export async function createService(formData: FormData) {
    const supabase = await createClient()
    const payload = await parseServicePayload(formData)

    const { error } = await supabase.from('services').insert(payload)

    if (error) {
        console.error('Erreur création service:', error)
        if (error.code === '23505') {
            throw new Error('Ce slug est déjà utilisé par un autre service')
        }
        throw new Error('Impossible de créer le service')
    }

    revalidateServices()
    redirect('/admin/services')
}

export async function updateService(id: string, formData: FormData) {
    const supabase = await createClient()
    const payload = await parseServicePayload(formData)

    const { error } = await supabase
        .from('services')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Erreur mise à jour service:', error)
        if (error.code === '23505') {
            throw new Error('Ce slug est déjà utilisé par un autre service')
        }
        throw new Error('Impossible de mettre à jour le service')
    }

    revalidateServices()
    redirect('/admin/services')
}

export async function deleteService(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('services').delete().eq('id', id)

    if (error) {
        console.error('Erreur suppression service:', error)
        throw new Error('Impossible de supprimer le service')
    }

    revalidateServices()
}
