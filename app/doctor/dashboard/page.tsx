"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UserCheck,
  LogOut,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  Search,
  Activity,
  HeartPulse,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { AuthService, DoctorUser } from "../../../services/authService";
import { CLINIC_INFO } from "../../../lib/constants";

interface MockAppointment {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  timeSlot: string;
  status: "Confirmed" | "Pending" | "Completed";
}

const MOCK_APPOINTMENTS: MockAppointment[] = [
  {
    id: "APT-101",
    patientName: "Rajesh Sharma",
    phone: "+91 9876543210",
    service: "Back & Neck Pain Rehabilitation",
    timeSlot: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: "APT-102",
    patientName: "Pooja Verma",
    phone: "+91 9812345678",
    service: "Knee & Joint Pain Management",
    timeSlot: "11:15 AM",
    status: "Confirmed",
  },
  {
    id: "APT-103",
    patientName: "Amit Singh",
    phone: "+91 9711223344",
    service: "Dry Needling & Cupping Therapy",
    timeSlot: "02:00 PM",
    status: "Pending",
  },
  {
    id: "APT-104",
    patientName: "Sunita Gupta",
    phone: "+91 9655443322",
    service: "Post-Surgical Knee Rehab",
    timeSlot: "03:30 PM",
    status: "Completed",
  },
];

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"queue" | "patients" | "prescriptions">("queue");
  const [searchTerm, setSearchTerm] = useState("");

  // Protected route check
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.replace("/doctor/login");
    } else {
      setUser(AuthService.getCurrentUser());
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.replace("/doctor/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mist text-navy">
        <div className="text-center space-y-3">
          <div className="h-10 w-10 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider">Verifying Doctor Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#12374b]">
      {/* Dashboard Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-navy text-white shadow-md">
        <div className="section flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-white font-bold">
              <HeartPulse size={22} />
            </span>
            <div>
              <h1 className="text-sm font-extrabold tracking-wider leading-tight">
                SHREYAAN <span className="text-teal font-medium">PHYSIOTHERAPY</span>
              </h1>
              <p className="text-[11px] text-slate-300">Doctor Portal • Clinical Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-right">
              <div>
                <p className="text-xs font-bold text-white">{user?.name || CLINIC_INFO.doctor.name}</p>
                <p className="text-[11px] text-teal">{user?.qualification || CLINIC_INFO.doctor.qualification}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-rose-600 hover:border-rose-600 transition-all"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-grow section py-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy via-[#073B5C] to-[#0a4e7a] p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal/20 px-3.5 py-1 text-xs font-extrabold text-teal border border-teal/30 mb-3">
              <ShieldCheck size={14} />
              <span>Active Consultation Session</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Welcome back, {user?.name || CLINIC_INFO.doctor.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Registration No: {user?.registrationNo || CLINIC_INFO.doctor.registrationNo} • Senior Consultant Physiotherapist
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="btn-primary text-xs py-2.5 px-4 shadow-md">
              <Plus size={16} />
              <span>New Patient Entry</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase text-slate-400">Today&apos;s Appointments</p>
              <p className="text-3xl font-black text-navy mt-1">12</p>
              <p className="text-xs text-teal font-medium mt-1">4 Confirmed morning slots</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal">
              <Calendar size={24} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase text-slate-400">Active Rehab Cases</p>
              <p className="text-3xl font-black text-navy mt-1">48</p>
              <p className="text-xs text-teal font-medium mt-1">18 Post-surgical patients</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-navy/10 flex items-center justify-center text-navy">
              <Users size={24} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase text-slate-400">Completed This Week</p>
              <p className="text-3xl font-black text-navy mt-1">64</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">98% Satisfaction rating</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("queue")}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === "queue"
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Today&apos;s Queue
          </button>
          <button
            onClick={() => setActiveTab("patients")}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === "patients"
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Patient Records
          </button>
          <button
            onClick={() => setActiveTab("prescriptions")}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === "prescriptions"
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Clinical Notes
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "queue" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <h3 className="font-bold text-navy text-lg">Live Appointment Queue</h3>
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patient name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-navy outline-none focus:border-teal"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">ID</th>
                    <th className="p-3.5">Patient Name</th>
                    <th className="p-3.5">Treatment / Concern</th>
                    <th className="p-3.5">Scheduled Slot</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {MOCK_APPOINTMENTS.filter((a) =>
                    a.patientName.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-navy">{apt.id}</td>
                      <td className="p-3.5">
                        <p className="font-bold text-navy">{apt.patientName}</p>
                        <p className="text-[11px] text-slate-400">{apt.phone}</p>
                      </td>
                      <td className="p-3.5 text-slate-700">{apt.service}</td>
                      <td className="p-3.5 font-bold text-teal">{apt.timeSlot}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            apt.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : apt.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button className="text-xs font-bold text-teal hover:underline">
                          Start Session →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "patients" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft text-center py-12 text-slate-500">
            <FileText size={40} className="mx-auto text-teal mb-3" />
            <h4 className="font-bold text-navy text-base">Patient Medical Records</h4>
            <p className="text-xs max-w-md mx-auto mt-1">
              Centralized patient history, diagnosis notes, and exercise progress tracking powered by MERN backend integration.
            </p>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft text-center py-12 text-slate-500">
            <Activity size={40} className="mx-auto text-teal mb-3" />
            <h4 className="font-bold text-navy text-base">Clinical Exercise Prescriptions</h4>
            <p className="text-xs max-w-md mx-auto mt-1">
              Generate custom PDF exercise guides and post-treatment instruction sheets for your patients.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
