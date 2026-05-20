import { LoginForm } from "@/component/LoginForm";
import Illustration from "../../../public/illustration.png";
import Image from "next/image";
import { getCountries } from "../service/crypto-market.service";

export default async function Login() {
    const { data: countries } = await getCountries();

    return (
       <div className="w-full h-screen flex items-center">
        <Image src={Illustration} alt="Illustration" className="w-1/2 h-full" />
        
        <div className="flex flex-col mx-auto w-1/3">
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-lg text-gray-600">Enter your Credentials to access your account</p>
        <LoginForm countries={countries} />
        </div>
       </div>
    )
}