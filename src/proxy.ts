import { NextRequest, NextResponse } from "next/server"
import { PUBLIC_ROUTES } from "@/variables";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const otpFlowVerification =
    request.cookies.get("otp_flow_verification")?.value;

  const otpVerified =
    request.cookies.get("otp_verified")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Not authenticated
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // OTP flow required
  if (
    token &&
    otpFlowVerification &&
    !otpVerified &&
    pathname !== "/otp-verification"
  ) {
    return NextResponse.redirect(
      new URL("/otp-verification", request.url)
    );
  }

  // Prevent accessing OTP page after verification
  if (
    token &&
    otpVerified &&
    pathname === "/otp-verification"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  // Prevent logged-in users from opening login page
  if (
    token &&
    otpVerified &&
    pathname === "/login"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  // Prevent direct OTP access without flow
  if (
    pathname === "/otp-verification" &&
    !otpFlowVerification
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/otp-verification",
  ],
};