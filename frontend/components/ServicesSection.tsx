"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Home, Building2, Video, Sparkles } from "lucide-react";
import { SERVICES } from "../lib/constants";
import Card3D from "./3d/Card3D";

interface ServicesSectionProps {
  t: any;
}

export default function ServicesSection({ t }: ServicesSectionProps) {
  const [activeCareMode, setActiveCareMode] = useState<"clinic" | "home" | "online">("clinic");

  const careModes = [
    {
      id: "clinic",
      title: "Clinic Visit",
      badge: "Primary Service",
      icon: Building2,
      description: "Comprehensive in-person examination & advanced therapeutic equipment at our Unchahar clinic.",
      features: [
        "Modern electrotherapy & decompression traction",
        "1-on-1 consultation with Dr. Sonam Maurya",
        "Immediate session availability (Mon-Sun 10 AM - 6 PM)",
      ],
      ctaText: "Book Clinic Visit",
    },
    {
      id: "home",
      title: "Home Visit Physiotherapy",
      badge: "Most Popular for Seniors",
      icon: Home,
      description: "Dedicated at-home physiotherapy care for patients with mobility limits, post-surgery recovery, or severe pain.",
      features: [
        "Professional treatment in the comfort of your home",
        "Serving Unchahar & nearby Raebareli sectors",
        "Customized home exercise & rehabilitation plan",
      ],
      ctaText: "Book Home Visit",
    },
    {
      id: "online",
      title: "Online Tele-Consultation",
      badge: "Virtual Care",
      icon: Video,
      description: "Virtual Video Consultation for assessment, ergonomic guidance, and guided home rehabilitation programs.",
      features: [
        "1-on-1 Video Assessment with Dr. Sonam",
        "Personalized exercise video prescription",
        "Ideal for follow-ups & busy professionals",
      ],
      ctaText: "Book Online Session",
    },
  ];

  return (
    <section id="services" className="bg-mist/70 py-20 lg:py-28 relative">
      <div className="section">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h2 className="heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Professional evidence-based physiotherapy tailored to your recovery needs — at our clinic, your home, or online.
          </p>
        </div>

        {/* Care Delivery Modes Cards (In-Clinic, Home Visit, Online) */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 mb-16">
          {careModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = activeCareMode === mode.id;

            return (
              <Card3D key={mode.id} intensity={8} className="rounded-3xl">
                <div
                  onClick={() => setActiveCareMode(mode.id as any)}
                  className={`cursor-pointer rounded-3xl p-7 flex flex-col justify-between h-full border transition-all duration-300 ${
                    isSelected
                      ? "bg-white border-teal shadow-xl ring-2 ring-teal/20"
                      : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-soft"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                        mode.id === "clinic" ? "bg-teal/10 text-teal" : mode.id === "home" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                      }`}>
                        {mode.badge}
                      </span>
                      <Icon size={22} className="text-teal" />
                    </div>

                    <h3 className="text-2xl font-black text-navy">{mode.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {mode.description}
                    </p>

                    <ul className="mt-5 space-y-2.5 pt-4 border-t border-slate-100">
                      {mode.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 size={14} className="text-teal shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href="#appointment"
                      className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>{mode.ctaText}</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Specialized Treatments Sub-Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-navy">
            <Sparkles size={14} className="text-teal" /> Specialized Clinical Conditions
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy mt-2">
            Targeted Rehabilitation Programs
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, idx) => (
            <Card3D key={service.id} intensity={5}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft hover:border-teal/40 transition-all duration-300 preserve-3d"
              >
                <div>
                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-teal">
                      {service.category}
                    </span>
                    <span className="text-xs font-black text-slate-400">0{idx + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-xl font-bold text-navy group-hover:text-teal transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 size={13} className="text-teal shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <a
                    href="#appointment"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal group-hover:text-navy transition-colors"
                  >
                    <span>{t.services.bookService}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}
