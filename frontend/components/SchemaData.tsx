import React from "react";
import { CLINIC_INFO, FAQ_ITEMS } from "../lib/constants";

export default function SchemaData() {
  const siteUrl = CLINIC_INFO.urls.siteUrl;

  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physician", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: CLINIC_INFO.name,
    legalName: CLINIC_INFO.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/clinic-hero.png`,
    telephone: CLINIC_INFO.contact.primaryPhoneDisplay,
    email: CLINIC_INFO.contact.email,
    priceRange: "₹₹",
    medicalSpecialty: [
      "Physiotherapy",
      "NeurologicalRehabilitation",
      "OrthopedicRehabilitation",
      "SportsMedicine",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC_INFO.contact.address.street,
      addressLocality: CLINIC_INFO.contact.address.locality,
      addressRegion: CLINIC_INFO.contact.address.state,
      postalCode: CLINIC_INFO.contact.address.postalCode,
      addressCountry: CLINIC_INFO.contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC_INFO.contact.geo.latitude,
      longitude: CLINIC_INFO.contact.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    employee: {
      "@type": "Physician",
      name: CLINIC_INFO.doctor.name,
      jobTitle: CLINIC_INFO.doctor.title,
      description: `${CLINIC_INFO.doctor.qualification}. Registration No: ${CLINIC_INFO.doctor.registrationNo}. Expert in dry needling, cupping therapy, and specialized rehabilitation.`,
      sameAs: [
        CLINIC_INFO.urls.doctorInstagram,
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Mumbai University",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "11",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      CLINIC_INFO.urls.googleMap,
      CLINIC_INFO.urls.facebook,
      CLINIC_INFO.urls.instagram,
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact",
        item: `${siteUrl}/#contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
