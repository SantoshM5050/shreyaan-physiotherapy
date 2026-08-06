"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeartPulse, Languages, Menu, X, CalendarDays, Phone, UserCheck } from "lucide-react";
import { CLINIC_INFO } from "../lib/constants";
import { Language } from "../hooks/useLanguage";
import { AuthService } from "../services/authService";

interface NavbarProps {
  lang: Language;
  onToggleLanguage: () => void;
  t: any;
}

export default function Navbar({ lang, onToggleLanguage, t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    setIsLoggedIn(AuthService.isAuthenticated());
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/#about" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.gallery, href: "/gallery" },
    { name: t.nav.blog, href: "/blog" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const doctorPortalHref = isLoggedIn ? "/doctor/dashboard" : "/doctor/login";
  const doctorPortalLabel = isLoggedIn ? "Doctor Portal" : t.nav.doctorLogin;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md py-2.5"
          : "bg-white/95 backdrop-blur-sm border-b border-slate-100 py-3.5"
      }`}
    >
      <div className="section flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-2xl bg-gradient-to-br from-navy to-[#0b4d75] text-white shadow-md shadow-navy/20 group-hover:scale-105 transition-transform duration-300">
            <HeartPulse size={24} className="text-teal animate-pulse" aria-hidden="true" />
          </span>
          <span className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-black tracking-wider text-navy leading-tight whitespace-nowrap">
              SHREYAAN
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-teal whitespace-nowrap">
              PHYSIOTHERAPY CENTER
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3 lg:gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-slate-700" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative py-1 transition-colors hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal/40 rounded-md px-1.5 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions (Doctor Login/Portal, Language Switcher & CTA Buttons) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Doctor Portal Button */}
          <Link
            href={doctorPortalHref}
            aria-label="Doctor Portal Login"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 text-xs font-extrabold text-teal hover:bg-teal hover:text-white transition-all whitespace-nowrap"
          >
            <UserCheck size={14} />
            <span>{doctorPortalLabel}</span>
          </Link>

          {/* Language Selector */}
          <button
            onClick={onToggleLanguage}
            aria-label={`Switch language to ${lang === "en" ? "Hindi" : "English"}`}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-bold text-navy transition-all hover:bg-teal/10 hover:border-teal/40 hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal/50 whitespace-nowrap"
          >
            <Languages size={14} className="text-teal" aria-hidden="true" />
            <span>{lang === "en" ? "हिंदी" : "English"}</span>
          </button>

          {/* Appointment CTA */}
          <a
            href="/#appointment"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-navy px-3.5 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-teal hover:shadow-teal/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal whitespace-nowrap"
          >
            <CalendarDays size={14} aria-hidden="true" />
            <span>{t.nav.bookAppointment}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-navy rounded-xl hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-teal"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[73px] bottom-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2.5 font-semibold text-slate-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 hover:bg-mist hover:text-teal transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 hover:bg-mist hover:text-teal transition-colors"
              >
                FAQ
              </Link>

              <Link
                href={doctorPortalHref}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 bg-teal/10 text-teal font-extrabold flex items-center gap-2"
              >
                <UserCheck size={16} />
                <span>{doctorPortalLabel}</span>
              </Link>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="/#appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full text-center justify-center text-xs py-3"
                >
                  <CalendarDays size={16} aria-hidden="true" />
                  {t.nav.bookAppointment}
                </a>
                <a
                  href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
                  className="btn-outline w-full text-center justify-center text-xs py-3"
                >
                  <Phone size={16} aria-hidden="true" />
                  {t.nav.callNow}: {CLINIC_INFO.contact.primaryPhoneDisplay}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
