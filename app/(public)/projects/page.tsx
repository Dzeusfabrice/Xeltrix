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

    const [{ data: projects }, { data: products }, { data: technologies }] = await Promise.all([
        supabase
            .from('projects')
            .select('*')
            .eq('status', 'online')
            .order('created_at', { ascending: false }),
        supabase
            .from('products')
            .select('*')
            .eq('status', 'published')
            .order('sort_order', { ascending: true }),
        supabase
            .from('technologies')
            .select('id, name, logo_url, category, proficiency, sort_order')
            .order('sort_order', { ascending: true }),
    ])

    // Merge projects and products for the portfolio view
    const combinedProjects = [
        ...(projects || []),
        ...(products || []).map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.name,
            category: 'Produit',
            description: p.description,
            image_url: p.image_url || null, 
            technologies: p.technologies || p.modules || [], // Use dedicated tech field, fallback to modules
            is_product: true
        }))
    ]

    return (
        <ProjectsClient
            initialProjects={combinedProjects}
            technologies={(technologies || []) as Technology[]}
        />
    )
}
