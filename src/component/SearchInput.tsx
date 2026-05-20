"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import Loading from "./Loading";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        if (newSearch) {
            params.set("search", newSearch);
        } else {
            params.delete("search");
        }
        const queryString = params.toString();
        startTransition(() => {
            router.replace(`/dashboard?${queryString}`);
        });
    };

    return (
        <div className="relative w-full">
            <input 
            type="text"
            placeholder="Search"
            className="w-full bg-background p-3 rounded-sm border border-[#CDD5E9] focus:outline-none placeholder:tracking-wide placeholder:text-base"
            onChange={handleSearchChange}
            />
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {isPending ? (
                   <Loading type="primary" text="Please wait..."/>
                ) : (
                    <Search className="text-[#6B7280]" />
                )}
            </div>
        </div>
    )
}