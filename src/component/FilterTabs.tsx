"use client";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FilterTabsProps, Tab } from "@/types/ui";
export default function FilterTabs({ tabs, activeTab }: FilterTabsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [active, setActive] = useState<Tab>(activeTab);

    const handleTabClick = (tab: Tab) => {
        setActive(tab);
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab.key);
        router.replace(`/dashboard?${params.toString().toLocaleLowerCase()}`);
    }

    return (
        <div className="max-w-full flex items-center">
        <div className="max-w-full flex items-center border-b border-[#CDD5E9]">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => handleTabClick(tab)}
                    className={`relative px-5 py-2 text-sm whitespace-normal transition-colors 
                    ${active.key === tab.key ? "font-semibold text-primary" : "text-[#6B7280]"}`}
                >
                    {tab.value}
                    {active.key === tab.key && (
                        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
                    )}
                </button>
            ))}
        </div>
        <ChevronRight />
        </div>
    )

}