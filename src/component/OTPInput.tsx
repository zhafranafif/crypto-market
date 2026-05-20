"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { OtpVerification } from "@/app/service/crypto-market.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { OTPInputProps } from "@/types/forms";
import Loading from "./Loading";

export default function OTPInput({ otpVerificationData }: OTPInputProps) {
    const router = useRouter();
    const parsedOtpVerificationData = otpVerificationData ? JSON.parse(otpVerificationData) : null;
    const [otpState, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    useEffect(() => {
       if(!parsedOtpVerificationData?.otpExpiresAt) return;
       
       const remainingTime = parsedOtpVerificationData.otpExpiresAt - Date.now();
       if (remainingTime <= 0) {
           toast.error("OTP has expired. Please request a new one.", {
                duration: 3000,
           });
           router.replace("/login");
       }

       const timer = setTimeout(() => {
            toast.error("OTP has expired. Please request a new one.", {
                duration: 3000,
           });
           router.replace("/login");
       }, remainingTime);

       return () => clearTimeout(timer);
    }, [parsedOtpVerificationData, router]);

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;
        
        const newOtp = [...otpState];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otpState[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = [...otpState];

        pasteData.forEach((char, idx) => {
            if (!isNaN(Number(char)) && idx < 6) {
                newOtp[idx] = char;
                inputRefs.current[idx]?.focus();
            }
        });

        setOtp(newOtp);
    };

    const formatOtp: string = otpState.join("");

    const handleOtpVerification = async () => {
        const matchesOtp = formatOtp === parsedOtpVerificationData?.otp;
        if(!matchesOtp) {
           toast.error("Invalid OTP. Please try again.", {
                duration: 3000,
           });
           return;
        }
        try {
            setIsVerifying(true);
            await OtpVerification(formatOtp, parsedOtpVerificationData.phone).then((response) => {
                if(response.status_code === 200) {
                router.replace("/dashboard");
                }
            })
        } catch (error) {
            const errorMessage = (error as { body?: { message?: string } })?.body?.message ?? "OTP verification failed";
            toast.error(`OTP verification failed: ${errorMessage}`, {
                duration: 3000,
            });
        } finally {
            setIsVerifying(false);
        }
    }

    return (
        <>
        <div className="flex space-x-2 mt-6">
            {otpState.map((value, index) => (
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
        <Button text={isVerifying ? <Loading type="secondary" /> : "Confirm"} type="submit" className="mt-6 w-full" disabled={formatOtp.length !== 6} onClick={handleOtpVerification} />
        </>
    );
}