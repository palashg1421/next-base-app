import { NextResponse } from "next/server";
import { logoutService } from "@/services/auth.service";

export async function POST() {
  try {
    const result = await logoutService();

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Logout failed",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}