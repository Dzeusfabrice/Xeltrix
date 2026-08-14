'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitQuoteRequest(formData: FormData) {
    try {
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = (formData.get('phone') as string) || ''
        const company = (formData.get('company') as string) || ''
        const projectType = formData.get('projectType') as string
        const features = formData.get('features') as string
        const timeline = formData.get('timeline') as string
        const budgetEstimate = formData.get('budgetEstimate') as string
        const message = (formData.get('message') as string) || ''

        if (!name || !email || !projectType) {
            return { error: 'Veuillez remplir les informations obligatoires.' }
        }

        const supabase = await createClient()

        const fullMessage = `
[DEMANDE DE DEVIS EN LIGNE]
- Entreprise: ${company || 'Non spécifiée'}
- Type de projet: ${projectType}
- Fonctionnalités sélectionnées: ${features}
- Délai souhaité: ${timeline}
- Estimation calculée: ${budgetEstimate}

Description du projet:
${message}
        `.trim()

        const { error } = await supabase
            .from('messages')
            .insert([
                {
                    name,
                    email,
                    phone: phone ? `${phone} (Entr: ${company})` : `(Entr: ${company})`,
                    subject: `[Devis] ${projectType} - ${company || name}`,
                    message: fullMessage,
                    status: 'unread'
                }
            ])

        if (error) {
            console.error('Supabase quote insert error:', error)
            return { error: 'Erreur lors de l\'enregistrement de votre demande.' }
        }

        return { success: true }
    } catch (err: any) {
        console.error('Server quote submission error:', err)
        return { error: err.message || 'Une erreur serveur est survenue.' }
    }
}
