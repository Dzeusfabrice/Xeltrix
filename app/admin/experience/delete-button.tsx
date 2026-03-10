'use client'

import React, { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteSkill } from './actions'

export const DeleteSkillButton = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition()

    const handleDelete = async () => {
        if (confirm('Voulez-vous vraiment supprimer ce domaine ?')) {
            startTransition(async () => {
                try {
                    await deleteSkill(id)
                } catch (error) {
                    alert('Erreur lors de la suppression')
                }
            })
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className={`p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-2xl transition-all border border-red-500/20 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <Trash2 size={16} />
        </button>
    )
}
