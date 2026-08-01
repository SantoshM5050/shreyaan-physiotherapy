"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, HeartPulse, ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mist via-white to-mist/50 text-[#12374b]">
      {/* Top Header */}
      <header className="py-4 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="section flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white font-bold">
              <HeartPulse size={20} className="text-teal" />
            </span>
            <span className="text-sm font-black text-navy leading-tight">
              SHREYAAN <br />
              <span className="text-teal font-semibold">PHYSIOTHERAPY</span>
            </span>
          </Link>

          <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal">
            <ArrowLeft size={14} />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </header>

      {/* Main Portal View */}
      <main className="flex-grow section flex items-center justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-navy text-teal flex items-center justify-center shadow-md mb-4">
              <Lock size={26} />
            </div>
            <h1 className="heading text-2xl font-bold">Doctor Portal Login</h1>
            <p className="text-xs text-slate-500 mt-1">Authorized Access for Dr. Sonam Maurya</p>
          </div>

          {/* Demo Credentials Info Box */}
          <div className="mb-6 rounded-2xl bg-teal/10 border border-teal/20 p-4 text-xs text-slate-700">
            <p className="font-bold text-navy mb-1">Demo Doctor Credentials:</p>
            <p><span className="font-semibold text-teal">Email:</span> doctor@shreyaanphysiotherapycenter.in</p>
            <p><span className="font-semibold text-teal">Password:</span> DrSonam@2026</p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="doctor-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Doctor Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  id="doctor-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@shreyaanphysiotherapycenter.in"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm text-navy outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="doctor-password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  id="doctor-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-3 text-sm text-navy outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-navy"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal focus:ring-teal"
                />
                <span>Remember session</span>
              </label>

              <span className="text-slate-400 italic">Secure JWT Ready</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-sm py-3.5 mt-2 shadow-lg shadow-teal/20"
            >
              {loading ? "Authenticating..." : "Sign In To Doctor Portal"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-teal" />
            <span>Encrypted Authentication Standard</span>
          </div>
        </div>
      </main>
    </div>
  );
}
