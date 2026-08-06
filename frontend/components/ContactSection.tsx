"use client";

import React, { useState } from "react";
import { Phone, MapPin, Send, CheckCircle2, Clock3, Calendar, MessageCircle, AlertCircle, ExternalLink, Navigation } from "lucide-react";
import { CLINIC_INFO, SERVICES } from "../lib/constants";
import { useAppointmentForm } from "../hooks/useAppointmentForm";
import Card3D from "./3d/Card3D";

interface ContactSectionProps {
  t: any;
}

export default function ContactSection({ t }: ContactSectionProps) {
  const { loading, sent, error, submitForm, resetForm } = useAppointmentForm();
  const [selectedSlot, setSelectedSlot] = useState<string>("Morning (10 AM - 1 PM)");

  const timeSlots = [
    { id: "morning", label: "Morning", time: "10 AM - 1 PM" },
    { id: "afternoon", label: "Afternoon", time: "1 PM - 4 PM" },
    { id: "evening", label: "Evening", time: "4 PM - 6 PM" },
  ];

  return (
    <section id="contact" className="bg-mist/60 py-20 lg:py-28 relative">
      <div className="section grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-6">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {t.contact.text}
          </p>

          <div className="mt-8 space-y-4">
            {/* Phone Call Card */}
            <Card3D intensity={5} className="rounded-2xl">
              <a
                href={`tel:${CLINIC_INFO.contact.primaryPhone}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 font-bold text-navy shadow-soft border border-slate-200/80 transition-all hover:border-teal/40 group h-full"
              >
                <span className="rounded-xl bg-teal/10 p-3.5 text-teal group-hover:bg-teal group-hover:text-white transition-colors shrink-0">
                  <Phone size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase text-teal">Call Clinic Direct</p>
                  <p className="text-base font-bold text-navy mt-0.5">{CLINIC_INFO.contact.primaryPhoneDisplay}</p>
                  <p className="text-xs text-slate-500 font-normal">Secondary: {CLINIC_INFO.contact.secondaryPhoneDisplay}</p>
                </div>
              </a>
            </Card3D>

            {/* Google Maps Location Card with Direct Directions Link */}
            <Card3D intensity={5} className="rounded-2xl">
              <a
                href={CLINIC_INFO.urls.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 font-bold text-navy shadow-soft border border-slate-200/80 transition-all hover:border-teal/40 group h-full"
              >
                <div className="flex items-center gap-4">
                  <span className="rounded-xl bg-teal/10 p-3.5 text-teal group-hover:bg-teal group-hover:text-white transition-colors shrink-0">
                    <MapPin size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase text-teal">Clinic Location</p>
                    <p className="text-base font-bold text-navy mt-0.5">Shreyaan Physiotherapy Center</p>
                    <p className="text-xs text-slate-500 font-normal">{CLINIC_INFO.contact.address.fullAddress}</p>
                  </div>
                </div>
                <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-navy text-white px-3 py-1.5 text-xs font-extrabold shrink-0 group-hover:bg-teal transition-colors shadow-sm">
                  <Navigation size={13} />
                  <span>Get Directions</span>
                </span>
              </a>
            </Card3D>

            {/* Hours Card */}
            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 font-bold text-navy shadow-soft border border-slate-200/80">
              <span className="rounded-xl bg-teal/10 p-3.5 text-teal shrink-0">
                <Clock3 size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-teal">Opening Hours</p>
                <p className="text-base font-bold text-navy mt-0.5">Monday – Sunday: 10:00 AM – 6:00 PM</p>
                <p className="text-xs text-slate-500 font-normal">Available all 7 days of the week</p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed Iframe */}
          <div className="mt-6 rounded-3xl overflow-hidden shadow-soft border border-slate-200/80 bg-white">
            <iframe
              title="Shreyaan Physiotherapy Center Google Maps Location"
              className="h-64 w-full border-0"
              src={CLINIC_INFO.urls.googleMapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Appointment Form Column */}
        <div className="lg:col-span-6">
          <Card3D intensity={5} className="rounded-3xl">
            <form
              id="appointment"
              onSubmit={submitForm}
              className="rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                  <Calendar size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="heading text-2xl font-bold">{t.contact.formTitle}</h3>
                  <p className="text-xs text-slate-500">Fast confirmation via WhatsApp or Phone call</p>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-rose-500" />
                  <span>{error}</span>
                </div>
              )}

              {sent ? (
                <div className="mt-6 rounded-2xl bg-teal/10 border border-teal/30 p-6 text-teal">
                  <CheckCircle2 className="mb-2 h-8 w-8 text-teal" aria-hidden="true" />
                  <h4 className="font-extrabold text-xl text-navy">{t.contact.successTitle}</h4>
                  <p className="text-sm mt-2 text-slate-700">{t.contact.successMessage}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-outline text-xs py-2.5 px-4"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {/* Patient Name */}
                  <div>
                    <label htmlFor="patient-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="patient-name"
                      name="name"
                      type="text"
                      required
                      placeholder={t.contact.namePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-navy outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="patient-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="patient-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-navy outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20"
                    />
                  </div>

                  {/* Date & Time Slot Selection */}
                  <div className="space-y-2">
                    <label htmlFor="preferred-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Preferred Date & Time Slot *
                    </label>

                    <input
                      id="preferred-date"
                      name="date"
                      type="date"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20 mb-2"
                    />

                    {/* Time Slot Selector Pills */}
                    <input type="hidden" name="slot" value={selectedSlot} />
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedSlot.startsWith(slot.label);
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(`${slot.label} (${slot.time})`)}
                            className={`rounded-xl py-2 px-2 text-center transition-all border text-xs font-bold ${
                              isSelected
                                ? "border-teal bg-teal text-white shadow-sm"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className="block font-black">{slot.label}</span>
                            <span className={`block text-[10px] ${isSelected ? "text-teal-100" : "text-slate-500"}`}>
                              {slot.time}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Concern Select */}
                  <div>
                    <label htmlFor="service-concern" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Select Concern / Treatment
                    </label>
                    <select
                      id="service-concern"
                      name="concern"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20"
                    >
                      <option value="">Choose concern (e.g. Back Pain, Knee Pain)</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="appointment-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Additional Symptoms / Notes
                    </label>
                    <textarea
                      id="appointment-message"
                      name="message"
                      rows={3}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-navy outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-base py-4 shadow-lg shadow-teal/20 hover:shadow-teal/30 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" />
                        <span>{t.contact.submitBtn}</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <a
                      href={`https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=Hello%20Shreyaan%20Physiotherapy%20Center%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-[#25D366] hover:underline"
                    >
                      <MessageCircle size={15} />
                      <span>{t.contact.whatsappDirect}</span>
                    </a>
                  </div>
                </div>
              )}
            </form>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
