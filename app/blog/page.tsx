import React from "react";
import Metadata from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "../../lib/blogData";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

export const metadata = {
  title: "Physiotherapy & Health Blog | Shreyaan Physiotherapy Center",
  description: "Expert medical articles and patient guides on back pain, sciatica, knee joint health, neck ergonomics, stroke rehab, dry needling, and sports recovery.",
  alternates: {
    canonical: "https://shreyaanphysiotherapycenter.in/blog",
  },
};

export default function BlogCatalogPage() {
  const posts = Object.values(BLOG_POSTS);

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

        {/* Blog Posts Grid */}
        <section className="section py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden mb-5">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="aspect-[16/9] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-navy/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <User size={13} className="text-teal" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-teal" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-navy group-hover:text-teal transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal hover:text-navy transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                  <span className="text-[11px] text-slate-400">{post.date}</span>
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
