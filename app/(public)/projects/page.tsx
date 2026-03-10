import { createClient } from '@/lib/supabase/server'
import ProjectsClient from './projects-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Nos Réalisations | Xeltrix',
    description: 'Découvrez notre portfolio de projets innovants conçus avec passion pour répondre aux défis numériques.',
}

// Revalider la page toutes les heures (3600 secondes) ou à la demande
export const revalidate = 3600;

export default async function ProjectsPage() {
    const supabase = await createClient()

    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'online')
        .order('created_at', { ascending: false })

    return <ProjectsClient initialProjects={projects || []} />
}
