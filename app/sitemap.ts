import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://xeltrix.com'

    const staticRoutes = [
        '',
        '/services',
        '/products',
        '/projects',
        '/case-studies',
        '/quote',
        '/about',
        '/contact',
        '/blog',
        '/technologies',
        '/experience',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))

    try {
        const supabase = await createClient()
        const [projectsRes, articlesRes] = await Promise.all([
            supabase.from('projects').select('slug, updated_at').eq('status', 'online'),
            supabase.from('articles').select('slug, updated_at').eq('status', 'published')
        ])

        const projectRoutes = (projectsRes.data || []).map((p) => ({
            url: `${baseUrl}/projects/${p.slug}`,
            lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))

        const articleRoutes = (articlesRes.data || []).map((a) => ({
            url: `${baseUrl}/blog/${a.slug}`,
            lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))

        return [...staticRoutes, ...projectRoutes, ...articleRoutes]
    } catch (e) {
        return staticRoutes
    }
}
