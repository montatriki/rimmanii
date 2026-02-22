'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';

const faqs = [
    {
        question: "What is the difference between dermotherapy and dermopigmentation?",
        answer: "Dermotherapy focus on skin health and rejuvenation through non-invasive treatments, while dermopigmentation is a reconstructive tattooing technique used to camouflage scars or restore skin pigments."
    },
    {
        question: "Is the procedure painful?",
        answer: "We use high-grade topical anesthetics to ensure maximum comfort. Most patients describe the sensation as a light vibration or minor scratching, depending on the sensitivity of the area."
    },
    {
        question: "How long do the results of dermopigmentation last?",
        answer: "Results can last between 3 to 5 years. However, factors like sun exposure, skin type, and lifestyle can affect longevity. Periodic touch-ups are recommended to maintain color vibrancy."
    },
    {
        question: "What is the recovery time for dermotherapy?",
        answer: "Most treatments have minimal to zero downtime. You might experience slight redness for a few hours, but you can usually return to your daily activities immediately."
    },
    {
        question: "Do I need a consultation before booking?",
        answer: "Yes, we require an initial consultation for all new patients to assess skin health, discuss goals, and perform patch tests if necessary for pigmentation procedures."
    }
];

export default function FAQPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-40 pb-24">
                <div className="section-container max-w-4xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-3xl md:text-6xl font-black mb-6 px-4">Common Questions</h1>
                        <p className="text-foreground/60 text-base md:text-lg px-6">Everything you need to know about our specialized skin treatments.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass rounded-3xl overflow-hidden border border-white/5">
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-lg shrink-0 ${activeIndex === i ? 'bg-primary text-white' : 'bg-white/5 text-primary'}`}>
                                            <HelpCircle size={18} className="md:size-20" />
                                        </div>
                                        <span className="text-base md:text-xl font-bold">{faq.question}</span>
                                    </div>
                                    {activeIndex === i ? <Minus className="text-primary shrink-0 ml-2" /> : <Plus className="text-primary shrink-0 ml-2" />}
                                </button>

                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 md:p-8 pt-0 text-foreground/60 text-sm md:text-base leading-relaxed border-t border-white/5 mx-6 md:mx-0">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 md:mt-20 glass p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-center border-2 border-primary/20 mx-4 md:mx-0">
                        <MessageSquare size={40} className="md:size-48 mx-auto mb-6 text-primary" />
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h3>
                        <p className="text-foreground/50 text-sm md:text-base mb-8 max-w-sm md:max-w-md mx-auto">If you couldn&apos;t find the answer you&apos;re looking for, please contact our support team.</p>
                        <button className="btn-primary w-full md:w-auto">Contact Support</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
