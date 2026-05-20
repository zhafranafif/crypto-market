import { NextRequest, NextResponse } from "next/server"
import { PUBLIC_ROUTES } from "@/variables";

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    const token = request.cookies.get("token")?.value;
    const otpFlowVerification = request.cookies.get("otp_flow_verification")?.value;
    const otpVerified = request.cookies.get("otp_verified")?.value;
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if(pathname === "/otp-verification" && !otpFlowVerification) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && !otpFlowVerification && !otpVerified && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && otpFlowVerification && pathname !== "/otp-verification") {
        return NextResponse.redirect(new URL("/otp-verification", request.url));
    }

    if (token && otpVerified && pathname === "/otp-verification") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/login", "/otp-verification"]
}