'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star } from 'lucide-react';

const plans = [
    {
        name: "Discovery",
        price: "99",
        description: "Perfect for initial assessment and single treatment introductory sessions.",
        icon: Star,
        color: "blue",
        features: ["Skin Analysis", "Single Treatment", "Basic Consultation", "Aftercare Kit"]
    },
    {
        name: "Professional",
        price: "249",
        description: "Our most popular plan for ongoing dermotherapy and small scar revision.",
        icon: Zap,
        color: "primary",
        featured: true,
        features: ["3 Treatment Sessions", "Advanced Analysis", "Priority Booking", "Premium Aftercare Kit", "Phone Support"]
    },
    {
        name: "Platinum",
        price: "599",
        description: "Comprehensive reconstructive plan for major dermopigmentation needs.",
        icon: Crown,
        color: "secondary",
        features: ["Full Reconstruction", "Color Matching Lab", "Unlimited Consultations", "Luxury Aftercare Pack", "24/7 Concierge"]
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-40 pb-24">
                <div className="section-container">
                    <div className="text-center mb-12 md:mb-20">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 px-4">Investment in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Yourself</span></h1>
                        <p className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto px-6">Transparent pricing for premium dermatological care and reconstruction.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-2 flex flex-col ${plan.featured ? 'border-primary/50 bg-primary/5 lg:scale-105 z-10' : 'border-white/5'
                                    }`}
                            >
                                {plan.featured && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full">
                                        Recommended
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-4 rounded-2xl ${plan.featured ? 'bg-primary/20 text-primary' : 'bg-white/5 text-foreground/40'}`}>
                                        <plan.icon size={28} />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-4xl font-black">${plan.price}</span>
                                        <span className="text-xs font-bold opacity-40 ml-1">/ session</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                                <p className="text-foreground/50 text-sm mb-10 leading-relaxed min-h-[60px]">{plan.description}</p>

                                <div className="space-y-4 mb-12 flex-grow">
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center space-x-3 text-sm">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? 'bg-primary/20 text-primary' : 'bg-white/10 text-foreground/30'}`}>
                                                <Check size={12} />
                                            </div>
                                            <span className="font-medium text-foreground/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${plan.featured ? 'btn-primary' : 'btn-outline'
                                    }`}>
                                    Select {plan.name} Plan
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 md:mt-20 glass p-6 md:p-8 rounded-[2rem] md:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                                <Star size={32} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold">Custom Treatment Plan</h4>
                                <p className="text-foreground/50 text-sm">Need something specifically tailored? Let&apos;s discuss a custom bundle.</p>
                            </div>
                        </div>
                        <button className="btn-outline w-full md:w-auto px-10">Get Custom Quote</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
