import React from "react";
import Metadata from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronRight, Activity, Calendar } from "lucide-react";
import { SERVICES_DATA } from "../../lib/servicesData";
import { CLINIC_INFO } from "../../lib/constants";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

export const metadata = {
  title: "Specialized Physiotherapy Services | Shreyaan Physiotherapy Center",
  description: "Comprehensive physiotherapy treatments in Unchahar: Back Pain, Sciatica, Knee Joint Rehab, Paralysis, Sports Injury, Post-Surgical Rehab, Dry Needling & Electrotherapy.",
  alternates: {
    canonical: "https://shreyaanphysiotherapycenter.in/services",
  },
};

export default function ServicesPage() {
  const servicesList = Object.values(SERVICES_DATA);

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
            <span className="text-teal font-bold">Services</span>
          </div>
        </nav>

        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-mist via-white to-mist/40 py-12 lg:py-16 text-center border-b border-slate-200/60">
          <div className="section max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
              Clinical Specializations
            </span>
            <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Evidence-Based Physiotherapy Services
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Personalized physical rehabilitation plans by Dr. Sonam Maurya designed for rapid pain relief, joint mobility, and long-term recovery.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden mb-5">
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="aspect-[16/9] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-navy/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                      {service.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-navy group-hover:text-teal transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.tagline}
                  </p>

                  <ul className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    {service.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-teal shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal hover:text-navy transition-colors"
                  >
                    <span>Read Full Details</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
                    className="text-xs font-bold text-slate-500 hover:text-teal"
                  >
                    Consult Doctor
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
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
