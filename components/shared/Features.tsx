import React from 'react'
import { Container } from '../ui'
import { Shield, Zap, Monitor, Rocket } from 'lucide-react'

const features = [
    {
        icon: <Zap className="w-8 h-8 text-secondary" />,
        title: "Performance",
        description: "Des applications ultra-rapides optimisées pour le SEO et l'expérience utilisateur."
    },
    {
        icon: <Shield className="w-8 h-8 text-secondary" />,
        title: "Sécurité",
        description: "Protection des données et architecture robuste pour une tranquillité totale."
    },
    {
        icon: <Monitor className="w-8 h-8 text-secondary" />,
        title: "Eco-conception",
        description: "Optimisation de l'empreinte carbone via un code léger et efficace."
    },
    {
        icon: <Rocket className="w-8 h-8 text-secondary" />,
        title: "Scalabilité",
        description: "Des solutions qui grandissent avec votre entreprise sans compromis."
    }
]

export const Features = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-sm font-black text-secondary uppercase tracking-[0.2em]">Pourquoi Xeltrix ?</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-primary dark:text-white">L'excellence technique au service de votre vision</h3>
                    <p className="text-muted text-lg">Nous ne nous contentons pas de coder, nous concevons des produits qui font la différence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-secondary transition-all group">
                            <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-primary dark:text-white">{f.title}</h4>
                            <p className="text-muted leading-relaxed">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
