import React from 'react'
import { Container } from '@/components/ui'

export default function Loading() {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-background transition-colors duration-300">
            <Container className="flex flex-col items-center space-y-8 text-center">
                {/* Logo or Spinner */}
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 animate-pulse border border-blue-500/20" />
                    <div className="absolute inset-4 rounded-xl border-t-2 border-r-2 border-blue-600 dark:border-blue-400 animate-spin" />
                </div>
                
                <div className="space-y-2">
                    <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse mx-auto" />
                    <div className="h-4 w-32 bg-slate-100 dark:bg-slate-900 rounded-full animate-pulse mx-auto" />
                </div>
            </Container>
        </div>
    )
}
