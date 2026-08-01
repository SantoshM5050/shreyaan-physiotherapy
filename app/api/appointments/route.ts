import { NextResponse } from "next/server";
import { AppointmentRequest } from "../../../types/appointment";

/**
 * Endpoint: POST /api/appointments
 * Next.js API Route handler for storing appointment requests.
 * Prepared for future MongoDB / Express / Email notification integration.
 */
export async function POST(request: Request) {
  try {
    const body: AppointmentRequest = await request.json();

    if (!body.patient?.name || !body.patient?.phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient name and phone number are required fields.",
        },
        { status: 400 }
      );
    }

    // Prepare future DB object payload
    const newAppointment: AppointmentRequest = {
      id: `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      patient: {
        name: body.patient.name,
        phone: body.patient.phone,
        email: body.patient.email || "",
      },
      serviceName: body.serviceName || "General Physiotherapy Consultation",
      preferredDate: body.preferredDate || new Date().toISOString().split("T")[0],
      preferredSlot: body.preferredSlot || "Morning (10 AM - 1 PM)",
      symptoms: body.symptoms || "",
      status: "pending",
      createdAt: new Date().toISOString(),
      source: "website",
    };

    // In a live MERN setup:
    // await connectToDatabase();
    // await AppointmentModel.create(newAppointment);
    // await sendEmailNotification(newAppointment);
    // await sendSMSNotification(newAppointment);

    return NextResponse.json({
      success: true,
      message: "Appointment request submitted successfully.",
      appointment: newAppointment,
    });
  } catch (error: any) {
    console.error("Error in /api/appointments:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process appointment request.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
