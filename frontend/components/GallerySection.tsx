"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Sparkles, ShieldCheck, ArrowRight, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryService, GalleryItem } from "../services/galleryService";
import { getImageUrl } from "../lib/getImageUrl";
import Card3D from "./3d/Card3D";

interface GallerySectionProps {
  t: any;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  {
    _id: "fb-1",
    title: "Shreyaan Physiotherapy Center Unchahar",
    category: "Clinic",
    imageUrl: "/images/clinic-hero.png",
    createdAt: new Date().toISOString(),
  },
];

export default function GallerySection({ t }: GallerySectionProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await GalleryService.getGallery();
        if (response.success && response.gallery && response.gallery.length > 0) {
          setGalleryItems(response.gallery);
        } else {
          setGalleryItems(FALLBACK_ITEMS);
        }
      } catch {
        setGalleryItems(FALLBACK_ITEMS);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! <= 0 ? galleryItems.length - 1 : prev! - 1));
  }, [activeLightboxIndex, galleryItems.length]);

  const nextImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! >= galleryItems.length - 1 ? 0 : prev! + 1));
  }, [activeLightboxIndex, galleryItems.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, prevImage, nextImage]);

  const displayItems = galleryItems.length > 0 ? galleryItems : FALLBACK_ITEMS;
  const mainItem = displayItems[0];
  const sideThumbnails = displayItems.slice(1, 3);

  return (
    <section id="gallery" className="section py-20 lg:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 className="heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {t.gallery.text}
          </p>
        </div>

        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal hover:text-navy transition-colors shrink-0"
        >
          <span>View Full Gallery</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        /* Skeleton Loader to prevent demo image flash */
        <div className="mt-12 grid gap-6 md:grid-cols-12 items-stretch">
          <div className="md:col-span-8 h-[360px] rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
          <div className="md:col-span-4 grid gap-6">
            <div className="h-44 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
            <div className="h-44 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
          </div>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-12 items-stretch">
          {/* Main Featured Interactive Gallery Card */}
          <div className="md:col-span-8">
          <Card3D intensity={12} glareOpacity={0.2} className="h-full rounded-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => openLightbox(0)}
              className="relative h-full min-h-[360px] rounded-3xl overflow-hidden shadow-soft border border-slate-200/80 group bg-slate-100 cursor-pointer"
            >
              <Image
                src={getImageUrl(mainItem.imageUrl)}
                alt={mainItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white mb-2">
                    <Sparkles size={14} className="text-teal" aria-hidden="true" /> High Hygiene Standard
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1 text-xs font-bold text-white shadow-md group-hover:scale-105 transition-transform">
                    <ZoomIn size={14} /> Click to View
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{mainItem.title}</p>
              </div>
            </motion.div>
          </Card3D>
        </div>

        {/* Side Highlight Cards & Interactive Photo Thumbnails */}
        <div className="md:col-span-4 grid gap-6 flex-col justify-between">
          {sideThumbnails.length > 0 ? (
            sideThumbnails.map((item, idx) => (
              <Card3D key={item._id} intensity={12} className="rounded-3xl">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
                  onClick={() => openLightbox(idx + 1)}
                  className="relative h-44 rounded-3xl overflow-hidden shadow-soft border border-slate-200 cursor-pointer group bg-slate-100"
                >
                  <Image
                    src={getImageUrl(item.imageUrl)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-black uppercase text-teal tracking-widest">{item.category}</span>
                    <p className="text-sm font-bold truncate flex items-center justify-between mt-0.5">
                      <span>{item.title}</span>
                      <ZoomIn size={16} className="text-teal shrink-0 ml-1 group-hover:scale-110 transition-transform" />
                    </p>
                  </div>
                </motion.div>
              </Card3D>
            ))
          ) : null}

          {/* Backup Promise Card if only 1 image */}
          {sideThumbnails.length < 2 && (
            <Card3D intensity={15} className="rounded-3xl">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full rounded-3xl bg-gradient-to-br from-teal to-[#088989] p-6 text-white shadow-soft flex flex-col justify-between"
              >
                <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-4">
                  <HeartPulse size={24} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-teal-100">Our Promise</p>
                  <p className="mt-1 text-lg font-black leading-tight">Every Movement Counts Towards Recovery.</p>
                </div>
              </motion.div>
            </Card3D>
          )}

          <Card3D intensity={15} className="rounded-3xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full rounded-3xl bg-navy p-6 text-white shadow-soft flex flex-col justify-between"
            >
              <div className="h-10 w-10 rounded-2xl bg-teal/20 flex items-center justify-center text-teal mb-4">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-teal">Your Wellbeing</p>
                <p className="mt-1 text-sm font-bold text-slate-200">Comfort, clarity and progressive recovery—together.</p>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </div>
      )}

      {/* Lightbox Modal Component */}
      <AnimatePresence>
        {activeLightboxIndex !== null && galleryItems[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
              aria-label="Close Lightbox"
            >
              <X size={26} />
            </button>

            {/* Previous Image Button */}
            {galleryItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                aria-label="Previous Image"
              >
                <ChevronLeft size={30} />
              </button>
            )}

            {/* Image Preview Box */}
            <div
              className="max-w-5xl w-full bg-navy/95 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center">
                <Image
                  src={getImageUrl(galleryItems[activeLightboxIndex].imageUrl)}
                  alt={galleryItems[activeLightboxIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="text-xs font-black uppercase text-teal tracking-wider">
                    {galleryItems[activeLightboxIndex].category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mt-0.5">
                    {galleryItems[activeLightboxIndex].title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono font-bold text-white">
                    {activeLightboxIndex + 1} / {galleryItems.length}
                  </span>
                  <Link
                    href="/gallery"
                    onClick={closeLightbox}
                    className="inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-1.5 font-bold text-white hover:bg-teal/90 transition-colors"
                  >
                    <span>Full Gallery</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Next Image Button */}
            {galleryItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                aria-label="Next Image"
              >
                <ChevronRight size={30} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

