import { CLINIC_INFO } from "../lib/constants";
import { AppointmentApiResponse, AppointmentRequest } from "../types/appointment";
import { apiClient } from "./apiClient";

export class AppointmentService {
  /**
   * Generates a WhatsApp deep link formatted with patient appointment details.
   */
  static generateWhatsAppUrl(appointment: AppointmentRequest): string {
    const { name, phone } = appointment.patient;
    const serviceName = appointment.serviceName || "General Consultation";
    const date = appointment.preferredDate || "Earliest available";
    const slot = appointment.preferredSlot || "As convenient";
    const symptoms = appointment.symptoms || "Not specified";

    const text = `🏥 *NEW APPOINTMENT REQUEST*
----------------------------------------
👤 *Patient Name:* ${name}
📞 *Phone:* ${phone}
🩺 *Service:* ${serviceName}
📅 *Preferred Date:* ${date}
⏰ *Preferred Time:* ${slot}
💬 *Symptoms/Notes:* ${symptoms}

Please confirm a suitable consultation time.`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${CLINIC_INFO.contact.whatsappPhone}?text=${encodedText}`;
  }

  /**
   * Submit appointment request.
   * If REST API is enabled (via env NEXT_PUBLIC_ENABLE_API_BOOKING), posts to backend API.
   * Always returns the WhatsApp URL for instant fallback / dual confirmation.
   */
  static async submitAppointment(
    appointment: AppointmentRequest
  ): Promise<AppointmentApiResponse> {
    const whatsappUrl = this.generateWhatsAppUrl(appointment);
    const apiBookingEnabled = process.env.NEXT_PUBLIC_ENABLE_API_BOOKING === "true";

    if (apiBookingEnabled) {
      try {
        const response = await apiClient<AppointmentApiResponse>("/api/appointments", {
          method: "POST",
          body: JSON.stringify(appointment),
        });

        return {
          ...response,
          whatsappUrl,
        };
      } catch (err: any) {
        console.warn("API booking submission failed, falling back to WhatsApp:", err.message);
        return {
          success: true,
          message: "Request processed. Confirming via WhatsApp...",
          appointment,
          whatsappUrl,
        };
      }
    }

    // Default flow: WhatsApp direct dispatch
    return {
      success: true,
      message: "Appointment request generated successfully.",
      appointment,
      whatsappUrl,
    };
  }
}
