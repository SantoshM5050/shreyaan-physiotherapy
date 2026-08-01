import React from "react";
import Metadata from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FAQ_ITEMS } from "../../lib/constants";
import FAQSection from "../../components/FAQSection";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

export const metadata = {
  title: "30+ Physiotherapy FAQs | Shreyaan Physiotherapy Center",
  description: "Get comprehensive answers to 30+ frequently asked questions about back pain, knee arthritis, sciatica, dry needling, cupping, stroke rehab, costs, and clinic hours in Unchahar.",
  alternates: {
    canonical: "https://shreyaanphysiotherapycenter.in/faq",
  },
};

export default function FAQPage() {
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
            <span className="text-teal font-bold">Frequently Asked Questions</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-b from-mist via-white to-mist/40 py-12 lg:py-16 text-center border-b border-slate-200/60">
          <div className="section max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
              Patient Help Center
            </span>
            <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              30+ Questions Answered
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Clear, transparent information regarding treatments, consultation process, doctor qualifications, and clinic policies.
            </p>
          </div>
        </section>

        {/* FAQ Accordions Section */}
        <FAQSection t={{
          faq: {
            eyebrow: "COMPLETE FAQ DIRECTORY",
            title: "Comprehensive Patient Information Directory",
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
