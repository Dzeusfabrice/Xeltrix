import { createClient } from '@/lib/supabase/server'
import BlogClient from './blog-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Actualités & Blog | zeltrix',
    description: 'Partage d\'expertise, analyses technologiques et nouveautés de l\'univers zeltrix.',
}

export const revalidate = 3600;

export default async function BlogPage() {
    const supabase = await createClient()

    const { data: articles } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

    return <BlogClient articles={articles || []} />
}
