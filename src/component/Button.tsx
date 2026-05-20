import type { ButtonProps } from "@/types/ui";

export function Button({ text, disabled, type, form, className, onClick }: ButtonProps){
    return (
        <button 
            type={type} 
            form={form} 
            disabled={disabled} 
            className={`text-base font-medium tracking-widest text-center flex items-center justify-center gap-2 p-4 rounded-md ${disabled ? "bg-[#CDD5E9] hover: cursor-not-allowed" : "bg-primary text-[#F2F4F7] hover:cursor-pointer"} ${className || ""}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}