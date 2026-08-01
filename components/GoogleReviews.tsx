"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { Star, ExternalLink, ShieldCheck, RefreshCw } from "lucide-react";
import { generateGoogleReviewsSchema } from "../lib/googleReviews";

const GoogleLogoSvg = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function GoogleReviews() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Dynamically append SociableKit script to ensure execution on client load
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const summary = {
    averageRating: 5.0,
    totalReviewCount: 157,
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=SHREYAAN+PHYSIOTHERAPY+CENTER",
    readAllReviewsUrl: "https://www.google.com/maps/place/SHREYAAN+PHYSIOTHERAPY+CENTER/@25.907775,81.2940827,17z",
  };

  return (
    <section id="testimonials" className="bg-gradient-to-b from-mist/50 via-white to-mist/30 py-20 sm:py-28 relative overflow-hidden">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      {/* Script tag backup */}
      <Script
        src="https://widgets.sociablekit.com/google-reviews/widget.js"
        strategy="lazyOnload"
      />

      <div className="section relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-teal border border-teal/20 mb-4">
            <GoogleLogoSvg />
            <span>Google Business Reviews</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Patient Stories & Google Reviews
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real feedback automatically synced from our official Google Business Profile.
          </p>
        </div>

        {/* Top Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl mb-12 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mist border border-teal/15 shadow-inner">
                <GoogleLogoSvg />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-navy">
                    5.0
                  </span>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={18} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-teal uppercase tracking-wider block mt-0.5">
                      Verified Google Reviews
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Based on authentic patient reviews on Google Maps
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={summary.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-sm py-3 px-6 shadow-md hover:shadow-lg transition-all"
              >
                <span>Write a Review</span>
                <ExternalLink size={16} />
              </a>
              <a
                href={summary.readAllReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full sm:w-auto text-sm py-3 px-6 hover:bg-mist transition-all"
              >
                <span>Read All Reviews</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Live SociableKit Google Reviews Widget Container (Embed ID: 25700248) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-soft min-h-[350px]">
          <div className="sk-ww-google-reviews" data-embed-id="25700248"></div>
        </div>
      </div>
    </section>
  );
}
