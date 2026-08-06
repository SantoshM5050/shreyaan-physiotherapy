import React from "react";
import Metadata from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "../../../lib/servicesData";
import { CLINIC_INFO } from "../../../lib/constants";
import ServiceDetailClient from "./ServiceDetailClient";

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
    <>
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

      <ServiceDetailClient service={service} />
    </>
  );
}
