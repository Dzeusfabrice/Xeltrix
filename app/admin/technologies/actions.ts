'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTechnology(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const logo_url = formData.get('logo_url') as string
    const description = formData.get('description') as string
    const proficiency = parseInt(formData.get('proficiency') as string || '0')

    const { error } = await supabase.from('technologies').insert({
        name,
        category,
        logo_url,
        description,
        proficiency,
    })

    if (error) {
        console.error('Erreur lors de la création de la technologie:', error)
        throw new Error('Impossible de créer la technologie')
    }

    revalidatePath('/admin/technologies')
    revalidatePath('/technologies')
    redirect('/admin/technologies')
}

export async function deleteTechnology(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('technologies').delete().eq('id', id)

    if (error) {
        console.error('Erreur lors de la suppression de la technologie:', error)
        throw new Error('Impossible de supprimer la technologie')
    }

    revalidatePath('/admin/technologies')
    revalidatePath('/technologies')
}
