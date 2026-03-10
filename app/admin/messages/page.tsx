import { createClient } from '@/lib/supabase/server'
import { Container, Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft, Users, Mail, User, Tag, Calendar, MessageSquare } from 'lucide-react'
import { MessageActions } from './message-actions'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default async function AdminMessagesPage() {
    const supabase = await createClient()

    const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#020617] pb-24">
            {/* Top Navigation */}
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <ArrowLeft size={20} className="text-slate-400" />
                            </Link>
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tight text-white flex items-center gap-2">
                                    <Users size={18} className="text-emerald-500" />
                                    Messages reçus
                                </span>
                                <span className="text-xs text-slate-400">Canal de contact direct</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-black uppercase tracking-widest">
                                {messages?.filter(m => m.status === 'unread').length || 0} Non Lus
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <Container className="pt-12">
                {error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                        Erreur lors du chargement des messages: {error.message}
                    </div>
                ) : messages?.length === 0 ? (
                    <div className="text-center py-24 border border-white/10 border-dashed rounded-3xl bg-slate-900/30">
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Aucun message reçu</h3>
                        <p className="text-slate-400">Votre boîte de réception est vide pour le moment.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages?.map((msg) => (
                            <div
                                key={msg.id}
                                className={`p-8 bg-slate-900/40 border ${msg.status === 'unread' ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-white/10'} rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all`}
                            >
                                {msg.status === 'unread' && (
                                    <div className="absolute top-0 right-0 p-1 bg-emerald-500 rounded-bl-xl text-[8px] font-black uppercase text-white px-3 py-1 animate-pulse">
                                        NOUVEAU
                                    </div>
                                )}

                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                    <div className="space-y-4 max-w-2xl">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
                                                <User size={14} className="text-slate-500" />
                                                <span className="text-sm font-bold text-white tracking-tight">{msg.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
                                                <Mail size={14} className="text-slate-500" />
                                                <span className="text-sm font-medium text-slate-300">{msg.email}</span>
                                            </div>
                                            {msg.phone && (
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 text-slate-400 text-xs font-medium">
                                                    {msg.phone}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                                                {msg.subject || 'Aucun objet'}
                                            </h3>
                                            <p className="text-slate-400 leading-relaxed font-medium whitespace-pre-wrap italic bg-black/20 p-4 rounded-2xl border border-white/5">
                                                "{msg.message}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start lg:items-end gap-6 shrink-0">
                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                                            <Calendar size={14} />
                                            {format(new Date(msg.created_at), 'dd MMM yyyy, HH:mm', { locale: fr })}
                                        </div>
                                        <MessageActions id={msg.id} status={msg.status} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}
