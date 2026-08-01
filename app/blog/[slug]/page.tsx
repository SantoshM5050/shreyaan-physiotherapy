import React from "react";
import Metadata from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, User, ArrowLeft, Share2, Stethoscope, Phone } from "lucide-react";
import { BLOG_POSTS } from "../../../lib/blogData";
import { CLINIC_INFO } from "../../../lib/constants";
import Footer from "../../../components/Footer";
import FloatingActions from "../../../components/FloatingActions";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return { title: "Article Not Found" };
  }

  const title = `${post.title} | Shreyaan Physiotherapy Blog`;
  const description = post.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://shreyaanphysiotherapycenter.in/blog/${slug}`,
      siteName: "Shreyaan Physiotherapy Center",
      images: [{ url: post.heroImage, width: 1200, height: 800, alt: post.title }],
      type: "article",
    },
    alternates: {
      canonical: `https://shreyaanphysiotherapycenter.in/blog/${slug}`,
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.heroImage,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Senior Consultant Physiotherapist",
    },
    publisher: {
      "@type": "Organization",
      name: "Shreyaan Physiotherapy Center",
      logo: {
        "@type": "ImageObject",
        url: "https://shreyaanphysiotherapycenter.in/icon.svg",
      },
    },
    datePublished: post.date,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#12374b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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

          <Link href="/blog" className="text-xs font-bold text-slate-600 hover:text-teal flex items-center gap-1">
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-mist/80 py-3 border-b border-slate-200/60">
          <div className="section flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <Link href="/blog" className="hover:text-teal">Blog</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-teal font-bold truncate max-w-xs">{post.title}</span>
          </div>
        </nav>

        {/* Article Body Container */}
        <article className="section py-12 max-w-4xl mx-auto">
          {/* Category Pill */}
          <span className="inline-block rounded-full bg-teal/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-teal mb-4 border border-teal/20">
            {post.category}
          </span>

          <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/80 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-navy">
                <User size={15} className="text-teal" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-teal" />
                {post.readTime}
              </span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>

          <div className="my-8 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <Image
              src={post.heroImage}
              alt={post.title}
              width={1200}
              height={800}
              priority
              className="aspect-[16/9] w-full object-cover rounded-3xl"
            />
          </div>

          <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
            <p className="text-lg font-medium text-slate-800 leading-relaxed border-l-4 border-teal pl-4 italic">
              {post.summary}
            </p>

            {post.content.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="heading text-xl sm:text-2xl font-bold text-navy">
                  {sec.heading}
                </h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  {sec.paragraph}
                </p>
              </div>
            ))}
          </div>

          {/* Doctor Bio Box */}
          <div className="mt-12 rounded-3xl bg-navy p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <div className="h-16 w-16 rounded-2xl bg-teal/20 flex items-center justify-center text-teal shrink-0">
              <Stethoscope size={36} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-teal font-extrabold uppercase tracking-wider">Written By</p>
              <h3 className="text-xl font-bold mt-0.5">{CLINIC_INFO.doctor.name}</h3>
              <p className="text-xs text-slate-300">{CLINIC_INFO.doctor.qualification} • Reg No: {CLINIC_INFO.doctor.registrationNo}</p>
              <p className="text-xs text-slate-300 mt-2">
                Senior Consultant Physiotherapist specializing in back pain rehabilitation, neuro rehab, and evidence-guided sports care in Unchahar.
              </p>
            </div>
            <a
              href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
              className="btn-primary text-xs py-3 px-5 shrink-0"
            >
              <Phone size={14} />
              <span>Consult Doctor</span>
            </a>
          </div>
        </article>
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
