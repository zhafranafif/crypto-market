import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/variables";


export async function POST(request: Request) {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
       return NextResponse.json(data, { status: response.status });
    }

    const res = NextResponse.json(data);

    res.cookies.delete("otp_flow_verification");
    res.cookies.set("otp_verified", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60
    });

    return res;
}
