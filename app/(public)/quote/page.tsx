import React from 'react'
import { Metadata } from 'next'
import { Container, Badge } from '@/components/ui'
import QuoteClient from './quote-client'

export const metadata: Metadata = {
    title: 'Simulateur de Devis en Ligne | XELTRIX',
    description: 'Estimez le budget et les délais de votre projet logiciel (Web, Mobile, Desktop, ERP, IA) en quelques clics grâce à notre simulateur interactif.',
}

export default function QuotePage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20 transition-colors duration-300">
            {/* Header Hero */}
            <section className="relative py-14 md:py-20 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] bg-grid-pattern">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-3.5 max-w-3xl">
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        Estimation Interactive
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                        Simulez le budget de votre <span className="text-gradient-primary">projet logiciel</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                        Sélectionnez les caractéristiques techniques de votre produit pour obtenir une estimation budgétaire transparente en direct.
                    </p>
                </Container>
            </section>

            <QuoteClient />
        </div>
    )
}
