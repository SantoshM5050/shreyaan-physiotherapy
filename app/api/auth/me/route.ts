import { NextResponse } from "next/server";
import { authenticateDoctorRequest } from "../../../../lib/backend/auth";

export async function GET(request: Request) {
  try {
    const doctor = authenticateDoctorRequest(request);

    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Invalid or expired access token.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: doctor,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify authentication session.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
