import { createClient } from '@/lib/supabase/server'
import ExperienceClient from './experience-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Expertise Technique | Xeltrix',
    description: 'Découvrez nos domaines d\'expertise et maîtrise technique. Nous utilisons les technologies les plus modernes pour garantir la performance de vos produits.',
}

export const revalidate = 3600;

export default async function ExperiencePage() {
    const supabase = await createClient()

    const { data: skills } = await supabase
        .from('experience_skills')
        .select('*')
        .order('level', { ascending: false })

    return <ExperienceClient skills={skills || []} />
}
