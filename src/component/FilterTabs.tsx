"use client";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import type { FilterTabsProps, Tab } from "@/types/ui";
export default function FilterTabs({ tabs, activeTab }: FilterTabsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const handleTabClick = (tab: Tab) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab.key);
        router.replace(`/dashboard?${params.toString()}`);
    }

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        if (event.deltaY === 0) return;
        event.preventDefault();
        scroller.scrollLeft += event.deltaY;
    };

    const scrollRight = () => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        scroller.scrollBy({ left: 140, behavior: "smooth" });
    };

    return (
        <div className="max-w-full flex items-center">
        <div
            ref={scrollerRef}
            onWheel={handleWheel}
            className="max-w-72.5 flex items-center border-b border-[#CDD5E9] overflow-x-auto overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden"
        >
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => handleTabClick(tab)}
                    className={`relative px-5 py-2 text-sm whitespace-nowrap transition-colors 
                    ${activeTab.key === tab.key ? "font-semibold text-primary" : "text-[#6B7280]"}`}
                >
                    {tab.value}
                    {activeTab.key === tab.key && (
                        <span className="absolute left-0 right-0 -bottom-px h-0.75 bg-primary rounded-full" />
                    )}
                </button>
            ))}
        </div>
        <button
            type="button"
            onClick={scrollRight}
            className="ml-1 p-1 text-[#6B7280]"
            aria-label="Scroll tabs right"
        >
            <ChevronRight />
        </button>
        </div>
    )

}