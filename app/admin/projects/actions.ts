'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { uploadFile } from '@/lib/storage'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const project_url = formData.get('project_url') as string
    const technologies = String(formData.get('technologies') || '')
        .split(/[\n,]/)
        .map((t) => t.trim())
        .filter(Boolean)

    // Handle File Upload
    const imageFile = formData.get('image_file') as File
    let image_url = formData.get('image_url') as string

    if (imageFile && imageFile.size > 0) {
        try {
            const uploadedUrl = await uploadFile(imageFile, 'zeltrix', 'projects')
            if (uploadedUrl) image_url = uploadedUrl
        } catch (error) {
            console.error('Failed to upload image:', error)
        }
    }

    const { error } = await supabase.from('projects').insert({
        title,
        slug,
        description,
        category,
        image_url,
        project_url,
        technologies,
        status: 'online',
    })

    if (error) {
        console.error('Erreur lors de la création:', error)
        throw new Error('Impossible de créer le projet')
    }

    revalidatePath('/admin/projects')
    revalidatePath('/projects')
    redirect('/admin/projects')
}

export async function deleteProject(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
        console.error('Erreur lors de la suppression:', error)
        throw new Error('Impossible de supprimer le projet')
    }

    revalidatePath('/admin/projects')
    revalidatePath('/projects')
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const project_url = formData.get('project_url') as string
    const technologies = String(formData.get('technologies') || '')
        .split(/[\n,]/)
        .map((t) => t.trim())
        .filter(Boolean)

    // Handle File Upload
    const imageFile = formData.get('image_file') as File
    let image_url = formData.get('image_url') as string

    if (imageFile && imageFile.size > 0) {
        try {
            const uploadedUrl = await uploadFile(imageFile, 'zeltrix', 'projects')
            if (uploadedUrl) image_url = uploadedUrl
        } catch (error) {
            console.error('Failed to upload image:', error)
        }
    }

    const { error } = await supabase.from('projects').update({
        title,
        slug,
        description,
        category,
        image_url,
        project_url,
        technologies,
    }).eq('id', id)

    if (error) {
        console.error('Erreur lors de la mise à jour:', error)
        throw new Error('Impossible de mettre à jour le projet')
    }

    revalidatePath('/admin/projects')
    revalidatePath('/projects')
    revalidatePath(`/projects/${slug}`)
    redirect('/admin/projects')
}


