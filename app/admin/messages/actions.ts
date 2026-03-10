'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteMessage(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('messages').delete().eq('id', id)

    if (error) {
        console.error('Erreur lors de la suppression du message:', error)
        throw new Error('Impossible de supprimer le message')
    }

    revalidatePath('/admin/messages')
}

export async function markAsRead(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('messages').update({ status: 'read' }).eq('id', id)

    if (error) {
        console.error('Erreur lors de la mise à jour du message:', error)
        throw new Error('Impossible de marquer comme lu')
    }

    revalidatePath('/admin/messages')
}
