"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, ZoomIn, ChevronLeft, ChevronRight as ChevronRightIcon, AlertCircle, RefreshCw, Image as ImageIcon } from "lucide-react";
import { GalleryService, GalleryItem } from "../../services/galleryService";
import { getImageUrl } from "../../lib/getImageUrl";
import SubpageHeader from "../../components/SubpageHeader";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";
import Card3D from "../../components/3d/Card3D";

const CATEGORIES = ["All", "Clinic", "Equipment", "Treatment", "Rehab"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const fetchGalleryData = useCallback(async (cat: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await GalleryService.getGallery(cat);
      if (response.success && response.gallery) {
        setGalleryItems(response.gallery);
      } else {
        setError(response.message || "Failed to load gallery items.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while loading clinic gallery.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryData(activeCategory);
  }, [activeCategory, fetchGalleryData]);

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! <= 0 ? galleryItems.length - 1 : prev! - 1));
  };

  const nextImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! >= galleryItems.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#12374b]">
      {/* Header with Back to Home Navigation */}
      <SubpageHeader backUrl="/" backLabel="Back to Home" />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-mist/80 py-3 border-b border-slate-200/60">
          <div className="section flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-teal font-bold">Clinic Gallery</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-b from-mist via-white to-mist/40 py-12 lg:py-16 text-center border-b border-slate-200/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section max-w-3xl mx-auto"
          >
            <span className="inline-block rounded-full bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4 border border-teal/20">
              Inside Shreyaan Physiotherapy
            </span>
            <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Clinic Photo Gallery & Facilities
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Explore our modern clinical space, therapeutic equipment, patient rehabilitation moments, and treatment modalities.
            </p>
          </motion.div>
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

          {/* Loading State */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft animate-pulse space-y-3"
                >
                  <div className="aspect-[4/3] bg-slate-100 rounded-2xl w-full" />
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="max-w-md mx-auto rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-800 space-y-4 shadow-sm">
              <AlertCircle size={40} className="mx-auto text-rose-500" />
              <h3 className="font-bold text-lg">Failed to Load Gallery</h3>
              <p className="text-xs text-rose-600">{error}</p>
              <button
                onClick={() => fetchGalleryData(activeCategory)}
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-700 transition-all shadow-md"
              >
                <RefreshCw size={14} />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && galleryItems.length === 0 && (
            <div className="max-w-md mx-auto rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center text-slate-500 space-y-3">
              <ImageIcon size={48} className="mx-auto text-teal mb-2" />
              <h3 className="font-bold text-navy text-lg">No Gallery Images Available Yet</h3>
              <p className="text-xs">
                No clinic images found for category &quot;{activeCategory}&quot;. Please check back soon or upload new photos from Doctor Dashboard.
              </p>
            </div>
          )}

          {/* Media Grid with 3D Card Tilt */}
          {!loading && !error && galleryItems.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {galleryItems.map((item, idx) => (
                <Card3D key={item._id} intensity={12} glareOpacity={0.2} className="rounded-3xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    onClick={() => openLightbox(idx)}
                    className="group relative rounded-3xl overflow-hidden shadow-soft border border-slate-200 cursor-pointer bg-slate-100 h-full"
                  >
                    <div className="aspect-[4/3] w-full relative">
                      <Image
                        src={getImageUrl(item.imageUrl)}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                      <span className="text-[10px] font-black uppercase text-teal tracking-widest">{item.category}</span>
                      <h3 className="font-bold text-base mt-1 flex items-center justify-between">
                        <span className="truncate">{item.title}</span>
                        <ZoomIn size={18} className="text-teal shrink-0 ml-2" />
                      </h3>
                    </div>
                  </motion.div>
                </Card3D>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && galleryItems[activeLightboxIndex] && (
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
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={getImageUrl(galleryItems[activeLightboxIndex].imageUrl)}
                  alt={galleryItems[activeLightboxIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase text-teal tracking-wider">
                    {galleryItems[activeLightboxIndex].category}
                  </span>
                  <h3 className="text-xl font-bold mt-1">
                    {galleryItems[activeLightboxIndex].title}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(galleryItems[activeLightboxIndex].createdAt).toLocaleDateString()}
                </span>
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
