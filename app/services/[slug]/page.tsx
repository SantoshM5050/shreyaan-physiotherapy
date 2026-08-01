import React from "react";
import Metadata from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  Calendar,
  Activity,
  ArrowRight,
  Phone,
  MessageCircle,
  Stethoscope,
  Star,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Award,
} from "lucide-react";
import { SERVICES_DATA, ServiceDetail } from "../../../lib/servicesData";
import { CLINIC_INFO } from "../../../lib/constants";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FloatingActions from "../../../components/FloatingActions";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = `${service.title} in Unchahar | Shreyaan Physiotherapy`;
  const description = `${service.tagline} Expert physiotherapy by Dr. Sonam Maurya (BPTh, Mumbai Univ) at Shreyaan Physiotherapy Center Unchahar.`;

  return {
    title,
    description,
    keywords: [
      service.title,
      `${service.title} Unchahar`,
      `${service.category} Raebareli`,
      "Dr Sonam Maurya Physiotherapist",
      "Shreyaan Physiotherapy Center",
    ],
    openGraph: {
      title,
      description,
      url: `https://shreyaanphysiotherapycenter.in/services/${slug}`,
      siteName: "Shreyaan Physiotherapy Center",
      images: [{ url: service.heroImage, width: 1200, height: 800, alt: service.title }],
      type: "article",
    },
    alternates: {
      canonical: `https://shreyaanphysiotherapycenter.in/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const siteUrl = CLINIC_INFO.urls.siteUrl;

  const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.overview,
    procedureType: "Physiotherapy",
    howPerformed: service.treatmentProcess.map((step) => `${step.title}: ${step.desc}`).join(" "),
    bodyLocation: service.category,
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Physiotherapy",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/services/${service.id}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#12374b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-bold text-slate-600 hover:text-teal hidden sm:block">
              ← Back to Home
            </Link>
            <a
              href="#appointment"
              className="rounded-full bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-teal transition-colors"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="bg-mist/80 py-3 border-b border-slate-200/60">
          <div className="section flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-400">Services</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-teal font-bold">{service.title}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-mist via-white to-mist/30 py-12 lg:py-20 border-b border-slate-200/60">
          <div className="section grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full bg-teal/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-teal mb-4 border border-teal/20">
                {service.category}
              </span>
              <h1 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {service.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                {service.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#appointment" className="btn-primary text-sm py-3 px-6 shadow-md">
                  <Calendar size={18} />
                  <span>Book Appointment</span>
                </a>
                <a
                  href={`https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=Hello%20Dr.%20Sonam%2C%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-3 px-6 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/10"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Doctor</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs font-bold text-navy">
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span>5.0 Rating (157+ Reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-teal" />
                  <span>Evidence-Based Care</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Award size={16} className="text-teal" />
                  <span>Dr. Sonam Maurya (BPTh)</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src={service.heroImage}
                alt={service.title}
                width={1200}
                height={800}
                priority
                className="aspect-[4/3] w-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </section>

        {/* Quick Facts Bar */}
        <section className="bg-navy text-white py-6">
          <div className="section grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs text-teal font-extrabold uppercase">Session Duration</p>
              <p className="text-base font-bold mt-1">{service.duration}</p>
            </div>
            <div>
              <p className="text-xs text-teal font-extrabold uppercase">Sessions Required</p>
              <p className="text-base font-bold mt-1">{service.sessionsRequired}</p>
            </div>
            <div>
              <p className="text-xs text-teal font-extrabold uppercase">Expected Recovery</p>
              <p className="text-base font-bold mt-1">{service.recoveryTimeline}</p>
            </div>
          </div>
        </section>

        {/* Overview & Clinical Details */}
        <section className="section py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="heading text-2xl sm:text-3xl font-bold">Treatment Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{service.overview}</p>
              </div>

              {/* Symptoms & Causes Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-mist p-6 border border-teal/15">
                  <h3 className="font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-teal" /> Common Symptoms
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {service.symptoms.map((sym) => (
                      <li key={sym} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-mist p-6 border border-teal/15">
                  <h3 className="font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <HelpCircle size={20} className="text-teal" /> Underlying Causes
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {service.causes.map((cause) => (
                      <li key={cause} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4-Step Treatment Process */}
              <div>
                <h2 className="heading text-2xl sm:text-3xl font-bold mb-6">
                  4-Step Clinical Treatment Process
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.treatmentProcess.map((step) => (
                    <div key={step.step} className="rounded-2xl border border-slate-200/80 p-5 bg-white shadow-soft">
                      <span className="text-xs font-black text-teal uppercase tracking-widest">
                        Step {step.step}
                      </span>
                      <h4 className="font-bold text-navy text-base mt-1">{step.title}</h4>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidates: Who should take / Who should avoid */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-emerald-50/60 p-6 border border-emerald-200/60">
                  <h3 className="font-bold text-emerald-900 text-base mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600" /> Recommended For
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
                    {service.candidates.take.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-rose-50/60 p-6 border border-rose-200/60">
                  <h3 className="font-bold text-rose-900 text-base mb-3 flex items-center gap-2">
                    <XCircle size={18} className="text-rose-600" /> Precautions & Contraindications
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-rose-900">
                    {service.candidates.avoid.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service Photos */}
              {service.photos && service.photos.length > 0 && (
                <div>
                  <h3 className="heading text-xl font-bold mb-4">Treatment Gallery</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.photos.map((photo, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-slate-200">
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          width={600}
                          height={400}
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <p className="p-3 text-xs text-slate-600 font-medium bg-slate-50">{photo.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service FAQs */}
              <div>
                <h3 className="heading text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 p-5 bg-white">
                      <h4 className="font-bold text-navy text-sm sm:text-base flex items-center gap-2">
                        <HelpCircle size={18} className="text-teal shrink-0" />
                        {faq.question}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Doctor Card */}
              <div className="rounded-3xl bg-navy p-6 text-white shadow-xl">
                <div className="h-12 w-12 rounded-xl bg-teal/20 flex items-center justify-center text-teal mb-4">
                  <Stethoscope size={28} />
                </div>
                <h3 className="text-xl font-black text-white">{CLINIC_INFO.doctor.name}</h3>
                <p className="text-xs text-teal font-semibold mt-0.5">{CLINIC_INFO.doctor.qualification}</p>
                <p className="text-xs text-slate-300 mt-2">Registration No: {CLINIC_INFO.doctor.registrationNo}</p>
                <div className="mt-4 pt-4 border-t border-white/15 text-xs space-y-2 text-slate-200">
                  <p>✔ Senior Consultant Physiotherapist</p>
                  <p>✔ 10+ Years Clinical Experience</p>
                  <p>✔ Individualized 1-on-1 Consultation</p>
                </div>
                <a
                  href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
                  className="btn-primary w-full text-xs mt-6 py-3 text-center justify-center"
                >
                  <Phone size={15} />
                  <span>Call {CLINIC_INFO.contact.primaryPhoneDisplay}</span>
                </a>
              </div>

              {/* Related Services */}
              <div className="rounded-3xl border border-slate-200/80 p-6 bg-white shadow-soft">
                <h4 className="font-bold text-navy text-base mb-4">Related Treatments</h4>
                <div className="space-y-3">
                  {service.relatedServices.map((relSlug) => {
                    const rel = SERVICES_DATA[relSlug];
                    if (!rel) return null;
                    return (
                      <Link
                        key={relSlug}
                        href={`/services/${relSlug}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-mist hover:bg-teal/10 hover:text-teal transition-colors group text-xs font-bold text-navy"
                      >
                        <span>{rel.title}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Form Section Anchor */}
        <section id="appointment" className="bg-mist/70 py-16 border-t border-slate-200">
          <div className="section max-w-2xl mx-auto text-center">
            <h2 className="heading text-3xl font-bold">Book Treatment For {service.title}</h2>
            <p className="mt-2 text-sm text-slate-600">
              Schedule your appointment directly with Dr. Sonam Maurya at Shreyaan Physiotherapy Center.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=Hello%20Shreyaan%20Physiotherapy%2C%20I%20would%20like%20to%20book%20an%20appointment%20for%20${encodeURIComponent(service.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-3 px-6"
              >
                <MessageCircle size={18} />
                <span>Book via WhatsApp</span>
              </a>
              <a
                href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
                className="btn-outline text-sm py-3 px-6"
              >
                <Phone size={18} />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        </section>
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
