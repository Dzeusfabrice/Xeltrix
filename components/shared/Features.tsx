import React from 'react'
import { Container, SectionHeader, Card } from '../ui'
import { Zap, ShieldCheck, Code2, MessageCircle, Layers, Headphones } from 'lucide-react'

const features = [
    {
        icon: Zap,
        title: "Rapide & performant",
        description:
            "Nous créons des sites et applications rapides, fluides et agréables à utiliser sur tous les appareils."
    },
    {
        icon: ShieldCheck,
        title: "Sécurisé & fiable",
        description:
            "Vos données et celles de vos utilisateurs sont protégées grâce à des solutions modernes et fiables."
    },
    {
        icon: Code2,
        title: "Un développement de qualité",
        description:
            "Nous construisons des solutions propres, modernes et faciles à faire évoluer dans le temps."
    },
    {
        icon: MessageCircle,
        title: "Un suivi à chaque étape",
        description:
            "Vous êtes accompagné et informé de l'avancement de votre projet, de l'idée jusqu'à sa mise en ligne."
    },
    {
        icon: Layers,
        title: "Des solutions sur mesure",
        description:
            "Chaque projet est pensé selon vos besoins, vos objectifs et les spécificités de votre activité."
    },
    {
        icon: Headphones,
        title: "Un accompagnement durable",
        description:
            "Notre collaboration ne s'arrête pas à la livraison. Nous restons disponibles pour faire évoluer votre solution."
    }
]

export const Features = () => {
    return (
        <section className="py-20 bg-slate-50/50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-white/[0.08] relative transition-colors duration-300">
            {/* Stealthy Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
                    alt="" 
                    className="w-full h-full object-cover opacity-[0.03] dark:opacity-[0.05] grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/50 dark:to-slate-950/80" />
            </div>

            <Container className="relative z-10">
                <SectionHeader
                    title={
                        <>
                            Pourquoi choisir <span className="text-gradient-primary">Zeltrix</span> ?
                        </>
                    }
                    description="Nous transformons vos idées en solutions digitales simples, modernes et adaptées à vos besoins."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon

                        return (
                            <Card
                                key={index}
                                className="p-6 space-y-4 hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Icon size={21} />
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}