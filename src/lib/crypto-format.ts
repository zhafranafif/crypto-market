import { IDR_TO_USDT } from "@/variables";

export const parseIdrValue = (value?: string) => {
    if (!value) return null;
    const numeric = value
        .replace(/IDR/i, "")
        .replace(/\./g, "")
        .replace(/,/g, ".")
        .replace(/[^0-9.]/g, "");
    const parsed = Number(numeric);
    return Number.isFinite(parsed) ? parsed : null;
};

export const formatUsdt = (value: number) =>
    value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

export const normalizeChangePercent = (value?: string) => {
    if (!value) return "";
    return value.replace(",", ".");
};

export const convertIdrToUsdt = (valueIdr: number) => valueIdr * IDR_TO_USDT;
