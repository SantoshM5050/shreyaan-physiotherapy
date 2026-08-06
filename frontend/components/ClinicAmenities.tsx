"use client";

import React from "react";
import { Building, ShieldCheck, HeartPulse, Sparkles, Car, Home } from "lucide-react";
import Card3D from "./3d/Card3D";

const AMENITIES = [
  {
    icon: Building,
    title: "Modern Clinical Setup",
    desc: "Hygienic, comfortable therapy bays & private doctor consultation room.",
  },
  {
    icon: HeartPulse,
    title: "Personalized 1-on-1 Care",
    desc: "Individualized session focus ensuring maximum recovery attention for every patient.",
  },
  {
    icon: Sparkles,
    title: "Advanced Modalities",
    desc: "Equipped with IFT, TENS, Ultrasound, Dry Needling, & Decompression Traction.",
  },
  {
    icon: Car,
    title: "Convenient Parking",
    desc: "Ample hassle-free parking available on NTPC Road, Unchahar.",
  },
  {
    icon: Home,
    title: "Dedicated At-Home Care",
    desc: "Equipped home visit team serving Unchahar & surrounding Raebareli sectors.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed BPTh Doctor",
    desc: "Direct care & assessment by Dr. Sonam Maurya (BPTh Mumbai Univ, Reg 10534).",
  },
];

export default function ClinicAmenities() {
  return (
    <section id="amenities" className="py-16 bg-mist/60 border-y border-slate-200/80">
      <div className="section">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-teal border border-teal/20">
            <Building size={14} /> Clinic Facilities & Patient Comfort
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy mt-2">
            Why Patients Choose Shreyaan Physiotherapy
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {AMENITIES.map((item) => {
            const Icon = item.icon;
            return (
              <Card3D key={item.title} intensity={5} className="rounded-2xl">
                <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs hover:border-teal/30 transition-all flex items-start gap-4 h-full">
                  <div className="h-11 w-11 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-navy text-sm">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
