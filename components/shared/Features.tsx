import React from 'react'
import { Container, SectionHeader, Card } from '../ui'
import { Shield, Zap, Layers, Rocket, Code2, RefreshCw } from 'lucide-react'

const features = [
    {
        icon: Zap,
        title: "Performance & Optimisation SEO",
        description: "Temps de chargement sub-seconde, Server Components Next.js et Core Web Vitals supérieurs à 90 pour un référencement maximal."
    },
    {
        icon: Shield,
        title: "Sécurité & Conformité de bout en bout",
        description: "Chiffrement des flux, authentification multifacteur (MFA), gestion granulaire des rôles (RBAC) et conformité RGPD."
    },
    {
        icon: Code2,
        title: "Code Propriétaire & Maintenabilité",
        description: "Architectures typées de bout en bout en TypeScript, documentation technique exhaustive et tests automatisés réguliers."
    },
    {
        icon: Rocket,
        title: "Livraison Agile & Transparence",
        description: "Itérations hebdomadaires, environnements de prévisualisation en temps réel et communication fluide avec vos équipes."
    },
    {
        icon: Layers,
        title: "Scalabilité Horizontale",
        description: "Bases de données optimisées, requêtes indexées et conteneurisation pour supporter des montées en charge sans friction."
    },
    {
        icon: RefreshCw,
        title: "Accompagnement & Évolutivité",
        description: "Support post-déploiement proactif et capacité à intégrer continuellement de nouveaux modules et fonctionnalités."
    }
]

export const Features = () => {
    return (
        <section className="py-20 bg-slate-50/50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-white/[0.08] relative transition-colors duration-300">
            <Container>
                <SectionHeader
                    badge="Méthodologie & Exigences"
                    title={
                        <>
                            Pourquoi confier votre produit à <span className="text-gradient-primary">XELTRIX</span> ?
                        </>
                    }
                    description="Nous appliquons les standards d'ingénierie des meilleures startups technologiques pour concevoir des produits fiables, rapides et pérennes."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => {
                        const Icon = f.icon
                        return (
                            <Card key={i} className="p-7 space-y-3.5">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{f.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {f.description}
                                </p>
                            </Card>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
