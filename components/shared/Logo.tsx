import React from 'react'

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-1 group cursor-pointer ${className}`}>
            <div className="relative w-11 h-11 flex items-center justify-center bg-primary rounded-[10px] overflow-hidden shadow-[0_5px_15px_-5px_rgba(37,99,235,0.4)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent)]" />
                <span className="relative text-white font-black text-2xl tracking-tighter italic">X</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-white dark:text-white drop-shadow-sm">
                ELTRIX<span className="text-secondary group-hover:animate-pulse">.</span>
            </span>
        </div>
    )
}
