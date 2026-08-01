"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, ShieldCheck, HeartPulse, Award, CheckCircle2 } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";

interface AboutSectionProps {
  t: any;
}

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="section py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Doctor Profile Card Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-navy via-[#073B5C] to-[#042135] p-8 sm:p-10 text-white shadow-xl border border-white/10 overflow-hidden">
            {/* Ambient Background Decorative Blur */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-teal/20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-teal/20 border border-teal/30 flex items-center justify-center text-teal mb-8">
                <Stethoscope size={36} aria-hidden="true" />
              </div>

              <span className="text-xs font-black uppercase tracking-widest text-teal">
                Lead Physiotherapist
              </span>

              <h3 className="mt-2 text-3xl sm:text-4xl font-black text-white tracking-tight">
                {CLINIC_INFO.doctor.name}
              </h3>

              <div className="mt-6 border-t border-white/15 pt-6 space-y-3 text-sm text-slate-200">
                <p className="flex items-center gap-2 font-semibold text-white">
                  <Award size={18} className="text-teal" aria-hidden="true" />
                  {CLINIC_INFO.doctor.qualification}
                </p>

                <p className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck size={18} className="text-teal" aria-hidden="true" />
                  Registration No: <span className="font-bold text-white">{CLINIC_INFO.doctor.registrationNo}</span>
                </p>

                <div className="mt-6 pt-4 border-t border-white/15">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal mb-3">
                    Specializations & Expertise
                  </p>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300">
                    {CLINIC_INFO.doctor.specializations.map((spec) => (
                      <li key={spec} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-teal shrink-0" aria-hidden="true" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 text-xs text-slate-400">
                  <p>Consultation Appointments: <a href={`tel:${CLINIC_INFO.contact.primaryPhone}`} className="text-teal font-bold hover:underline">{CLINIC_INFO.contact.primaryPhoneDisplay}</a></p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Clinic Details Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {t.about.title}
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
            {t.about.text}
          </p>

          {/* Feature Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-mist p-6 border border-teal/10 hover:border-teal/30 transition-all shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-4">
                <ShieldCheck size={22} aria-hidden="true" />
              </div>
              <h3 className="font-extrabold text-navy text-lg">{t.about.feature1Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t.about.feature1Desc}
              </p>
            </div>

            <div className="rounded-2xl bg-mist p-6 border border-teal/10 hover:border-teal/30 transition-all shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-4">
                <HeartPulse size={22} aria-hidden="true" />
              </div>
              <h3 className="font-extrabold text-navy text-lg">{t.about.feature2Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t.about.feature2Desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
