'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, User, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [isLocaleOpen, setIsLocaleOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'ar', name: 'العربية' },
    ];

    const changeLocale = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale as any });
        setIsLocaleOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isLocaleOpen && !(event.target as Element).closest('.locale-switcher')) {
                setIsLocaleOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isLocaleOpen]);

    const navLinks = [
        { name: t('home'), href: '/' },
        { name: t('about'), href: '/about' },
        { name: t('services'), href: '/services' },
        { name: t('blog'), href: '/blog' },
        { name: t('pricing'), href: '/pricing' },
        { name: t('contact'), href: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass' : 'py-6 bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold font-outfit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        RIM
                    </span>
                    <span className="hidden sm:inline-block text-sm font-medium text-foreground/80">
                        Dermotherapy
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-foreground/70'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative locale-switcher">
                        <button
                            onClick={() => setIsLocaleOpen(!isLocaleOpen)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-all flex items-center space-x-2 glass border-none"
                        >
                            <Globe size={18} className="text-foreground/70" />
                            <span className="text-xs font-black uppercase tracking-widest">{locale}</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isLocaleOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isLocaleOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-48 glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-[60]"
                                >
                                    <div className="p-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLocale(lang.code)}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${locale === lang.code
                                                    ? 'bg-primary text-white font-bold'
                                                    : 'text-foreground/60 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                <span>{lang.name}</span>
                                                {locale === lang.code && <Check size={14} />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/login" className="hidden sm:flex items-center space-x-1 p-2 hover:bg-white/10 rounded-full transition-colors text-foreground/70 hover:text-primary">
                        <User size={20} />
                    </Link>

                    <Link href="/reservation" className="hidden lg:flex btn-primary py-2 px-5 text-sm">
                        {t('reservation')}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-[70px] z-40 md:hidden bg-background/95 backdrop-blur-3xl border-t border-white/5 overflow-y-auto"
                        style={{ height: 'calc(100vh - 70px)' }}
                    >
                        <div className="flex flex-col p-6 space-y-6 min-h-full">
                            <div className="flex flex-col space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-2xl font-bold py-3 border-b border-white/5 ${pathname === link.href ? 'text-primary' : 'text-foreground/80'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-4 px-1">Select Language</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLocale(lang.code);
                                                setIsOpen(false);
                                            }}
                                            className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border ${locale === lang.code
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white/5 border-white/5 text-foreground/60 hover:bg-white/10'
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col space-y-4 pb-12">
                                <Link
                                    href="/reservation"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary text-center w-full py-4 text-lg shadow-xl shadow-primary/20"
                                >
                                    {t('reservation')}
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="glass py-4 px-6 rounded-full text-center flex items-center justify-center space-x-2 font-bold text-foreground/80 hover:text-white transition-colors"
                                >
                                    <User size={20} />
                                    <span>{t('login') || 'Login'}</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
