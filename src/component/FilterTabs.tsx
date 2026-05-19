"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export type Tab = string;

export interface FilterTabsProps {
    tabs: Tab[];
    activeTab: Tab;
}


export default function FilterTabs({ tabs, activeTab }: FilterTabsProps) {
    const [active, setActive] = useState<Tab>(activeTab);

    const handleTabClick = (tab: Tab) => {
        setActive(tab);
    }

    return (
        <div className="max-w-full flex items-center">
        <div className="max-w-full flex items-center border-b border-[#CDD5E9]">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`relative px-5 py-2 text-sm whitespace-normal transition-colors 
                    ${active === tab ? "font-semibold text-primary" : "text-[#6B7280]"}`}
                >
                    {tab}
                    {active === tab && (
                        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
                    )}
                </button>
            ))}
        </div>
        <ChevronRight />
        </div>
    )

}