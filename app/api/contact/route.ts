import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, subject, message, phone } = body

        // Honeypot check (if implemented in frontend)
        // if (body.honeypot) return NextResponse.json({ success: true })

        const supabase = createClient()

        const { error } = await supabase
            .from('messages')
            .insert([
                { name, email, subject, message, phone, status: 'unread' }
            ])

        if (error) throw error

        return NextResponse.json({ success: true, message: "Merci ! Votre message a été envoyé." })
    } catch (err: any) {
        console.error('Contact error:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
