import { createClient } from '@/lib/supabase/server'
import { Card, Button, Badge } from '@/components/ui'
import { Mail, User, Phone, Clock, MessageSquare, ArrowLeft } from 'lucide-react'
import { MessageActions } from './message-actions'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'

export default async function AdminMessagesPage() {
    const supabase = await createClient()

    const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

    const unreadCount = messages?.filter(m => m.status === 'unread').length || 0

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <Link href="/admin" className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                            <MessageSquare size={24} className="text-purple-600 dark:text-purple-400" />
                            <span>Messages & Demandes de Devis</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Boîte de réception centralisée des leads et messages entrants.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant={unreadCount > 0 ? "warning" : "default"} className="text-xs">
                        {unreadCount} non lu(s) / {messages?.length || 0} total
                    </Badge>
                </div>
            </div>

            {/* Error state */}
            {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                    Erreur lors du chargement des messages : {error.message}
                </div>
            )}

            {/* Empty state */}
            {messages?.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-3">
                        <Mail size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Aucun message reçu</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Votre boîte de réception est vide pour le moment.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages?.map((msg) => (
                        <Card
                            key={msg.id}
                            className={`p-6 space-y-4 transition-all ${
                                msg.status === 'unread'
                                    ? 'border-purple-300 dark:border-purple-500/30 shadow-md shadow-purple-500/5'
                                    : ''
                            }`}
                        >
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white">
                                        <User size={13} className="text-blue-500" />
                                        <span>{msg.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
                                        <Mail size={13} className="text-purple-500" />
                                        <span>{msg.email}</span>
                                    </div>
                                    {msg.phone && (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 font-mono">
                                            <Phone size={13} className="text-emerald-500" />
                                            <span>{msg.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                                        <Clock size={12} />
                                        {format(new Date(msg.created_at), 'dd MMM yyyy à HH:mm', { locale: fr })}
                                    </span>
                                    {msg.status === 'unread' ? (
                                        <Badge variant="warning" className="text-[10px]">
                                            Non lu
                                        </Badge>
                                    ) : (
                                        <Badge variant="default" className="text-[10px]">
                                            Traité
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 pt-1">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    {msg.subject || 'Sans objet'}
                                </h3>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {msg.message}
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <MessageActions id={msg.id} status={msg.status} email={msg.email} />
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
