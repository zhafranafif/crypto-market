
import { Eye, EyeClosed } from "lucide-react";
import type { InputProps } from "@/types/ui";

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
    error,
    ...rest
}: InputProps) {
    const inputErrorId = error ? `${id}-error` : undefined;
    return (
        <label htmlFor={id} className="flex flex-col text-sm font-medium">
            <span className="flex justify-between text-base font-medium tracking-wide">
            {label}
            {switchText ? (
                <span
                    className="text-primary text-base font-normal hover:cursor-pointer"
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
                    className={`block w-full rounded-md border p-3 pr-14 text-base focus:outline-none placeholder:text-base ${error ? "border-red-500" : "border-[#CDD5E9]"} ${className || ""}`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={inputErrorId}
                    {...rest}
                />
                {toggleVisibility && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-2 my-auto h-8 rounded-md px-3 text-sm font-medium text-slate-500 hover:text-slate-700 hover:cursor-pointer"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                    >
                        {isVisible ? <Eye /> : <EyeClosed />}
                    </button>
                )}
            </span>
            {error ? (
                <p id={inputErrorId} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            ) : null}
        </label>
    )
}