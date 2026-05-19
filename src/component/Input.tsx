
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
    id: string;
    placeholder?: string;
    className?: string;
    onChangeLoginMethod?: () => void;
    switchText?: string;
    toggleVisibility?: () => void;
    isVisible?: boolean;
}

export function Input({
    label,
    type,
    id,
    placeholder,
    className,
    onChangeLoginMethod,
    switchText,
    toggleVisibility,
    isVisible,
    ...rest
}: InputProps) {
    return (
        <label htmlFor={id} className="flex flex-col text-sm font-medium">
            <span className="flex justify-between text-base font-medium">
            {label}
            {switchText ? (
                <span
                    className="text-primary text-base font-medium hover:cursor-pointer"
                    onClick={onChangeLoginMethod}
                >
                    Sign In with {switchText}
                </span>
            ) : null}
            </span>
            <span className="relative mt-1 block">
                <input
                    type={isVisible ? "text" : type}
                    id={id}
                    placeholder={placeholder}
                    className={`block w-full border border-[#CDD5E9] rounded-md p-3 pr-14 text-base focus:outline-none placeholder:text-base ${className || ""}`}
                    {...rest}
                />
                {toggleVisibility && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-2 my-auto h-8 rounded-md px-3 text-sm font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                    >
                        {isVisible ? "Hide" : "Show"}
                    </button>
                )}
            </span>
        </label>
    )
}