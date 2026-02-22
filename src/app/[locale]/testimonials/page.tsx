'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const testimonials = [
    {
        name: "Elena Rodriguez",
        role: "Patient",
        text: "The dermopigmentation work done on my surgical scars was transformative. For the first time in years, I feel confident wearing sleeveless dresses. The precision and care are unmatched.",
        rating: 5,
        image: "/assets/WhatsApp Image 2026-02-06 at 22.05.38 (1).jpeg"
    },
    {
        name: "Thomas Muller",
        role: "Athlete",
        text: "Professional, clean, and incredible results. The dermotherapy treatments helped me recover from skin damage I thought was permanent. Rim is a true artist in her field.",
        rating: 5,
        image: "/assets/WhatsApp Image 2026-02-06 at 22.05.38 (2).jpeg"
    },
    {
        name: "Sophie Laurent",
        role: "Dermatologist",
        text: "As a professional myself, I only trust the best for my own treatments. The protocols used at Rim Consulting are world-class and follow strict medical safety standards.",
        rating: 5,
        image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39.jpeg"
    }
];

export default function TestimonialsPage() {
    const [active, setActive] = useState(0);

    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-40 pb-24 overflow-hidden">
                <div className="section-container">
                    <div className="text-center mb-12 md:mb-20 relative px-4 md:px-0">
                        <Quote size={80} className="md:size-[120px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-primary" />
                        <h1 className="text-4xl md:text-7xl font-black mb-6">Patient <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Stories</span></h1>
                        <p className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto">Real experiences from those who have visited our clinic and witnessed the transformation.</p>
                    </div>

                    {/* Main Slider Display */}
                    <div className="relative mb-16 md:mb-32">
                        <div className="max-w-5xl mx-auto glass p-8 md:p-24 rounded-[2.5rem] md:rounded-[4rem] relative z-10 mx-4 md:mx-auto">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                            >
                                <div className="relative max-w-[280px] md:max-w-none mx-auto lg:mx-0">
                                    <div className="aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden lg:rotate-3 transition-transform duration-500 shadow-2xl">
                                        <Image src={testimonials[active].image} alt={testimonials[active].name} fill className="object-cover" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center text-white scale-110 shadow-xl shadow-primary/20">
                                        <Quote size={24} className="md:size-10" />
                                    </div>
                                </div>

                                <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                                    <div className="flex justify-center lg:justify-start space-x-1">
                                        {[...Array(testimonials[active].rating)].map((_, i) => (
                                            <Star key={i} size={18} className="fill-accent text-accent" />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-3xl font-bold italic leading-relaxed text-foreground/90">
                                        &quot;{testimonials[active].text}&quot;
                                    </p>
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-black text-primary uppercase tracking-widest">{testimonials[active].name}</h4>
                                        <p className="text-foreground/40 font-bold text-xs md:text-sm uppercase">{testimonials[active].role}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Navigation */}
                            <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-8 lg:-right-8 flex justify-center lg:justify-between mt-8 lg:mt-0 space-x-4 lg:space-x-0">
                                <button
                                    onClick={() => setActive(active === 0 ? testimonials.length - 1 : active - 1)}
                                    className="w-12 h-12 lg:w-16 lg:h-16 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={() => setActive(active === testimonials.length - 1 ? 0 : active + 1)}
                                    className="w-12 h-12 lg:w-16 lg:h-16 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Background elements */}
                        <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10" />
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] -z-10" />
                    </div>

                    {/* Grid Layout Review Wall */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
                        {testimonials.map((t, i) => (
                            <div key={i} className="glass p-6 md:p-8 rounded-[2rem] md:rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{t.name}</p>
                                        <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed italic line-clamp-4">&quot;{t.text}&quot;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
