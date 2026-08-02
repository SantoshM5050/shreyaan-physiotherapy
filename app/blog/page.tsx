"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, User, ArrowRight, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { BlogService, BlogPost } from "../../services/blogService";
import { getImageUrl } from "../../lib/getImageUrl";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

export default function BlogCatalogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublishedBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await BlogService.getBlogs({ status: "published" });
      if (response.success && response.blogs) {
        // Ensure strictly published items only
        const publishedOnly = response.blogs.filter((b) => b.status === "published");
        setBlogs(publishedOnly);
      } else {
        setError(response.message || "Failed to load blog posts.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while loading blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedBlogs();
  }, []);

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
            <span className="text-teal font-bold">Health Blog</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-b from-mist via-white to-mist/40 py-12 lg:py-16 text-center border-b border-slate-200/60">
          <div className="section max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-teal/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-teal mb-4">
              Patient Education & Insights
            </span>
            <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Physiotherapy & Spine Health Blog
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Evidence-based articles written by Dr. Sonam Maurya to help you understand pain relief, posture mechanics, and active recovery.
            </p>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="section py-16">
          {/* Loading State */}
          {loading && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft animate-pulse space-y-4"
                >
                  <div className="aspect-[16/9] bg-slate-100 rounded-2xl w-full" />
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="h-6 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="max-w-md mx-auto rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-800 space-y-4">
              <AlertCircle size={40} className="mx-auto text-rose-500" />
              <h3 className="font-bold text-lg">Failed to Load Blog Articles</h3>
              <p className="text-xs text-rose-600">{error}</p>
              <button
                onClick={fetchPublishedBlogs}
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-700 transition-all shadow-md"
              >
                <RefreshCw size={14} />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="max-w-md mx-auto rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center text-slate-500 space-y-3">
              <BookOpen size={48} className="mx-auto text-teal mb-2" />
              <h3 className="font-bold text-navy text-lg">No Health Articles Published Yet</h3>
              <p className="text-xs">
                Dr. Sonam Maurya is currently writing medical articles and rehab guides. Please check back soon!
              </p>
            </div>
          )}

          {/* Published Articles Grid */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[16/9] bg-slate-100">
                      <Image
                        src={getImageUrl(post.featuredImage)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-navy/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                        {post.category || "Physiotherapy"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <User size={13} className="text-teal" />
                        Dr. Sonam Maurya
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-teal" />
                        {new Date(post.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-navy group-hover:text-teal transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt || post.content.replace(/<[^>]*>?/gm, "").substring(0, 140) + "..."}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal hover:text-navy transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </Link>
                    <span className="text-[11px] text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
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
