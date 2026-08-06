"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, CheckCircle2, ArrowRight, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";
import Card3D from "./3d/Card3D";

interface SymptomRegion {
  id: string;
  name: string;
  iconTag: string;
  description: string;
  commonConditions: string[];
  recommendedTherapies: string[];
  expectedRecovery: string;
  suggestedSessions: string;
}

const SYMPTOM_REGIONS: SymptomRegion[] = [
  {
    id: "neck-cervical",
    name: "Neck & Cervical Spine",
    iconTag: "Cervical",
    description: "Targeted rehabilitation for neck stiffness, nerve radiation to arm, cervical spondylosis, and postural strain.",
    commonConditions: ["Cervical Spondylosis", "Neck Stiffness & Trapezius Spasm", "Radiculopathy (Arm Numbness)", "Posture & Desk Strain"],
    recommendedTherapies: ["Cervical Traction & Decompression", "Dry Needling & Myofascial Release", "Postural Ergonomic Retraining"],
    expectedRecovery: "2 – 3 Weeks",
    suggestedSessions: "6 – 10 Sessions",
  },
  {
    id: "lumbar-back",
    name: "Lower Back & Lumbar Disc",
    iconTag: "Lumbar Disc",
    description: "Specialized care for lower back pain, herniated slip disc, sciatica radiation to leg, and acute lumbar spasms.",
    commonConditions: ["Lumbar Slip Disc", "Sciatica Nerve Compression", "Chronic Lower Back Pain", "Facet Joint Stiffness"],
    recommendedTherapies: ["McKenzie Extension Protocol", "Lumbar Mechanical Traction", "Core Stabilization & IFT Electrotherapy"],
    expectedRecovery: "3 – 5 Weeks",
    suggestedSessions: "8 – 14 Sessions",
  },
  {
    id: "knee-hip",
    name: "Knee & Hip Joints",
    iconTag: "Joint Care",
    description: "Restoring smooth movement, joint lubrication, and weight-bearing strength for knee osteoarthritis and ligament strains.",
    commonConditions: ["Knee Osteoarthritis", "ACL & Ligament Sprain", "Patellofemoral Pain Syndrome", "Hip Bursitis & Stiffness"],
    recommendedTherapies: ["Maitland Joint Mobilization", "Quadriceps & Hamstring Conditioning", "Ultrasonic Modality & Gait Retraining"],
    expectedRecovery: "3 – 4 Weeks",
    suggestedSessions: "8 – 12 Sessions",
  },
  {
    id: "shoulder-arm",
    name: "Shoulder & Arm Mobility",
    iconTag: "Shoulder",
    description: "Targeted therapy to eliminate frozen shoulder capsular tightness, rotator cuff pain, and tennis elbow.",
    commonConditions: ["Frozen Shoulder (Adhesive Capsulitis)", "Rotator Cuff Tendonitis", "Tennis / Golfer's Elbow", "Shoulder Impingement"],
    recommendedTherapies: ["Progressive Overhead Capsular Stretch", "Kinesiology Taping (K-Taping)", "Deep Tissue Mobilization"],
    expectedRecovery: "3 – 5 Weeks",
    suggestedSessions: "8 – 12 Sessions",
  },
  {
    id: "ankle-foot",
    name: "Ankle & Heel Pain",
    iconTag: "Foot & Ankle",
    description: "Fast-track healing for plantar fasciitis heel pain, recurring ankle ligament sprains, and Achilles tendonitis.",
    commonConditions: ["Plantar Fasciitis (Heel Pain)", "Ankle Ligament Sprain", "Achilles Tendonitis", "Flat Foot Strain"],
    recommendedTherapies: ["Myofascial Plantar Scraping", "Proprioceptive Balance Retraining", "TENS & Cold Modalities"],
    expectedRecovery: "2 – 3 Weeks",
    suggestedSessions: "6 – 8 Sessions",
  },
];

export default function SymptomSelector() {
  const [selectedRegionId, setSelectedRegionId] = useState("lumbar-back");

  const region = SYMPTOM_REGIONS.find((r) => r.id === selectedRegionId) || SYMPTOM_REGIONS[1];

  const whatsappMsg = encodeURIComponent(
    `Hello Dr. Sonam, I am experiencing pain in my ${region.name}. I would like to book a consultation.`
  );

  return (
    <section id="symptoms" className="py-20 lg:py-28 bg-gradient-to-b from-mist/50 via-white to-mist/40 relative overflow-hidden">
      <div className="section relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
            <Activity size={16} />
            <span>Interactive Body Pain & Symptom Checker</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Select Your Pain Area for Targeted Care
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Click on any body area below to discover specialized non-surgical treatment options and recovery timelines.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto mb-10">
          {SYMPTOM_REGIONS.map((r) => {
            const isSelected = r.id === selectedRegionId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRegionId(r.id)}
                className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isSelected
                    ? "bg-navy text-white shadow-lg scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {r.name}
              </button>
            );
          })}
        </div>

        {/* Symptom Details Card */}
        <div className="max-w-4xl mx-auto">
          <Card3D intensity={6} className="rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl grid md:grid-cols-12 gap-8 items-start"
              >
                {/* Left Side: Conditions */}
                <div className="md:col-span-6 space-y-6">
                  <div>
                    <span className="inline-block rounded-full bg-teal/10 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-teal border border-teal/20 mb-2">
                      {region.iconTag} Care
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-navy">{region.name}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {region.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-black uppercase tracking-wider text-navy">
                      Common Conditions Treated:
                    </h4>
                    <ul className="space-y-2">
                      {region.commonConditions.map((cond) => (
                        <li key={cond} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                          <CheckCircle2 size={16} className="text-teal shrink-0" />
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-2xl bg-mist p-3.5 border border-teal/10">
                      <span className="flex items-center gap-1.5 text-[11px] font-black uppercase text-teal">
                        <Clock size={14} /> Expected Recovery
                      </span>
                      <p className="text-sm font-bold text-navy mt-1">{region.expectedRecovery}</p>
                    </div>

                    <div className="rounded-2xl bg-mist p-3.5 border border-teal/10">
                      <span className="flex items-center gap-1.5 text-[11px] font-black uppercase text-teal">
                        <ShieldCheck size={14} /> Recommended Plan
                      </span>
                      <p className="text-sm font-bold text-navy mt-1">{region.suggestedSessions}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Recommended Therapies & Consultation */}
                <div className="md:col-span-6 bg-mist/60 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-navy mb-4 flex items-center gap-2">
                      <Activity size={16} className="text-teal" /> Clinical Therapies Included
                    </h4>

                    <ul className="space-y-3">
                      {region.recommendedTherapies.map((th) => (
                        <li key={th} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-100 text-xs sm:text-sm font-medium text-slate-700 shadow-xs">
                          <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                          <span>{th}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-xs py-3 px-5 shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} />
                      <span>Consult Dr. Sonam on WhatsApp</span>
                    </a>

                    <a
                      href="#appointment"
                      className="btn-outline w-full sm:w-auto text-xs py-3 px-5 flex items-center justify-center gap-2"
                    >
                      <span>Book Visit</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
