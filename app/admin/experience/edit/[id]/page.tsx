import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditSkillForm from '@/app/admin/experience/edit/[id]/edit-form'

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient()

    const { data: skill } = await supabase
        .from('experience_skills')
        .select('*')
        .eq('id', id)
        .single()

    if (!skill) {
        notFound()
    }

    return <EditSkillForm skill={skill} />
}
