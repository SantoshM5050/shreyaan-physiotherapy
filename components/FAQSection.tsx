"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "../lib/constants";

interface FAQSectionProps {
  t: any;
}

export default function FAQSection({ t }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section py-20 lg:py-28">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="eyebrow">{t.faq.eyebrow}</p>
        <h2 className="heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t.faq.title}
        </h2>
      </div>

      <div className="mx-auto max-w-3xl divide-y divide-slate-200/80 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-soft">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={item.question} className="py-5 first:pt-0 last:pb-0">
              <button
                onClick={() => toggleFAQ(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="flex w-full cursor-pointer items-center justify-between text-left font-bold text-navy text-base sm:text-lg hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 rounded-lg p-1"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-teal shrink-0" aria-hidden="true" />
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`text-teal shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 pl-8 max-w-2xl text-sm leading-relaxed text-slate-600">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
