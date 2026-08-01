"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ShieldCheck, HeartPulse, ArrowLeft, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { AuthService } from "../../../services/authService";

export default function DoctorLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-redirect to dashboard if already authenticated
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      router.replace("/doctor/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await AuthService.login(email, password);

      if (res.success) {
        router.push("/doctor/dashboard");
      } else {
        setError(res.message || "Invalid email or password");
      }
    } catch {
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mist via-white to-mist/60 text-[#12374b]">
      {/* Top Header */}
      <header className="py-4 border-b border-slate-200/80 bg-white/90 backdrop-blur sticky top-0 z-30">
        <div className="section flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal rounded-xl p-1"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-navy to-[#0b4d75] text-white shadow-md shadow-navy/20 group-hover:scale-105 transition-transform duration-300">
              <HeartPulse size={24} className="text-teal animate-pulse" aria-hidden="true" />
            </span>
            <span className="flex flex-col text-left">
              <span className="text-sm font-black tracking-wider text-navy leading-tight">
                SHREYAAN
              </span>
              <span className="text-[11px] font-bold tracking-widest text-teal">
                PHYSIOTHERAPY CENTER
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 rounded-lg p-1.5"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Return to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Portal Workspace */}
      <main className="flex-grow section flex flex-col items-center justify-center py-12 lg:py-16 relative">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

        {/* Animated Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200/90 bg-white/95 p-8 sm:p-10 shadow-2xl shadow-navy/10 backdrop-blur-md"
        >
          {/* Card Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-navy to-[#073B5C] text-teal flex items-center justify-center shadow-lg shadow-navy/20 border border-white/20 mb-4"
            >
              <Lock size={28} />
            </motion.div>
            <h1 className="heading text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Doctor Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
              Secure Clinical Management Portal
            </p>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 rounded-2xl bg-rose-50/90 border border-rose-200/80 p-4 text-xs font-semibold text-rose-700 flex items-start gap-2.5 shadow-sm"
              >
                <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="doctor-email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Doctor Email
              </label>
              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-teal transition-colors"
                />
                <input
                  id="doctor-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@shreyaanphysiotherapycenter.in"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-3.5 text-sm text-navy outline-none transition-all duration-200 focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/15 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="doctor-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Security Password
              </label>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-teal transition-colors"
                />
                <input
                  id="doctor-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-10 pr-11 py-3.5 text-sm text-navy outline-none transition-all duration-200 focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/15 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-navy transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-600 font-semibold selection:bg-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-teal focus:ring-teal focus:ring-offset-0"
                />
                <span>Remember Me</span>
              </label>
            </div>

            {/* Submit Button with Smooth Spinner */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn-primary w-full text-sm py-4 mt-2 shadow-lg shadow-teal/20 hover:shadow-teal/30 transition-all font-bold tracking-wide flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <span>Secure Login</span>
              )}
            </motion.button>
          </form>

          {/* Security Badge */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center gap-2 font-medium">
            <ShieldCheck size={16} className="text-teal" />
            <span>Authorized Clinical Security Protocol</span>
          </div>
        </motion.div>

        {/* Small Footer below login card */}
        <div className="mt-8 text-center text-xs text-slate-400 font-medium space-y-1">
          <p>© {new Date().getFullYear()} Shreyaan Physiotherapy Center</p>
          <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
            Authorized Personnel Only
          </p>
        </div>
      </main>
    </div>
  );
}
