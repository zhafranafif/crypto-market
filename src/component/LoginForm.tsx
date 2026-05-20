"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "./Button";
import { loginWithEmail, loginWithPhoneNumber } from "@/app/service/crypto-market.service";
import { useRouter } from "next/navigation";
import InputPhone from "./InputPhone";
import type { ICountry } from "@/types/country";
import type { FormValues, LoginMethod } from "@/types/forms";
import { DEFAULT_LOGIN_METHOD } from "@/variables";
import Loading from "./Loading";

export function LoginForm({ countries }: { countries: ICountry[] }) {
    const router = useRouter();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormValues>();
    const [loginMethod, setLoginMethod] = useState<LoginMethod>(DEFAULT_LOGIN_METHOD);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(() => {
        return countries.length > 0 ? countries[0] : null;
    });
    const [loading, setLoading] = useState<boolean>(false);
    
    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        setLoading(true);
        try {
            if (loginMethod === "Email") {
                if (!data.email) return;
                await loginWithEmail(data.email, data.password).then(() => {
                    router.replace("/otp-verification"); 
                });
            }
            if (!data.phone) return;
            await loginWithPhoneNumber(data.phone, data.password).then(() => {
                router.replace("/otp-verification"); 
            });
        } catch (error) {
            const errorBody = (error as { body?: { message?: string; data?: { field?: string } } })?.body;
            const field = errorBody?.data?.field as "email" | "phone" | "password" | undefined;
            const message = errorBody?.message ?? "Login failed";
            if (field) {
                setError(field, { type: "manual", message });
                return;
            }
        } finally {
            setLoading(false);
        }
    }
    

    const toggleVisibility = () => setIsVisible((prev: boolean) => !prev);

    const loginWith = (method: LoginMethod) => {
        setLoginMethod(method);
    }

    return (
        <>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
            {loginMethod === "Email" ? (
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="username@gmail.com"
                    switchText="Phone Number"
                    {...register("email")}
                    error={errors.email?.message}
                    onChangeLoginMethod={() => loginWith("Phone Number")}
                />
            ) : (
                <InputPhone 
                countries={countries} 
                selectedCountry={selectedCountry} 
                setSelectedCountry={setSelectedCountry} 
                onClickLoginWithEmail={() => loginWith("Email")} 
                register={register} errors={errors}/>
            )}
           <Input 
                label="Password" 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                {...register("password")} 
                error={errors.password?.message}
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}      
            />
        </form>
        <span className="mt-1 text-primary text-base  hover:cursor-pointer">Forgot password?</span>
        <Button text={loading ? <Loading type="secondary" /> : "Sign In"} type="submit" form="login-form" className="mt-6" />
        </>
    );

}