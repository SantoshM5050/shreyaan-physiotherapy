"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, Calendar, ShieldCheck, ArrowRight, MessageCircle, Activity, CheckCircle2 } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";
import Card3D from "./3d/Card3D";

interface ConditionInfo {
  id: string;
  name: string;
  category: string;
  sessionDuration: string;
  estimatedSessions: string;
  recoveryTimeline: string;
  description: string;
  milestones: string[];
}

const CONDITIONS_DATA: ConditionInfo[] = [
  {
    id: "back-neck",
    name: "Back & Neck Pain (Cervical / Lumbar)",
    category: "Spinal Care",
    sessionDuration: "45 – 60 Mins",
    estimatedSessions: "6 – 10 Sessions",
    recoveryTimeline: "2 – 3 Weeks",
    description: "Targeted electrotherapy, spinal decompression traction, and core posture alignment exercises.",
    milestones: [
      "Phase 1: Immediate Pain Relief & Inflammation Reduction",
      "Phase 2: Spinal Decompression & Nerve Root Relief",
      "Phase 3: Core Strengthening & Ergonomic Re-education",
    ],
  },
  {
    id: "knee-joint",
    name: "Knee Joint Pain & Osteoarthritis",
    category: "Joint Rehab",
    sessionDuration: "45 Mins",
    estimatedSessions: "8 – 12 Sessions",
    recoveryTimeline: "3 – 4 Weeks",
    description: "Therapeutic ultrasound, quadriceps strengthening, joint mobilization, and gait training.",
    milestones: [
      "Phase 1: Swelling Control & Range of Motion Restoration",
      "Phase 2: Quadriceps & Hamstring Strengthening",
      "Phase 3: Weight-Bearing Alignment & Stair Climbing Independence",
    ],
  },
  {
    id: "sciatica",
    name: "Sciatica & Slip Disc",
    category: "Nerve & Disc",
    sessionDuration: "50 – 60 Mins",
    estimatedSessions: "10 – 14 Sessions",
    recoveryTimeline: "3 – 5 Weeks",
    description: "McKenzie extension protocol, nerve gliding techniques, and IFT electrotherapy.",
    milestones: [
      "Phase 1: Nerve Desensitization & Radiation Pain Reduction",
      "Phase 2: Disc Centralization & Spinal Flexibility",
      "Phase 3: Lumbar Stabilization & Long-Term Relapse Prevention",
    ],
  },
  {
    id: "paralysis",
    name: "Paralysis & Neuro Rehabilitation",
    category: "Neurological",
    sessionDuration: "60 Mins",
    estimatedSessions: "15 – 30 Sessions",
    recoveryTimeline: "6 – 12 Weeks",
    description: "Neuromuscular electrical stimulation (NMES), PNF facilitation, and task-oriented motor relearning.",
    milestones: [
      "Phase 1: Muscle Tone Normalization & Passive Range Maintenance",
      "Phase 2: Voluntary Movement Initiation & Balance Training",
      "Phase 3: Functional Mobility & Daily Activity Independence",
    ],
  },
  {
    id: "frozen-shoulder",
    name: "Frozen Shoulder & Stiff Joints",
    category: "Shoulder Care",
    sessionDuration: "45 Mins",
    estimatedSessions: "8 – 12 Sessions",
    recoveryTimeline: "3 – 4 Weeks",
    description: "Maitland joint mobilizations, moist heat therapy, and progressive overhead stretch exercises.",
    milestones: [
      "Phase 1: Capsular Stretching & Pain Management",
      "Phase 2: Overhead Elevation & External Rotation Gain",
      "Phase 3: Rotator Cuff Endurance & Functional Reach",
    ],
  },
  {
    id: "post-surgery",
    name: "Post-Surgical Rehabilitation (ACL / Knee Replacement)",
    category: "Post-Op Care",
    sessionDuration: "50 Mins",
    estimatedSessions: "12 – 20 Sessions",
    recoveryTimeline: "4 – 8 Weeks",
    description: "Evidence-based post-op protocol, scar tissue release, muscle re-education, and sports return training.",
    milestones: [
      "Phase 1: Surgical Edema Reduction & Safe Weight Bearing",
      "Phase 2: Muscle Mass Activation & Proprioceptive Balance",
      "Phase 3: Full Mobility Return & Agility Training",
    ],
  },
];

interface TreatmentCalculatorProps {
  t?: any;
}

export default function TreatmentCalculator({ t }: TreatmentCalculatorProps) {
  const [selectedId, setSelectedId] = useState<string>("back-neck");

  const selectedCondition = CONDITIONS_DATA.find((c) => c.id === selectedId) || CONDITIONS_DATA[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Sonam, I calculated my recovery plan on your website for ${selectedCondition.name}. I would like to schedule a consultation.`
  );

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-gradient-to-b from-white via-mist/50 to-white relative overflow-hidden">
      <div className="section relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
            <Calculator size={16} />
            <span>Treatment & Recovery Estimator</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Estimate Your Physiotherapy Recovery Timeline
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Select your symptoms or condition below to view recommended sessions, recovery milestones, and treatment approach.
          </p>
        </div>

        {/* Condition Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-10">
          {CONDITIONS_DATA.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-300 shadow-xs ${
                  isSelected
                    ? "bg-navy text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Estimator Result Card */}
        <div className="max-w-4xl mx-auto">
          <Card3D intensity={6} className="rounded-3xl">
            <motion.div
              key={selectedCondition.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl grid gap-8 md:grid-cols-12 items-center"
            >
              {/* Left Column: Quick Stats */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-teal border border-teal/20 mb-2">
                    {selectedCondition.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-navy">
                    {selectedCondition.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedCondition.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="rounded-2xl bg-mist p-3.5 border border-teal/10">
                    <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-teal">
                      <Clock size={14} /> Session Time
                    </span>
                    <p className="text-sm font-bold text-navy mt-1">{selectedCondition.sessionDuration}</p>
                  </div>

                  <div className="rounded-2xl bg-mist p-3.5 border border-teal/10">
                    <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-teal">
                      <Calendar size={14} /> Estimated Sessions
                    </span>
                    <p className="text-sm font-bold text-navy mt-1">{selectedCondition.estimatedSessions}</p>
                  </div>

                  <div className="rounded-2xl bg-navy/5 p-3.5 border border-navy/10 col-span-2">
                    <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-navy">
                      <ShieldCheck size={14} className="text-teal" /> Expected Recovery
                    </span>
                    <p className="text-sm font-bold text-navy mt-1">{selectedCondition.recoveryTimeline}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Milestones & Action */}
              <div className="md:col-span-7 bg-mist/60 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between h-full space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-navy mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-teal" /> Recommended Rehabilitation Milestones
                  </h4>

                  <ul className="space-y-3">
                    {selectedCondition.milestones.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-100 text-xs sm:text-sm font-medium text-slate-700 shadow-xs">
                        <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto text-xs py-3 px-6 shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    <span>Discuss This Plan on WhatsApp</span>
                  </a>

                  <a
                    href="#appointment"
                    className="btn-outline w-full sm:w-auto text-xs py-3 px-6 flex items-center justify-center gap-2"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
