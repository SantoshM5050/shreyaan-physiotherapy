"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Phone, HeartPulse, Menu, X, UserCheck } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";

interface SubpageHeaderProps {
  backUrl?: string;
  backLabel?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function SubpageHeader({
  backUrl = "/",
  backLabel = "Back to Home",
  ctaText = "Book Appointment",
  ctaHref = "#appointment",
}: SubpageHeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBack = (e: React.MouseEvent) => {
    if (window.history.length > 1 && !backUrl.startsWith("#")) {
      e.preventDefault();
      router.back();
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm transition-all">
      <div className="section flex items-center justify-between gap-4">
        {/* Left: Full Clinic Brand Logo & Back Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Full Clinic Logo */}
          <Link href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-navy to-[#0b4d75] text-white shadow-md shadow-navy/20 group-hover:scale-105 transition-transform">
              <HeartPulse size={22} className="text-teal" aria-hidden="true" />
            </span>
            <span className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-black tracking-wider text-navy leading-tight">
                SHREYAAN
              </span>
              <span className="text-[10px] font-bold tracking-widest text-teal">
                PHYSIOTHERAPY
              </span>
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          {/* Back Pill Button */}
          <Link
            href={backUrl}
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-navy hover:border-teal hover:bg-teal hover:text-white transition-all shadow-2xs active:scale-95 shrink-0"
            aria-label={backLabel}
          >
            <ArrowLeft size={15} className="shrink-0 text-teal group-hover:text-white" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-teal transition-colors py-1 px-1 rounded"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions (Doctor Portal, Phone, Book Appointment) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/doctor/login"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 text-xs font-extrabold text-teal hover:bg-teal hover:text-white transition-all"
          >
            <UserCheck size={14} />
            <span>Doctor Login</span>
          </Link>

          <a
            href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-navy/20 px-3 py-1.5 text-xs font-bold text-navy hover:border-teal hover:text-teal transition-colors"
          >
            <Phone size={14} />
            <span>Call Clinic</span>
          </a>

          <a
            href={ctaHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-teal transition-all shadow-md active:scale-95 shrink-0"
          >
            <CalendarDays size={14} />
            <span>{ctaText}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-navy rounded-xl hover:bg-slate-100 lg:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[65px] bottom-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-300" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col gap-2.5 font-semibold text-slate-800">
              <Link href={backUrl} onClick={(e) => { handleBack(e); setMobileMenuOpen(false); }} className="rounded-xl px-4 py-2 bg-teal/10 text-teal font-bold flex items-center gap-2">
                <ArrowLeft size={16} />
                <span>{backLabel}</span>
              </Link>
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-2.5 hover:bg-mist hover:text-teal transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link href="/doctor/login" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-2.5 bg-slate-100 text-navy font-bold flex items-center gap-2">
                <UserCheck size={16} />
                <span>Doctor Portal Login</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
