import React from "react";
import Metadata from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock3, Navigation, ExternalLink } from "lucide-react";
import { CLINIC_INFO } from "../../lib/constants";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

export const metadata = {
  title: "Contact Us & Location Map | Shreyaan Physiotherapy Center",
  description: "Visit Shreyaan Physiotherapy Center on NTPC Road, Unchahar. Call +91 9140574645 for appointment booking. Open Mon-Sun 10 AM to 6 PM.",
  alternates: {
    canonical: "https://shreyaanphysiotherapycenter.in/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#12374b]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 py-4">
        <div className="section flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white font-bold">
              SP
            </span>
            <span className="text-sm font-black text-navy leading-tight">
              SHREYAAN <br />
              <span className="text-teal font-semibold">PHYSIOTHERAPY</span>
            </span>
          </Link>

          <Link href="/" className="text-xs font-bold text-slate-600 hover:text-teal">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-mist/80 py-3 border-b border-slate-200/60">
          <div className="section flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-teal font-bold">Contact Us</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-b from-mist via-white to-mist/40 py-12 lg:py-16 text-center border-b border-slate-200/60">
          <div className="section max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
              Get In Touch
            </span>
            <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Visit Clinic or Book Appointment
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              We are located on NTPC Road, near Ganda Nala, Unchahar. Call us directly or send an online appointment request.
            </p>
          </div>
        </section>

        {/* Map Buttons Bar */}
        <section className="bg-navy text-white py-4">
          <div className="section flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
            <span>📍 Exact Coordinates: 25.9077702, 81.2966576</span>
            <div className="flex items-center gap-3">
              <a
                href={CLINIC_INFO.urls.googleDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-white hover:bg-[#078d8d] transition-colors"
              >
                <Navigation size={14} />
                <span>Get Directions</span>
              </a>
              <a
                href={CLINIC_INFO.urls.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section Form & Map */}
        <ContactSection t={{
          contact: {
            eyebrow: "CLINIC LOCATION & CONTACT",
            title: "Start Your Recovery Journey Today",
            text: "Reach out via phone, WhatsApp, or form submission for immediate consultation confirmation.",
            formTitle: "Request An Appointment",
            namePlaceholder: "Your Full Name",
            phonePlaceholder: "Your Phone Number",
            datePlaceholder: "Preferred Date",
            timePlaceholder: "Preferred Time",
            servicePlaceholder: "Select Service / Concern",
            messagePlaceholder: "Briefly describe your symptoms or concern (optional)",
            submitBtn: "Send Appointment Request",
            whatsappDirect: "Chat Directly on WhatsApp",
            successTitle: "Appointment Request Received!",
            successMessage: "We have opened WhatsApp with your details. Click send to confirm your appointment time.",
          }
        }} />
      </main>

      <Footer t={{
        footer: {
          tagline: "Dedicated to restoring your mobility, strength, and quality of life.",
          quickLinks: "Quick Navigation",
          legalDisclaimer: "Medical Disclaimer: Information on this website is for educational purposes and should not replace professional medical consultation.",
          rights: "All Rights Reserved.",
          designedBy: "Designed & Developed by",
        }
      }} />
      <FloatingActions />
    </div>
  );
}
