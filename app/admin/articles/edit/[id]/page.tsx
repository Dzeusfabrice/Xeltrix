import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditArticleForm from '@/app/admin/articles/edit/[id]/edit-form'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient()

    const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

    if (!article) {
        notFound()
    }

    return <EditArticleForm article={article} />
}
