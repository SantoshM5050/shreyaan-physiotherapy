import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shreyaan Physiotherapy Center | Unchahar",
    template: "%s | Shreyaan Physiotherapy",
  },

  description:
    "Expert physiotherapy and rehabilitation by Dr. Sonam Maurya in Unchahar.",

  keywords: [
    "physiotherapist Unchahar",
    "back pain treatment",
    "neck pain treatment",
    "knee pain treatment",
    "sports injury",
    "slip disc treatment",
    "sciatica treatment",
    "physiotherapy clinic",
    "rehabilitation",
  ],

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://shreyaan-physiotherapy.vercel.app",
  ),

  verification: {
    google: "XyXkrSzNhde2sZE0epZDtXiL-qTarPVsdDwkyV07Jak",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Shreyaan Physiotherapy Center",
    title: "Shreyaan Physiotherapy Center | Unchahar",
    description:
      "Expert physiotherapy and rehabilitation by Dr. Sonam Maurya in Unchahar.",
    url: "https://shreyaan-physiotherapy.vercel.app",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
