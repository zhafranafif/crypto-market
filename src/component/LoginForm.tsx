"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "./Button";
import { ICountry } from "@/app/service/crypto-market.service";
import Image from "next/image";
import imageLoader from "@/app/image/loader";

type FormValues = {
    email?: string;
    phone_number?: string;
    password: string;
}
type LoginMethod = "Email" | "Mobile Number";
const DEFAULT_LOGIN_METHOD = "Email" as LoginMethod;

export function LoginForm({ countries }: { countries: ICountry[] }) {
    const { register, handleSubmit } = useForm<FormValues>();
    const [loginMethod, setLoginMethod] = useState<LoginMethod>(DEFAULT_LOGIN_METHOD);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(() => {
        return countries.length > 0 ? countries[0] : null;
    });
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    }
    

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const loginWith = (method: LoginMethod) => {
        setLoginMethod(method);
    }

    console.log(selectedCountry);

    return (
        <>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
            {loginMethod === "Email" ? (
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="username@gmail.com"
                    switchText="Mobile Number"
                    {...register("email")}
                    onChangeLoginMethod={() => loginWith("Mobile Number")}
                />
            ) : (
                <label htmlFor="phone_number" className="flex flex-col text-sm font-medium">
                    <span className="flex justify-between text-base font-medium">
                        Mobile Number
                        <span
                            className="text-primary text-base font-medium hover:cursor-pointer"
                            onClick={() => loginWith("Email")}
                        >
                            Sign In with Email
                        </span>
                    </span>
                    <span className="mt-1 flex rounded-md border border-[#CDD5E9]">
                        <span className="flex items-center gap-2 border-r border-[#CDD5E9] px-3">
                            {selectedCountry ? (
                                <Image
                                    loader={imageLoader}
                                    src={selectedCountry.code.toLowerCase()}
                                    alt={selectedCountry.name}
                                    width={20}
                                    height={20}
                                />
                            ) : null}
                            <select
                                aria-label="Country dial code"
                                className="bg-transparent text-base appearance-none focus:outline-none"
                                value={selectedCountry?.code ?? ""}
                                onChange={(event) => {
                                    const nextCountry = countries.find(
                                        (country) => country.code === event.target.value
                                    );
                                    setSelectedCountry(nextCountry ?? null);
                                }}
                                disabled={countries.length === 0}
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.dial_code}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <input
                            type="tel"
                            id="phone_number"
                            placeholder="Enter your number"
                            className="block w-full rounded-r-md px-3 py-3 text-base focus:outline-none placeholder:text-base"
                            {...register("phone_number")}
                        />
                    </span>
                </label>
            )}
           <Input 
                label="Password" 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                {...register("password")} 
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}      
            />
        </form>
        <span className="mt-1 text-primary text-base font-medium hover:cursor-pointer">Forgot password?</span>
        <Button text="Sign In" type="submit" form="login-form" className="mt-6" />
        </>
    );

}