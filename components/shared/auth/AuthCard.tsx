'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, Lock, Mail } from 'lucide-react'
import { login } from '@/app/admin/actions'
import { AuthField } from './AuthField'

export const AuthCard = () => {
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setPending(true)
        setError(null)

        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setPending(false)
        }
    }

    return (
        <div className="relative w-full max-w-md">
            {/* Halo doré derrière la carte */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -top-16 h-48 bg-amber-200/10 blur-[90px]"
            />

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"
                />

                <header className="mb-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                        Accès restreint
                    </p>
                    <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-white">
                        Bon retour
                    </h1>
                    <p className="mt-1.5 text-sm text-white/45">
                        Accédez à votre espace d’administration.
                    </p>
                </header>

                <form action={handleSubmit} className="space-y-5">
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            role="alert"
                            className="flex items-center gap-2.5 rounded-xl border border-red-400/20 bg-red-400/10 p-3.5 text-xs font-medium text-red-200"
                        >
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{error}</span>
                        </motion.p>
                    )}

                    <AuthField
                        icon={Mail}
                        label="Adresse email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="admin@zeltrix.com"
                    />

                    <AuthField
                        icon={Lock}
                        label="Mot de passe"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••••••"
                    />

                    <button
                        type="submit"
                        disabled={pending}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 py-3.5 text-sm font-semibold tracking-wide text-slate-950 shadow-[0_10px_30px_-10px_rgba(253,230,138,0.5)] transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <span>{pending ? 'Connexion en cours...' : 'Se connecter'}</span>
                        {!pending && <ArrowRight size={16} />}
                    </button>
                </form>

                <p className="mt-8 border-t border-white/[0.06] pt-6 text-center text-[11px] leading-relaxed text-white/30">
                    Espace strictement réservé aux administrateurs zeltrix.
                    <br />
                    Toute tentative d’accès est enregistrée.
                </p>
            </motion.div>
        </div>
    )
}
