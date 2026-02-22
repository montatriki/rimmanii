'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Check, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

export default function ServiceDetail() {
    const params = useParams();
    const slug = params.slug as string;

    // Find the service data
    const service = services.find(s => s.id === slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background relative selection:bg-primary/30">
            <Header />

            {/* Global Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover object-[center_10%] opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
            </div>

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden z-10">
                <div className="section-container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 glass rounded-full text-xs font-bold text-primary uppercase tracking-widest mb-6">
                            Specialized Treatment
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-black mb-6 leading-tight max-w-4xl mx-auto">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                            {service.desc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="section-container relative z-10 -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass p-8 md:p-12 rounded-3xl"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">About the Treatment</h2>
                            <p className="text-foreground/70 leading-relaxed text-lg">
                                {service.fullDesc}
                            </p>
                        </motion.div>

                        {/* Process Flow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-8">Treatment Journey</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.process.map((step, index) => (
                                    <div key={index} className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors relative overflow-hidden group min-h-[160px] flex flex-col justify-end">
                                        <div className="absolute right-4 top-0 text-8xl font-black text-white/5 group-hover:text-primary/10 transition-colors select-none leading-none">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 relative z-10 text-primary">Step {index + 1}</h3>
                                        <p className="text-lg font-medium relative z-10">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex justify-between pt-8">
                            <Link href="/services" className="flex items-center space-x-2 text-foreground/60 hover:text-primary transition-colors">
                                <ArrowLeft size={20} />
                                <span>Back to Services</span>
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Benefits Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass p-8 rounded-3xl border border-primary/20 sticky top-24"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                                <Check className="text-primary" />
                                <span>Key Benefits</span>
                            </h3>
                            <ul className="space-y-4 mb-8">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start space-x-3 text-sm md:text-base text-foreground/80">
                                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6 border-t border-white/10">
                                <Link
                                    href="/reservation"
                                    className="btn-primary w-full flex items-center justify-center space-x-2 py-4 text-lg shadow-xl shadow-primary/20 group"
                                >
                                    <Calendar size={20} />
                                    <span>Book Now</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <p className="text-center text-xs text-foreground/40 mt-4">
                                    Free initial consultation included
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="relative z-10 bg-black/60 backdrop-blur-sm">
                <Footer />
            </div>
        </main>
    );
}
