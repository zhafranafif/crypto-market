
const API_BASE_URL = "https://fe-technical-assignment.dxtr.asia/api/v1";

export interface ICountry {
    name: string;
    code: string;
    dial_code: string;
}

export async function getCountries(signal?: AbortSignal): Promise<ICountry[]> {
    const response = await fetch(`${API_BASE_URL}/countries`, {
        method: "GET",
        headers: headers(),
        signal
    });
    if (!response.ok) {
        throw new Error("Failed to fetch countries");
    }
    const data = await response.json();
    return data.data;
}

export function headers(){
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
}