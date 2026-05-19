"use client";
import { useRef, useState } from "react";


export default function OTPInput() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            console.log(inputRefs.current[index + 1], "refs");
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = [...otp];

        pasteData.forEach((char, idx) => {
            if (!isNaN(Number(char)) && idx < 6) {
                newOtp[idx] = char;
                inputRefs.current[idx]?.focus();
            }
        });

        setOtp(newOtp);
    };

    return (
        <div className="flex space-x-2 mt-6">
            {otp.map((value, index) => (
                <div key={index} className="relative flex items-center">
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        pattern="[0-9]*"
                        value={value}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        className="w-12.5 h-18 text-center text-primary text-3xl font-bold border border-[#CDD5E9] bg-[#F5F7FC] rounded focus:outline-none"
                    />
                    <span className={`pointer-events-none absolute bottom-4 left-2 right-2 h-1 rounded ${value ? 'bg-primary transition duration-200 ease-in-out' : 'bg-[#CDD5E9]'}`} />
                </div>
            ))}
        </div>
    );
}