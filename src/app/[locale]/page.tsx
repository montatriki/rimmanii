'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { services } from '@/data/services';
import { Link } from '@/i18n/routing';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="relative">
        {/* Shared Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30 fixed top-0 left-0"
            style={{ position: 'absolute' }} // Ensure it stays within the relative container but covers it
          >
            <source src="/assets/WhatsApp Video 2026-02-06 at 22.13.39.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="relative z-10">
          <Hero />

          {/* Services Preview Section */}
          <section className="section-container pb-20">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl mb-4">Our Specialized Services</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto px-4 text-sm md:text-base">
                Combining medical expertise with aesthetic artistry to reveal your best self.
              </p>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <div key={i} className="glass rounded-3xl overflow-hidden group hover:border-primary/50 transition-all duration-500 flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl mb-3">{service.title}</h3>
                    <p className="text-foreground/60 text-xs md:text-sm mb-6 flex-grow">{service.desc}</p>
                    <Link
                      href={`/services/${service.id}`}
                      className="text-primary font-bold text-xs md:text-sm hover:underline cursor-pointer inline-flex items-center"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* About Preview Section */}
      <section className="bg-white/5 py-24">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-full border-2 border-primary/20 p-4 animate-spin-slow">
              <div className="w-full h-full rounded-full border-2 border-secondary/20 p-4" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[80%] aspect-square rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/assets/WhatsApp Image 2026-02-06 at 22.01.46.jpeg"
                  alt="Specialist"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl mb-6">Expertise Meeting Passion</h2>
            <p className="text-foreground/70 text-base md:text-lg mb-8 leading-relaxed px-4 lg:px-0">
              With years of dedicated practice in medical aesthetics, we specialize in high-precision skin treatments
              that restore both confidence and beauty. Our clinic uses the latest clinical advancements and
              premium pigments to ensure natural-looking results.
            </p>
            <ul className="space-y-4 mb-10 inline-block text-left">
              {['Certified Specialists', 'Safety Protocol Guaranteed', 'Personalized Care Plans', 'Modern Equipment'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  <span className="text-foreground/80 font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button className="btn-primary w-full sm:w-auto">Our Full Story</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

