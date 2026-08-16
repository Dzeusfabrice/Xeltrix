import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ServiceForm } from '../../service-form'
import type { Service } from '@/types/database'

export default async function EditServicePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: service } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single()

    if (!service) {
        notFound()
    }

    return <ServiceForm mode="edit" service={service as Service} />
}
