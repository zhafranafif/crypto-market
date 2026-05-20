import Image from "next/image";
import Illustration from "../../../public/illustration-2.png";
import OTPInput from "@/component/OTPInput";
import { cookies } from "next/headers";
import { formatPhone } from "@/lib/phone-format";
import ProgressBar from "@/component/ProgressBar";


export default async function OtpVerification() {
    const otpVerificationData = (await cookies()).get("otp_flow_verification")?.value;
    let otpData: { phone?: string } | null = null;
    if (otpVerificationData) {
        try {
            otpData = JSON.parse(otpVerificationData) as { phone?: string };
        } catch {
            otpData = null;
        }
    }

    return (
        <div className="w-full h-screen flex items-center">
            <Image src={Illustration} alt="Illustration" className="w-1/2 h-full" loading="eager" />

            <div className="relative flex w-1/2 min-h-screen">
                <div className="mx-auto flex w-full max-w-md flex-col justify-center items-center">
                    <h1 className="mb-2 text-4xl font-bold">
                    Confirm your phone
                    </h1>

                    <p className="text-base">
                    We send 6 digits code to{" "}
                    {otpData?.phone ? formatPhone(otpData.phone) : ""}
                    </p>

                    <OTPInput otpVerificationData={otpVerificationData} />
                </div>
                <div className="absolute bottom-0 left-0 w-full">
                    <ProgressBar step={2} />
                </div>
            </div>
       </div>
    )
}