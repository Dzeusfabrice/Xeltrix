'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { uploadFile } from '@/lib/storage'

export async function createArticle(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    // Handle File Upload
    const coverFile = formData.get('cover_file') as File
    let cover_url = formData.get('cover_url') as string

    if (coverFile && coverFile.size > 0) {
        try {
            const uploadedUrl = await uploadFile(coverFile, 'xeltrix', 'blog')
            if (uploadedUrl) cover_url = uploadedUrl
        } catch (error) {
            console.error('Failed to upload cover image:', error)
        }
    }

    // We need to fetch the current user to get their ID for the author
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Vous devez être connecté pour publier un article.')
    }

    const { error } = await supabase.from('articles').insert({
        title,
        slug,
        excerpt,
        content,
        category,
        cover_url,
        author_id: user.id,
        status: 'published',
        published_at: new Date().toISOString(),
    })

    if (error) {
        console.error('Erreur lors de la création de l\'article:', error)
        throw new Error('Impossible de créer l\'article: ' + error.message)
    }

    revalidatePath('/admin/articles')
    revalidatePath('/blog')
    redirect('/admin/articles')
}

export async function deleteArticle(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('articles').delete().eq('id', id)

    if (error) {
        console.error('Erreur lors de la suppression de l\'article:', error)
        throw new Error('Impossible de supprimer l\'article')
    }

    revalidatePath('/admin/articles')
    revalidatePath('/blog')
}

export async function updateArticle(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    // Handle File Upload
    const coverFile = formData.get('cover_file') as File
    let cover_url = formData.get('cover_url') as string

    if (coverFile && coverFile.size > 0) {
        try {
            const uploadedUrl = await uploadFile(coverFile, 'xeltrix', 'blog')
            if (uploadedUrl) cover_url = uploadedUrl
        } catch (error) {
            console.error('Failed to upload cover image:', error)
        }
    }

    const { error } = await supabase.from('articles').update({
        title,
        slug,
        excerpt,
        content,
        category,
        cover_url,
    }).eq('id', id)

    if (error) {
        console.error('Erreur lors de la mise à jour de l\'article:', error)
        throw new Error('Impossible de mettre à jour l\'article')
    }

    revalidatePath('/admin/articles')
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    redirect('/admin/articles')
}


