import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditTechForm from '@/app/admin/technologies/edit/[id]/edit-form'

export default async function EditTechPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: tech } = await supabase
        .from('technologies')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!tech) {
        notFound()
    }

    return <EditTechForm technology={tech} />
}
