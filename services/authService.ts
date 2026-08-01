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

const DEMO_CREDENTIALS = {
  email: "doctor@shreyaanphysiotherapycenter.in",
  password: "DrSonam@2026",
};

export class AuthService {
  /**
   * Authenticate doctor with credentials.
   * Currently uses validated demo credentials, prepared for JWT REST API swap.
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    const trimmedEmail = email.trim().toLowerCase();

    // Check against demo credentials
    if (
      trimmedEmail === DEMO_CREDENTIALS.email.toLowerCase() &&
      password === DEMO_CREDENTIALS.password
    ) {
      const user: DoctorUser = {
        id: "DOC-10534",
        name: "Dr. Sonam Maurya",
        email: DEMO_CREDENTIALS.email,
        role: "doctor",
        qualification: "BPTh (Mumbai University)",
        registrationNo: "10534",
      };

      const token = `mock-jwt-token-${Date.now()}`;

      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
      }

      return {
        success: true,
        message: "Login successful",
        token,
        user,
      };
    }

    // Return invalid credentials error
    return {
      success: false,
      message: "Invalid email or password",
    };
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
}
