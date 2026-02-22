'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function Hero() {
    const t = useTranslations('HomePage');

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Video */}


            <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left lg:col-span-7"
                >
                    <span className="px-4 py-2 glass rounded-full text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-6 inline-block">
                        {t('title')}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-outfit font-black mb-6 leading-tight flex flex-wrap gap-x-3 justify-center lg:justify-start">
                        {t('subtitle').split(' ').map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                    ease: "easeOut"
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                    <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        {t('description')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link href="/reservation" className="btn-primary w-full sm:w-auto text-center flex items-center justify-center">
                            Book a Consultation
                        </Link>
                        <Link href="/services" className="btn-outline w-full sm:w-auto text-center flex items-center justify-center">
                            Explore Services
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative lg:col-span-5 max-w-md mx-auto w-full"
                >
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 group aspect-[4/5] lg:aspect-[3/4]">
                        <Image
                            src="/assets/WhatsApp Image 2026-02-06 at 22.16.16.jpeg"
                            alt="Clinic"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <div className="glass p-4 rounded-xl">
                                <p className="text-sm font-bold">State of the art technology</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
                </motion.div>
            </div>
        </section>
    );
}
