'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSkill(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const domain = formData.get('domain') as string
    const tech = formData.get('tech') as string
    const level = parseInt(formData.get('level') as string)
    const color = formData.get('color') as string

    const { error } = await supabase.from('experience_skills').insert({
        name,
        domain,
        tech,
        level,
        color,
    })

    if (error) {
        console.error('Erreur:', error)
        throw new Error('Impossible d\'ajouter la compétence')
    }

    revalidatePath('/admin/experience')
    revalidatePath('/experience')
    redirect('/admin/experience')
}

export async function deleteSkill(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('experience_skills').delete().eq('id', id)
    if (error) throw new Error('Erreur suppression')
    revalidatePath('/admin/experience')
    revalidatePath('/experience')
}

export async function updateSkill(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const domain = formData.get('domain') as string
    const tech = formData.get('tech') as string
    const level = parseInt(formData.get('level') as string)
    const color = formData.get('color') as string

    const { error } = await supabase.from('experience_skills').update({
        name,
        domain,
        tech,
        level,
        color,
    }).eq('id', id)

    if (error) {
        console.error('Erreur mise à jour:', error)
        throw new Error('Impossible de modifier le domaine')
    }

    revalidatePath('/admin/experience')
    revalidatePath('/experience')
    redirect('/admin/experience')
}

