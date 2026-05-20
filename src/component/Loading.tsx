interface LoadingProps {
    text?: string;
    type?: "primary" | "secondary";
}

export default function Loading({ text = "Loading ...", type = "primary" }: LoadingProps) {
    return (
        <div className="flex items-center gap-1.5 text-sm text-background mx-auto overflow-hidden">
            <span className={`h-5 w-5 animate-spin rounded-full border-2 ${type === "primary" ? "border-primary border-t-primary" : "border-[#F5F7FC] border-t-[#F5F7FC]"}`} />
            <span className={`text-base font-medium ${type === "primary" ? "text-primary" : "text-[#F5F7FC]" }`}>{text}</span>
        </div>
    );
}
