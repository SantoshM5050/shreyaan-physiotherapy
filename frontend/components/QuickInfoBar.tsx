"use client";

import React from "react";
import { Clock3, MapPin, Phone, Navigation } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";

interface QuickInfoBarProps {
  t: any;
}

export default function QuickInfoBar({ t }: QuickInfoBarProps) {
  return (
    <section className="border-y border-teal/15 bg-white relative z-20 shadow-sm">
      <div className="section grid gap-4 py-5 sm:grid-cols-3">
        {/* Hours & Live Open Status */}
        <div className="flex items-center gap-4 rounded-2xl bg-mist/60 p-4 border border-teal/10 hover:border-teal/30 transition-all">
          <div className="h-12 w-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0">
            <Clock3 size={24} aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-black uppercase tracking-wider text-teal">
                {t.quickInfo.hoursTitle}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                Open Today
              </span>
            </div>
            <p className="text-sm font-bold text-navy mt-0.5">
              Mon – Sun: <span className="font-semibold text-slate-700">10:00 AM – 6:00 PM</span>
            </p>
          </div>
        </div>

        {/* Location & Direct Google Navigation */}
        <a
          href={CLINIC_INFO.urls.googleMap}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl bg-mist/60 p-4 border border-teal/10 hover:border-teal/30 hover:shadow-md transition-all"
        >
          <div className="h-12 w-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0 group-hover:bg-teal group-hover:text-white transition-colors">
            <MapPin size={24} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-wider text-teal">
                {t.quickInfo.locationTitle}
              </p>
              <span className="text-[11px] font-extrabold text-navy group-hover:text-teal flex items-center gap-1">
                <Navigation size={12} />
                <span>Directions</span>
              </span>
            </div>
            <p className="text-sm font-bold text-navy mt-0.5 group-hover:text-teal transition-colors">
              NTPC Road, Unchahar
            </p>
            <p className="text-xs text-slate-500 font-medium">Near Ganda Nala, UP 229406</p>
          </div>
        </a>

        {/* Contact Phone */}
        <a
          href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
          className="group flex items-center gap-4 rounded-2xl bg-mist/60 p-4 border border-teal/10 hover:border-teal/30 hover:shadow-md transition-all"
        >
          <div className="h-12 w-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0 group-hover:bg-teal group-hover:text-white transition-colors">
            <Phone size={24} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-teal">
              {t.quickInfo.contactTitle}
            </p>
            <p className="text-sm font-bold text-navy mt-0.5 group-hover:text-teal transition-colors">
              {CLINIC_INFO.contact.primaryPhoneDisplay}
            </p>
            <p className="text-xs text-slate-500 font-medium">Click to call clinic directly</p>
          </div>
        </a>
      </div>
    </section>
  );
}
