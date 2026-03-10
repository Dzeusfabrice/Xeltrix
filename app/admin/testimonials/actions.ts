'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTestimonial(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const position = formData.get('position') as string
    const message = formData.get('message') as string
    const rating = parseInt(formData.get('rating') as string)
    const photo_url = formData.get('photo_url') as string
    const is_featured = formData.get('is_featured') === 'on'

    const { error } = await supabase.from('testimonials').insert({
        name,
        position,
        message,
        rating,
        photo_url,
        is_featured,
    })

    if (error) {
        console.error('Erreur lors de la création du témoignage:', error)
        throw new Error('Impossible d\'ajouter le témoignage')
    }

    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const position = formData.get('position') as string
    const message = formData.get('message') as string
    const rating = parseInt(formData.get('rating') as string)
    const photo_url = formData.get('photo_url') as string
    const is_featured = formData.get('is_featured') === 'on'

    const { error } = await supabase.from('testimonials').update({
        name,
        position,
        message,
        rating,
        photo_url,
        is_featured,
    }).eq('id', id)

    if (error) {
        console.error('Erreur lors de la mise à jour:', error)
        throw new Error('Impossible de modifier le témoignage')
    }

    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    redirect('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('testimonials').delete().eq('id', id)

    if (error) {
        console.error('Erreur lors de la suppression:', error)
        throw new Error('Impossible de supprimer le témoignage')
    }

    revalidatePath('/admin/testimonials')
    revalidatePath('/')
}
