import { apiClient } from "./apiClient";

export interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  publicId?: string;
  createdAt: string;
}

export interface GalleryResponse {
  success: boolean;
  message?: string;
  count?: number;
  gallery?: GalleryItem[];
  galleryItem?: GalleryItem;
}

const TOKEN_KEY = "shreyaan_doctor_token";

const getToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY) || "";
  }
  return "";
};

export class GalleryService {
  static async getGallery(category?: string): Promise<GalleryResponse> {
    try {
      const params = category && category !== "All" ? { category } : undefined;
      return await apiClient<GalleryResponse>("/api/gallery", {
        method: "GET",
        params,
      });
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch gallery items",
        gallery: [],
      };
    }
  }

  static async uploadGalleryItem(itemData: FormData | Record<string, any>): Promise<GalleryResponse> {
    try {
      const isFormData = itemData instanceof FormData;
      return await apiClient<GalleryResponse>("/api/gallery", {
        method: "POST",
        token: getToken(),
        body: isFormData ? itemData : JSON.stringify(itemData),
      });
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to upload gallery image" };
    }
  }

  static async deleteGalleryItem(id: string): Promise<GalleryResponse> {
    try {
      return await apiClient<GalleryResponse>(`/api/gallery/${id}`, {
        method: "DELETE",
        token: getToken(),
      });
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to delete gallery image" };
    }
  }
}
