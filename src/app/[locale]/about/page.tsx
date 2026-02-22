'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, ShieldCheck, Microscope } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                <Image
                    src="/assets/WhatsApp Image 2026-02-06 at 22.16.16.jpeg"
                    alt="About Us"
                    fill
                    className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />

                <div className="section-container relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter"
                    >
                        OUR <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">LEGACY</span>
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100px" }}
                        className="h-1 bg-primary mx-auto rounded-full"
                    />
                </div>
            </section>

            {/* Story Section */}
            <section className="section-container py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-center lg:text-left">
                            Crafting Confidence Through <br className="hidden md:block" />
                            <span className="text-secondary italic">Precise Artistry</span>
                        </h2>
                        <div className="space-y-6 text-foreground/70 text-base md:text-lg leading-relaxed text-center lg:text-left px-4 lg:px-0">
                            <p>
                                Founded by <strong>Rim Manai</strong>, our consulting clinic was born out of a passion for
                                dermatological restoration and aesthetic enhancement. We believe that skin care is not
                                just about appearance, but about restoring the relationship one has with oneself.
                            </p>
                            <p>
                                Specializing in both Aesthetic Dermotherapy and Paramedical Dermopigmentation, we manage to
                                bridge the gap between therapeutic skin care and reconstructive aesthetics. Every
                                procedure is approached with the delicacy of an artist and the precision of a medical consultant.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12 justify-center text-center lg:text-left">
                            <div>
                                <h4 className="text-3xl md:text-4xl font-black text-primary mb-1">10+</h4>
                                <p className="text-[10px] md:text-sm font-bold opacity-60 uppercase tracking-widest">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-3xl md:text-4xl font-black text-secondary mb-1">5K+</h4>
                                <p className="text-[10px] md:text-sm font-bold opacity-60 uppercase tracking-widest">Happy Patients</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
                            <Image
                                src="/assets/WhatsApp Image 2026-02-06 at 22.01.46 (1).jpeg"
                                alt="Clinic Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Overlay card */}
                        <div className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 glass p-6 md:p-8 rounded-3xl max-w-[200px] md:max-w-xs shadow-2xl backdrop-blur-2xl">
                            <Microscope size={32} className="text-primary mb-4 md:size-40" />
                            <h4 className="font-bold text-lg md:text-xl mb-2">Science First</h4>
                            <p className="text-xs md:text-sm text-foreground/60">We utilize clinical-grade pigments and the latest dermotherapy patents.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-white/5 py-24">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Values That Define Us</h2>
                        <p className="text-foreground/50">The pillars of our dermatological practice.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Award,
                                title: "Excellence",
                                desc: "Uncompromising quality in every stroke and treatment we perform."
                            },
                            {
                                icon: Heart,
                                title: "Compassion",
                                desc: "Understanding the emotional journey of skin restoration and care."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Safety",
                                desc: "Strict adherence to medical hygiene and procedural protocols."
                            }
                        ].map((value, i) => (
                            <div key={i} className="glass p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <value.icon size={32} className="text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-foreground/60 leading-relaxed text-sm">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
