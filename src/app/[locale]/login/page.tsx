'use client';

import { motion } from 'framer-motion';
import { Link, useRouter } from '@/i18n/routing';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter(); // Use correct router for i18n
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        mutation Login($email: String!, $password: String!) {
                            login(email: $email, password: $password) {
                                id
                                email
                                fullName
                                role
                            }
                        }
                    `,
                    variables: { email, password }
                })
            });

            const { data, errors } = await res.json();

            if (errors || !data?.login) {
                throw new Error(errors?.[0]?.message || 'Login failed');
            }

            // Store user session (simple localStorage for prototype)
            localStorage.setItem('user', JSON.stringify(data.login));

            // Redirect based on role (or just to dashboard where role is checked)
            router.push('/dashboard');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 glass rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
            >
                {/* Visual Side */}
                <div className="hidden lg:block relative p-12 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <Link href="/" className="text-3xl font-black font-outfit text-white">RIM</Link>

                        <div className="space-y-6">
                            <h2 className="text-5xl font-black leading-tight text-white">Your aesthetic journey <br /> starts here.</h2>
                            <p className="text-white/60 text-lg">Access your personalized treatment plans, track your progress, and manage your appointments seamlessly.</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-white/10 glass overflow-hidden">
                                        <Image src={`/assets/WhatsApp Image 2026-02-06 at 22.05.38 (${i}).jpeg`} alt="User" width={48} height={48} className="object-cover h-full" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-white/40 uppercase tracking-widest">+5k Members joined</p>
                        </div>
                    </div>
                    {/* Decorative image background */}
                    <div className="absolute inset-0 z-0">
                        <Image src="/assets/WhatsApp Image 2026-02-06 at 22.16.16.jpeg" alt="Background" fill className="object-cover opacity-20 filter grayscale" />
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-6 md:p-16 lg:p-24 bg-background/50 backdrop-blur-3xl">
                    <div className="max-w-md mx-auto">
                        <Link href="/" className="lg:hidden text-2xl font-black font-outfit text-white mb-8 block text-center">RIM</Link>
                        <h1 className="text-3xl md:text-4xl font-black mb-2 text-center md:text-left">Welcome Back</h1>
                        <p className="text-foreground/40 font-bold mb-10 uppercase tracking-tighter text-[10px] md:text-sm text-center md:text-left">Please enter your credentials to login.</p>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-foreground/40 ml-4 tracking-widest">Email Address</label>
                                <div className="relative group">
                                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="admin@rim.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between px-4">
                                    <label className="text-xs font-black uppercase text-foreground/40 tracking-widest">Password</label>
                                    <Link href="#" className="text-[10px] font-black uppercase text-secondary hover:underline">Forgot?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 px-2">
                                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
                                <span className="text-sm text-foreground/50">Keep me logged in</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-5 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-4 text-foreground/30 font-bold">Or continue with</span></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button className="glass py-4 rounded-xl md:rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/5 transition-colors">
                                <Chrome size={20} className="text-foreground" />
                                <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Google</span>
                            </button>
                            <button className="glass py-4 rounded-xl md:rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/5 transition-colors">
                                <Github size={20} className="text-foreground" />
                                <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Github</span>
                            </button>
                        </div>

                        <p className="mt-12 text-center text-sm text-foreground/40">
                            Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
