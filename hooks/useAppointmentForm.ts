import { useState, FormEvent } from "react";
import { AppointmentRequest } from "../types/appointment";
import { AppointmentService } from "../services/appointmentService";

export function useAppointmentForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const patientName = (formData.get("name") as string)?.trim() || "";
    const patientPhone = (formData.get("phone") as string)?.trim() || "";
    const serviceName = (formData.get("concern") as string)?.trim() || "";
    const preferredDate = (formData.get("date") as string)?.trim() || "";
    const preferredSlot = (formData.get("slot") as string)?.trim() || "";
    const symptoms = (formData.get("message") as string)?.trim() || "";

    if (!patientName || !patientPhone) {
      setError("Please fill in your name and phone number.");
      setLoading(false);
      return;
    }

    const appointmentPayload: AppointmentRequest = {
      patient: {
        name: patientName,
        phone: patientPhone,
      },
      serviceName,
      preferredDate,
      preferredSlot,
      symptoms,
      source: "website",
    };

    try {
      const response = await AppointmentService.submitAppointment(appointmentPayload);

      if (response.whatsappUrl) {
        window.open(response.whatsappUrl, "_blank", "noopener,noreferrer");
      }

      setSent(true);
    } catch (err: any) {
      console.error("Appointment form error:", err);
      setError(err.message || "Failed to submit request. Please call clinic directly.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    sent,
    error,
    submitForm,
    resetForm,
  };
}
