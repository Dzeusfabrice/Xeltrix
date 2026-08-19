import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { logout } from './actions'

export const metadata: Metadata = {
    title: 'Administration | zeltrix',
    description: 'Panneau de contrôle et gestion centralisée de zeltrix',
    robots: 'noindex, nofollow',
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // If on login page or unauthenticated, let child layout/page handle it directly without sidebar
    if (!user) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                {children}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-300">
            <AdminSidebar userEmail={user.email} logoutAction={logout} />
            <main className="flex-1 lg:pl-64 min-h-screen">
                <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
