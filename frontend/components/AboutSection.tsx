"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, ShieldCheck, HeartPulse, Award, CheckCircle2 } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";
import Card3D from "./3d/Card3D";

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
          <Card3D intensity={18} glareOpacity={0.25} className="rounded-[2.5rem]">
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-navy via-[#073B5C] to-[#042135] p-8 sm:p-10 text-white shadow-2xl border border-white/10 overflow-hidden preserve-3d">
              {/* Ambient Background Decorative Blur */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-teal/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 preserve-3d">
                <div className="h-16 w-16 rounded-2xl bg-teal/20 border border-teal/30 flex items-center justify-center text-teal mb-8 shadow-inner">
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

                  <div className="mt-6 pt-4 border-t border-white/15 text-xs text-slate-400 space-y-2">
                    <p>Consultation Appointments: <a href={`tel:${CLINIC_INFO.contact.primaryPhone}`} className="text-teal font-bold hover:underline">{CLINIC_INFO.contact.primaryPhoneDisplay}</a></p>
                    <a
                      href={CLINIC_INFO.urls.doctorInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      <span>Follow Dr. Sonam on Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
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
            <Card3D intensity={12} className="rounded-2xl">
              <div className="h-full rounded-2xl bg-mist p-6 border border-teal/10 hover:border-teal/30 transition-all shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-4">
                  <ShieldCheck size={22} aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-navy text-lg">{t.about.feature1Title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.about.feature1Desc}
                </p>
              </div>
            </Card3D>

            <Card3D intensity={12} className="rounded-2xl">
              <div className="h-full rounded-2xl bg-mist p-6 border border-teal/10 hover:border-teal/30 transition-all shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-4">
                  <HeartPulse size={22} aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-navy text-lg">{t.about.feature2Title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.about.feature2Desc}
                </p>
              </div>
            </Card3D>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
