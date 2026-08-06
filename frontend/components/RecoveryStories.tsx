"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, HeartPulse, ShieldCheck, Star, Users } from "lucide-react";
import Card3D from "./3d/Card3D";

const STORIES_DATA = [
  {
    id: "stroke-rehab",
    title: "Post-Stroke Paralysis Gait Recovery",
    patientAge: "58-Year-Old Patient",
    timeframe: "6-Week Milestone",
    badge: "Neuro Rehabilitation",
    summary: "Re-educated neuromuscular motor patterns, enabling independent unassisted walking after stroke hemiparesis.",
    keyOutcomes: [
      "Restored quad & calf muscle activation",
      "Overcame foot drop with NMES therapy",
      "Gained independent stair-climbing mobility",
    ],
  },
  {
    id: "disc-relief",
    title: "Severe Lumbar Disc Non-Surgical Relief",
    patientAge: "42-Year-Old IT Professional",
    timeframe: "4-Week Milestone",
    badge: "Spinal Decompression",
    summary: "Centralized L4-L5 disc protrusion and eliminated radiating leg sciatica pain without surgical intervention.",
    keyOutcomes: [
      "Sciatica radiation pain fully eliminated",
      "Lumbar traction & McKenzie extension",
      "Resumed full-time desk work pain-free",
    ],
  },
  {
    id: "knee-osteoarthritis",
    title: "Knee Osteoarthritis Mobility Restoration",
    patientAge: "64-Year-Old Homemaker",
    timeframe: "3-Week Milestone",
    badge: "Joint Rehab",
    summary: "Controlled joint inflammation and strengthened surrounding quadriceps to enable pain-free daily walking.",
    keyOutcomes: [
      "Eliminated morning knee stiffness & crepitus",
      "Increased knee flexion by 35 degrees",
      "Stopped reliance on daily painkillers",
    ],
  },
];

export default function RecoveryStories() {
  return (
    <section id="recovery-stories" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="section relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
            <Award size={16} />
            <span>Clinical Rehabilitation Milestones</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Patient Recovery Success Stories
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real rehabilitation journeys demonstrating our commitment to non-surgical pain relief and mobility return.
          </p>
        </div>

        {/* Stories Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {STORIES_DATA.map((story, idx) => (
            <Card3D key={story.id} intensity={8} className="rounded-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col justify-between h-full rounded-3xl border border-slate-200/80 bg-mist/40 p-7 shadow-soft hover:bg-white hover:border-teal/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-teal">
                      {story.badge}
                    </span>
                    <span className="text-xs font-bold text-navy bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {story.timeframe}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-navy">{story.title}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">{story.patientAge}</p>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {story.summary}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-wider text-navy mb-2">
                      Key Clinical Milestones Achieved:
                    </p>
                    {story.keyOutcomes.map((out) => (
                      <div key={out} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 size={14} className="text-teal shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-navy">
                  <span className="flex items-center gap-1 text-teal">
                    <Star size={14} className="fill-teal" /> 100% Non-Surgical Recovery
                  </span>
                  <span className="text-slate-400">Dr. Sonam Protocol</span>
                </div>
              </motion.div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}
