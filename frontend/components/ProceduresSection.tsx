"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Activity, Sparkles, ShieldCheck, HeartPulse, CheckCircle2, ArrowRight } from "lucide-react";
import Card3D from "./3d/Card3D";

const PROCEDURES_DATA = [
  {
    id: "dry-needling",
    title: "Dry Needling Therapy",
    badge: "Pain & Trigger Release",
    icon: Sparkles,
    description: "Targeted insertion of fine acupuncture-grade needles into myofascial trigger points for immediate muscle spasm and pain relief.",
    highlights: ["Rapid trigger point release", "Accelerated tissue recovery", "Deep muscle relaxation"],
  },
  {
    id: "cupping-therapy",
    title: "Cupping Therapy",
    badge: "Circulation & Detox",
    icon: Activity,
    description: "Traditional & modern vacuum suction therapy to enhance localized blood flow, release fascia tightness, and detoxify tissues.",
    highlights: ["Improved capillary circulation", "Myofascial decompression", "Relief for stiff backs & shoulders"],
  },
  {
    id: "electrotherapy-ift",
    title: "IFT & Electrotherapy Modalities",
    badge: "Advanced Modality",
    icon: Zap,
    description: "Interferential Therapy (IFT), TENS, and Therapeutic Ultrasound for pain desensitization, swelling reduction, and cell repair.",
    highlights: ["Deep tissue electrical stimulation", "Non-invasive pain blocking", "Post-traumatic edema control"],
  },
  {
    id: "k-taping",
    title: "Kinesiology Taping (K-Taping)",
    badge: "Joint Support",
    icon: ShieldCheck,
    description: "Elastic therapeutic taping to support weak joints and muscles without restricting range of motion while reducing inflammation.",
    highlights: ["24/7 continuous muscle support", "Lymphatic drainage assistance", "Enhanced joint proprioception"],
  },
  {
    id: "spinal-decompression",
    title: "Spinal Traction & Decompression",
    badge: "Disc & Sciatica Care",
    icon: HeartPulse,
    description: "Mechanical lumbar & cervical traction to decompress impinged spinal nerve roots and centralize herniated discs.",
    highlights: ["Nerve root decompression", "Herniated disc centralization", "Spinal mobility restoration"],
  },
  {
    id: "joint-mobilization",
    title: "Maitland Joint Mobilization",
    badge: "Orthopedic Rehab",
    icon: Activity,
    description: "Passively gliding joint surfaces to break capsular adhesions, improve synovial fluid lubrication, and restore full motion.",
    highlights: ["Capsular stiffness breakdown", "Pain-free joint gliding", "Post-fracture stiffness rehab"],
  },
];

export default function ProceduresSection() {
  return (
    <section id="procedures" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="section relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
            <Sparkles size={16} />
            <span>Advanced Clinical Procedures</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Certified Specializations & Modern Therapies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Dr. Sonam Maurya (BPTh) utilizes evidence-based clinical techniques and specialized procedures for targeted recovery.
          </p>
        </div>

        {/* Procedures Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROCEDURES_DATA.map((proc, idx) => {
            const Icon = proc.icon;
            return (
              <Card3D key={proc.id} intensity={6} className="rounded-3xl">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex flex-col justify-between h-full rounded-3xl border border-slate-200/80 bg-mist/50 p-7 shadow-soft hover:bg-white hover:border-teal/40 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-teal">
                        {proc.badge}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-navy group-hover:text-teal transition-colors">
                      {proc.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {proc.description}
                    </p>

                    <ul className="mt-5 space-y-2 pt-4 border-t border-slate-200/80">
                      {proc.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 size={13} className="text-teal shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200/80">
                    <a
                      href="#appointment"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal group-hover:text-navy transition-colors"
                    >
                      <span>Inquire Procedure</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.article>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
