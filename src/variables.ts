import type { LoginMethod } from "@/types/forms";
import type { Tab } from "@/types/ui";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const IDR_TO_USDT = 0.000057;
export const PUBLIC_ROUTES = ["/login", "/otp-verification"];
export const DEFAULT_LOGIN_METHOD: LoginMethod = "Email";
export const TABS: Tab[] = [
    {
        value: "All",
        key: "all"
    },
    {
        value: "Cryptocurrency",
        key: "cryptocurrency"
    },
    {
        value: "Favorites",
        key: "favorites"
    }
];
