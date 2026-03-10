'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const image_url = formData.get('image_url') as string
    const project_url = formData.get('project_url') as string

    const { error } = await supabase.from('projects').insert({
        title,
        slug,
        description,
        category,
        image_url,
        project_url,
        status: 'online',
    })

    // Dans un vrai projet, on gérerait mieux les erreurs, ici on simplifie
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
    const image_url = formData.get('image_url') as string
    const project_url = formData.get('project_url') as string

    const { error } = await supabase.from('projects').update({
        title,
        slug,
        description,
        category,
        image_url,
        project_url,
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

