import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditProjectForm from './edit-form'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!project) {
        notFound()
    }

    return <EditProjectForm project={project} />
}
