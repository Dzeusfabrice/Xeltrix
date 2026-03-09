import React from 'react'
import { Container } from '@/components/ui'
import { CheckCircle2, Target, Eye, ShieldCheck } from 'lucide-react'

const values = [
    { icon: <Target className="text-secondary" />, title: "Mission", text: "Propulser l'innovation technologique en Afrique et dans le monde par des solutions logicielles d'exception." },
    { icon: <Eye className="text-secondary" />, title: "Vision", text: "Devenir le partenaire de référence pour la transformation digitale des entreprises ambitieuses." },
    { icon: <ShieldCheck className="text-secondary" />, title: "Valeurs", text: "Intégrité, Excellence, Innovation continue et Engagement client sont au cœur de notre ADN." }
]

const timeline = [
    { year: "2023", title: "Fondation de Xeltrix", text: "Création de la startup avec une vision claire : l'excellence logicielle." },
    { year: "2024", title: "Expansion des Services", text: "Lancement de notre pôle mobile et cloud avec des premiers succès majeurs." },
    { year: "2025", title: "Innovation Future", text: "Focus sur l'intelligence artificielle et l'automatisation des processus métiers." }
]

export default function AboutPage() {
    return (
        <div className="pb-24">
            {/* Hero Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white leading-tight">
                                Une équipe passionnée par <span className="text-gradient">l'excellence digitale</span>.
                            </h1>
                            <p className="text-xl text-muted leading-relaxed">
                                Née d'une volonté de repousser les limites du possible, Xeltrix accompagne les entreprises dans leur transition vers le futur. Nous croyons que chaque ligne de code doit servir une stratégie business concrète.
                            </p>
                            <div className="flex flex-col gap-4">
                                {["Développement Agile", "Expertise Cloud", "Design Centré Utilisateur"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-bold text-primary dark:text-white">
                                        <CheckCircle2 className="text-secondary" size={20} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                                alt="Xeltrix Team"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Values Section */}
            <section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((v, i) => (
                            <div key={i} className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 scale-110">
                                    {React.cloneElement(v.icon as any, { size: 32 })}
                                </div>
                                <h3 className="text-2xl font-black text-primary dark:text-white">{v.title}</h3>
                                <p className="text-muted leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <Container>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Notre parcours</h2>
                        <p className="text-slate-300 max-w-2xl mx-auto">De l'idée à la réalité, voici les étapes qui ont façonné Xeltrix.</p>
                    </div>

                    <div className="relative border-l-2 border-white/20 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 space-y-16">
                        {timeline.map((item, i) => (
                            <div key={i} className={`relative md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'}`}>
                                {/* Dot */}
                                <div className="absolute top-2 -left-[9px] md:left-auto md:right-auto md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(37,99,235,0.8)] z-10" />

                                <div className="pl-8 md:pl-0">
                                    <span className="text-secondary font-black text-xl mb-2 block">{item.year}</span>
                                    <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                                    <p className="text-slate-300 leading-relaxed">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
