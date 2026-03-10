import React from 'react'
import { Container } from '../ui'
import { Shield, Zap, Layout, Rocket } from 'lucide-react'

const features = [
    {
        icon: <Zap className="w-8 h-8 text-purple-500" />,
        title: "Performance",
        description: "Des applications ultra-rapides optimisées pour le SEO et l'expérience utilisateur."
    },
    {
        icon: <Shield className="w-8 h-8 text-purple-500" />,
        title: "Sécurité",
        description: "Protection des données et architecture robuste pour une tranquillité totale."
    },
    {
        icon: <Layout className="w-8 h-8 text-purple-500" />,
        title: "Design Premium",
        description: "Nous proposons des produits professionnels et design, alliant esthétique et ergonomie."
    },
    {
        icon: <Rocket className="w-8 h-8 text-purple-500" />,
        title: "Scalabilité",
        description: "Des solutions qui grandissent avec votre entreprise sans compromis."
    }
]

export const Features = () => {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-sm font-black text-purple-500 uppercase tracking-[0.2em]">Pourquoi Xeltrix ?</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white line-height-tight">L'excellence technique au service de votre vision</h3>
                    <p className="text-slate-400 text-lg">Nous ne nous contentons pas de coder, nous concevons des produits qui font la différence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-purple-500/50 transition-all group flex flex-col items-center text-center lg:items-start lg:text-left glass-card">
                            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 w-16 h-16 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-500">
                                {f.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-white transition-colors group-hover:text-purple-400">{f.title}</h4>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
