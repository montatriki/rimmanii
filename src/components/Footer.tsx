'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const t = useTranslations('Navigation');

    return (
        <footer className="bg-black/40 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12 text-left">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 flex flex-col items-start">
                        <Link href="/" className="text-2xl font-bold font-outfit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            RIM
                        </Link>
                        <p className="mt-4 text-foreground/60 text-sm leading-relaxed max-w-xs">
                            Excellence in aesthetic dermotherapy and paramedical dermopigmentation.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 glass rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-widest">Links</h4>
                        <ul className="space-y-4">
                            {['home', 'about', 'services', 'blog', 'pricing'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link === 'home' ? '' : link}`} className="text-foreground/60 hover:text-primary transition-colors text-sm">
                                        {t(link)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="col-span-1">
                        <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/faq" className="text-foreground/60 hover:text-primary transition-colors text-sm">FAQ</Link></li>
                            <li><Link href="/team" className="text-foreground/60 hover:text-primary transition-colors text-sm">Our Team</Link></li>
                            <li><Link href="/testimonials" className="text-foreground/60 hover:text-primary transition-colors text-sm">Reviews</Link></li>
                            <li><Link href="/contact" className="text-foreground/60 hover:text-primary transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-sm text-foreground/60">
                                <MapPin size={18} className="text-primary shrink-0" />
                                <span>123 Aesthetic Avenue, Paris</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-foreground/60">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>+33 1 23 45 67 89</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-foreground/40 space-y-4 md:space-y-0">
                    <p>© {new Date().getFullYear()} RIM Dermatology Consulting. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-primary">Privacy Policy</a>
                        <a href="#" className="hover:text-primary">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
