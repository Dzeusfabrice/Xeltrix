import React from 'react'
import { Cpu } from 'lucide-react'

export default function AdminLoading() {
    return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/20 animate-pulse">
                    <Cpu size={24} className="animate-spin-slow" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-ping" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
                Synchronisation ZELTRIX...
            </p>
        </div>
    )
}
