import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreyaanphysiotherapycenter.in"),

  title: {
    default: "Shreyaan Physiotherapy Center | Unchahar",
    template: "%s | Shreyaan Physiotherapy Center",
  },

  description:
    "Expert physiotherapy and rehabilitation by Dr. Sonam Maurya in Unchahar. Specialized treatment for back pain, neck pain, knee pain, sciatica, paralysis, sports injuries and rehabilitation.",

  keywords: [
    "Physiotherapy",
    "Physiotherapist",
    "Physiotherapy Clinic",
    "Back Pain",
    "Neck Pain",
    "Knee Pain",
    "Sciatica",
    "Slip Disc",
    "Sports Injury",
    "Paralysis",
    "Unchahar",
    "Raebareli",
    "Dr Sonam Maurya",
  ],

  verification: {
    google: "XyXkrSzNhde2sZE0epZDtXiL-qTarPVsdDwkyV07Jak",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shreyaanphysiotherapycenter.in",
    title: "Shreyaan Physiotherapy Center",
    description:
      "Expert physiotherapy and rehabilitation by Dr. Sonam Maurya in Unchahar.",
    siteName: "Shreyaan Physiotherapy Center",
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}