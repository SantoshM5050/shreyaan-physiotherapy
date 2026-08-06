"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search, X } from "lucide-react";
import { FAQ_ITEMS } from "../lib/constants";
import Card3D from "./3d/Card3D";

interface FAQSectionProps {
  t: any;
}

export default function FAQSection({ t }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // Filter FAQs based on real-time search input
  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  });

  return (
    <section id="faq" className="section py-20 lg:py-28">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="eyebrow">{t.faq.eyebrow}</p>
        <h2 className="heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t.faq.title}
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Have questions? Type your keyword below to quickly find answers.
        </p>

        {/* Live Search Input Bar */}
        <div className="mt-8 relative max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-4 text-teal" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs (e.g., fees, back pain, home visit, timings)..."
              className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-10 text-sm text-navy placeholder:text-slate-400 shadow-md outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card3D intensity={5} className="rounded-3xl">
          <div className="divide-y divide-slate-200/80 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-soft">
            {filteredFAQs.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <p className="text-sm font-semibold">No questions found matching &quot;{searchQuery}&quot;.</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-xs font-bold text-teal underline"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              filteredFAQs.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={item.question} className="py-5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggleFAQ(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="flex w-full cursor-pointer items-center justify-between text-left font-bold text-navy text-base sm:text-lg hover:text-teal transition-colors focus:outline-none rounded-lg p-1"
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
              })
            )}
          </div>
        </Card3D>
      </div>
    </section>
  );
}
