"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartPulse, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { GalleryService, GalleryItem } from "../services/galleryService";
import { getImageUrl } from "../lib/getImageUrl";
import Card3D from "./3d/Card3D";

interface GallerySectionProps {
  t: any;
}

export default function GallerySection({ t }: GallerySectionProps) {
  const [featuredImage, setFeaturedImage] = useState<string>("/images/clinic-hero.png");
  const [featuredTitle, setFeaturedTitle] = useState<string>("Modern Equipment & Patient-Focused Care");

  useEffect(() => {
    async function loadFeaturedGallery() {
      try {
        const response = await GalleryService.getGallery();
        if (response.success && response.gallery && response.gallery.length > 0) {
          const latest = response.gallery[0];
          setFeaturedImage(getImageUrl(latest.imageUrl));
          setFeaturedTitle(latest.title);
        }
      } catch {
        // Fallback to clinic hero image
      }
    }
    loadFeaturedGallery();
  }, []);

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

      <div className="mt-12 grid gap-6 md:grid-cols-12 items-stretch">
        {/* Main Image Banner dynamically loaded from Gallery */}
        <div className="md:col-span-8">
          <Card3D intensity={12} glareOpacity={0.2} className="h-full rounded-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-full min-h-[320px] rounded-3xl overflow-hidden shadow-soft border border-slate-200/80 group bg-slate-100"
            >
              <Image
                src={featuredImage}
                alt={featuredTitle}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 65vw"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white w-fit mb-2">
                  <Sparkles size={14} className="text-teal" aria-hidden="true" /> High Hygiene Standard
                </span>
                <p className="text-xl sm:text-2xl font-bold text-white">{featuredTitle}</p>
              </div>
            </motion.div>
          </Card3D>
        </div>

        {/* Side Highlight Cards */}
        <div className="md:col-span-4 grid gap-6 flex-col justify-between">
          <Card3D intensity={15} className="rounded-3xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-full rounded-3xl bg-gradient-to-br from-teal to-[#088989] p-8 text-white shadow-soft flex flex-col justify-between"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6">
                <HeartPulse size={28} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-teal-100">Our Promise</p>
                <p className="mt-2 text-2xl font-black leading-tight">Every Movement Counts Towards Recovery.</p>
              </div>
            </motion.div>
          </Card3D>

          <Card3D intensity={15} className="rounded-3xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full rounded-3xl bg-navy p-8 text-white shadow-soft flex flex-col justify-between"
            >
              <div className="h-12 w-12 rounded-2xl bg-teal/20 flex items-center justify-center text-teal mb-6">
                <ShieldCheck size={28} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-teal">Your Wellbeing</p>
                <p className="mt-2 text-lg font-bold text-slate-200">Comfort, clarity and progressive recovery—together.</p>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
