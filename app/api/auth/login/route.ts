import { NextResponse } from "next/server";
import { DataStore } from "../../../../lib/db/dataStore";
import { generateToken } from "../../../../lib/backend/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const doctor = DataStore.getDoctor();
    if (!doctor || doctor.email.toLowerCase() !== email.trim().toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const token = generateToken(doctor);

    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
      token,
      user: doctor,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication request failed.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
