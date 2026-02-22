'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkle } from 'lucide-react';
import Image from 'next/image';

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Background Orbs */}
            <div className="absolute top-0 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 glass rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-3xl border border-white/10"
            >
                {/* Form Side - Reversed for Register */}
                <div className="p-6 md:p-16 lg:p-20 bg-background/50 backdrop-blur-3xl lg:border-r border-white/10">
                    <div className="max-w-md mx-auto">
                        <Link href="/" className="lg:hidden text-2xl font-black font-outfit text-white mb-8 block text-center">RIM</Link>
                        <h1 className="text-3xl md:text-4xl font-black mb-2 italic text-center md:text-left">Begin Your <span className="text-primary italic">Transformation</span></h1>
                        <p className="text-foreground/40 font-bold mb-10 uppercase tracking-tighter text-[10px] md:text-xs text-center md:text-left">Create your medical-grade profile today.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-foreground/40 ml-4 tracking-widest">First Name</label>
                                    <div className="relative group">
                                        <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="John"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary transition-all text-white text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-foreground/40 ml-4 tracking-widest">Last Name</label>
                                    <div className="relative group">
                                        <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary transition-all text-white text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-foreground/40 ml-4 tracking-widest">Email Address</label>
                                <div className="relative group">
                                    <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="john.doe@medical-consulting.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 focus:outline-none focus:border-primary transition-all text-white text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-foreground/40 ml-4 tracking-widest">Create Password</label>
                                <div className="relative group">
                                    <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="••••••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 focus:outline-none focus:border-primary transition-all text-white text-sm"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 space-y-2">
                                <div className="flex items-center space-x-2 text-primary">
                                    <ShieldCheck size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Privacy Protected</span>
                                </div>
                                <p className="text-[10px] text-foreground/40 leading-relaxed font-medium">Your medical data is encrypted with SHA-256 and stored on secure local servers in compliance with HIPAA guidelines.</p>
                            </div>

                            <button className="btn-primary w-full py-4 flex items-center justify-center space-x-2">
                                <span className="text-sm">Create Medical Profile</span>
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <p className="mt-10 text-center text-sm text-foreground/40">
                            Already have a profile? <Link href="/login" className="text-secondary font-bold hover:underline">Sign In Instead</Link>
                        </p>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="hidden lg:block relative p-16 overflow-hidden bg-black">
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-10">
                        <div className="w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-3xl flex items-center justify-center rotate-12 shadow-2xl shadow-primary/20">
                            <Sparkle size={48} className="text-white animate-pulse" />
                        </div>

                        <div className="space-y-6 max-w-sm">
                            <h2 className="text-5xl font-black leading-tight">Elevate Your Self Image.</h2>
                            <p className="text-foreground/40 text-sm leading-relaxed">Join a community of patients who chose precision, safety, and artistic excellence for their skin reconstruction journey.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="glass p-6 rounded-3xl text-left border-primary/20">
                                <h4 className="text-2xl font-black text-primary mb-1">99%</h4>
                                <p className="text-[8px] font-black uppercase tracking-widest text-foreground/40">Success Rate</p>
                            </div>
                            <div className="glass p-6 rounded-3xl text-left border-secondary/20">
                                <h4 className="text-2xl font-black text-secondary mb-1">Safe</h4>
                                <p className="text-[8px] font-black uppercase tracking-widest text-foreground/40">Clinical Standard</p>
                            </div>
                        </div>
                    </div>

                    {/* Animated Background texture */}
                    <div className="absolute inset-0 z-0 opacity-40">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.1)_0%,transparent_50%)]" />
                        <Image src="/assets/WhatsApp Image 2026-02-06 at 22.16.16.jpeg" alt="Clinic overlay" fill className="object-cover mix-blend-overlay rotate-12 scale-150 grayscale" />
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
