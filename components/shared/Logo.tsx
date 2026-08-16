import React from 'react'

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-1 group cursor-pointer ${className}`}>
            <div className="relative w-11 h-11 flex items-center justify-center bg-slate-900 rounded-[12px] overflow-hidden shadow-[0_8px_20px_-5px_rgba(124,58,237,0.5)] transform -rotate-3 group-hover:rotate-0 transition-all duration-500 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent)]" />
                <span className="relative text-white font-black text-2xl tracking-tighter italic">X</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white dark:drop-shadow-md">
                ELTRIX<span className="text-purple-500 group-hover:animate-pulse">.</span>
            </span>
        </div>
    )
}
