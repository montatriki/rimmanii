'use client';

import { useTranslations } from 'next-intl';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Sparkles, UserCheck, Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';



export default function ServicesPage() {
    const t = useTranslations('ServicesPage');
    const tData = useTranslations('ServicesData');

    const services = [
        {
            id: 'aestheticDermotherapy',
            image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (1).jpeg"
        },
        {
            id: 'paramedicalDermopigmentation',
            image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (2).jpeg"
        },
        {
            id: 'detailedSkinAnalysis',
            image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (3).jpeg"
        },
        {
            id: 'postSurgicalCare',
            image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (4).jpeg"
        },
        {
            id: 'pigmentationCorrection',
            image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (5).jpeg"
        },
        {
            id: 'medicalMicroNeedling',
            image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (6).jpeg"
        }
    ];
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Header */}
            <section className="pt-40 pb-20 bg-gradient-to-b from-primary/10 to-transparent">
                <div className="section-container text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6 px-4"
                    >
                        {t('title')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('titleHighlight')}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg px-6"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-[2rem] overflow-hidden flex flex-col hover:border-primary/50 transition-all duration-500 group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={tData(`${service.id}.title`)}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-white">
                                    {tData(`${service.id}.price`)}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex-grow flex flex-col">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{tData(`${service.id}.title`)}</h3>
                                <p className="text-foreground/60 text-xs md:text-sm mb-6 leading-relaxed flex-grow">
                                    {tData(`${service.id}.description`)}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {[0, 1, 2].map((i) => (
                                        <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-foreground/80">
                                            <CheckCircle2 size={14} className="text-secondary" />
                                            <span>{tData(`${service.id}.benefits.${i}`)}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="btn-outline w-full py-3 text-sm">
                                    {t('bookButton')}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trust Elements */}
            <section className="bg-black/20 py-24">
                <div className="section-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { icon: Shield, title: t('trust.medicalGrade.title'), desc: t('trust.medicalGrade.desc') },
                            { icon: Sparkles, title: t('trust.modernTech.title'), desc: t('trust.modernTech.desc') },
                            { icon: UserCheck, title: t('trust.expertCare.title'), desc: t('trust.expertCare.desc') },
                            { icon: Clock, title: t('trust.zeroWait.title'), desc: t('trust.zeroWait.desc') }
                        ].map((item, i) => (
                            <div key={i} className="text-center p-4 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                                <item.icon size={28} className="mx-auto mb-4 text-primary md:size-10" />
                                <h4 className="font-bold mb-2 text-sm md:text-base">{item.title}</h4>
                                <p className="text-[10px] md:text-xs text-foreground/50">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
