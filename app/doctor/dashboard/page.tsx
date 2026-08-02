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
  Tag,
  Lock,
} from "lucide-react";
import { AuthService, DoctorUser } from "../../../services/authService";
import { BlogService, BlogPost } from "../../../services/blogService";
import { GalleryService, GalleryItem } from "../../../services/galleryService";
import { CLINIC_INFO } from "../../../lib/constants";

type TabType = "overview" | "blogs" | "gallery" | "profile";

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
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>("all");

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
    seoTitle: "",
    seoDescription: "",
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

  // Gallery Preview Lightbox State
  const [previewGalleryItem, setPreviewGalleryItem] = useState<GalleryItem | null>(null);

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: "blog" | "gallery";
    id: string;
    title: string;
  }>({ isOpen: false, type: "blog", id: "", title: "" });
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // 2. Fetch Blog Data from REST API
  const fetchBlogs = useCallback(async () => {
    setBlogsLoading(true);
    const response = await BlogService.getBlogs();
    if (response.success && response.blogs) {
      setBlogs(response.blogs);
    } else {
      addToast(response.message || "Failed to load blogs from backend API.", "error");
    }
    setBlogsLoading(false);
  }, []);

  // 3. Fetch Gallery Data from REST API
  const fetchGallery = useCallback(async () => {
    setGalleryLoading(true);
    const response = await GalleryService.getGallery();
    if (response.success && response.gallery) {
      setGallery(response.gallery);
    } else {
      addToast(response.message || "Failed to load gallery items from backend API.", "error");
    }
    setGalleryLoading(false);
  }, []);

  // Initial Data Load
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

  // Blog CRUD Handlers
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
      seoTitle: "",
      seoDescription: "",
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
      seoTitle: blog.seoTitle || "",
      seoDescription: blog.seoDescription || "",
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
      formData.append("tags", blogFormData.tags);
      formData.append("status", blogFormData.status);
      formData.append("seoTitle", blogFormData.seoTitle || blogFormData.title);
      formData.append("seoDescription", blogFormData.seoDescription || blogFormData.excerpt);
      formData.append("featuredImage", blogImageFile);
      payload = formData;
    } else {
      payload = {
        title: blogFormData.title,
        excerpt: blogFormData.excerpt || blogFormData.title,
        content: blogFormData.content,
        category: blogFormData.category,
        tags: blogFormData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: blogFormData.status,
        featuredImage: blogFormData.featuredImage || "/images/blog/default.jpg",
        seoTitle: blogFormData.seoTitle || blogFormData.title,
        seoDescription: blogFormData.seoDescription || blogFormData.excerpt,
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
      addToast(editingBlog ? "Blog article updated successfully!" : "New blog article created successfully!");
      setIsBlogModalOpen(false);
      fetchBlogs();
    } else {
      addToast(response.message || "Failed to save blog post.", "error");
    }
  };

  // Gallery CRUD Handlers
  const handleOpenUploadGallery = () => {
    setGalleryFormData({
      title: "",
      category: "Clinic",
      imageUrl: "",
    });
    setGalleryImageFile(null);
    setIsGalleryModalOpen(true);
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFormData.title.trim()) {
      addToast("Please provide a title for the image.", "error");
      return;
    }

    if (!galleryImageFile && !galleryFormData.imageUrl.trim()) {
      addToast("Please select an image file or provide an Image URL.", "error");
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
      addToast("Gallery image uploaded successfully!");
      setIsGalleryModalOpen(false);
      fetchGallery();
    } else {
      addToast(response.message || "Failed to upload gallery image.", "error");
    }
  };

  // Delete Action Dispatcher
  const handleConfirmDelete = async () => {
    if (!deleteConfirm.id) return;
    setDeleteLoading(true);

    if (deleteConfirm.type === "blog") {
      const res = await BlogService.deleteBlog(deleteConfirm.id);
      setDeleteLoading(false);
      setDeleteConfirm({ isOpen: false, type: "blog", id: "", title: "" });
      if (res.success) {
        addToast("Blog deleted successfully.");
        fetchBlogs();
      } else {
        addToast(res.message || "Failed to delete blog.", "error");
      }
    } else {
      const res = await GalleryService.deleteGalleryItem(deleteConfirm.id);
      setDeleteLoading(false);
      setDeleteConfirm({ isOpen: false, type: "gallery", id: "", title: "" });
      if (res.success) {
        addToast("Gallery image deleted successfully.");
        fetchGallery();
      } else {
        addToast(res.message || "Failed to delete gallery image.", "error");
      }
    }
  };

  // Calculated Dashboard Stats
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const draftBlogs = blogs.filter((b) => b.status === "draft").length;
  const totalGallery = gallery.length;

  // Filtered Blogs List
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(blogSearch.toLowerCase());
    const matchesStatus = blogStatusFilter === "all" || blog.status === blogStatusFilter;
    const matchesCategory = blogCategoryFilter === "all" || blog.category === blogCategoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Filtered Gallery List
  const filteredGallery = gallery.filter((item) => {
    if (galleryCategoryFilter === "All") return true;
    return item.category.toLowerCase() === galleryCategoryFilter.toLowerCase();
  });

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-teal">Verifying Doctor CMS Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#12374b]">
      {/* Toast Notifications Overlay */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold text-white transition-all animate-bounce ${
              toast.type === "success" ? "bg-emerald-600 border-emerald-500" : "bg-rose-600 border-rose-500"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Modern CMS Top Navigation */}
      <header className="sticky top-0 z-40 bg-navy text-white shadow-lg border-b border-navy/30">
        <div className="section flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-white font-bold shadow-md">
              <HeartPulse size={22} />
            </span>
            <div>
              <h1 className="text-sm font-extrabold tracking-wider leading-tight">
                SHREYAAN <span className="text-teal font-medium">PHYSIOTHERAPY</span>
              </h1>
              <p className="text-[11px] text-slate-300">Doctor Portal • Clinic CMS</p>
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
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-rose-600 hover:border-rose-600 transition-all shadow-sm"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Layout */}
      <main className="flex-grow section py-8">
        {/* Welcome CMS Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy via-[#073B5C] to-[#0a4e7a] p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal/20 px-3.5 py-1 text-xs font-extrabold text-teal border border-teal/30 mb-3">
              <ShieldCheck size={14} />
              <span>Clinic Content Management System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Welcome, {user?.name || CLINIC_INFO.doctor.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Reg No: {user?.registrationNo || CLINIC_INFO.doctor.registrationNo} • Manage health articles, published media, and clinic gallery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenCreateBlog}
              className="btn-primary text-xs py-2.5 px-4 shadow-md flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Create Article</span>
            </button>
            <button
              onClick={handleOpenUploadGallery}
              className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold px-4 py-2.5 transition-all flex items-center gap-2"
            >
              <Upload size={16} />
              <span>Upload Media</span>
            </button>
          </div>
        </div>

        {/* CMS Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === "blogs"
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FileText size={15} />
            <span>Blog Management</span>
            <span className="ml-1 rounded-full bg-teal/20 text-teal px-2 py-0.5 text-[10px] font-black">
              {totalBlogs}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === "gallery"
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <ImageIcon size={15} />
            <span>Gallery Management</span>
            <span className="ml-1 rounded-full bg-teal/20 text-teal px-2 py-0.5 text-[10px] font-black">
              {totalGallery}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === "profile"
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <User size={15} />
            <span>Doctor Profile</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 5 Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Total Blogs</p>
                  <p className="text-3xl font-black text-navy mt-1">{totalBlogs}</p>
                  <p className="text-[11px] text-teal font-medium mt-1">Health & Rehab Articles</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal">
                  <FileText size={24} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Published</p>
                  <p className="text-3xl font-black text-emerald-600 mt-1">{publishedBlogs}</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">Live on Website</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Globe size={24} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Drafts</p>
                  <p className="text-3xl font-black text-amber-600 mt-1">{draftBlogs}</p>
                  <p className="text-[11px] text-amber-600 font-medium mt-1">In Preparation</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Clock size={24} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Gallery Media</p>
                  <p className="text-3xl font-black text-navy mt-1">{totalGallery}</p>
                  <p className="text-[11px] text-teal font-medium mt-1">Uploaded Images</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-navy/10 flex items-center justify-center text-navy">
                  <ImageIcon size={24} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft flex items-center justify-between col-span-1 sm:col-span-2 lg:col-span-1">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Last Login</p>
                  <p className="text-xs font-black text-navy mt-2 leading-tight">{lastLogin}</p>
                  <p className="text-[11px] text-teal font-medium mt-1">Authenticated Doctor</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Blog Activity */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy text-base flex items-center gap-2">
                    <FileText size={18} className="text-teal" />
                    Recent Articles
                  </h3>
                  <button
                    onClick={() => setActiveTab("blogs")}
                    className="text-xs font-bold text-teal hover:underline"
                  >
                    View All ({totalBlogs}) →
                  </button>
                </div>

                {blogsLoading ? (
                  <div className="py-8 text-center text-slate-400 text-xs animate-pulse">Loading recent blogs...</div>
                ) : blogs.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">No blogs published yet.</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {blogs.slice(0, 4).map((blog) => (
                      <div key={blog._id} className="py-3 flex items-center justify-between gap-4">
                        <div className="truncate">
                          <p className="font-bold text-navy text-xs truncate">{blog.title}</p>
                          <p className="text-[11px] text-slate-400">{blog.category} • {new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-full shrink-0 ${
                            blog.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Gallery Activity */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy text-base flex items-center gap-2">
                    <ImageIcon size={18} className="text-teal" />
                    Recent Gallery Uploads
                  </h3>
                  <button
                    onClick={() => setActiveTab("gallery")}
                    className="text-xs font-bold text-teal hover:underline"
                  >
                    View All ({totalGallery}) →
                  </button>
                </div>

                {galleryLoading ? (
                  <div className="py-8 text-center text-slate-400 text-xs animate-pulse">Loading gallery images...</div>
                ) : gallery.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">No gallery images uploaded yet.</div>
                ) : (
                  <div className="grid grid-cols-4 gap-3">
                    {gallery.slice(0, 4).map((item) => (
                      <div
                        key={item._id}
                        onClick={() => setPreviewGalleryItem(item)}
                        className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-all"
                        />
                        <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
                          <Eye size={18} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG MANAGEMENT */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            {/* Action Bar & Controls */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
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

                <div className="flex items-center gap-2">
                  <Filter size={15} className="text-slate-400" />
                  <select
                    value={blogStatusFilter}
                    onChange={(e) => setBlogStatusFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-navy outline-none focus:border-teal"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleOpenCreateBlog}
                className="btn-primary text-xs py-2.5 px-5 shadow-md flex items-center gap-2 w-full md:w-auto justify-center"
              >
                <Plus size={16} />
                <span>Create New Blog Post</span>
              </button>
            </div>

            {/* Blogs List / Grid */}
            {blogsLoading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
                <div className="h-8 w-8 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs font-bold">Fetching blogs from REST API...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
                <FileText size={40} className="mx-auto text-teal mb-3" />
                <h4 className="font-bold text-navy text-base">No Blog Posts Found</h4>
                <p className="text-xs max-w-sm mx-auto mt-1">
                  {blogSearch || blogStatusFilter !== "all"
                    ? "No blogs match your filter criteria."
                    : "Create your first health blog post to inform patients on spine health and recovery."}
                </p>
                <button
                  onClick={handleOpenCreateBlog}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-teal/90"
                >
                  <Plus size={14} />
                  <span>Create Blog Now</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-soft flex flex-col justify-between group hover:shadow-xl transition-all"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-100">
                        <Image
                          src={blog.featuredImage || "/images/blog/default.jpg"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-300"
                        />
                        <span
                          className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-black uppercase rounded-full shadow-md ${
                            blog.status === "published"
                              ? "bg-emerald-600 text-white"
                              : "bg-amber-500 text-white"
                          }`}
                        >
                          {blog.status}
                        </span>
                        <span className="absolute bottom-3 left-3 px-2.5 py-0.5 text-[10px] font-bold bg-navy/80 backdrop-blur-md text-white rounded-full">
                          {blog.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-navy text-sm line-clamp-2 leading-snug">{blog.title}</h3>
                        <p className="text-slate-500 text-xs line-clamp-3 mt-2 leading-relaxed">
                          {blog.excerpt || blog.content.replace(/<[^>]*>?/gm, "")}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditBlog(blog)}
                          className="p-2 rounded-xl bg-slate-100 text-navy hover:bg-teal hover:text-white transition-colors"
                          title="Edit Blog"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              type: "blog",
                              id: blog._id,
                              title: blog.title,
                            })
                          }
                          className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete Blog"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GALLERY MANAGEMENT */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            {/* Category Filters & Upload Button */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {["All", "Clinic", "Equipment", "Treatment", "Rehab"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategoryFilter(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      galleryCategoryFilter === cat
                        ? "bg-navy text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={handleOpenUploadGallery}
                className="btn-primary text-xs py-2.5 px-5 shadow-md flex items-center gap-2 w-full md:w-auto justify-center"
              >
                <Upload size={16} />
                <span>Upload Clinic Image</span>
              </button>
            </div>

            {/* Gallery Grid */}
            {galleryLoading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
                <div className="h-8 w-8 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs font-bold">Fetching gallery images from REST API...</p>
              </div>
            ) : filteredGallery.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
                <ImageIcon size={40} className="mx-auto text-teal mb-3" />
                <h4 className="font-bold text-navy text-base">No Gallery Media Found</h4>
                <p className="text-xs max-w-sm mx-auto mt-1">
                  Upload images of your clinic equipment, consultation rooms, and treatment sessions.
                </p>
                <button
                  onClick={handleOpenUploadGallery}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-teal/90"
                >
                  <Upload size={14} />
                  <span>Upload Image Now</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGallery.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-soft group hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold bg-navy/80 backdrop-blur-md text-white rounded-full">
                        {item.category}
                      </span>

                      <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 text-white">
                        <button
                          onClick={() => setPreviewGalleryItem(item)}
                          className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all"
                          title="Preview Image"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              type: "gallery",
                              id: item._id,
                              title: item.title,
                            })
                          }
                          className="p-3 rounded-full bg-rose-600/80 hover:bg-rose-600 backdrop-blur-md transition-all"
                          title="Delete Image"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-navy text-xs truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DOCTOR PROFILE */}
        {activeTab === "profile" && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Profile Info Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                <div className="h-24 w-24 rounded-3xl bg-navy text-teal font-black text-3xl flex items-center justify-center shadow-lg shrink-0">
                  <User size={48} />
                </div>
                <div className="text-center sm:text-left">
                  <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-[11px] font-black uppercase text-teal mb-2">
                    Verified Doctor Account
                  </span>
                  <h3 className="text-2xl font-black text-navy">{user?.name || CLINIC_INFO.doctor.name}</h3>
                  <p className="text-xs text-teal font-bold">{user?.qualification || CLINIC_INFO.doctor.qualification}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-slate-400">Medical Registration Number</p>
                  <p className="text-sm font-bold text-navy mt-1">
                    {user?.registrationNo || CLINIC_INFO.doctor.registrationNo}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-slate-400">Email Address</p>
                  <p className="text-sm font-bold text-navy mt-1">
                    {user?.email || "doctor@shreyaanphysiotherapycenter.in"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-slate-400">Account Role</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1 uppercase">
                    {user?.role || "Doctor Admin"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-slate-400">Clinic Name</p>
                  <p className="text-sm font-bold text-navy mt-1">Shreyaan Physiotherapy Center</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition-all"
                >
                  <LogOut size={16} />
                  <span>Logout from Session</span>
                </button>
              </div>
            </div>

            {/* Change Password Card - Coming Soon */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-navy">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-base">Change Password</h4>
                    <p className="text-xs text-slate-400">Manage portal password and credentials</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-100 text-amber-800 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                Password update functionality will be integrated with doctor profile API settings in an upcoming portal update.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: CREATE / EDIT BLOG */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-navy flex items-center gap-2">
                <FileText size={20} className="text-teal" />
                {editingBlog ? "Edit Blog Article" : "Create New Blog Post"}
              </h3>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Exercises for Lower Back Pain Relief"
                  value={blogFormData.title}
                  onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy mb-1">Category</label>
                  <select
                    value={blogFormData.category}
                    onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium"
                  >
                    <option value="Spine & Back Rehab">Spine & Back Rehab</option>
                    <option value="Ergonomics">Ergonomics</option>
                    <option value="Sports Injury">Sports Injury</option>
                    <option value="Joint Care">Joint Care</option>
                    <option value="General Health">General Health</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Publication Status</label>
                  <select
                    value={blogFormData.status}
                    onChange={(e) =>
                      setBlogFormData({ ...blogFormData, status: e.target.value as "published" | "draft" })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  placeholder="Brief 1-2 sentence overview for blog catalog preview..."
                  value={blogFormData.excerpt}
                  onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Full Article Content *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write clinical advice, rehabilitation steps, or medical insights here..."
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium"
                />
              </div>

              {/* Featured Image Selection */}
              <div className="space-y-2">
                <label className="block font-bold text-navy">Featured Image</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Option 1: Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setBlogImageFile(e.target.files[0]);
                        }
                      }}
                      className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal/10 file:text-teal"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Option 2: Image URL</span>
                    <input
                      type="text"
                      placeholder="/images/blog/back-pain.jpg"
                      value={blogFormData.featuredImage}
                      onChange={(e) => setBlogFormData({ ...blogFormData, featuredImage: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-navy outline-none focus:border-teal"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Back Pain, Physiotherapy, Rehab"
                  value={blogFormData.tags}
                  onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={blogSubmitting}
                  className="btn-primary py-2.5 px-6 rounded-full text-xs shadow-md flex items-center gap-2"
                >
                  {blogSubmitting ? (
                    <span>Saving...</span>
                  ) : (
                    <span>{editingBlog ? "Update Article" : "Publish Article"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPLOAD GALLERY IMAGE */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-navy flex items-center gap-2">
                <Upload size={20} className="text-teal" />
                Upload Clinic Image
              </h3>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Consultation Area & Electrotherapy Unit"
                  value={galleryFormData.title}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Category</label>
                <select
                  value={galleryFormData.category}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy outline-none focus:border-teal font-medium"
                >
                  <option value="Clinic">Clinic Interior</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Treatment">Treatment Session</option>
                  <option value="Rehab">Rehabilitation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-navy">Select Image Source</label>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Option 1: Upload Local Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setGalleryImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal/10 file:text-teal"
                  />
                </div>
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block mb-1">Option 2: Image URL</span>
                  <input
                    type="text"
                    placeholder="/images/gallery/clinic-1.jpg"
                    value={galleryFormData.imageUrl}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, imageUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-navy outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={gallerySubmitting}
                  className="btn-primary py-2.5 px-6 rounded-full text-xs shadow-md flex items-center gap-2"
                >
                  {gallerySubmitting ? <span>Uploading...</span> : <span>Upload Media</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: GALLERY PREVIEW LIGHTBOX */}
      {previewGalleryItem && (
        <div className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setPreviewGalleryItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-all"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={previewGalleryItem.imageUrl}
                alt={previewGalleryItem.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal">
                  {previewGalleryItem.category}
                </span>
                <h3 className="font-bold text-base mt-0.5">{previewGalleryItem.title}</h3>
              </div>
              <span className="text-xs text-slate-400">
                {new Date(previewGalleryItem.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DELETE CONFIRMATION DIALOG */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={28} />
            </div>
            <div>
              <h4 className="font-black text-navy text-lg">Confirm Delete</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete <span className="font-bold text-navy">&quot;{deleteConfirm.title}&quot;</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm({ isOpen: false, type: "blog", id: "", title: "" })}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                className="px-5 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs shadow-md hover:bg-rose-700 transition-all"
              >
                {deleteLoading ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
