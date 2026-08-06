"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Clock, User, Stethoscope, Phone, AlertCircle } from "lucide-react";
import { BlogService, BlogPost } from "../../../services/blogService";
import { getImageUrl } from "../../../lib/getImageUrl";
import { CLINIC_INFO } from "../../../lib/constants";
import SubpageHeader from "../../../components/SubpageHeader";
import Footer from "../../../components/Footer";
import FloatingActions from "../../../components/FloatingActions";
import Card3D from "../../../components/3d/Card3D";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const response = await BlogService.getBlogBySlug(slug);
      if (response.success && response.blog) {
        setPost(response.blog);
      } else {
        setError(response.message || `Article with slug '${slug}' not found.`);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#12374b]">
      {/* Interactive Subpage Header with Back to Blog */}
      <SubpageHeader backUrl="/blog" backLabel="Back to Blog" />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-mist/80 py-3 border-b border-slate-200/60">
          <div className="section flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <Link href="/blog" className="hover:text-teal transition-colors">Blog</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-teal font-bold truncate max-w-xs">{post ? post.title : slug}</span>
          </div>
        </nav>

        {/* Loading State */}
        {loading && (
          <div className="section py-16 max-w-3xl mx-auto text-center space-y-4">
            <div className="h-10 w-10 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Article...</p>
          </div>
        )}

        {/* Error / Not Found State */}
        {!loading && (error || !post) && (
          <div className="section py-16 max-w-md mx-auto text-center space-y-4">
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-800 space-y-3 shadow-sm">
              <AlertCircle size={44} className="mx-auto text-rose-500" />
              <h2 className="font-bold text-lg">Article Not Found</h2>
              <p className="text-xs text-rose-600">{error || "The requested article could not be found."}</p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/blog"
                  className="rounded-full bg-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-teal transition-colors shadow-md"
                >
                  Return to Blog Catalog
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        {!loading && post && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section py-12 max-w-4xl mx-auto"
          >
            {/* Category Pill */}
            <span className="inline-block rounded-full bg-teal/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-teal mb-4 border border-teal/20">
              {post.category || "Physiotherapy"}
            </span>

            <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/80 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-bold text-navy">
                  <User size={15} className="text-teal" />
                  Dr. Sonam Maurya
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-teal" />
                  Published {new Date(post.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Featured Image with 3D Tilt */}
            <Card3D intensity={10} glareOpacity={0.15} className="my-8 rounded-3xl">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/9] relative bg-slate-100">
                <Image
                  src={getImageUrl(post.featuredImage)}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover rounded-3xl"
                />
              </div>
            </Card3D>

            {/* Article Body */}
            <div className="mt-8 space-y-6 text-slate-700 leading-relaxed text-base">
              {post.excerpt && (
                <p className="text-lg font-medium text-slate-800 leading-relaxed border-l-4 border-teal pl-4 italic bg-slate-50 py-3 rounded-r-xl shadow-xs">
                  {post.excerpt}
                </p>
              )}

              <div
                className="prose max-w-none text-slate-700 space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-navy uppercase tracking-wider">Tags:</span>
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-teal"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Doctor Bio Card */}
            <Card3D intensity={12} glareOpacity={0.2} className="mt-12 rounded-3xl">
              <div className="rounded-3xl bg-navy p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                <div className="h-16 w-16 rounded-2xl bg-teal/20 flex items-center justify-center text-teal shrink-0">
                  <Stethoscope size={36} />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs text-teal font-extrabold uppercase tracking-wider">Written By</p>
                  <h3 className="text-xl font-bold mt-0.5">{CLINIC_INFO.doctor.name}</h3>
                  <p className="text-xs text-slate-300">{CLINIC_INFO.doctor.qualification} • Reg No: {CLINIC_INFO.doctor.registrationNo}</p>
                  <p className="text-xs text-slate-300 mt-2">
                    Senior Consultant Physiotherapist specializing in back pain rehabilitation, neuro rehab, and evidence-guided sports care.
                  </p>
                </div>
                <a
                  href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
                  className="btn-primary text-xs py-3.5 px-6 shrink-0 flex items-center gap-2 shadow-lg"
                >
                  <Phone size={14} />
                  <span>Consult Doctor</span>
                </a>
              </div>
            </Card3D>
          </motion.article>
        )}
      </main>

      <Footer t={{
        footer: {
          tagline: "Dedicated to restoring your mobility, strength, and quality of life.",
          quickLinks: "Quick Navigation",
          legalDisclaimer: "Medical Disclaimer: Information on this page is for educational purposes and should not replace professional medical consultation.",
          rights: "All Rights Reserved.",
          designedBy: "Designed & Developed by",
        }
      }} />
      <FloatingActions />
    </div>
  );
}
