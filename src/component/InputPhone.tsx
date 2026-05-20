"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import imageLoader from "@/app/image/loader";
import type { InputPhoneProps } from "@/types/forms";

export default function InputPhone({
    countries,
    selectedCountry,
    setSelectedCountry,
    onClickLoginWithEmail,
    register,
    errors
}: InputPhoneProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
                <label htmlFor="phone" className="flex flex-col text-sm font-medium">
                    <span className="flex justify-between text-base font-medium tracking-wides">
                        Mobile Number
                        <span
                            className="text-primary text-base font-normal hover:cursor-pointer"
                            onClick={onClickLoginWithEmail}
                        >
                            Sign In with Email
                        </span>
                    </span>
                    <span className={`mt-1 flex rounded-md border ${errors.phone?.message ? "border-red-500" : "border-[#CDD5E9]"}`}>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-3 text-base focus:outline-none"
                                onClick={() => setIsOpen((prev) => !prev)}
                                aria-haspopup="listbox"
                                aria-expanded={isOpen}
                                aria-label="Country dial code"
                                disabled={countries.length === 0}
                            >
                                {selectedCountry ? (
                                    <Image
                                        loader={imageLoader}
                                        src={selectedCountry.code.toLowerCase()}
                                        alt={selectedCountry.name}
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <span className="h-5 w-5 rounded-full bg-gray-200" />
                                )}
                                <span>{selectedCountry?.dial_code ?? "Country"}</span>
                            </button>
                            {isOpen ? (
                                <div
                                    role="listbox"
                                    className="absolute left-0 top-full z-20 mt-1 max-h-48 w-20 overflow-auto rounded-md border border-[#CDD5E9] bg-white shadow [&::-webkit-scrollbar]:hidden"
                                >
                                    {countries.map((country) => (
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={selectedCountry?.code === country.code}
                                            key={country.code}
                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[#F5F7FC]"
                                            onClick={() => {
                                                setSelectedCountry(country);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <Image
                                                loader={imageLoader}
                                                src={country.code.toLowerCase()}
                                                alt={country.name}
                                                width={18}
                                                height={18}
                                            />
                                            <span className="truncate">{country.dial_code}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter your number"
                            className="block w-full rounded-r-md px-3 py-3 text-base focus:outline-none placeholder:text-base"
                            aria-invalid={Boolean(errors.phone?.message)}
                            aria-describedby={errors.phone?.message ? "phone-error" : undefined}
                            {...register("phone")}
                        />
                    </span>
                    {errors.phone?.message ? (
                        <span id="phone-error" className="mt-1 text-sm text-red-600">
                            {errors.phone.message}
                        </span>
                    ) : null}
                </label>
    )
}