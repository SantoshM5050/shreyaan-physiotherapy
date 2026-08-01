import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import SchemaData from "../components/SchemaData";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#073B5C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shreyaanphysiotherapycenter.in"),

  title: {
    default: "Shreyaan Physiotherapy Center | Best Physiotherapy Clinic in Unchahar",
    template: "%s | Shreyaan Physiotherapy Center",
  },

  description:
    "Expert physiotherapy & rehabilitation by Dr. Sonam Maurya (BPTh, Mumbai University) in Unchahar, Raebareli. Specialized care for back pain, neck pain, knee pain, sciatica, paralysis, sports injuries & post-surgery rehab.",

  keywords: [
    "Physiotherapy Unchahar",
    "Best Physiotherapist in Unchahar",
    "Physiotherapy Clinic Raebareli",
    "Dr Sonam Maurya",
    "Back Pain Treatment Unchahar",
    "Neck Pain Rehab",
    "Knee Pain Doctor Unchahar",
    "Sciatica Treatment",
    "Slip Disc Physiotherapy",
    "Paralysis Rehabilitation Unchahar",
    "Dry Needling Unchahar",
    "Cupping Therapy Raebareli",
    "Sports Injury Rehabilitation",
    "Post Surgery Physiotherapy",
  ],

  authors: [{ name: "Dr. Sonam Maurya" }, { name: "Shreyaan Physiotherapy Center" }],
  creator: "Santosh Maurya",
  publisher: "Shreyaan Physiotherapy Center",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  verification: {
    google: "XyXkrSzNhde2sZE0epZDtXiL-qTarPVsdDwkyV07Jak",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shreyaanphysiotherapycenter.in",
    title: "Shreyaan Physiotherapy Center | Unchahar",
    description:
      "Expert physiotherapy & rehabilitation by Dr. Sonam Maurya in Unchahar. Targeted care for back pain, joint pain, sciatica, paralysis & sports injuries.",
    siteName: "Shreyaan Physiotherapy Center",
    images: [
      {
        url: "https://shreyaanphysiotherapycenter.in/images/clinic-hero.png",
        width: 1200,
        height: 800,
        alt: "Shreyaan Physiotherapy Center Clinic in Unchahar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shreyaan Physiotherapy Center | Unchahar",
    description:
      "Expert physiotherapy & rehabilitation by Dr. Sonam Maurya in Unchahar. Modern treatment for pain relief & recovery.",
    images: ["https://shreyaanphysiotherapycenter.in/images/clinic-hero.png"],
  },

  alternates: {
    canonical: "https://shreyaanphysiotherapycenter.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <SchemaData />
      </head>
      <body className="font-sans antialiased bg-white text-[#12374b] selection:bg-teal selection:text-white">
        {children}
      </body>
    </html>
  );
}