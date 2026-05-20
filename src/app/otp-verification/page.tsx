import Image from "next/image";
import Illustration from "../../../public/illustration-2.png";
import OTPInput from "@/component/OTPInput";
import { cookies } from "next/headers";
import { formatPhone } from "@/lib/phone-format";


export default async function OtpVerification() {
    const otpVerificationData = (await cookies()).get("otp_flow_verification")?.value;

    return (
        <div className="w-full h-screen flex items-center">
            <Image src={Illustration} alt="Illustration" className="w-1/2 h-full" />
        
            <div className="flex flex-col items-center justify-content mx-auto w-1/4">
                <h1 className="text-4xl font-bold mb-2">Confirm your phone</h1>
                <p className="text-base">We send 6 digits code to {otpVerificationData ? formatPhone(JSON.parse(otpVerificationData).phone) : ""}</p>
                <OTPInput otpVerificationData={otpVerificationData} />
            </div>
       </div>
    )
}