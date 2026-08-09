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

            {/* Official Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Connect With Us</p>
              <div className="flex items-center gap-2">
                <a
                  href={CLINIC_INFO.urls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-slate-300 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
                  title="Shreyaan Physiotherapy Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href={CLINIC_INFO.urls.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Clinic Instagram Page"
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-slate-300 hover:bg-[#E4405F] hover:text-white transition-all shadow-sm"
                  title="Clinic Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a
                  href={CLINIC_INFO.urls.doctorInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dr. Sonam Maurya Instagram"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal/15 px-2.5 py-1 text-[11px] font-bold text-teal hover:bg-teal hover:text-white transition-all shadow-sm"
                  title="Dr. Sonam Maurya Insta Profile"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span>Dr. Sonam</span>
                </a>
              </div>
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
