import { createClient } from '@/lib/supabase/server'
import TechnologiesClient from './technologies-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Stack Technologique | zeltrix',
    description: 'Explorez notre stack technologique de pointe. Nous utilisons les meilleurs outils pour transformer vos idées en réalité numérique.',
}

export const revalidate = 3600;

export default async function TechnologiesPage() {
    const supabase = await createClient()

    const { data: technologies } = await supabase
        .from('technologies')
        .select('*')
        .order('proficiency', { ascending: false })

    return <TechnologiesClient initialTech={technologies || []} />
}
