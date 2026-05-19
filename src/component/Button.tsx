
interface ButtonProps {
    text: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    form?: string;
    className?: string;
}

export function Button({ text, disabled, type, form, className }: ButtonProps){
    return (
        <button 
            type={type} 
            form={form} 
            disabled={disabled}
            className={`bg-primary text-[#F2F4F7] text-base font-medium tracking-widest text-center p-4 rounded-md ${className || ""}`}
        >
            {text}
        </button>
    )
}