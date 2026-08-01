"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeartPulse, Sparkles, ShieldCheck } from "lucide-react";

interface GallerySectionProps {
  t: any;
}

export default function GallerySection({ t }: GallerySectionProps) {
  return (
    <section id="gallery" className="section py-20 lg:py-28">
      <div className="max-w-3xl">
        <p className="eyebrow">{t.gallery.eyebrow}</p>
        <h2 className="heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t.gallery.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          {t.gallery.text}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-12 items-stretch">
        {/* Main Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 relative rounded-3xl overflow-hidden shadow-soft border border-slate-200/80 group min-h-[320px]"
        >
          <Image
            src="/images/clinic-hero.png"
            alt="Physiotherapy treatment space at Shreyaan Physiotherapy Center Unchahar"
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 65vw"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent p-6 sm:p-8 flex flex-col justify-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white w-fit mb-2">
              <Sparkles size={14} className="text-teal" aria-hidden="true" /> High Hygiene Standard
            </span>
            <p className="text-xl sm:text-2xl font-bold text-white">Modern Equipment & Patient-Focused Care</p>
          </div>
        </motion.div>

        {/* Side Highlight Cards */}
        <div className="md:col-span-4 grid gap-6 flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-gradient-to-br from-teal to-[#088989] p-8 text-white shadow-soft flex flex-col justify-between"
          >
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6">
              <HeartPulse size={28} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-teal-100">Our Promise</p>
              <p className="mt-2 text-2xl font-black leading-tight">Every Movement Counts Towards Recovery.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-navy p-8 text-white shadow-soft flex flex-col justify-between"
          >
            <div className="h-12 w-12 rounded-2xl bg-teal/20 flex items-center justify-center text-teal mb-6">
              <ShieldCheck size={28} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-teal">Your Wellbeing</p>
              <p className="mt-2 text-lg font-bold text-slate-200">Comfort, clarity and progressive recovery—together.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
