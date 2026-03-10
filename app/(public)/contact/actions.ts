'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitContactMessage(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
        return { error: 'Veuillez remplir tous les champs obligatoires.' }
    }

    const { error } = await supabase.from('messages').insert({
        name,
        email,
        subject,
        message,
        status: 'unread',
    })

    if (error) {
        console.error('Erreur lors de l\'envoi du message:', error)
        return { error: 'Une erreur est survenue lors de l\'envoi du message.' }
    }

    return { success: true }
}
