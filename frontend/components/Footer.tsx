"use client";

import React from "react";
import Link from "next/link";
import { HeartPulse, MapPin, Phone, Mail, Clock3, ExternalLink, ShieldCheck, UserCheck } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";

interface FooterProps {
  t: any;
}

export default function Footer({ t }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#05263B] to-[#031826] text-slate-300 pt-16 pb-12 border-t border-white/10 relative">
      <div className="section">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Doctor Intro (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-white shadow-md">
                <HeartPulse size={22} aria-hidden="true" />
              </span>
              <span className="text-base font-black tracking-wider text-white">
                SHREYAAN <span className="text-teal font-semibold">PHYSIOTHERAPY</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {t?.footer?.tagline || "Dedicated to restoring your mobility, strength, and quality of life."}
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider">{CLINIC_INFO.doctor.name}</p>
              <p className="text-xs text-teal">{CLINIC_INFO.doctor.qualification}</p>
              <p className="text-[11px] text-slate-400">Reg No: {CLINIC_INFO.doctor.registrationNo}</p>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-teal">
              {t?.footer?.quickLinks || "Quick Navigation"}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li><Link href="/" className="hover:text-teal transition-colors">Home Page</Link></li>
              <li><Link href="/#about" className="hover:text-teal transition-colors">About Doctor</Link></li>
              <li><Link href="/services" className="hover:text-teal transition-colors">Specialized Services</Link></li>
              <li><Link href="/gallery" className="hover:text-teal transition-colors">Clinic Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-teal transition-colors">Health & Pain Blog</Link></li>
              <li><Link href="/faq" className="hover:text-teal transition-colors">Patient FAQs (30+)</Link></li>
              <li><Link href="/contact" className="hover:text-teal transition-colors">Contact & Map</Link></li>
              <li><Link href="/doctor/login" className="hover:text-teal transition-colors flex items-center gap-1.5 text-teal font-bold"><UserCheck size={13} /> Doctor Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-teal">
              Clinic Contact & Hours
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-teal shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.contact.address.fullAddress}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-teal shrink-0" />
                <a href={`tel:${CLINIC_INFO.contact.primaryPhone}`} className="hover:text-teal transition-colors">
                  {CLINIC_INFO.contact.primaryPhoneDisplay} / {CLINIC_INFO.contact.secondaryPhoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 size={18} className="text-teal shrink-0" />
                <span>Monday – Sunday: 10:00 AM – 6:00 PM</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={CLINIC_INFO.urls.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-teal transition-colors"
              >
                <span>Find Us on Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 rounded-2xl bg-white/5 p-4 text-[11px] leading-relaxed text-slate-400 border border-white/5">
          <p>{t?.footer?.legalDisclaimer || "Medical Disclaimer: Information on this website is for educational purposes and should not replace professional medical consultation."}</p>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-xs text-slate-400">
          <p>© {year} {CLINIC_INFO.name}. {t?.footer?.rights || "All Rights Reserved."}</p>
          <p>
            {t?.footer?.designedBy || "Designed & Developed by"}{" "}
            <span className="font-bold text-teal">Santosh Maurya</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
