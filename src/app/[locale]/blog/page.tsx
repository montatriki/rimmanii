'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react';

const posts = [
    {
        category: "Skincare",
        title: "The Science of Dermotherapy: How Post-Surgical Care Accelerates Healing",
        description: "Discover the clinical breakthroughs in dermatological recovery and how customized therapy plans can minimize scar tissue formation.",
        image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (7).jpeg",
        author: "Rim Manai",
        date: "Feb 10, 2026",
        tags: ["Dermotherapy", "Recovery"]
    },
    {
        category: "Aesthetics",
        title: "Paramedical Dermopigmentation: Beyond Simple Tattooing",
        description: "Learn how specialized medical pigments are used to reconstruct skin appearance for vitiligo, areola reconstruction, and more.",
        image: "/assets/WhatsApp Image 2026-02-06 at 22.05.39 (8).jpeg",
        author: "Rim Manai",
        date: "Feb 08, 2026",
        tags: ["Pigmentation", "Medical Art"]
    },
    {
        category: "Maintenance",
        title: "5 Essential Tips for Maintaining Your Dermopigmentation Results",
        description: "Maximize the longevity of your paramedical tattoos with these expert-recommended aftercare routines and sun protection strategies.",
        image: "/assets/WhatsApp Image 2026-02-06 at 22.09.58.jpeg",
        author: "Specialist Team",
        date: "Feb 05, 2026",
        tags: ["Aftercare", "Skin Health"]
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-40 pb-20">
                <div className="section-container">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-8 text-center md:text-left">
                        <div className="max-w-2xl px-4 md:px-0">
                            <h1 className="text-4xl md:text-7xl font-black mb-6">Clinic <span className="text-primary italic">Journal</span></h1>
                            <p className="text-foreground/60 text-base md:text-lg">Insights, clinical studies, and professional advice on skin reconstruction and aesthetic care.</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Featured Post */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-16 md:mb-20 cursor-pointer mx-4 md:mx-0"
                    >
                        <Image
                            src={posts[0].image}
                            alt="Featured"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-3xl">
                            <span className="px-3 py-1 md:px-4 md:py-2 glass rounded-full text-[10px] md:text-xs font-bold text-primary mb-4 md:mb-6 inline-block uppercase tracking-widest">{posts[0].category}</span>
                            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 group-hover:text-primary transition-colors leading-tight">{posts[0].title}</h2>
                            <div className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm text-foreground/60">
                                <div className="flex items-center space-x-2"><Calendar size={14} /><span className="font-medium">{posts[0].date}</span></div>
                                <div className="flex items-center space-x-2"><User size={14} /><span className="font-medium">{posts[0].author}</span></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 px-4 md:px-0">
                        {posts.map((post, i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col cursor-pointer"
                            >
                                <div className="relative h-64 md:h-72 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 shadow-xl">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1 glass rounded-full text-[10px] font-bold text-white uppercase tracking-widest">{post.category}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-foreground/50 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {post.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                                    <div className="flex space-x-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold text-foreground/30 flex items-center"><Tag size={10} className="mr-1" /> {tag}</span>
                                        ))}
                                    </div>
                                    <button className="text-primary font-bold text-xs uppercase tracking-widest flex items-center group-hover:underline">
                                        Read More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
