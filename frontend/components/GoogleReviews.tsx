"use client";

import React, { useState } from "react";
import { Star, ExternalLink, ShieldCheck } from "lucide-react";
import { useGoogleReviews } from "../hooks/useGoogleReviews";
import { GoogleReview } from "../types/review";
import Card3D from "./3d/Card3D";

const GoogleLogoSvg = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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

const getAvatarBg = (name: string) => {
  const colors = [
    "from-blue-500 to-indigo-600",
    "from-teal-500 to-emerald-600",
    "from-purple-500 to-indigo-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];
  let charCodeSum = 0;
  for (let i = 0; i < name.length; i++) {
    charCodeSum += name.charCodeAt(i);
  }
  return colors[charCodeSum % colors.length];
};

interface GoogleReviewsProps {
  t?: any;
}

export default function GoogleReviews({ t }: GoogleReviewsProps) {
  const { summary, reviews } = useGoogleReviews();
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="testimonials" className="bg-gradient-to-b from-mist/60 via-white to-mist/40 py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 h-80 w-80 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="section relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4 shadow-sm">
            <GoogleLogoSvg />
            <span>Official Google Reviews</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy">
            Patient Stories & Google Reviews
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real patient feedback from our official Google Business Profile.
          </p>
        </div>

        {/* Top Google Summary Card */}
        <Card3D intensity={6} className="mx-auto max-w-4xl mb-12 rounded-3xl">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mist border border-teal/15 shadow-inner">
                  <GoogleLogoSvg />
                </div>
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-navy">
                      {summary.averageRating.toFixed(1)}
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={18} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-teal uppercase tracking-wider block mt-0.5">
                        {summary.totalReviewCount}+ Verified Google Reviews
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                    Based on authentic patient reviews on Google Maps & Search
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <a
                  href={summary.writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-teal px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#078d8d] transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>Write a Review</span>
                  <ExternalLink size={15} />
                </a>
                <a
                  href={summary.readAllReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-navy hover:bg-mist hover:border-teal/30 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>View All on Google</span>
                </a>
              </div>
            </div>
          </div>
        </Card3D>

        {/* Reviews Grid - Clean, Responsive, No Overflow */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review: GoogleReview) => {
            const isLong = review.comment.length > 140;
            const isExpanded = expandedReviews[review.reviewId];
            const displayedText =
              isLong && !isExpanded ? `${review.comment.substring(0, 140)}...` : review.comment;

            return (
              <div key={review.reviewId} className="h-full">
                <Card3D intensity={6} className="h-full rounded-3xl">
                  <div className="flex flex-col justify-between h-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft hover:shadow-xl transition-all duration-300">
                    <div>
                      {/* Header: Reviewer Info */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          {review.reviewer.profilePhotoUrl ? (
                            <img
                              src={review.reviewer.profilePhotoUrl}
                              alt={review.reviewer.displayName}
                              className="h-11 w-11 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div
                              className={`h-11 w-11 rounded-full bg-gradient-to-br ${getAvatarBg(
                                review.reviewer.displayName
                              )} flex items-center justify-center text-white font-extrabold text-base shadow-sm`}
                            >
                              {review.reviewer.displayName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-navy text-sm leading-tight">
                              {review.reviewer.displayName}
                            </h4>
                            <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                              {review.relativeTime}
                            </span>
                          </div>
                        </div>
                        <GoogleLogoSvg />
                      </div>

                      {/* Star Rating & Verified Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${
                                star <= review.starRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full border border-teal/20">
                            <ShieldCheck size={13} />
                            <span>Verified Patient</span>
                          </span>
                        )}
                      </div>

                      {/* Review Comment Content */}
                      <p className="text-sm leading-relaxed text-slate-700 italic whitespace-pre-line">
                        &quot;{displayedText}&quot;
                      </p>

                      {isLong && (
                        <button
                          onClick={() => toggleExpand(review.reviewId)}
                          className="mt-3 text-xs font-extrabold text-teal hover:underline focus:outline-none block cursor-pointer"
                        >
                          {isExpanded ? "Show Less" : "Read Full Review"}
                        </button>
                      )}
                    </div>

                    {/* Card Footer Google Link */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                      <span>Posted on Google</span>
                      <ExternalLink size={13} className="text-slate-400" />
                    </div>
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
