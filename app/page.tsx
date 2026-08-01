"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  HeartPulse,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import GoogleReviews from "../components/GoogleReviews";

const phone = "+919140574645";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shreyaanphysiotherapycenter.in";
const mapUrl =
  "https://www.google.com/maps/place/SHREYAAN+PHYSIOTHERAPY+CENTER/@25.907775,81.2940827,17z/data=!3m1!4b1!4m6!3m5!1s0x399b0f869997b4e3:0xf5adf7c9c63088c3!8m2!3d25.9077702!4d81.2966576!16s%2Fg%2F11svgg3587?hl=en-US&entry=ttu";

const services = [
  ["Back & Neck Pain", "Evidence-led care to help you move with confidence."],
  ["Knee & Joint Pain", "Restore comfortable movement and daily independence."],
  ["Slip Disc & Sciatica", "Focused rehabilitation for radiating pain and recovery."],
  ["Sports Injury", "Return-to-activity programmes built around your goals."],
  ["Paralysis Rehabilitation", "Compassionate, progressive support for meaningful function."],
  ["Post Surgery Rehab", "Structured recovery after orthopaedic procedures."],
  ["Dry Needling & Cupping", "Modern adjunct therapies for muscle pain and mobility."],
  ["Electrotherapy & Taping", "Targeted modalities to support your rehabilitation."],
];

const copy = {
  en: {
    hero: "Move better. Live stronger.",
    sub: "Expert, compassionate physiotherapy to help you return to the life you love.",
    appointment: "Book an appointment",
    about: "Care that sees the whole you",
    aboutText:
      "At Shreyaan Physiotherapy Center, recovery is never one-size-fits-all. Dr. Sonam Maurya listens first, assesses deeply, and creates a practical plan for lasting movement.",
    services: "Specialised care for every step of recovery",
    contact: "Let’s start your recovery",
    form: "Request an appointment",
  },
  hi: {
    hero: "बेहतर चलें। मजबूत जिएँ।",
    sub: "आपको पसंदीदा जीवन में वापस लाने के लिए विशेषज्ञ और संवेदनशील फिजियोथेरेपी।",
    appointment: "अपॉइंटमेंट बुक करें",
    about: "आपकी पूरी सेहत पर केंद्रित देखभाल",
    aboutText:
      "श्रेयान फिजियोथेरेपी सेंटर में हर रिकवरी योजना आपकी ज़रूरत के अनुसार बनाई जाती है। डॉ. सोनम मौर्य पहले आपको सुनती हैं, फिर सही उपचार योजना बनाती हैं।",
    services: "रिकवरी के हर चरण के लिए विशेषज्ञ देखभाल",
    contact: "अपनी रिकवरी शुरू करें",
    form: "अपॉइंटमेंट का अनुरोध करें",
  },
};

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading mt-3 text-3xl sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-7 text-slate-600">{text}</p>}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);

  const t = copy[lang];

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const patientName = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() || "";
    const patientPhone = (form.elements.namedItem("phone") as HTMLInputElement)?.value?.trim() || "";
    const concern = (form.elements.namedItem("concern") as HTMLSelectElement)?.value?.trim() || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value?.trim() || "";

    const appointmentMessage = `*New Appointment Request*\n\n*Name:* ${patientName}\n*Phone:* ${patientPhone}\n*Concern:* ${concern || "Not specified"
      }\n*Message:* ${message || "Not specified"}\n\nPlease confirm a suitable appointment time.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(appointmentMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setSent(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "SHREYAAN PHYSIOTHERAPY CENTER",
    image: `${siteUrl}/images/clinic-hero.png`,
    telephone: "+91 9140574645",
    address: {
      "@type": "PostalAddress",
      streetAddress: "NTPC Road, near Ganda Nala",
      addressLocality: "Unchahar",
      addressRegion: "Uttar Pradesh",
      postalCode: "229406",
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 10:00-18:00",
    medicalSpecialty: "Physiotherapy",
    employee: {
      "@type": "Physician",
      name: "Dr. Sonam Maurya",
      description:
        "BPTh (Mumbai University). Registration No: 10534. Specializations: dry needling, cupping therapy, therapeutic taping, Ayurvedic diet and nutrition.",
    },
  };

  const toggleLanguage = () => setLang(lang === "en" ? "hi" : "en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="section flex h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white">
              <HeartPulse size={23} aria-hidden="true" />
            </span>
            <span className="text-sm font-extrabold leading-tight text-navy">
              SHREYAAN
              <br />
              <span className="font-semibold text-teal">PHYSIOTHERAPY CENTER</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
            {["Home", "About", "Services", "Gallery", "Testimonials", "FAQ", "Contact"].map(
              (x) => (
                <a className="hover:text-teal" href={`#${x.toLowerCase()}`} key={x}>
                  {x}
                </a>
              )
            )}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Change language"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-extrabold text-navy transition hover:border-teal hover:text-teal"
            >
              <Languages size={14} aria-hidden="true" />
              {lang === "en" ? "हिंदी" : "English"}
            </button>
            <a
              href="#appointment"
              className="hidden rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal md:block"
            >
              {t.appointment}
            </a>
            <button
              onClick={() => setMenu(!menu)}
              className="p-2 text-navy lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="section border-t py-4 lg:hidden">
            <div className="grid gap-3 font-bold text-slate-700">
              {["Home", "About", "Services", "Gallery", "Testimonials", "FAQ", "Contact"].map(
                (x) => (
                  <a
                    onClick={() => setMenu(false)}
                    href={`#${x.toLowerCase()}`}
                    key={x}
                    className="py-1 hover:text-teal"
                  >
                    {x}
                  </a>
                )
              )}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Language</span>
                <button
                  onClick={() => {
                    toggleLanguage();
                    setMenu(false);
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-extrabold text-navy"
                >
                  <Languages size={14} aria-hidden="true" />
                  {lang === "en" ? "हिंदी" : "English"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      <main>
        <section id="home" className="relative overflow-hidden bg-mist">
          <div className="section grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="relative z-10"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-teal shadow-sm">
                <Sparkles size={15} aria-hidden="true" /> Trusted physiotherapy care in Unchahar
              </div>
              <h1 className="heading max-w-xl text-5xl leading-[1.08] sm:text-6xl">{t.hero}</h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">{t.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn-primary" href="#appointment">
                  <CalendarDays size={18} aria-hidden="true" />
                  {t.appointment}
                </a>
                <a className="btn-outline" href={`tel:${phone}`}>
                  <Phone size={18} aria-hidden="true" /> Call clinic
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-navy">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="text-teal" size={18} aria-hidden="true" /> Personalised plans
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="text-teal" size={18} aria-hidden="true" /> Modern techniques
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[3rem] bg-teal/15 blur-2xl" />
              <Image
                priority
                src="/images/clinic-hero.png"
                alt="Physiotherapy treatment at Shreyaan Physiotherapy Center"
                width={1200}
                height={800}
                className="relative aspect-[4/3] rounded-[2.5rem] object-cover shadow-soft"
              />
              <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-2xl font-extrabold text-navy">10+ </p>
                <p className="text-xs font-bold text-slate-500">treatments available</p>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="border-y border-teal/10 bg-white">
          <div className="section grid gap-5 py-7 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Clock3 className="text-teal" aria-hidden="true" />
              <p className="text-sm font-bold text-navy">
                Mon–Sun
                <br />
                <span className="font-medium text-slate-500">10:00 AM – 6:00 PM</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-teal" aria-hidden="true" />
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-navy hover:text-teal">
                NTPC Road, Unchahar
                <br />
                <span className="font-medium text-slate-500">Uttar Pradesh 229406</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-teal" aria-hidden="true" />
              <a href={`tel:${phone}`} className="text-sm font-bold text-navy hover:text-teal">
                +91 9140574645
                <br />
                <span className="font-medium text-slate-500">Call for an appointment</span>
              </a>
            </div>
          </div>
        </section>
        <section id="about" className="section grid gap-14 py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] bg-navy p-8 text-white sm:p-12">
            <Stethoscope className="mb-10 text-teal" size={46} aria-hidden="true" />
            <p className="text-5xl font-extrabold">
              Dr. Sonam
              <br />
              Maurya
            </p>
            <div className="mt-8 border-t border-white/20 pt-6 text-sm leading-7 text-slate-200">
              BPTh (Mumbai University)
              <br />
              Registration No: 10534
              <br />
              <span className="text-teal font-semibold">Specializations</span>
              <br />
              Dry Needling · Cupping Therapy
              <br />
              Therapeutic Taping · Ayurvedic Diet &amp; Nutrition
              <br />
              <span className="text-slate-300 font-medium">Consultation: +91 9140574645 · +91 9410230235</span>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="About the clinic" title={t.about} text={t.aboutText} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-mist p-5">
                <ShieldCheck className="text-teal" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-navy">Clinical expertise</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Thoughtful assessment backed by modern practice.
                </p>
              </div>
              <div className="rounded-2xl bg-mist p-5">
                <HeartPulse className="text-teal" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-navy">Patient-first care</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Clear guidance and support at every stage.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="bg-mist py-24">
          <div className="section">
            <SectionTitle
              eyebrow="Our services"
              title={t.services}
              text="From pain relief to performance, your treatment is tailored to your body, lifestyle and goals."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {services.map(([name, desc], i) => (
                <motion.article whileHover={{ y: -5 }} key={name} className="card p-6">
                  <span className="text-sm font-extrabold text-teal">0{i + 1}</span>
                  <h3 className="mt-6 text-lg font-extrabold text-navy">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                  <a href="#appointment" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-teal">
                    Learn more <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section id="gallery" className="section py-24">
          <SectionTitle
            eyebrow="Inside Shreyaan"
            title="A calmer place to heal"
            text="A welcoming, focused environment designed around your comfort."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="md:col-span-2">
              <Image
                src="/images/clinic-hero.png"
                alt="Physiotherapist assisting a patient at Shreyaan Physiotherapy Center"
                width={1200}
                height={800}
                className="h-full min-h-[250px] w-full rounded-3xl object-cover"
              />
            </div>
            <div className="grid gap-5">
              <div className="rounded-3xl bg-teal p-7 text-white">
                <HeartPulse size={35} aria-hidden="true" />
                <p className="mt-12 text-2xl font-bold">Every movement matters.</p>
              </div>
              <div className="rounded-3xl bg-navy p-7 text-white">
                <p className="eyebrow !text-teal">Your wellbeing</p>
                <p className="mt-4 text-lg font-bold">Comfort, clarity and progress—together.</p>
              </div>
            </div>
          </div>
        </section>
        <GoogleReviews />
        <section id="faq" className="section py-24">
          <SectionTitle
            eyebrow="Questions, answered"
            title="Helpful information before your visit"
          />
          <div className="mx-auto mt-9 max-w-3xl divide-y divide-slate-200">
            {[
              ["Do I need a referral?", "No. You can book directly with the clinic for an assessment."],
              [
                "What should I bring?",
                "Please bring any relevant reports, scans, a list of medicines, and comfortable clothing.",
              ],
              [
                "How long is a session?",
                "Your first assessment and treatment plan are tailored to your needs. Call us for session details.",
              ],
              [
                "Do you offer dry needling and cupping?",
                "Yes. These are available when clinically appropriate as part of your treatment plan.",
              ],
            ].map(([q, a]) => (
              <details className="group py-5" key={q}>
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-navy">
                  {q}
                  <ChevronDown className="transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="bg-mist py-24">
          <div className="section grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Contact us"
                title={t.contact}
                text="Call, message or visit us to discuss how we can help."
              />
              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 font-bold text-navy shadow-sm transition hover:shadow-md"
                >
                  <span className="rounded-xl bg-teal/10 p-3 text-teal">
                    <Phone aria-hidden="true" />
                  </span>
                  +91 9140574645
                </a>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 font-bold text-navy shadow-sm transition hover:shadow-md"
                >
                  <span className="rounded-xl bg-teal/10 p-3 text-teal">
                    <MapPin aria-hidden="true" />
                  </span>
                  Open in Google Maps
                </a>
              </div>
              <iframe
                title="Shreyaan Physiotherapy Center location"
                className="mt-6 h-52 w-full rounded-2xl border-0 shadow-sm"
                src="https://www.google.com/maps?q=NTPC%20Road%2C%20near%20Ganda%20Nala%2C%20Unchahar%2C%20Uttar%20Pradesh%20229406&output=embed"
                loading="lazy"
              />
            </div>
            <form id="appointment" onSubmit={submit} className="card p-7 sm:p-10">
              <h2 className="heading text-2xl">{t.form}</h2>
              <p className="mt-2 text-sm text-slate-600">We’ll call you to confirm a suitable time.</p>
              {sent ? (
                <div className="mt-8 rounded-2xl bg-teal/10 p-6 text-teal">
                  <CheckCircle2 className="mb-2" aria-hidden="true" />
                  <p className="font-bold text-lg">Thank you!</p>
                  <p className="text-sm mt-1">Your appointment request has been submitted. We will contact you shortly.</p>
                </div>
              ) : (
                <div className="mt-7 grid gap-4">
                  <input
                    name="name"
                    required
                    aria-label="Your name"
                    placeholder="Your name"
                    className="rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  />
                  <input
                    name="phone"
                    required
                    aria-label="Phone number"
                    type="tel"
                    placeholder="Phone number"
                    className="rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  />
                  <select
                    name="concern"
                    aria-label="Choose a concern"
                    className="rounded-xl border border-slate-200 px-4 py-3.5 text-slate-600 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  >
                    <option value="">Choose your concern</option>
                    {services.map(([s]) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    aria-label="Message"
                    placeholder="Briefly tell us how we can help (optional)"
                    rows={3}
                    className="rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  />
                  <button className="btn-primary w-full" type="submit">
                    <Send size={18} aria-hidden="true" />
                    Send request
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-navy py-10 border-t border-white/10 text-slate-300">
        <div className="section flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-bold text-white tracking-wide">SHREYAAN PHYSIOTHERAPY CENTER</p>
            <p className="mt-1 text-xs text-slate-400">
              Website Designed &amp; Developed by <span className="font-semibold text-teal">Santosh Maurya</span>
            </p>
          </div>
          <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-right">
            <p>© {new Date().getFullYear()} Shreyaan Physiotherapy Center</p>
            <p className="mt-0.5 text-xs text-slate-500">Dr. Sonam Maurya • All rights reserved</p>
          </div>
        </div>
      </footer>
      <a
        href={`https://wa.me/${phone}?text=Hello%20Shreyaan%20Physiotherapy%20Center%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
      >
        <MessageCircle size={28} aria-hidden="true" />
      </a>
      <a
        href={`tel:${phone}`}
        aria-label="Call clinic"
        className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-navy text-white shadow-lg transition hover:scale-110"
      >
        <Phone size={24} aria-hidden="true" />
      </a>
    </>
  );
}
