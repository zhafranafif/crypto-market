import { LoginForm } from "@/component/LoginForm";
import Illustration from "../../../public/illustration.png";
import Image from "next/image";
import { getCountries } from "../service/crypto-market.service";
import ProgressBar from "@/component/ProgressBar";

export default async function Login() {
    const { data: countries } = await getCountries();

    return (
       <div className="w-full h-screen flex items-center">
        <Image src={Illustration} alt="Illustration" className="w-1/2 h-full" loading="eager" />
        
         
        <div className="relative flex w-1/2 min-h-screen">
            <div className="flex flex-col justify-center mx-auto w-[70%]">
            <h1 className="mb-2 text-4xl font-bold">
                Welcome Back!
            </h1>

            <p className="text-base">
            Enter your Credentials to access your account
            </p>
            <LoginForm countries={countries} />
            </div>
            <div className="absolute bottom-0 left-0 w-full">
                <ProgressBar step={1} />
            </div>
        </div>
    </div>
    )
}