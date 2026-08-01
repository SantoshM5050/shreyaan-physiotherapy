"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Phone, Sparkles, CheckCircle2, Star, ShieldCheck, Award } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";

interface HeroProps {
  t: any;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-mist via-white to-mist/40 pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="section grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Hero Left Content Column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 relative z-10"
        >
          {/* Clinic Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-wider text-teal shadow-sm backdrop-blur-md mb-6">
            <Sparkles size={16} className="text-teal" aria-hidden="true" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-navy">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-2xl">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#appointment"
              className="btn-primary text-sm sm:text-base py-3.5 px-7 shadow-lg shadow-teal/20 hover:shadow-teal/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <CalendarDays size={19} aria-hidden="true" />
              <span>{t.hero.ctaPrimary}</span>
            </a>

            <a
              href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
              className="btn-outline text-sm sm:text-base py-3.5 px-7 hover:bg-white transition-all"
            >
              <Phone size={18} aria-hidden="true" />
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                <Star size={20} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-navy">5.0 ★ Rating</p>
                <p className="text-xs text-slate-500">157+ Google Reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
                <Award size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-navy">BPTh Qualified</p>
                <p className="text-xs text-slate-500">Mumbai University</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                <ShieldCheck size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-navy">Verified Reg. 10534</p>
                <p className="text-xs text-slate-500">Dr. Sonam Maurya</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Right Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5 relative"
        >
          {/* Glass Glow Container */}
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-teal/30 to-navy/20 blur-2xl opacity-75" />

            <div className="relative rounded-[2rem] overflow-hidden border border-white/60 bg-white shadow-2xl">
              <Image
                src="/images/clinic-hero.png"
                alt="Dr. Sonam Maurya providing physiotherapy rehabilitation at Shreyaan Physiotherapy Center Unchahar"
                width={1200}
                height={800}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-[4/3] w-full object-cover rounded-[2rem]"
              />

              {/* Floating Glassmorphic Overlay Badge 1 */}
              <div className="absolute top-4 right-4 rounded-2xl bg-white/90 backdrop-blur-md p-3 shadow-lg border border-white/40 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-extrabold text-navy">Open Today (10 AM – 6 PM)</span>
              </div>

              {/* Floating Glassmorphic Overlay Badge 2 */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-navy/90 backdrop-blur-md p-4 text-white shadow-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-teal font-extrabold uppercase tracking-wider">Expert Consultation</p>
                    <p className="text-sm font-bold mt-0.5">{CLINIC_INFO.doctor.name}</p>
                    <p className="text-[11px] text-slate-300">{CLINIC_INFO.doctor.qualification}</p>
                  </div>
                  <a
                    href="#contact"
                    className="rounded-xl bg-teal px-3 py-2 text-xs font-bold text-white hover:bg-[#078d8d] transition-colors"
                  >
                    Consult Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
