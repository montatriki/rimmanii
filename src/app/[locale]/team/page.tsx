'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Mail, Instagram } from 'lucide-react';

const team = [
    {
        name: "Rim Manai",
        role: "Founder & Lead Aestheticist",
        specialty: "Paramedical Dermopigmentation",
        image: "/assets/WhatsApp Image 2026-02-06 at 22.01.45.jpeg",
        bio: "Specialist in reconstructive skin art with over a decade of clinical experience in medical aesthetics."
    },
    {
        name: "Dr. Sarah Chen",
        role: "Dermatological Consultant",
        specialty: "Clinical Dermotherapy",
        image: "/assets/WhatsApp Image 2026-02-06 at 22.01.45 (1).jpeg",
        bio: "Expert in cellular skin regeneration and advanced therapy protocols for aging and damaged skin."
    },
    {
        name: "Marc Dubios",
        role: "Technical Specialist",
        specialty: "Color Matching & Pigments",
        image: "/assets/WhatsApp Image 2026-02-06 at 22.01.46 (2).jpeg",
        bio: "Dedicated specialist in custom pigment formulation and high-precision application techniques."
    }
];

export default function TeamPage() {
    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-40 pb-24">
                <div className="section-container">
                    <div className="max-w-3xl mb-12 md:mb-20 text-center md:text-left">
                        <h1 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 md:leading-tight px-4 md:px-0">Guided by <br /> <span className="text-secondary">Excellence</span></h1>
                        <p className="text-foreground/60 text-base md:text-xl leading-relaxed px-6 md:px-0">Our team consists of certified pioneers in dermotherapy and medical aesthetics, dedicated to your results.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-8 shadow-2xl mx-4 md:mx-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Hover Info */}
                                    <div className="absolute bottom-0 left-0 p-8 md:p-10 translate-y-0 lg:translate-y-10 lg:group-hover:translate-y-0 transition-all duration-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                                        <div className="flex space-x-4 mb-4 md:mb-6">
                                            {[Linkedin, Instagram, Mail].map((Icon, idx) => (
                                                <a key={idx} href="#" className="w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center hover:bg-white text-black transition-colors">
                                                    <Icon size={16} className="md:size-[18px]" />
                                                </a>
                                            ))}
                                        </div>
                                        <p className="text-xs md:text-sm font-medium text-foreground/70 leading-relaxed italic">&quot;{member.bio}&quot;</p>
                                    </div>
                                </div>

                                <div className="text-center md:text-left px-4">
                                    <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                                    <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">{member.role}</p>
                                    <div className="h-px w-10 bg-white/10 mb-4 mx-auto md:mx-0" />
                                    <p className="text-foreground/40 text-sm font-bold uppercase tracking-tighter">{member.specialty}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Join Us CTA */}
                    <div className="mt-24 md:mt-32 glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-center relative overflow-hidden mx-4 md:mx-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
                        <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8">Want to Join Our Team?</h2>
                        <p className="text-foreground/60 max-w-xl mx-auto mb-10 text-base md:text-lg">We&apos;re always looking for passionate specialists to join our clinic and help more people restore their confidence.</p>
                        <button className="btn-primary w-full md:w-auto">View Current Vacancies</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
