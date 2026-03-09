'use client'

import React, { useState, useEffect } from 'react'
import { Container, Button } from '../ui'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const backgroundImages = [
    '/assets/carrousel/slide1.jpg',
    '/assets/carrousel/slide2.jpg',
    '/assets/carrousel/slide3.jpg',
    '/assets/carrousel/slide4.jpg',
    '/assets/carrousel/slide5.jpg',
    '/assets/carrousel/slide6.jpg',
]

export const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative min-h-[95vh] flex items-center pt-28 pb-16 overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
                    />
                </AnimatePresence>

                {/* Overlay Gradients & Blur */}
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/90 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent opacity-60" />
            </div>

            {/* Background blobs (kept for extra depth) */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl opacity-30" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-10"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-black uppercase tracking-widest shadow-sm">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            <span>Innovation Digitale</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight text-primary dark:text-white">
                            Imaginez le futur,<br />
                            <span className="text-gradient">Xeltrix</span> le réalise.
                        </h1>

                        <p className="text-2xl text-muted leading-relaxed max-w-xl font-medium">
                            Spécialistes du développement sur-mesure, nous créons des solutions web, mobiles et cloud de haute performance pour propulser votre entreprise.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-6">
                            <Link href="/projects">
                                <Button size="lg" className="group h-16 px-10 text-lg">
                                    Voir nos réalisations
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="h-16 px-10 text-lg hover:bg-primary hover:text-white border-2">
                                    Nous contacter
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-10 pt-10 border-t border-slate-200/50 dark:border-slate-800/50">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-[3px] border-background bg-slate-300 shadow-xl overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-base text-muted font-bold">
                                <span className="text-primary dark:text-white">+50 clients</span> satisfaits dans le monde entier.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20 glass p-5">
                            {/* Animated Mockup */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-slate-900 via-primary to-secondary rounded-[2.5rem] flex items-center justify-center p-12 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-full h-full bg-white/10 rounded-3xl border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 shadow-2xl"
                                >
                                    <Logo className="scale-150 rotate-0" />
                                    <div className="flex gap-4">
                                        <div className="w-12 h-2 bg-secondary/50 rounded-full" />
                                        <div className="w-20 h-2 bg-white/20 rounded-full" />
                                    </div>
                                </motion.div>

                                {/* Floating decorative rings */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-white/5 rounded-full" />
                                <div className="absolute -bottom-20 -left-20 w-80 h-80 border-2 border-white/5 rounded-full" />
                            </div>
                        </div>

                        {/* Impactful decorative elements */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/30 rounded-full blur-[80px] animate-pulse" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-[100px] animate-pulse delay-1000" />

                        {/* Floating Tech Badge */}
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -right-8 top-1/4 glass px-6 py-4 rounded-3xl shadow-2xl border border-white/20 z-20 flex items-center gap-4"
                        >
                            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center text-white">
                                <ArrowRight className="-rotate-45" size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-slate-400">Uptime</p>
                                <p className="text-xl font-black text-primary dark:text-white">99.9%</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}

const Logo = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-4 ${className}`}>
        <div className="relative w-16 h-16 flex items-center justify-center bg-primary rounded-[1.25rem] overflow-hidden shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] transform -rotate-6 hover:rotate-0 transition-transform duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent)]" />
            <span className="relative text-white font-black text-4xl tracking-tighter italic">X</span>
        </div>
        <span className="font-black text-4xl tracking-tighter text-white drop-shadow-sm">
            ELTRIX<span className="text-secondary animate-pulse">.</span>
        </span>
    </div>
)
