"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Sparkles, ZoomIn, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

interface GalleryItem {
  id: string;
  title: string;
  category: "Clinic" | "Treatment" | "Equipment" | "Exercises" | "Patients" | "Events";
  imageUrl: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Clinic Hero Consultation Space",
    category: "Clinic",
    imageUrl: "/images/clinic-hero.png",
    caption: "Modern clinical assessment and treatment environment at Shreyaan Physiotherapy Center.",
  },
  {
    id: "g2",
    title: "Spinal Mobilization Therapy",
    category: "Treatment",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    caption: "Hands-on spinal mobilization and manual therapy care.",
  },
  {
    id: "g3",
    title: "Advanced Electrotherapy Unit",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
    caption: "Digital IFT electrotherapy and therapeutic ultrasound equipment.",
  },
  {
    id: "g4",
    title: "Knee Osteoarthritis Rehab",
    category: "Treatment",
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&auto=format&fit=crop&q=80",
    caption: "Quadriceps strengthening and knee joint mobilization.",
  },
  {
    id: "g5",
    title: "Core & Postural Conditioning",
    category: "Exercises",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    caption: "Targeted lumbar core stability exercise training.",
  },
  {
    id: "g6",
    title: "Certified Dry Needling",
    category: "Treatment",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=80",
    caption: "Precision trigger point release for chronic muscular knots.",
  },
  {
    id: "g7",
    title: "Post-Stroke Neuro Gait Rehab",
    category: "Patients",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80",
    caption: "Motor re-education and gait independence training.",
  },
  {
    id: "g8",
    title: "Health Awareness Workshop",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80",
    caption: "Community ergonomics and spine wellness seminar in Unchahar.",
  },
];

const CATEGORIES = ["All", "Clinic", "Treatment", "Equipment", "Exercises", "Patients", "Events"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! <= 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const nextImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! >= filteredItems.length - 1 ? 0 : prev! + 1));
  };

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
            <span className="text-teal font-bold">Clinic Gallery</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-b from-mist via-white to-mist/40 py-12 lg:py-16 text-center border-b border-slate-200/60">
          <div className="section max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
              Inside Shreyaan Physiotherapy
            </span>
            <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Clinic Photo Gallery & Facilities
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Explore our modern clinical space, therapeutic equipment, patient rehabilitation moments, and treatment modalities.
            </p>
          </div>
        </section>

        {/* Category Filters & Gallery Grid */}
        <section className="section py-16">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-navy text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-teal/10 hover:text-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-3xl overflow-hidden shadow-soft border border-slate-200 cursor-pointer bg-slate-100"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-black uppercase text-teal tracking-widest">{item.category}</span>
                  <h3 className="font-bold text-base mt-1 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ZoomIn size={18} className="text-teal shrink-0" />
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            <div
              className="max-w-4xl w-full bg-navy/90 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={filteredItems[activeLightboxIndex].imageUrl}
                  alt={filteredItems[activeLightboxIndex].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-white">
                <span className="text-xs font-black uppercase text-teal tracking-wider">
                  {filteredItems[activeLightboxIndex].category}
                </span>
                <h3 className="text-xl font-bold mt-1">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
              aria-label="Next Image"
            >
              <ChevronRightIcon size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
