'use client'

import { deleteMessage, markAsRead } from './actions'
import { Trash2, CheckCircle, MailOpen } from 'lucide-react'
import { useTransition } from 'react'

export function MessageActions({ id, status }: { id: string, status: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="flex items-center justify-end gap-2">
            {status !== 'read' && (
                <button
                    onClick={() => {
                        startTransition(() => {
                            markAsRead(id)
                        })
                    }}
                    disabled={isPending}
                    className={`p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors border border-emerald-500/20 ${isPending ? 'opacity-50' : ''}`}
                    title="Marquer comme lu"
                >
                    <CheckCircle size={16} />
                </button>
            )}
            <button
                onClick={() => {
                    if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
                        startTransition(() => {
                            deleteMessage(id)
                        })
                    }
                }}
                disabled={isPending}
                className={`p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20 ${isPending ? 'opacity-50' : ''}`}
                title="Supprimer le message"
            >
                <Trash2 size={16} />
            </button>
        </div>
    )
}
