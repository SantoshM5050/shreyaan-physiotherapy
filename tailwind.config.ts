import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { navy: "#073B5C", teal: "#0AA6A6", mist: "#F2FAFB" }, fontFamily: { sans: ["var(--font-inter)", "Inter", "sans-serif"] }, boxShadow: { soft: "0 20px 60px rgba(7,59,92,.12)" } } }, plugins: [] } satisfies Config;
