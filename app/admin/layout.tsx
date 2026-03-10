import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Administration - Xeltrix',
    description: 'Panneau de contrôle de la plateforme Xeltrix',
    robots: 'noindex, nofollow', // Très important pour l'admin
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-white">
            {children}
        </div>
    )
}
