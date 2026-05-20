import type { Dispatch, SetStateAction } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ICountry } from "./country";

export type FormValues = {
    email?: string;
    phone?: string;
    password: string;
};

export type LoginMethod = "Email" | "Phone Number";

export interface InputPhoneProps {
    countries: ICountry[];
    selectedCountry: ICountry | null;
    setSelectedCountry: Dispatch<SetStateAction<ICountry | null>>;
    onClickLoginWithEmail: () => void;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
}

export interface OTPInputProps {
    otpVerificationData?: string | undefined;
}
