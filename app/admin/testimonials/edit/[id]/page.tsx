import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditTestimonialForm from '@/app/admin/testimonials/edit/[id]/edit-form'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient()

    const { data: testimonial } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()

    if (!testimonial) {
        notFound()
    }

    return <EditTestimonialForm testimonial={testimonial} />
}
