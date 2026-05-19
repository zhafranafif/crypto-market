import { Search } from "lucide-react";

export default function SearchInput() {
    return (
        <div className="relative w-full">
            <input 
            type="text"
            placeholder="Search"
            className="w-full bg-background p-3 rounded-sm border border-[#CDD5E9] focus:outline-none placeholder:font-medium placeholder:tracking-wide placeholder:text-base"
            />
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search width={24} height={24} />
            </div>
        </div>
    )
}