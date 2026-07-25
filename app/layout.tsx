import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: { default: "Shreyaan Physiotherapy Center | Unchahar", template: "%s | Shreyaan Physiotherapy" }, description: "Expert physiotherapy and rehabilitation by Dr. Sonam Maurya in Unchahar.", keywords: ["physiotherapist Unchahar", "back pain treatment", "physiotherapy clinic"], metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shreyaan-physiotherapy.pages.dev"), openGraph: { type: "website", locale: "en_IN", siteName: "Shreyaan Physiotherapy Center" }, robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="font-sans antialiased">{children}</body></html>; }
