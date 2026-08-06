import { useState, useCallback } from "react";
import { TRANSLATIONS } from "../lib/constants";

export type Language = "en" | "hi";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
  }, []);

  const t = TRANSLATIONS[lang];

  return {
    lang,
    t,
    toggleLanguage,
    setLanguage,
  };
}
