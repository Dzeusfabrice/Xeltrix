'use client'

import { deleteTechnology } from './actions'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export function DeleteTechButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            onClick={() => {
                if (confirm('Voulez-vous vraiment supprimer cette technologie ?')) {
                    startTransition(() => {
                        deleteTechnology(id)
                    })
                }
            }}
            disabled={isPending}
            className={`p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Supprimer la technologie"
        >
            <Trash2 size={16} />
        </button>
    )
}
