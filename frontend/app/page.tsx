"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickInfoBar from "../components/QuickInfoBar";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import ProceduresSection from "../components/ProceduresSection";
import SymptomSelector from "../components/SymptomSelector";
import RecoveryStories from "../components/RecoveryStories";
import ClinicAmenities from "../components/ClinicAmenities";
import TreatmentCalculator from "../components/TreatmentCalculator";
import GallerySection from "../components/GallerySection";
import GoogleReviews from "../components/GoogleReviews";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import { useLanguage } from "../hooks/useLanguage";

export default function Home() {
  const { lang, t, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#12374b]">
      {/* Sticky Header Navigation */}
      <Navbar lang={lang} onToggleLanguage={toggleLanguage} t={t} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Hero t={t} />
        <QuickInfoBar t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <ProceduresSection />
        <SymptomSelector />
        <RecoveryStories />
        <ClinicAmenities />
        <TreatmentCalculator t={t} />
        <GallerySection t={t} />
        <GoogleReviews t={t} />
        <FAQSection t={t} />
        <ContactSection t={t} />
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Floating Action Buttons (Phone & WhatsApp Care Selector) */}
      <FloatingActions />
    </div>
  );
}
