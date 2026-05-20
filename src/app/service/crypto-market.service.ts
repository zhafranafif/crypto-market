import { API_BASE_URL } from "@/variables";
import type { ApiResponse } from "@/types/api";
import type { ILoginResponseData } from "@/types/auth";
import type { ICountry } from "@/types/country";
import type { ICrypto } from "@/types/crypto";

async function parseJsonResponse<T>(response: Response): Promise<T | string> {
    const responseText = await response.text();
    try {
        return JSON.parse(responseText) as T;
    } catch {
        return responseText;
    }
}

function throwApiError(status: number, body: unknown): never {
    throw { status, body };
}

export async function getCountries(signal?: AbortSignal): Promise<ApiResponse<ICountry[]>> {
    const response = await fetch(`${API_BASE_URL}/countries`, {
        method: "GET",
        headers: headers(),
        signal
    });
    if (!response.ok) {
        const errorBody = await parseJsonResponse<ApiResponse<unknown>>(response);
        throwApiError(response.status, errorBody);
    }
    const data = await parseJsonResponse<ApiResponse<ICountry[]>>(response);
    if (typeof data === "string") {
        throwApiError(response.status, data);
    }
    return data;
}

export async function loginWithEmail(email: string, password: string): Promise<ApiResponse<ILoginResponseData>> { 
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: headers(),
        credentials: "include",
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const errorBody = await parseJsonResponse<ApiResponse<unknown>>(response);
        throwApiError(response.status, errorBody);
    }
    const data = await parseJsonResponse<ApiResponse<ILoginResponseData>>(response);
    if (typeof data === "string") {
        throwApiError(response.status, data);
    }
    return data;
}

export async function loginWithPhoneNumber(phone: string, password: string): Promise<ApiResponse<ILoginResponseData>> {
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: headers(),
        credentials: "include",
        body: JSON.stringify({ phone, password })
    });
    if (!response.ok) {
        const errorBody = await parseJsonResponse<ApiResponse<unknown>>(response);
        throwApiError(response.status, errorBody);
    }
    const data = await parseJsonResponse<ApiResponse<ILoginResponseData>>(response);
    if (typeof data === "string") {
        throwApiError(response.status, data);
    }
    return data;
}

export async function OtpVerification(otp: string, phone: string): Promise<ApiResponse<{ [key: string]: unknown }>> {
    const response = await fetch('/api/auth/verify-otp', {
        method: "POST",
        headers: headers(),
        credentials: "include",
        body: JSON.stringify({ otp, phone })
    });
    if (!response.ok) {
        const errorBody = await parseJsonResponse<ApiResponse<unknown>>(response);
        throwApiError(response.status, errorBody);
    }
    const data = await parseJsonResponse<ApiResponse<{ [key: string]: unknown }>>(response);
    if (typeof data === "string") {
        throwApiError(response.status, data);
    }
    return data;
}

export async function getCryptocurrencies(signal?: AbortSignal): Promise<ApiResponse<ICrypto[]>> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const apiUrl = typeof window === "undefined" ? `${baseUrl}/api/list-crypto` : "/api/list-crypto";
    const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers(),
        credentials: "include",
        signal
    });
    if (!response.ok) {
        const errorBody = await parseJsonResponse<ApiResponse<unknown>>(response);
        throwApiError(response.status, errorBody);
    }
    const data = await parseJsonResponse<ApiResponse<ICrypto[]>>(response);
    if (typeof data === "string") {
        throwApiError(response.status, data);
    }
    return data;
}

export function headers(token?: string): HeadersInit {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    if (token) {
        headers["Authorization"] = `${token}`;
    }
    return {
        ...headers
    };
}