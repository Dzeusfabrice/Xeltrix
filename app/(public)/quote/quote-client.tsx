'use client'

import React, { useState, useMemo } from 'react'
import { Container, Button, Card } from '@/components/ui'
import { Globe, Smartphone, Monitor, Database, Bot, Cloud, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Clock, ShieldCheck, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitQuoteRequest } from './actions'

const projectTypes = [
    { id: 'web', name: 'Web App & SaaS', icon: Globe, basePrice: 2500, baseWeeks: 4, desc: 'Portail client, SaaS B2B, plateforme web réactive' },
    { id: 'mobile', name: 'Application Mobile', icon: Smartphone, basePrice: 3000, baseWeeks: 5, desc: 'App iOS & Android (Flutter / React Native)' },
    { id: 'desktop', name: 'Logiciel Desktop', icon: Monitor, basePrice: 3500, baseWeeks: 6, desc: 'Application native Windows, macOS, Linux (Tauri/Rust)' },
    { id: 'erp', name: 'ERP & Système Métier', icon: Database, basePrice: 4500, baseWeeks: 8, desc: 'Progiciel de gestion d\'entreprise sur mesure' },
    { id: 'ai', name: 'Intégration IA / LLM', icon: Bot, basePrice: 2000, baseWeeks: 3, desc: 'Agents intelligents, RAG et traitement documentaire' },
    { id: 'devops', name: 'Cloud & Infrastructure', icon: Cloud, basePrice: 1500, baseWeeks: 2, desc: 'Haute disponibilité, CI/CD et conteneurs' }
]

const optionalFeatures = [
    { id: 'auth', name: 'Authentification & Rôles RBAC avancés', price: 400, weeks: 1 },
    { id: 'payments', name: 'Passerelle de Paiement (Stripe / Mobile Money)', price: 600, weeks: 1 },
    { id: 'chat', name: 'Messagerie / Chat temps réel (WebSockets)', price: 800, weeks: 1.5 },
    { id: 'ai_assistant', name: 'Assistant IA / RAG connecté à vos données', price: 1200, weeks: 2 },
    { id: 'multitenant', name: 'Architecture Multi-Tenant (B2B SaaS)', price: 1000, weeks: 2 },
    { id: 'offline', name: 'Mode Offline-First & Sync bidirectionnelle', price: 900, weeks: 1.5 },
    { id: 'bi_dashboard', name: 'Tableaux de bord analytiques & Exports PDF', price: 700, weeks: 1 },
    { id: 'multilang', name: 'Support Multi-langues (i18n)', price: 350, weeks: 0.5 }
]

const timelineOptions = [
    { id: 'urgent', name: 'Urgent (< 1 mois)', multiplier: 1.25, desc: 'Équipe dédiée avec sprints accélérés' },
    { id: 'standard', name: 'Standard (1 à 3 mois)', multiplier: 1.0, desc: 'Rythme optimal en méthodologie agile' },
    { id: 'flexible', name: 'Flexible (3 mois et +)', multiplier: 0.95, desc: 'Planification progressive' }
]

export default function QuoteClient() {
    const [step, setStep] = useState(1)
    const [selectedType, setSelectedType] = useState(projectTypes[0].id)
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'payments'])
    const [selectedTimeline, setSelectedTimeline] = useState('standard')

    // Contact Form Data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const currentType = projectTypes.find(t => t.id === selectedType) || projectTypes[0]
    const currentTimeline = timelineOptions.find(t => t.id === selectedTimeline) || timelineOptions[1]

    // Calculate Price and Timeline Estimates
    const calculation = useMemo(() => {
        let price = currentType.basePrice
        let weeks = currentType.baseWeeks

        selectedFeatures.forEach(featId => {
            const f = optionalFeatures.find(item => item.id === featId)
            if (f) {
                price += f.price
                weeks += f.weeks
            }
        })

        price = Math.round(price * currentTimeline.multiplier)
        const minPrice = Math.round(price * 0.9)
        const maxPrice = Math.round(price * 1.15)
        const estimatedWeeks = Math.ceil(weeks)

        return {
            minPrice,
            maxPrice,
            estimatedWeeks,
            formattedRange: `${minPrice.toLocaleString('fr-FR')} € - ${maxPrice.toLocaleString('fr-FR')} €`
        }
    }, [currentType, selectedFeatures, currentTimeline])

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev => 
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')
        setIsSubmitting(true)

        try {
            const data = new FormData()
            data.append('name', formData.name)
            data.append('email', formData.email)
            data.append('phone', formData.phone)
            data.append('company', formData.company)
            data.append('projectType', currentType.name)
            data.append('features', selectedFeatures.map(f => optionalFeatures.find(of => of.id === f)?.name).filter(Boolean).join(', '))
            data.append('timeline', currentTimeline.name)
            data.append('budgetEstimate', calculation.formattedRange)
            data.append('message', formData.message)

            const result = await submitQuoteRequest(data)

            if (result.error) {
                setErrorMessage(result.error)
            } else {
                setIsSubmitted(true)
            }
        } catch (err: any) {
            setErrorMessage('Une erreur est survenue lors de l\'envoi.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="py-10">
            <Container>
                {/* Step Indicator */}
                <div className="max-w-3xl mx-auto mb-10">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
                        {[1, 2, 3, 4].map((s) => {
                            const isDone = s < step
                            const isCurrent = s === step
                            return (
                                <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                            isDone
                                                ? 'bg-blue-600 text-white'
                                                : isCurrent
                                                ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-md shadow-blue-600/30'
                                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'
                                        }`}
                                    >
                                        {isDone ? <Check size={14} /> : s}
                                    </div>
                                    <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 hidden sm:block">
                                        {s === 1 && 'Plateforme'}
                                        {s === 2 && 'Fonctionnalités'}
                                        {s === 3 && 'Délai'}
                                        {s === 4 && 'Coordonnées'}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
                    {/* Left: Step Content Wizard */}
                    <div className="lg:col-span-8">
                        <Card className="p-6 sm:p-9">
                            {isSubmitted ? (
                                <div className="text-center py-10 space-y-5">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircle2 size={34} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                            Demande de devis transmise avec succès !
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                                            Merci {formData.name}. Un architecte logiciel XELTRIX étudie votre configuration et vous contactera sous 24h ouvrées avec une proposition détaillée.
                                        </p>
                                    </div>
                                    <div className="pt-3">
                                        <Button variant="primary" size="md" onClick={() => { setIsSubmitted(false); setStep(1); }}>
                                            Effectuer une nouvelle simulation
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Project Type */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                    1. Quel type de solution souhaitez-vous développer ?
                                                </h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                    Sélectionnez la catégorie principale correspondant à votre besoin.
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                {projectTypes.map((type) => {
                                                    const Icon = type.icon
                                                    const isSelected = selectedType === type.id
                                                    return (
                                                        <button
                                                            key={type.id}
                                                            type="button"
                                                            onClick={() => setSelectedType(type.id)}
                                                            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                                                                isSelected
                                                                    ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-slate-900 dark:text-white shadow-sm'
                                                                    : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-blue-600 dark:text-blue-400'}`}>
                                                                    <Icon size={20} />
                                                                </div>
                                                                {isSelected && <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{type.name}</h4>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{type.desc}</p>
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                            <div className="flex justify-end pt-3">
                                                <Button variant="primary" size="md" onClick={() => setStep(2)}>
                                                    <span>Étape suivante</span>
                                                    <ArrowRight size={15} />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Features */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                    2. Quelles fonctionnalités clés sont requises ?
                                                </h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                    Vous pouvez sélectionner plusieurs options. L&apos;estimation s&apos;ajuste automatiquement.
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {optionalFeatures.map((feat) => {
                                                    const isChecked = selectedFeatures.includes(feat.id)
                                                    return (
                                                        <button
                                                            key={feat.id}
                                                            type="button"
                                                            onClick={() => toggleFeature(feat.id)}
                                                            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                                                                isChecked
                                                                    ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-slate-900 dark:text-white'
                                                                    : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                                                            }`}
                                                        >
                                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${isChecked ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5'}`}>
                                                                {isChecked && <Check size={12} />}
                                                            </div>
                                                            <div className="text-xs font-medium leading-snug">
                                                                {feat.name}
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                            <div className="flex justify-between pt-3">
                                                <Button variant="outline" size="md" onClick={() => setStep(1)}>
                                                    <ArrowLeft size={15} />
                                                    <span>Retour</span>
                                                </Button>
                                                <Button variant="primary" size="md" onClick={() => setStep(3)}>
                                                    <span>Étape suivante</span>
                                                    <ArrowRight size={15} />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Timeline */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                    3. Quel est votre horizon de livraison souhaité ?
                                                </h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                    Le calendrier de déploiement influence la composition de l&apos;équipe dédiée.
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                {timelineOptions.map((opt) => {
                                                    const isSelected = selectedTimeline === opt.id
                                                    return (
                                                        <button
                                                            key={opt.id}
                                                            type="button"
                                                            onClick={() => setSelectedTimeline(opt.id)}
                                                            className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                                                                isSelected
                                                                    ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-slate-900 dark:text-white'
                                                                    : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                                                            }`}
                                                        >
                                                            <div>
                                                                <div className="text-sm font-bold text-slate-900 dark:text-white">{opt.name}</div>
                                                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                                                            </div>
                                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-300 dark:border-white/20'}`}>
                                                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                            <div className="flex justify-between pt-3">
                                                <Button variant="outline" size="md" onClick={() => setStep(2)}>
                                                    <ArrowLeft size={15} />
                                                    <span>Retour</span>
                                                </Button>
                                                <Button variant="primary" size="md" onClick={() => setStep(4)}>
                                                    <span>Finaliser ma demande</span>
                                                    <ArrowRight size={15} />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Contact & Submit */}
                                    {step === 4 && (
                                        <motion.form
                                            key="step4"
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                    4. Vos coordonnées pour recevoir la proposition
                                                </h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                    Nous préparons votre dossier d&apos;architecture personnalisé.
                                                </p>
                                            </div>

                                            {errorMessage && (
                                                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                        Nom complet *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="ex: Alexandre Dupont"
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                        Email professionnel *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="ex: a.dupont@entreprise.com"
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                        Entreprise / Organisation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.company}
                                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                                        placeholder="ex: Acme Corp"
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                        Téléphone / WhatsApp
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="ex: +33 6 00 00 00 00"
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    Détails complémentaires sur votre projet (optionnel)
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="Précisez vos objectifs métiers, contraintes spécifiques..."
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                                                />
                                            </div>

                                            <div className="flex justify-between pt-3">
                                                <Button type="button" variant="outline" size="md" onClick={() => setStep(3)}>
                                                    <ArrowLeft size={15} />
                                                    <span>Retour</span>
                                                </Button>
                                                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
                                                </Button>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            )}
                        </Card>
                    </div>

                    {/* Right: Live Estimation Breakdown Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 sm:p-7 backdrop-blur-xl shadow-sm dark:shadow-xl space-y-5">
                            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                <Sparkles size={14} />
                                <span>Estimation en direct</span>
                            </div>

                            <div className="space-y-1.5 pb-5 border-b border-slate-100 dark:border-white/5">
                                <div className="text-xs text-slate-500 dark:text-slate-400">Fourchette indicative</div>
                                <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white text-gradient-primary">
                                    {calculation.formattedRange}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                                    <Clock size={13} className="text-blue-600 dark:text-blue-400" />
                                    <span>Délai estimé : ~{calculation.estimatedWeeks} semaines</span>
                                </div>
                            </div>

                            {/* Selected summary */}
                            <div className="space-y-2.5 text-xs">
                                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                                    <span className="text-slate-500 dark:text-slate-400">Plateforme :</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{currentType.name}</span>
                                </div>
                                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                                    <span className="text-slate-500 dark:text-slate-400">Options choisies :</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{selectedFeatures.length} module(s)</span>
                                </div>
                                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                                    <span className="text-slate-500 dark:text-slate-400">Rythme :</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{currentTimeline.name}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
                                    <span>Estimation sans engagement</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={13} className="text-blue-600 dark:text-blue-400" />
                                    <span>Propriété intellectuelle intégrale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
