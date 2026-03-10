'use client'

import React from 'react'
import { Container, Button } from '@/components/ui'
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Linkedin, Twitter, Github, Zap } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'

const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    subject: z.string().min(1, "Veuillez choisir un sujet"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
    phone: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactInfoItem = ({ icon, title, value, sub, delay }: { icon: any, title: string, value: string, sub: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="flex gap-6 items-center p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group"
    >
        <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 text-purple-400">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <h4 className="text-xs font-black text-purple-500 uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-white text-lg font-bold tracking-tight">{value}</p>
            <p className="text-slate-500 text-sm font-medium italic">{sub}</p>
        </div>
    </motion.div>
)

import { submitContactMessage } from './actions'

// ... (keep contactSchema and info items) ...

export default function ContactPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('subject', data.subject)
            formData.append('message', data.message)
            if (data.phone) formData.append('phone', data.phone)

            const result = await submitContactMessage(formData)

            if (result.error) {
                alert(`Erreur: ${result.error}`)
            } else {
                alert("Message envoyé avec succès ! Notre équipe technique vous recontactera sous peu.")
                reset()
            }
        } catch (error) {
            alert("Une erreur inattendue s'est produite.")
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Ultra-Modern Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] opacity-30" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 right-0 w-full lg:w-3/4 pointer-events-none select-none z-0"
                >
                    {/* Mobile specific gradient to protect text visibility */}
                    <div className="absolute inset-0 bg-[#020617]/80 lg:hidden z-10" />
                    <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#020617_80%)] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                        alt="Contact Symbiosis"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-8 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            <Zap size={14} className="animate-pulse" />
                            Disponible pour de nouveaux défis
                        </motion.div>
                        <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                            Parlons de votre <br /> <span className="text-gradient">PROJET</span>.
                        </h1>
                        <p className="text-xl md:text-3xl text-slate-400 leading-relaxed font-medium max-w-2xl">
                            Une idée visionnaire ? Un besoin de transformation numérique ? Notre expertise est à votre service.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <section className="py-24 relative">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Info Panel - High Tech Style */}
                        <div className="lg:col-span-5 space-y-10 group">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-white tracking-tight">Canaux de communication</h3>
                                <div className="h-1 w-20 bg-purple-600 rounded-full group-hover:w-40 transition-all duration-700" />
                            </div>

                            <div className="space-y-6">
                                <ContactInfoItem
                                    icon={<Mail />}
                                    title="Email Direct"
                                    value="contact@xeltrix.com"
                                    sub="Réponse garantie sous 24h"
                                    delay={0.1}
                                />
                                <ContactInfoItem
                                    icon={<Phone />}
                                    title="Ligne Téléphonique"
                                    value="+225 00 00 00 00 00"
                                    sub="Lun - Ven, 09:00 - 18:00"
                                    delay={0.2}
                                />
                                <ContactInfoItem
                                    icon={<MapPin />}
                                    title="Siège Social"
                                    value="Abidjan, Côte d'Ivoire"
                                    sub="Cocody, Riviera 3"
                                    delay={0.3}
                                />
                            </div>

                            {/* Social Presence */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="p-10 rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-950 to-purple-900/20 border border-white/5 relative overflow-hidden glass-card"
                            >
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />
                                <h4 className="text-xl font-black text-white mb-6 tracking-tight">Suivez notre aventure</h4>
                                <div className="flex gap-4">
                                    {[<Linkedin />, <Github />, <Twitter />, <Globe />].map((icon, i) => (
                                        <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 hover:-translate-y-2 transition-all duration-500 shadow-xl">
                                            {React.cloneElement(icon as any, { size: 22 })}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Modern Glass Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:col-span-7 bg-slate-900/30 p-8 md:p-16 rounded-[4rem] border border-white/5 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden glass-card"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px]" />

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Nom complet</label>
                                        <div className="relative">
                                            <input
                                                {...register('name')}
                                                placeholder="Ex: Fabrice Dzeudjio"
                                                className={`w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none text-white focus:ring-2 transition-all font-medium placeholder:text-slate-700 ${errors.name ? 'ring-2 ring-red-500/50' : 'focus:ring-purple-500/50'}`}
                                            />
                                        </div>
                                        {errors.name && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-1">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Email Professionnel</label>
                                        <input
                                            {...register('email')}
                                            placeholder="Ex: contact@votre-startup.com"
                                            className={`w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none text-white focus:ring-2 transition-all font-medium placeholder:text-slate-700 ${errors.email ? 'ring-2 ring-red-500/50' : 'focus:ring-purple-500/50'}`}
                                        />
                                        {errors.email && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-1">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Téléphone</label>
                                        <input
                                            {...register('phone')}
                                            placeholder="+225 07 45..."
                                            className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none text-white focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Objet de la demande</label>
                                        <select
                                            {...register('subject')}
                                            className={`w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none text-white focus:ring-2 transition-all font-medium appearance-none cursor-pointer ${errors.subject ? 'ring-2 ring-red-500/50' : 'focus:ring-purple-500/50'}`}
                                        >
                                            <option value="" className="bg-[#020617]">Choisir un service</option>
                                            <option value="web" className="bg-[#020617]">Développement Web Premium</option>
                                            <option value="mobile" className="bg-[#020617]">Application Mobile Native</option>
                                            <option value="cloud" className="bg-[#020617]">Architecture Cloud & DevOps</option>
                                            <option value="other" className="bg-[#020617]">Autre Défi Technique</option>
                                        </select>
                                        {errors.subject && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-1">{errors.subject.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Votre Message</label>
                                    <textarea
                                        {...register('message')}
                                        rows={5}
                                        placeholder="Décrivez votre vision en quelques mots..."
                                        className={`w-full px-8 py-6 bg-white/5 border border-white/10 rounded-[2rem] outline-none text-white focus:ring-2 transition-all resize-none font-medium placeholder:text-slate-700 ${errors.message ? 'ring-2 ring-red-500/50' : 'focus:ring-purple-500/50'}`}
                                    />
                                    {errors.message && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-1">{errors.message.message}</p>}
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        className="w-full h-20 rounded-[2rem] bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-purple-600/20 group transition-all"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            "Transmission en cours..."
                                        ) : (
                                            <>
                                                Lancer la conversation
                                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Final Touch: Trust Badges */}
            <Container className="pt-20">
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-3">
                        <Zap size={24} className="text-white" />
                        <span className="font-black text-white italic tracking-tighter text-xl">FAST RESPONSE</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MessageSquare size={24} className="text-white" />
                        <span className="font-black text-white italic tracking-tighter text-xl">TECH ADVISORY</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe size={24} className="text-white" />
                        <span className="font-black text-white italic tracking-tighter text-xl">GLOBAL REACH</span>
                    </div>
                </div>
            </Container>
        </div>
    )
}
