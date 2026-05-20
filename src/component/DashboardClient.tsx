"use client";
import { useMemo, useState } from "react";
import CryptoList from "@/component/CryptoList";
import FilterTabs from "@/component/FilterTabs";
import SearchInput from "@/component/SearchInput";
import Avatar from "../../public/avatar.png";
import Image from "next/image";
import type { ICrypto } from "@/types/crypto";
import { useSearchParams } from "next/navigation";
import {
    convertIdrToUsdt,
    formatUsdt,
    normalizeChangePercent,
    parseIdrValue
} from "@/lib/crypto-format";
import type { DashboardClientProps } from "@/types/dashboard";

export default function DashboardClient({
    tabs
}: DashboardClientProps) {
    const searchParams = useSearchParams();
    const activeTabQuery = searchParams.get("tab") ?? tabs[0]?.key;
    const activeSearchQuery = searchParams.get("search") ?? "";
    const activeTab = useMemo(
        () => tabs.find((tab) => tab.key === activeTabQuery) || tabs[0],
        [activeTabQuery, tabs]
    );
    const [selectedCrypto, setSelectedCrypto] = useState<ICrypto | null>(null);
    const selectedPriceIdr = parseIdrValue(selectedCrypto?.price_idr);
    const selectedPriceUsdt = selectedPriceIdr ? convertIdrToUsdt(selectedPriceIdr) : null;
    const selectedChangePercent = normalizeChangePercent(selectedCrypto?.change_percent);

    return (
        <div className="w-full min-h-screen flex">
            <div className="w-max-[379px] h-screen flex flex-col bg-[#F5F7FC] p-4">
                <h1 className="text-2xl font-medium px-2">Markets</h1>
                <div className="p-2">
                    <SearchInput />
                </div>
                <FilterTabs tabs={tabs} activeTab={activeTab} />
                <CryptoList
                    searchQuery={activeSearchQuery}
                    tabQuery={activeTabQuery}
                    selectedId={selectedCrypto?.id}
                    onSelect={setSelectedCrypto}
                />
            </div>
            <div className="w-full flex flex-col pt-16 pl-4">
                <div className="flex text-[32px] font-bold gap-2 items-center border-b-2 border-[#CDD5E9] pb-4">
                    <Image src={Avatar} alt="User Avatar" width={40} height={40} />
                    <h1>John Johnson</h1>
                </div>

                <div className="flex flex-col gap-5 mt-3">
                    <h1 className="font-medium text-2xl">Welcome to Trading Dashboard</h1>
                    {selectedCrypto ? (
                        <div className="w-125 rounded-lg border border-[#CDD5E9] bg-white p-4">
                            <div className="flex items-center gap-3">
                                {selectedCrypto.image ? (
                                    <Image
                                        src={selectedCrypto.image}
                                        alt={selectedCrypto.symbol}
                                        width={48}
                                        height={48}
                                    />
                                ) : null}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl font-semibold">
                                            {selectedCrypto.symbol}/USDT
                                        </span>
                                        <div className={`text-sm font-medium p-1 rounded-sm flex flex-col ${
                                            selectedCrypto.isPositive ? "text-green-500" : "text-red-500"
                                        }`}>
                                        {selectedPriceUsdt !== null ? (
                                            <span className="text-lg font-semibold">
                                                {formatUsdt(selectedPriceUsdt)}
                                            </span>
                                        ) : null}
                                        {selectedChangePercent ? (
                                            <span
                                                className={`text-sm font-semibold ${
                                                    selectedCrypto.isPositive ? "text-green-600" : "text-red-600"
                                                }`}
                                            >
                                                {selectedChangePercent}
                                            </span>
                                        ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Select a crypto to see details.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
