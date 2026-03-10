import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditArticleForm from '@/app/admin/articles/edit/[id]/edit-form'

export default async function EditArticlePage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!article) {
        notFound()
    }

    return <EditArticleForm article={article} />
}
