"use client";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentSearch, setCurrentSearch] = useState(() => searchParams.get("search") || "");
    const debouncedSearch = useDebounce(currentSearch, 500);
    const isTyping = currentSearch !== debouncedSearch;

    useEffect(() => {
        const currentParam = searchParams.get("search") ?? "";

        if (debouncedSearch === currentParam) return;

        const params = new URLSearchParams(searchParams.toString());
        
        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }

        const queryString = params.toString();
        router.replace(`/dashboard?${queryString}`);
    }, [debouncedSearch, router, searchParams]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSearch(e.target.value);
    };

    return (
        <div className="relative w-full">
            <input 
            type="text"
            placeholder="Search"
            className="w-full bg-background p-3 rounded-sm border border-[#CDD5E9] focus:outline-none placeholder:tracking-wide placeholder:text-base"
            onChange={handleSearchChange}
            value={currentSearch}
            />
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {isTyping ? (
                   <span className={`h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-primary`} />
                ) : (
                    <Search className="text-[#6B7280]" />
                )}
            </div>
        </div>
    )
}