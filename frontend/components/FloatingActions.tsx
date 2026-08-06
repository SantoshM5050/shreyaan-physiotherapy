"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, Building2, Home, Video, X } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  const getWaLink = (msg: string) =>
    `https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=${encodeURIComponent(msg)}`;

  return (
    <>
      {/* Floating Call Button - Bottom Left */}
      <a
        href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
        aria-label="Call Shreyaan Physiotherapy Center clinic directly"
        className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-navy text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-teal focus:outline-none focus:ring-4 focus:ring-navy/30 group"
      >
        <Phone size={24} aria-hidden="true" />
        <span className="absolute left-16 hidden rounded-lg bg-navy px-3 py-1.5 text-xs font-bold text-white shadow-md group-hover:block whitespace-nowrap">
          Call {CLINIC_INFO.contact.primaryPhoneDisplay}
        </span>
      </a>

      {/* WhatsApp Care Selector Popup */}
      {isOpen && (
        <div className="fixed bottom-22 right-5 z-50 w-72 rounded-2xl bg-white p-4 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-navy">
              <MessageCircle size={16} className="text-[#25D366]" />
              <span>Select Consultation Type</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={getWaLink("Hello Dr. Sonam, I want to book an In-Clinic Consultation at Shreyaan Physiotherapy Center.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-mist p-3 hover:bg-teal/10 hover:text-teal transition-all text-xs font-bold text-slate-800"
            >
              <Building2 size={18} className="text-teal" />
              <div>
                <div>Book Clinic Visit</div>
                <div className="text-[10px] font-normal text-slate-500">Unchahar Clinic</div>
              </div>
            </a>

            <a
              href={getWaLink("Hello Dr. Sonam, I would like to request Home Visit Physiotherapy at my residence.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-mist p-3 hover:bg-emerald-50 hover:text-emerald-700 transition-all text-xs font-bold text-slate-800"
            >
              <Home size={18} className="text-emerald-600" />
              <div>
                <div>Home Visit Physio</div>
                <div className="text-[10px] font-normal text-slate-500">At-home treatment</div>
              </div>
            </a>

            <a
              href={getWaLink("Hello Dr. Sonam, I want to book an Online Tele-Physiotherapy Consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-mist p-3 hover:bg-purple-50 hover:text-purple-700 transition-all text-xs font-bold text-slate-800"
            >
              <Video size={18} className="text-purple-600" />
              <div>
                <div>Online Tele-Consultation</div>
                <div className="text-[10px] font-normal text-slate-500">Video consultation</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Trigger Button - Bottom Right */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp with Shreyaan Physiotherapy Center"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 group cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        <MessageCircle size={28} className="relative z-10" aria-hidden="true" />
      </button>
    </>
  );
}
