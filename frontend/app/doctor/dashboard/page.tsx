"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  Plus,
  FileText,
  Image as ImageIcon,
  Search,
  HeartPulse,
  ShieldCheck,
  LayoutDashboard,
  User,
  Trash2,
  Edit,
  Eye,
  X,
  CheckCircle2,
  Clock,
  Upload,
  AlertCircle,
  Filter,
  Globe,
  ExternalLink,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  ChevronRight,
  Menu,
} from "lucide-react";
import { AuthService, DoctorUser } from "../../../services/authService";
import { BlogService, BlogPost } from "../../../services/blogService";
import { GalleryService, GalleryItem } from "../../../services/galleryService";
import { CLINIC_INFO } from "../../../lib/constants";

type TabType = "overview" | "preview" | "blogs" | "gallery" | "profile";
type ViewportType = "desktop" | "tablet" | "mobile";

interface ToastNotification {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [lastLogin, setLastLogin] = useState<string>("Active Session");
  const [loadingSession, setLoadingSession] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [viewport, setViewport] = useState<ViewportType>("desktop");
  const [previewKey, setPreviewKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: "success" | "error" = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Blog Management State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogStatusFilter, setBlogStatusFilter] = useState<string>("all");

  // Blog Form Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Spine & Back Rehab",
    tags: "",
    status: "published" as "published" | "draft",
    featuredImage: "",
  });
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);

  // Gallery Management State
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>("All");

  // Gallery Upload Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [gallerySubmitting, setGallerySubmitting] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    title: "",
    category: "Clinic",
    imageUrl: "",
  });
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [previewGalleryItem, setPreviewGalleryItem] = useState<GalleryItem | null>(null);

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: "blog" | "gallery";
    id: string;
    title: string;
  }>({ isOpen: false, type: "blog", id: "", title: "" });

  // 1. Authenticate Doctor Session
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.replace("/doctor/login");
    } else {
      setUser(AuthService.getCurrentUser());
      setLastLogin(AuthService.getLastLogin());
      setLoadingSession(false);
    }
  }, [router]);

  // 2. Fetch Blogs
  const fetchBlogs = useCallback(async () => {
    setBlogsLoading(true);
    const response = await BlogService.getBlogs();
    if (response.success && response.blogs) {
      setBlogs(response.blogs);
    } else {
      addToast(response.message || "Failed to load blogs from API.", "error");
    }
    setBlogsLoading(false);
  }, []);

  // 3. Fetch Gallery
  const fetchGallery = useCallback(async () => {
    setGalleryLoading(true);
    const response = await GalleryService.getGallery();
    if (response.success && response.gallery) {
      setGallery(response.gallery);
    } else {
      addToast(response.message || "Failed to load gallery items.", "error");
    }
    setGalleryLoading(false);
  }, []);

  useEffect(() => {
    if (!loadingSession) {
      fetchBlogs();
      fetchGallery();
    }
  }, [loadingSession, fetchBlogs, fetchGallery]);

  const handleLogout = () => {
    AuthService.logout();
    router.replace("/doctor/login");
  };

  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Spine & Back Rehab",
      tags: "Physiotherapy, Health, Rehab",
      status: "published",
      featuredImage: "/images/blog/default.jpg",
    });
    setBlogImageFile(null);
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "Spine & Back Rehab",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : (blog.tags || ""),
      status: blog.status || "published",
      featuredImage: blog.featuredImage || "",
    });
    setBlogImageFile(null);
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFormData.title.trim() || !blogFormData.content.trim()) {
      addToast("Please fill in required fields (Title and Content).", "error");
      return;
    }

    setBlogSubmitting(true);

    let payload: FormData | Record<string, any>;
    if (blogImageFile) {
      const formData = new FormData();
      formData.append("title", blogFormData.title);
      formData.append("excerpt", blogFormData.excerpt || blogFormData.title);
      formData.append("content", blogFormData.content);
      formData.append("category", blogFormData.category);
      formData.append("status", blogFormData.status);
      formData.append("featuredImage", blogImageFile);
      payload = formData;
    } else {
      payload = {
        title: blogFormData.title,
        excerpt: blogFormData.excerpt || blogFormData.title,
        content: blogFormData.content,
        category: blogFormData.category,
        status: blogFormData.status,
        featuredImage: blogFormData.featuredImage || "/images/blog/default.jpg",
      };
    }

    let response;
    if (editingBlog) {
      response = await BlogService.updateBlog(editingBlog._id, payload);
    } else {
      response = await BlogService.createBlog(payload);
    }

    setBlogSubmitting(false);

    if (response.success) {
      addToast(editingBlog ? "Article updated!" : "Article published!");
      setIsBlogModalOpen(false);
      fetchBlogs();
      setPreviewKey((prev) => prev + 1);
    } else {
      addToast(response.message || "Failed to save blog post.", "error");
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFormData.title.trim() || (!galleryImageFile && !galleryFormData.imageUrl)) {
      showToast("Title and photo are required.", "error");
      return;
    }

    setGallerySubmitting(true);

    let payload: FormData | Record<string, any>;
    if (galleryImageFile) {
      const formData = new FormData();
      formData.append("title", galleryFormData.title);
      formData.append("category", galleryFormData.category);
      formData.append("image", galleryImageFile);
      payload = formData;
    } else {
      payload = {
        title: galleryFormData.title,
        category: galleryFormData.category,
        imageUrl: galleryFormData.imageUrl,
      };
    }

    const response = await GalleryService.uploadGalleryItem(payload);
    setGallerySubmitting(false);

    if (response.success) {
      addToast("Image uploaded to gallery!");
      setIsGalleryModalOpen(false);
      fetchGallery();
      setPreviewKey((prev) => prev + 1);
    } else {
      addToast(response.message || "Upload failed.", "error");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.id) return;

    if (deleteConfirm.type === "blog") {
      const res = await BlogService.deleteBlog(deleteConfirm.id);
      setDeleteConfirm({ isOpen: false, type: "blog", id: "", title: "" });
      if (res.success) {
        addToast("Blog deleted.");
        fetchBlogs();
      } else {
        addToast(res.message || "Delete failed.", "error");
      }
    } else {
      const res = await GalleryService.deleteGalleryItem(deleteConfirm.id);
      setDeleteConfirm({ isOpen: false, type: "gallery", id: "", title: "" });
      if (res.success) {
        addToast("Gallery image deleted.");
        fetchGallery();
      } else {
        addToast(res.message || "Delete failed.", "error");
      }
    }
  };

  const showToast = addToast;

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy text-white">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-teal">Verifying Doctor Session...</p>
        </div>
      </div>
    );
  }

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const totalGallery = gallery.length;

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(blogSearch.toLowerCase());
    const matchesStatus = blogStatusFilter === "all" || b.status === blogStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex bg-slate-100 text-[#12374b]">
      {/* Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-[999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold text-white transition-all ${
              toast.type === "success" ? "bg-emerald-600 border-emerald-500" : "bg-rose-600 border-rose-500"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Left Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-navy text-white flex flex-col justify-between transition-all duration-300 z-30 border-r border-navy/40 shrink-0 sticky top-0 h-screen`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal to-[#078d8d] text-white font-black shrink-0 shadow-md">
                <HeartPulse size={22} />
              </span>
              {sidebarOpen && (
                <div className="truncate">
                  <h1 className="text-xs font-extrabold tracking-wider leading-tight text-white">
                    SHREYAAN <span className="text-teal font-medium">PHYSIO</span>
                  </h1>
                  <p className="text-[10px] text-teal font-bold uppercase tracking-widest">Doctor CMS</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
            >
              <Menu size={16} />
            </button>
          </div>

          {/* Doctor Profile Mini Card */}
          {sidebarOpen && (
            <div className="mx-4 my-4 p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal/20 border border-teal/30 flex items-center justify-center text-teal font-bold text-sm shrink-0">
                DS
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || CLINIC_INFO.doctor.name}</p>
                <p className="text-[10px] text-teal font-medium">{user?.qualification || "BPTh (Mumbai Univ)"}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-extrabold transition-all ${
                activeTab === "overview"
                  ? "bg-teal text-white shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <LayoutDashboard size={18} className="shrink-0" />
              {sidebarOpen && <span>Dashboard Overview</span>}
            </button>

            <button
              onClick={() => setActiveTab("preview")}
              className={`w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-extrabold transition-all ${
                activeTab === "preview"
                  ? "bg-teal text-white shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Globe size={18} className="shrink-0" />
              {sidebarOpen && (
                <div className="flex items-center justify-between w-full">
                  <span>Live Website Preview</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-extrabold transition-all ${
                activeTab === "blogs"
                  ? "bg-teal text-white shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <FileText size={18} className="shrink-0" />
              {sidebarOpen && (
                <div className="flex items-center justify-between w-full">
                  <span>Articles Manager</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{totalBlogs}</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-extrabold transition-all ${
                activeTab === "gallery"
                  ? "bg-teal text-white shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ImageIcon size={18} className="shrink-0" />
              {sidebarOpen && (
                <div className="flex items-center justify-between w-full">
                  <span>Gallery Manager</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{totalGallery}</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-extrabold transition-all ${
                activeTab === "profile"
                  ? "bg-teal text-white shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <User size={18} className="shrink-0" />
              {sidebarOpen && <span>Doctor Profile</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {sidebarOpen && (
            <button
              onClick={handleOpenCreateBlog}
              className="w-full btn-primary text-xs py-2.5 px-3 flex items-center justify-center gap-2 shadow-md"
            >
              <Plus size={16} />
              <span>New Article</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-extrabold text-rose-300 hover:bg-rose-600 hover:text-white transition-all"
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Workspace Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-navy capitalize">
              {activeTab === "overview" && "Dashboard & Analytics"}
              {activeTab === "preview" && "Live Website Interactive Preview"}
              {activeTab === "blogs" && "Health Articles & Blog CMS"}
              {activeTab === "gallery" && "Clinic Photo Gallery CMS"}
              {activeTab === "profile" && "Senior Consultant Doctor Profile"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-navy hover:border-teal hover:text-teal transition-all shadow-2xs"
            >
              <span>Open Main Site</span>
              <ExternalLink size={13} />
            </a>

            <button
              onClick={handleOpenCreateBlog}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-1.5 text-xs font-bold text-white hover:bg-teal transition-all shadow-md"
            >
              <Plus size={15} />
              <span>Create Article</span>
            </button>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase text-slate-400">Total Articles</p>
                  <p className="text-3xl font-black text-navy mt-1">{totalBlogs}</p>
                  <p className="text-xs text-teal font-bold mt-1">{publishedBlogs} Live on Website</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal">
                  <FileText size={24} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase text-slate-400">Gallery Media</p>
                  <p className="text-3xl font-black text-navy mt-1">{totalGallery}</p>
                  <p className="text-xs text-teal font-bold mt-1">Photos & Clinical Equipment</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-navy/10 flex items-center justify-center text-navy">
                  <ImageIcon size={24} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase text-slate-400">Google Rating</p>
                  <p className="text-3xl font-black text-amber-500 mt-1">5.0 ★</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">157+ Verified Reviews</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Globe size={24} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase text-slate-400">Session Security</p>
                  <p className="text-xs font-black text-navy mt-2 leading-tight">{lastLogin}</p>
                  <p className="text-[11px] text-teal font-bold mt-1">Authenticated Doctor</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
              </div>
            </div>

            {/* Live Website Preview Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-extrabold text-emerald-800 border border-emerald-300 mb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Website Ready
                </span>
                <h3 className="text-xl font-extrabold text-navy">Interactive Website Viewport Embedded</h3>
                <p className="text-xs text-slate-600 mt-1">
                  You can preview your website live inside this portal or open it in full desktop view.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("preview")}
                className="btn-primary text-xs py-3 px-6 shadow-md flex items-center gap-2"
              >
                <Globe size={16} />
                <span>Launch Live Preview</span>
              </button>
            </div>

            {/* Recent Articles & Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy text-base flex items-center gap-2">
                    <FileText size={18} className="text-teal" />
                    Recent Articles
                  </h3>
                  <button onClick={() => setActiveTab("blogs")} className="text-xs font-bold text-teal hover:underline">
                    View All ({totalBlogs}) →
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {blogs.slice(0, 4).map((blog) => (
                    <div key={blog._id} className="py-3 flex items-center justify-between gap-4">
                      <div className="truncate">
                        <p className="font-bold text-navy text-xs truncate">{blog.title}</p>
                        <p className="text-[11px] text-slate-400">{blog.category} • {new Date(blog.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-emerald-100 text-emerald-700">
                        {blog.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy text-base flex items-center gap-2">
                    <ImageIcon size={18} className="text-teal" />
                    Recent Gallery Photos
                  </h3>
                  <button onClick={() => setActiveTab("gallery")} className="text-xs font-bold text-teal hover:underline">
                    View All ({totalGallery}) →
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {gallery.slice(0, 4).map((item) => (
                    <div key={item._id} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE WEBSITE PREVIEW VIEWPORT */}
        {activeTab === "preview" && (
          <div className="p-6 flex-1 flex flex-col h-full space-y-4">
            {/* Device Viewport Selector Bar */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-navy px-2">Viewport Frame:</span>
                <button
                  onClick={() => setViewport("desktop")}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    viewport === "desktop" ? "bg-navy text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Monitor size={14} />
                  <span>Desktop (100%)</span>
                </button>
                <button
                  onClick={() => setViewport("tablet")}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    viewport === "tablet" ? "bg-navy text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Tablet size={14} />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  onClick={() => setViewport("mobile")}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    viewport === "mobile" ? "bg-navy text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Smartphone size={14} />
                  <span>Mobile (375px)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewKey((prev) => prev + 1)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-navy hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw size={14} />
                  <span>Reload Preview</span>
                </button>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-1.5 px-3.5 shadow-sm flex items-center gap-1.5"
                >
                  <span>Open Full Screen</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Embedded Live Website Iframe */}
            <div className="flex-1 flex justify-center bg-slate-900/5 p-4 rounded-3xl border border-slate-200 overflow-hidden shadow-inner min-h-[600px]">
              <div
                className={`transition-all duration-300 h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-300 ${
                  viewport === "desktop" ? "w-full" : viewport === "tablet" ? "w-[768px]" : "w-[375px]"
                }`}
              >
                <iframe
                  key={previewKey}
                  src="/"
                  title="Shreyaan Physiotherapy Center Live Website Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BLOGS MANAGEMENT */}
        {activeTab === "blogs" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by article title..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-navy outline-none focus:border-teal"
                  />
                </div>
              </div>

              <button onClick={handleOpenCreateBlog} className="btn-primary text-xs py-2.5 px-5 shadow-md flex items-center gap-2">
                <Plus size={16} />
                <span>Create New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <div key={blog._id} className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-soft flex flex-col justify-between group hover:shadow-xl transition-all">
                  <div>
                    <div className="relative h-44 w-full bg-slate-100">
                      <Image src={blog.featuredImage || "/images/blog/default.jpg"} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-all duration-300" />
                      <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-black uppercase rounded-full bg-emerald-600 text-white shadow-md">
                        {blog.status}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-navy text-sm line-clamp-2">{blog.title}</h3>
                      <p className="text-slate-500 text-xs line-clamp-3 mt-2">{blog.excerpt || blog.content}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenEditBlog(blog)} className="p-2 rounded-xl bg-slate-100 text-navy hover:bg-teal hover:text-white transition-colors" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ isOpen: true, type: "blog", id: blog._id, title: blog.title })}
                        className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === "gallery" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex items-center justify-between">
              <h3 className="font-bold text-navy text-base">Gallery Images ({totalGallery})</h3>
              <button onClick={() => setIsGalleryModalOpen(true)} className="btn-primary text-xs py-2.5 px-5 shadow-md flex items-center gap-2">
                <Upload size={16} />
                <span>Upload Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item._id} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-soft">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-all" />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 text-white p-2">
                    <button onClick={() => setDeleteConfirm({ isOpen: true, type: "gallery", id: item._id, title: item.title })} className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DOCTOR PROFILE */}
        {activeTab === "profile" && (
          <div className="p-6 sm:p-8 max-w-3xl mx-auto space-y-6 w-full">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft space-y-6">
              <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
                <div className="h-20 w-20 rounded-2xl bg-teal/10 border-2 border-teal flex items-center justify-center text-teal font-extrabold text-2xl">
                  DS
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-navy">{user?.name || CLINIC_INFO.doctor.name}</h3>
                  <p className="text-sm font-bold text-teal mt-0.5">{CLINIC_INFO.doctor.qualification}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Reg No: {CLINIC_INFO.doctor.registrationNo} • Senior Consultant</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="block text-[10px] font-black uppercase text-teal">Experience</span>
                  <span className="text-sm font-bold text-navy mt-1 block">10+ Years Clinical Practice</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="block text-[10px] font-black uppercase text-teal">Clinic City</span>
                  <span className="text-sm font-bold text-navy mt-1 block">Unchahar, Raebareli (UP)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-[999] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="font-extrabold text-navy text-base">Confirm Delete</h3>
            <p className="text-xs text-slate-600 mt-2">Are you sure you want to delete &quot;{deleteConfirm.title}&quot;?</p>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button onClick={() => setDeleteConfirm({ isOpen: false, type: "blog", id: "", title: "" })} className="px-4 py-2 text-xs font-bold text-slate-600">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="btn-primary bg-rose-600 hover:bg-rose-700 text-xs py-2 px-4">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Create Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[999] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-navy text-lg">{editingBlog ? "Edit Article" : "Create Article"}</h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-navy p-1"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveBlog} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Title *</label>
                <input type="text" required value={blogFormData.title} onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Content *</label>
                <textarea required rows={4} value={blogFormData.content} onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal" />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Cancel</button>
                <button type="submit" disabled={blogSubmitting} className="btn-primary text-xs py-2.5 px-5 shadow-md">
                  {blogSubmitting ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Upload Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-[999] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-navy text-lg">Upload Photo</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-slate-400 hover:text-navy p-1"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveGallery} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo Title *</label>
                <input type="text" required value={galleryFormData.title} onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Select Photo File *</label>
                <input type="file" accept="image/*" onChange={(e) => setGalleryImageFile(e.target.files?.[0] || null)} className="w-full text-xs text-slate-600" />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsGalleryModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Cancel</button>
                <button type="submit" disabled={gallerySubmitting} className="btn-primary text-xs py-2.5 px-5 shadow-md">
                  {gallerySubmitting ? "Uploading..." : "Upload Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
