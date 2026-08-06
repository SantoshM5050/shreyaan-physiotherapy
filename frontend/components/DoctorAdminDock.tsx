"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Plus,
  Upload,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { AuthService, DoctorUser } from "../services/authService";
import { BlogService } from "../services/blogService";
import { GalleryService } from "../services/galleryService";
import { CLINIC_INFO } from "../lib/constants";

export default function DoctorAdminDock() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Quick Modal States
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Blog Form State
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("Spine & Back Rehab");
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);

  // Gallery Form State
  const [gallerySubmitting, setGallerySubmitting] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("Clinic");
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      setIsAuth(authenticated);
      if (authenticated) {
        setUser(AuthService.getCurrentUser());
      }
    };
    checkAuth();

    // Check periodically or on window focus
    window.addEventListener("focus", checkAuth);
    return () => window.removeEventListener("focus", checkAuth);
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuth(false);
    showToast("Logged out successfully.");
    router.refresh();
  };

  const handleQuickCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) {
      showToast("Please provide both Title and Content.", "error");
      return;
    }

    setBlogSubmitting(true);
    let payload: FormData | Record<string, any>;

    if (blogImageFile) {
      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("excerpt", blogTitle);
      formData.append("content", blogContent);
      formData.append("category", blogCategory);
      formData.append("status", "published");
      formData.append("featuredImage", blogImageFile);
      payload = formData;
    } else {
      payload = {
        title: blogTitle,
        excerpt: blogTitle,
        content: blogContent,
        category: blogCategory,
        status: "published",
        featuredImage: "/images/blog/default.jpg",
      };
    }

    const res = await BlogService.createBlog(payload);
    setBlogSubmitting(false);

    if (res.success) {
      showToast("Article published to live website!");
      setIsBlogModalOpen(false);
      setBlogTitle("");
      setBlogContent("");
      setBlogImageFile(null);
      router.refresh();
    } else {
      showToast(res.message || "Failed to publish article.", "error");
    }
  };

  const handleQuickUploadGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryImageFile) {
      showToast("Please provide a title and select an image file.", "error");
      return;
    }

    setGallerySubmitting(true);
    const formData = new FormData();
    formData.append("title", galleryTitle);
    formData.append("category", galleryCategory);
    formData.append("image", galleryImageFile);

    const res = await GalleryService.uploadGalleryItem(formData);
    setGallerySubmitting(false);

    if (res.success) {
      showToast("Photo uploaded to clinic gallery!");
      setIsGalleryModalOpen(false);
      setGalleryTitle("");
      setGalleryImageFile(null);
      router.refresh();
    } else {
      showToast(res.message || "Failed to upload image.", "error");
    }
  };

  if (!isAuth) return null;

  return (
    <>
      {/* Toast Overlay */}
      {toast && (
        <div className="fixed top-20 right-5 z-[999] p-4 rounded-2xl shadow-2xl bg-navy text-white border border-teal/40 flex items-center gap-3 text-xs font-bold animate-in slide-in-from-right">
          {toast.type === "success" ? <CheckCircle2 className="text-teal" size={18} /> : <AlertCircle className="text-rose-400" size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Floating Doctor Dock Bar */}
      <div className="fixed bottom-6 right-6 z-[900] transition-all duration-300">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-2 rounded-full bg-navy/95 border-2 border-teal text-white p-3 shadow-2xl hover:scale-105 transition-all group backdrop-blur-md"
            title="Expand Doctor CMS Dock"
          >
            <ShieldCheck size={20} className="text-teal animate-pulse" />
            <span className="text-xs font-extrabold pr-1">Doctor CMS</span>
            <ChevronLeft size={16} className="text-teal group-hover:-translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-navy/95 border border-teal/40 p-2 sm:p-2.5 shadow-2xl text-white backdrop-blur-md animate-in slide-in-from-bottom duration-300">
            {/* Collapse Toggle Button */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 transition-colors"
              title="Minimize Dock"
            >
              <ChevronRight size={18} />
            </button>

            {/* Doctor Info Badge */}
            <div className="hidden md:flex items-center gap-2 pl-1 pr-2 border-r border-white/15">
              <span className="h-2 w-2 rounded-full bg-teal animate-ping" />
              <span className="text-xs font-black tracking-wide text-white">
                {user?.name || CLINIC_INFO.doctor.name}
              </span>
            </div>

            {/* Quick Action: Create Article */}
            <button
              onClick={() => setIsBlogModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3.5 py-1.5 text-xs font-extrabold text-white hover:bg-teal-600 transition-all shadow-sm active:scale-95"
            >
              <Plus size={14} />
              <span>Article</span>
            </button>

            {/* Quick Action: Upload Gallery */}
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white transition-all shadow-sm active:scale-95"
            >
              <Upload size={14} />
              <span>Gallery</span>
            </button>

            {/* Quick Action: Full CMS Dashboard */}
            <Link
              href="/doctor/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white transition-all shadow-sm active:scale-95"
            >
              <LayoutDashboard size={14} />
              <span className="hidden sm:inline">CMS Dashboard</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
              title="Logout Doctor Portal"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Quick Create Article Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[999] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-teal" />
                <h3 className="font-extrabold text-navy text-lg">Quick Publish Health Article</h3>
              </div>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-navy p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleQuickCreateBlog} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="e.g. 5 Exercises for Instant Lower Back Relief"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                <select
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                >
                  <option value="Spine & Back Rehab">Spine & Back Rehab</option>
                  <option value="Joint Care">Joint Care</option>
                  <option value="Neuro Rehab">Neuro Rehab</option>
                  <option value="Post-Op Care">Post-Op Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Article Content *</label>
                <textarea
                  required
                  rows={4}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="Write the health tips or recovery guidance for patients..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Featured Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBlogImageFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-mist file:text-navy hover:file:bg-teal/20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={blogSubmitting}
                  className="btn-primary text-xs py-2.5 px-5 shadow-md flex items-center gap-2"
                >
                  <span>{blogSubmitting ? "Publishing..." : "Publish Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Upload Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-[999] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload size={20} className="text-teal" />
                <h3 className="font-extrabold text-navy text-lg">Upload Gallery Photo</h3>
              </div>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-slate-400 hover:text-navy p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleQuickUploadGallery} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="e.g. Modern Decompression Traction Machine"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                >
                  <option value="Clinic">Clinic</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Treatment">Treatment</option>
                  <option value="Rehab">Rehab</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Select Photo File *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setGalleryImageFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-mist file:text-navy hover:file:bg-teal/20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={gallerySubmitting}
                  className="btn-primary text-xs py-2.5 px-5 shadow-md flex items-center gap-2"
                >
                  <span>{gallerySubmitting ? "Uploading..." : "Upload Photo"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
