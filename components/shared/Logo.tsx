import React from 'react'
import Image from 'next/image'

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <img 
                src="/logo.png" 
                alt="ZELTRIX Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-500 mix-blend-multiply dark:invert dark:mix-blend-screen"
                style={{ display: 'block' }}
            />
        </div>
    )
}
