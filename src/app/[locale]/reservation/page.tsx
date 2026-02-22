'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, ChevronLeft, User, Phone, Mail,
    Calendar as CalendarIcon, Clock, CheckCircle2,
    Sparkles, Shield, Activity, Microscope
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Service Icons Map
const serviceIcons: Record<string, any> = {
    aestheticDermotherapy: Sparkles,
    paramedicalDermopigmentation: Activity,
    medicalScarRevision: Shield,
    initialSkinConsultation: Microscope,
};

export default function ReservationPage() {
    const t = useTranslations('Reservation');
    const tServices = useTranslations('Services');
    const locale = useLocale();

    // State
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(''); // Stores the ID
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [direction, setDirection] = useState(0); // For calendar animation

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());

    const services = [
        { id: "aestheticDermotherapy", label: tServices("aestheticDermotherapy") },
        { id: "paramedicalDermopigmentation", label: tServices("paramedicalDermopigmentation") },
        { id: "medicalScarRevision", label: tServices("medicalScarRevision") },
        { id: "initialSkinConsultation", label: tServices("initialSkinConsultation") }
    ];

    const timeSlots = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];

    // Calendar Helpers
    const daysInMonth = useMemo(() => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }, [currentDate]);

    const firstDayOfMonth = useMemo(() => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    }, [currentDate]);

    const formattedMonth = useMemo(() => {
        return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(currentDate);
    }, [currentDate, locale]);

    const weekDays = useMemo(() => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(2024, 0, 7 + i); // Jan 7, 2024 is Sunday
            days.push(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date));
        }
        return days;
    }, [locale]);

    const handlePrevMonth = () => {
        setDirection(-1);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDirection(1);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isSameDate = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
    };

    // Animation Variants
    const slideVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Header />

            <section className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
                </div>

                <div className="section-container relative z-10 w-full max-w-5xl">
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                        >
                            {t('title')} <span className="text-primary">.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-foreground/60 text-lg max-w-xl mx-auto"
                        >
                            {t('subtitle')}
                        </motion.p>
                    </div>

                    {/* Modern Stepper */}
                    <div className="flex justify-center mb-16">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center">
                                    <div
                                        className={cn(
                                            "w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-xl",
                                            step >= s
                                                ? "bg-gradient-to-br from-primary to-secondary text-white scale-110 ring-4 ring-primary/20"
                                                : "bg-surface/50 text-foreground/40 border border-white/5"
                                        )}
                                    >
                                        {step > s ? <CheckCircle2 size={20} /> : s}
                                    </div>
                                    {s < 3 && (
                                        <div className={cn(
                                            "w-12 md:w-24 h-1 ml-4 md:ml-8 rounded-full transition-all duration-700",
                                            step > s ? "bg-primary" : "bg-white/5"
                                        )} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glass p-6 md:p-12 rounded-[3rem] shadow-2xl border border-white/10"
                    >
                        {/* STEP 1: SERVICE SELECTION */}
                        {step === 1 && (
                            <div className="space-y-10">
                                <div className="text-center space-y-2">
                                    <span className="text-primary font-bold uppercase tracking-widest text-xs">Step 01</span>
                                    <h3 className="text-3xl font-bold">{t('step1')}</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {services.map((service) => {
                                        const Icon = serviceIcons[service.id] || Sparkles;
                                        const isSelected = selectedService === service.id;

                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => setSelectedService(service.id)}
                                                className={cn(
                                                    "group relative p-8 rounded-3xl text-left border transition-all duration-300 overflow-hidden",
                                                    isSelected
                                                        ? "border-primary bg-primary/10 shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]"
                                                        : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                                )}
                                            >
                                                <div className={cn(
                                                    "absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-500",
                                                    isSelected && "opacity-100"
                                                )} />

                                                <div className="relative z-10 flex items-start space-x-6">
                                                    <div className={cn(
                                                        "p-4 rounded-2xl transition-colors duration-300",
                                                        isSelected ? "bg-primary text-white shadow-lg" : "bg-white/10 text-foreground/60 group-hover:bg-white/20 group-hover:text-foreground"
                                                    )}>
                                                        <Icon size={28} />
                                                    </div>
                                                    <div>
                                                        <h4 className={cn("text-lg font-bold mb-2 transition-colors", isSelected ? "text-white" : "text-foreground")}>
                                                            {service.label}
                                                        </h4>
                                                        <p className="text-sm text-foreground/50 leading-relaxed">
                                                            Professional care tailored to your needs.
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        disabled={!selectedService}
                                        onClick={() => setStep(2)}
                                        className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:grayscale transition-all"
                                    >
                                        <span>{t('nextStep')}</span>
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: DATE & TIME */}
                        {step === 2 && (
                            <div className="space-y-10">
                                <div className="text-center space-y-2">
                                    <span className="text-primary font-bold uppercase tracking-widest text-xs">Step 02</span>
                                    <h3 className="text-3xl font-bold">{t('step2')}</h3>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                                    {/* Custom Calendar */}
                                    <div className="lg:col-span-3 space-y-6">
                                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2.5rem]">
                                            <div className="flex items-center justify-between mb-8">
                                                <h4 className="text-xl font-bold flex items-center gap-2 capitalize">
                                                    <CalendarIcon className="text-primary" size={20} />
                                                    {formattedMonth}
                                                </h4>
                                                <div className="flex space-x-2">
                                                    <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                                                    <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight size={20} /></button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 text-center mb-4">
                                                {weekDays.map(d => (
                                                    <div key={d} className="text-xs font-bold text-foreground/40 uppercase tracking-widest py-2">{d}</div>
                                                ))}
                                            </div>

                                            <AnimatePresence mode='wait' custom={direction}>
                                                <motion.div
                                                    key={currentDate.toString()}
                                                    custom={direction}
                                                    variants={slideVariants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    transition={{ duration: 0.3 }}
                                                    className="grid grid-cols-7 gap-2 md:gap-4"
                                                >
                                                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                                        <div key={`empty-${i}`} />
                                                    ))}
                                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                                        const day = i + 1;
                                                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                                        const isSelected = selectedDate && isSameDate(date, selectedDate);
                                                        const isToday = isSameDate(date, new Date());

                                                        return (
                                                            <button
                                                                key={day}
                                                                onClick={() => handleDateClick(day)}
                                                                className={cn(
                                                                    "aspect-square rounded-2xl text-sm font-bold flex items-center justify-center transition-all duration-300 relative group",
                                                                    isSelected
                                                                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                                                                        : "bg-surface/50 hover:bg-surface hover:border-primary/30 border border-transparent",
                                                                    isToday && !isSelected && "border-primary text-primary"
                                                                )}
                                                            >
                                                                {day}
                                                                {isSelected && <motion.div layoutId="selectedDay" className="absolute -inset-1 border-2 border-primary rounded-2xl" />}
                                                            </button>
                                                        );
                                                    })}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2.5rem] h-full flex flex-col">
                                            <h4 className="text-xl font-bold flex items-center gap-2 mb-8">
                                                <Clock className="text-secondary" size={20} />
                                                {t('availableSlots')}
                                            </h4>

                                            <div className="grid grid-cols-2 gap-3 md:gap-4 flex-grow content-start">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={cn(
                                                            "py-4 rounded-xl text-sm font-bold border transition-all duration-300",
                                                            selectedTime === time
                                                                ? "bg-secondary/20 border-secondary text-secondary shadow-lg shadow-secondary/10"
                                                                : "bg-surface/30 border-transparent hover:bg-surface hover:border-white/10 text-foreground/70"
                                                        )}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>

                                            {!selectedDate && (
                                                <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs flex items-center justify-center text-center">
                                                    ⚠️ {t('alertSelectDate')}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                    <button onClick={() => setStep(1)} className="text-foreground/40 hover:text-foreground transition-colors font-medium">
                                        {t('back')}
                                    </button>
                                    <button
                                        disabled={!selectedDate || !selectedTime}
                                        onClick={() => setStep(3)}
                                        className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:grayscale transition-all"
                                    >
                                        <span>{t('continue')}</span>
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: DETAILS */}
                        {step === 3 && (
                            <div className="space-y-10">
                                <div className="text-center space-y-2">
                                    <span className="text-primary font-bold uppercase tracking-widest text-xs">Step 03</span>
                                    <h3 className="text-3xl font-bold">{t('step3')}</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="group bg-white/5 focus-within:bg-white/10 rounded-2xl flex items-center space-x-4 border border-white/10 focus-within:border-primary/50 transition-all p-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-focus-within:scale-110 transition-transform"><User size={20} /></div>
                                            <input type="text" placeholder={t('fullName')} className="bg-transparent border-none focus:ring-0 text-white flex-grow font-medium placeholder:text-foreground/30" />
                                        </div>
                                        <div className="group bg-white/5 focus-within:bg-white/10 rounded-2xl flex items-center space-x-4 border border-white/10 focus-within:border-secondary/50 transition-all p-4">
                                            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary group-focus-within:scale-110 transition-transform"><Mail size={20} /></div>
                                            <input type="email" placeholder={t('email')} className="bg-transparent border-none focus:ring-0 text-white flex-grow font-medium placeholder:text-foreground/30" />
                                        </div>
                                        <div className="group bg-white/5 focus-within:bg-white/10 rounded-2xl flex items-center space-x-4 border border-white/10 focus-within:border-accent/50 transition-all p-4">
                                            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-focus-within:scale-110 transition-transform"><Phone size={20} /></div>
                                            <input type="tel" placeholder={t('phone')} className="bg-transparent border-none focus:ring-0 text-white flex-grow font-medium placeholder:text-foreground/30" />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <div className="h-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden">
                                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-6">{t('bookingSummary')}</h4>
                                                <div className="space-y-4">
                                                    <div>
                                                        <span className="text-xs text-foreground/50 block mb-1">Service</span>
                                                        <span className="text-xl font-black text-white leading-tight">
                                                            {services.find(s => s.id === selectedService)?.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-8">
                                                        <div>
                                                            <span className="text-xs text-foreground/50 block mb-1">Date</span>
                                                            <span className="text-lg font-bold text-white">
                                                                {selectedDate?.toLocaleDateString(locale)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-foreground/50 block mb-1">Time</span>
                                                            <span className="text-lg font-bold text-white">
                                                                {selectedTime}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-white/10">
                                                <div className="flex items-center space-x-2 text-xs text-foreground/60">
                                                    <Shield size={14} className="text-secondary" />
                                                    <span>{t('secureSSL')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                    <button onClick={() => setStep(2)} className="text-foreground/40 hover:text-foreground transition-colors font-medium">
                                        {t('back')}
                                    </button>
                                    <button className="btn-primary px-10 py-4 shadow-2xl shadow-primary/30 hover:shadow-primary/50">
                                        {t('confirm')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
