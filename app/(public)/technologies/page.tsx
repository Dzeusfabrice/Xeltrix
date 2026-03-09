import React from 'react'
import { Container, Button } from '@/components/ui'
import { Code2, Server, Smartphone, Database, Cloud, Wrench } from 'lucide-react'

const stack = [
    {
        category: "Frontend",
        icon: <Code2 />,
        items: [
            { name: "React", level: "Expert" },
            { name: "Next.js", level: "Expert" },
            { name: "TypeScript", level: "Expert" },
            { name: "Tailwind CSS", level: "Expert" },
            { name: "Flutter Web", level: "Intermédiaire" },
        ]
    },
    {
        category: "Backend",
        icon: <Server />,
        items: [
            { name: "Node.js", level: "Expert" },
            { name: "NestJS", level: "Intermédiaire" },
            { name: "Django", level: "Intermédiaire" },
            { name: "FastAPI", level: "Débutant" },
            { name: "Go", level: "Débutant" },
        ]
    },
    {
        category: "Mobile",
        icon: <Smartphone />,
        items: [
            { name: "Flutter", level: "Expert" },
            { name: "React Native", level: "Expert" },
            { name: "Kotlin", level: "Intermédiaire" },
            { name: "Swift", level: "Débutant" },
        ]
    },
    {
        category: "Database",
        icon: <Database />,
        items: [
            { name: "PostgreSQL", level: "Expert" },
            { name: "Supabase", level: "Expert" },
            { name: "MongoDB", level: "Intermédiaire" },
            { name: "Firebase", level: "Expert" },
        ]
    },
    {
        category: "Cloud & DevOps",
        icon: <Cloud />,
        items: [
            { name: "Vercel", level: "Expert" },
            { name: "Netlify", level: "Expert" },
            { name: "Docker", level: "Intermédiaire" },
            { name: "GitHub Actions", level: "Intermédiaire" },
        ]
    },
    {
        category: "Tools",
        icon: <Wrench />,
        items: [
            { name: "Figma", level: "Expert" },
            { name: "Git", level: "Expert" },
            { name: "Postman", level: "Expert" },
            { name: "VS Code", level: "Expert" },
        ]
    }
]

export default function TechnologiesPage() {
    return (
        <div className="pb-24">
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <Container>
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white leading-tight">
                            Notre Stack <span className="text-gradient">Technologique</span>.
                        </h1>
                        <p className="text-xl text-muted leading-relaxed">
                            Nous sélectionnons les outils les plus performants pour chaque projet afin d'assurer rapidité, sécurité et scalabilité.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {stack.map((cat, i) => (
                            <div key={i} className="space-y-8 p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center">
                                        {React.cloneElement(cat.icon as any, { size: 28 })}
                                    </div>
                                    <h2 className="text-2xl font-black text-primary dark:text-white">{cat.category}</h2>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((item, ii) => (
                                        <div
                                            key={ii}
                                            className="group relative px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col gap-1 hover:border-secondary transition-colors"
                                        >
                                            <span className="font-bold text-primary dark:text-white text-sm">{item.name}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${item.level === 'Expert' ? 'text-secondary' :
                                                item.level === 'Intermédiaire' ? 'text-success' : 'text-slate-400'
                                                }`}>
                                                {item.level}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-primary rounded-[3rem] mx-6">
                <Container>
                    <div className="text-center space-y-8">
                        <h2 className="text-4xl font-black text-white">Prêt pour l'excellence technique ?</h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            Nous injectons notre expertise dans chaque ligne de code pour faire de votre produit une réussite technique sans compromis.
                        </p>
                        <div className="pt-8">
                            <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                                Démarrer un projet
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
