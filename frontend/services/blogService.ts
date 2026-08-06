import { apiClient } from "./apiClient";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  status: "published" | "draft";
  category: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BlogResponse {
  success: boolean;
  message?: string;
  count?: number;
  blogs?: BlogPost[];
  blog?: BlogPost;
}

const TOKEN_KEY = "shreyaan_doctor_token";

const getToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY) || "";
  }
  return "";
};

export class BlogService {
  static async getBlogs(params?: { status?: string; category?: string; search?: string }): Promise<BlogResponse> {
    try {
      return await apiClient<BlogResponse>("/api/blog", {
        method: "GET",
        params: params as Record<string, string>,
      });
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch blogs",
        blogs: [],
      };
    }
  }

  static async getBlogBySlug(slug: string): Promise<BlogResponse> {
    try {
      return await apiClient<BlogResponse>(`/api/blog/${slug}`, { method: "GET" });
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  static async createBlog(blogData: FormData | Record<string, any>): Promise<BlogResponse> {
    try {
      const isFormData = blogData instanceof FormData;
      return await apiClient<BlogResponse>("/api/blog", {
        method: "POST",
        token: getToken(),
        body: isFormData ? blogData : JSON.stringify(blogData),
      });
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to create blog" };
    }
  }

  static async updateBlog(id: string, blogData: FormData | Record<string, any>): Promise<BlogResponse> {
    try {
      const isFormData = blogData instanceof FormData;
      return await apiClient<BlogResponse>(`/api/blog/${id}`, {
        method: "PUT",
        token: getToken(),
        body: isFormData ? blogData : JSON.stringify(blogData),
      });
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to update blog" };
    }
  }

  static async deleteBlog(id: string): Promise<BlogResponse> {
    try {
      return await apiClient<BlogResponse>(`/api/blog/${id}`, {
        method: "DELETE",
        token: getToken(),
      });
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to delete blog" };
    }
  }
}
