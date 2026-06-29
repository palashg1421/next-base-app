import { NextRequest, NextResponse } from "next/server";

import { loginService } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await loginService(body);

    const response = NextResponse.json(result);
    response.cookies.set('access-token', result.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: "/",
      maxAge: 60 * 5,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Login failed",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
