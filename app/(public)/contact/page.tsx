'use client'

import React from 'react'
import { Container, Button } from '@/components/ui'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    subject: z.string().min(1, "Veuillez choisir un sujet"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
    phone: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        // Simulate API call
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 1500))
        alert("Message envoyé avec succès !")
        reset()
    }

    return (
        <div className="pb-24">
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <Container>
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white leading-tight">
                            Parlons de votre <span className="text-gradient">Projet</span>.
                        </h1>
                        <p className="text-xl text-muted leading-relaxed">
                            Une idée ? Un besoin de transformation digitale ? Nous sommes là pour vous accompagner.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Info */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="space-y-8">
                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Mail className="text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-primary dark:text-white mb-2">Email</h4>
                                        <p className="text-muted text-lg">contact@xeltrix.com</p>
                                        <p className="text-sm text-slate-400">Réponse sous 24h</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Phone className="text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-primary dark:text-white mb-2">Téléphone</h4>
                                        <p className="text-muted text-lg">+225 00 00 00 00 00</p>
                                        <p className="text-sm text-slate-400">Lun - Ven, 9h - 18h</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-primary dark:text-white mb-2">Localisation</h4>
                                        <p className="text-muted text-lg">Abidjan, Côte d'Ivoire</p>
                                        <p className="text-sm text-slate-400">Cocody, Riviera</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-primary rounded-3xl text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <MessageSquare className="text-secondary mb-6" size={40} />
                                <h3 className="text-2xl font-black mb-4">Besoin d'un devis rapide ?</h3>
                                <p className="text-slate-300 mb-8 leading-relaxed">Préparez vos cahiers des charges ou une description de votre besoin, notre équipe technique reviendra vers vous avec une estimation.</p>
                                <Button variant="outline" className="text-slate-950 border-white/40 hover:bg-white hover:text-slate-950">
                                    Prendre rendez-vous
                                </Button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-1" />

                        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-primary dark:text-white uppercase tracking-wider">Nom complet</label>
                                        <input
                                            {...register('name')}
                                            placeholder="Ex: Jean Dupont"
                                            className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-error/50' : 'focus:ring-secondary/50'}`}
                                        />
                                        {errors.name && <p className="text-xs text-error font-bold">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-primary dark:text-white uppercase tracking-wider">Email</label>
                                        <input
                                            {...register('email')}
                                            placeholder="Ex: jean@mail.com"
                                            className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-error/50' : 'focus:ring-secondary/50'}`}
                                        />
                                        {errors.email && <p className="text-xs text-error font-bold">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-primary dark:text-white uppercase tracking-wider">Téléphone (Optionnel)</label>
                                        <input
                                            {...register('phone')}
                                            placeholder="+225 ..."
                                            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-primary dark:text-white uppercase tracking-wider">Sujet</label>
                                        <select
                                            {...register('subject')}
                                            className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition-all appearance-none ${errors.subject ? 'ring-2 ring-error/50' : 'focus:ring-secondary/50'}`}
                                        >
                                            <option value="">Sélectionnez un sujet</option>
                                            <option value="web">Développement Web</option>
                                            <option value="mobile">Développement Mobile</option>
                                            <option value="cloud">Solutions Cloud</option>
                                            <option value="other">Autre demande</option>
                                        </select>
                                        {errors.subject && <p className="text-xs text-error font-bold">{errors.subject.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black text-primary dark:text-white uppercase tracking-wider">Votre message</label>
                                    <textarea
                                        {...register('message')}
                                        rows={5}
                                        placeholder="Décrivez votre projet en quelques mots..."
                                        className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition-all resize-none ${errors.message ? 'ring-2 ring-error/50' : 'focus:ring-secondary/50'}`}
                                    />
                                    {errors.message && <p className="text-xs text-error font-bold">{errors.message.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                                    <Send size={20} />
                                </Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
