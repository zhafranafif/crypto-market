import Image from "next/image";
import Illustration from "../../../public/illustration-2.png";
import OTPInput from "@/component/OTPInput";
import { Button } from "@/component/Button";


export default function OtpVerification() {
    return (
        <div className="w-full h-screen flex items-center">
            <Image src={Illustration} alt="Illustration" className="w-1/2 h-full" />
        
            <div className="flex flex-col items-center justify-content mx-auto w-1/4">
                <h1 className="text-4xl font-bold mb-2">Confirm your phone</h1>
                <p className="text-lg text-gray-600">We send 6 digits code to +91 1234567890</p>
            <OTPInput />
            <Button text="Confirm" type="submit" className="mt-6 w-full" />
            </div>
       </div>
    )
}