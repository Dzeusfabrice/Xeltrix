'use client'

import { deleteProduct } from './actions'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            type="button"
            onClick={() => {
                if (confirm(`Voulez-vous vraiment supprimer le produit « ${name} » ?`)) {
                    startTransition(() => {
                        deleteProduct(id)
                    })
                }
            }}
            disabled={isPending}
            className={`p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Supprimer le produit"
        >
            <Trash2 size={16} />
        </button>
    )
}
