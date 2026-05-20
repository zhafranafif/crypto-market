import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/variables";

export async function POST(request: Request) {
    const body = await request.json();


    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
       return NextResponse.json(data, { status: response.status });
    }

    const res = NextResponse.json(data);

    res.cookies.set("token", data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 1,
    });

    const otpFlowVerification = {
        phone: data.data.phone,
        email: data.data.email,
        otp: data.data.otp,
        otpExpiresAt: Date.now() + 60 * 2 * 1000,
    };

    res.cookies.set("otp_flow_verification", JSON.stringify(otpFlowVerification), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 2,
    });

    res.cookies.delete("otp_verified");

    return res;
}
