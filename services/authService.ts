import { apiClient } from "./apiClient";

export interface DoctorUser {
  id: string;
  name: string;
  email: string;
  role: "doctor" | "admin";
  qualification: string;
  registrationNo: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: DoctorUser;
}

const AUTH_KEY = "shreyaan_doctor_auth";
const TOKEN_KEY = "shreyaan_doctor_token";
const LAST_LOGIN_KEY = "shreyaan_doctor_last_login";

export class AuthService {
  /**
   * Authenticate doctor with credentials via Backend REST API.
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    const trimmedEmail = email.trim().toLowerCase();

    try {
      const response = await apiClient<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      if (response.success && response.token && response.user) {
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_KEY, JSON.stringify(response.user));
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(LAST_LOGIN_KEY, new Date().toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }));
        }
      }

      return response;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Invalid email or password",
      };
    }
  }

  /**
   * Logout doctor by clearing local session.
   */
  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  /**
   * Check if doctor is currently authenticated.
   */
  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(AUTH_KEY);
    return Boolean(token && userStr);
  }

  /**
   * Get current authenticated doctor details.
   */
  static getCurrentUser(): DoctorUser | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(AUTH_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as DoctorUser;
    } catch {
      return null;
    }
  }

  /**
   * Get last login timestamp recorded.
   */
  static getLastLogin(): string {
    if (typeof window === "undefined") return "Active Session";
    return localStorage.getItem(LAST_LOGIN_KEY) || "Active Session";
  }
}
