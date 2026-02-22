'use client';

import { useTranslations } from 'next-intl';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Clock } from 'lucide-react';

export default function ContactPage() {
    const t = useTranslations('ContactPage');
    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-40 pb-24">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-black mb-8 text-center lg:text-left">
                                {t('title')} <br />
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('titleHighlight')}</span>
                            </h1>
                            <p className="text-foreground/60 text-base md:text-lg mb-12 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                                {t('description')}
                            </p>

                            <div className="space-y-6 md:space-y-8">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 glass rounded-[2rem] hover:border-primary/50 transition-colors text-center sm:text-left">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{t('emailUs')}</p>
                                        <p className="text-base md:text-lg font-semibold">contact@rim-consulting.com</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 glass rounded-[2rem] hover:border-secondary/50 transition-colors text-center sm:text-left">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{t('callUs')}</p>
                                        <p className="text-base md:text-lg font-semibold">+33 1 23 45 67 89</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 glass rounded-[2rem] hover:border-accent/50 transition-colors text-center sm:text-left">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{t('visitUs')}</p>
                                        <p className="text-base md:text-lg font-semibold">123 Aesthetic St, Paris, France</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center lg:justify-start space-x-4">
                                {[Instagram, Facebook].map((Icon, i) => (
                                    <a key={i} href="#" className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                                        <Icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="hidden sm:block absolute top-0 right-0 p-8">
                                <Clock size={40} className="text-primary/10 rotate-12" />
                            </div>

                            <h3 className="text-3xl font-bold mb-8">{t('sendMessage')}</h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold opacity-60 ml-2">{t('fullName')}</label>
                                        <input
                                            type="text"
                                            placeholder={t('placeholderName')}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold opacity-60 ml-2">{t('emailAddress')}</label>
                                        <input
                                            type="email"
                                            placeholder={t('placeholderEmail')}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold opacity-60 ml-2">{t('serviceInterest')}</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white appearance-none">
                                        <option className="bg-background">{t('services.dermotherapy')}</option>
                                        <option className="bg-background">{t('services.dermopigmentation')}</option>
                                        <option className="bg-background">{t('services.consultation')}</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold opacity-60 ml-2">{t('yourMessage')}</label>
                                    <textarea
                                        rows={5}
                                        placeholder={t('placeholderMessage')}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white"
                                    />
                                </div>

                                <button className="btn-primary w-full flex items-center justify-center space-x-2 py-5">
                                    <Send size={20} />
                                    <span>{t('submitInquiry')}</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] w-full grayscale contrast-125 opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615672322!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1625565500000!5m2!1sen!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                />
            </section>

            <Footer />
        </main>
    );
}
