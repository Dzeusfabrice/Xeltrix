'use client'

import React, { useState } from 'react'
import { Container, Button, Card, Badge } from '@/components/ui'
import { Mail, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { submitContactMessage } from './actions'

const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email professionnelle invalide"),
    subject: z.string().min(1, "Veuillez préciser le motif de votre message"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
    phone: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        setSubmitError('')
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('subject', data.subject)
            formData.append('message', data.message)
            if (data.phone) formData.append('phone', data.phone)

            const result = await submitContactMessage(formData)

            if (result.error) {
                setSubmitError(result.error)
            } else {
                setIsSubmitted(true)
                reset()
            }
        } catch (error) {
            setSubmitError("Une erreur inattendue s'est produite lors de l'envoi.")
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
            {/* Header Hero */}
            <section className="relative py-14 md:py-20 overflow-hidden border-b border-slate-200 dark:border-white/[0.08]">
                {/* Stealthy Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2000&auto=format&fit=crop" 
                        alt="" 
                        className="w-full h-full object-cover opacity-[0.05] dark:opacity-[0.1] grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-3.5 max-w-3xl">
                    <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                        Échange Technique & Cadrage
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                        Parlons de votre prochain <span className="text-gradient-primary">défi logiciel</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                        Notre équipe d&apos;ingénieurs et d&apos;architectes logiciels est à votre disposition pour analyser votre cahier des charges et vous conseiller.
                    </p>
                </Container>
            </section>

            <section className="py-14">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
                        {/* Left: Contact Info & Value props */}
                        <div className="lg:col-span-5 space-y-5">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    Une réponse rapide & engagée
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Nous nous engageons à répondre sous 24h avec une première analyse de faisabilité technique.
                                </p>
                            </div>

                            {/* Direct Contact Cards */}
                            <div className="space-y-2.5">
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email direct</div>
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono">contact@zeltrix.com</div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Localisation</div>
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">Ngaoundéré, Cameroun / International</div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Délai moyen de prise en charge</div>
                                        <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">&lt; 24h ouvrées</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-7">
                            <Card className="p-6 sm:p-9">
                                {isSubmitted ? (
                                    <div className="text-center py-10 space-y-3.5">
                                        <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message transmis avec succès</h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto">
                                            Merci pour votre prise de contact. Notre équipe d&apos;ingénierie revient vers vous sous 24h avec un retour qualifié.
                                        </p>
                                        <div className="pt-3">
                                            <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                                                Envoyer un autre message
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Formulaire de contact</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tous les champs marqués d&apos;une astérisque (*) sont requis.</p>
                                        </div>

                                        {submitError && (
                                            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                                                {submitError}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    Nom et prénom *
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register('name')}
                                                    placeholder="Alexandre Dupont"
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                />
                                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    Email professionnel *
                                                </label>
                                                <input
                                                    type="email"
                                                    {...register('email')}
                                                    placeholder="a.dupont@entreprise.com"
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                />
                                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    Téléphone / WhatsApp
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...register('phone')}
                                                    placeholder="+33 6 00 00 00 00"
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    Sujet *
                                                </label>
                                                <select
                                                    {...register('subject')}
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="">Sélectionnez un sujet</option>
                                                    <option value="Nouveau projet logiciel">Nouveau projet logiciel</option>
                                                    <option value="Demande de démo produit">Demande de démo produit (ERP/CRM/SDK)</option>
                                                    <option value="Audit technique ou Cloud DevOps">Audit technique ou Cloud DevOps</option>
                                                    <option value="Partenariat ou autre">Partenariat ou autre</option>
                                                </select>
                                                {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                Description de votre projet ou question *
                                            </label>
                                            <textarea
                                                rows={4}
                                                {...register('message')}
                                                placeholder="Expliquez brièvement votre contexte, vos objectifs et vos éventuelles contraintes..."
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                                            />
                                            {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                                        </div>

                                        <div className="pt-1">
                                            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                                                <Send size={15} />
                                                <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Card>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
