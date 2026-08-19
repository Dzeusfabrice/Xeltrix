import { createClient } from '@/lib/supabase/server'
import ProjectsClient from './projects-client'
import { Metadata } from 'next'
import type { Technology } from '@/types/database'

export const metadata: Metadata = {
    title: 'Nos Réalisations | zeltrix',
    description: 'Découvrez notre portfolio de projets innovants conçus avec passion pour répondre aux défis numériques.',
}

export const revalidate = 3600

export default async function ProjectsPage() {
    const supabase = await createClient()

    const [{ data: projects }, { data: technologies }] = await Promise.all([
        supabase
            .from('projects')
            .select('*')
            .eq('status', 'online')
            .order('created_at', { ascending: false }),
        supabase
            .from('technologies')
            .select('id, name, logo_url, category, proficiency, sort_order')
            .order('sort_order', { ascending: true }),
    ])

    return (
        <ProjectsClient
            initialProjects={projects || []}
            technologies={(technologies || []) as Technology[]}
        />
    )
}
