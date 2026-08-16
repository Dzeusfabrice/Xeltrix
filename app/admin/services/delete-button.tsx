'use client'

import { deleteService } from './actions'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export function DeleteServiceButton({ id, title }: { id: string; title: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            type="button"
            onClick={() => {
                if (confirm(`Voulez-vous vraiment supprimer le service « ${title} » ?`)) {
                    startTransition(() => {
                        deleteService(id)
                    })
                }
            }}
            disabled={isPending}
            className={`p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Supprimer le service"
        >
            <Trash2 size={16} />
        </button>
    )
}
