"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Activity, Zap, Trophy, Brain, ShieldPlus, Sparkles, Cpu } from "lucide-react";
import { SERVICES } from "../lib/constants";

interface ServicesSectionProps {
  t: any;
}

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="text-teal" size={24} aria-hidden="true" />,
  Zap: <Zap className="text-teal" size={24} aria-hidden="true" />,
  Trophy: <Trophy className="text-teal" size={24} aria-hidden="true" />,
  Brain: <Brain className="text-teal" size={24} aria-hidden="true" />,
  ShieldPlus: <ShieldPlus className="text-teal" size={24} aria-hidden="true" />,
  Sparkles: <Sparkles className="text-teal" size={24} aria-hidden="true" />,
  Cpu: <Cpu className="text-teal" size={24} aria-hidden="true" />,
};

export default function ServicesSection({ t }: ServicesSectionProps) {
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
            {t.services.text}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft hover:shadow-xl hover:border-teal/30 transition-all duration-300"
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
          ))}
        </div>
      </div>
    </section>
  );
}
