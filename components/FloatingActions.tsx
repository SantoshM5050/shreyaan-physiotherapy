"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";

export default function FloatingActions() {
  const whatsappUrl = `https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=Hello%20Shreyaan%20Physiotherapy%20Center%2C%20I%20would%20like%20to%20book%20an%20appointment.`;

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

      {/* Floating WhatsApp Button - Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Shreyaan Physiotherapy Center"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        <MessageCircle size={28} className="relative z-10" aria-hidden="true" />
        <span className="absolute right-16 hidden rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white shadow-md group-hover:block whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>
    </>
  );
}
