import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/variables";

export async function GET(){
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(`${API_BASE_URL}/list-crypto`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `${token}`
        },
    });
    const data = await response.json();

    if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch cryptocurrencies" }), { status: response.status });
    }

    return NextResponse.json(data);


}