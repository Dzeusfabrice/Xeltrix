'use client'

import React, { useState } from 'react'
import { Container, Button } from '@/components/ui'
import { Logo } from '@/components/shared/Logo'
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Simulate Auth
        setTimeout(() => {
            setIsLoading(false)
            router.push('/admin')
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-4">
                    <Logo className="justify-center scale-150 mb-12" />
                    <h1 className="text-3xl font-black text-primary dark:text-white">Dashboard Admin</h1>
                    <p className="text-muted">Connectez-vous pour gérer le contenu de Xeltrix.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-primary dark:text-white uppercase tracking-wider">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="admin@xeltrix.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/50 transition-all border-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-primary dark:text-white uppercase tracking-wider">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/50 transition-all border-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-sm text-error font-bold text-center">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full py-5 rounded-2xl text-lg flex items-center justify-center gap-3"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Connexion...
                                </>
                            ) : "Se connecter"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                        <button className="text-sm font-bold text-secondary hover:underline">
                            Mot de passe oublié ?
                        </button>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-xs font-medium">
                    © 2025 Xeltrix International. Tous droits réservés.
                </p>
            </div>
        </div>
    )
}
