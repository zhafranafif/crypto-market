import type { InputHTMLAttributes } from "react";

export type Tab = {
    value: string;
    key: string;
};

export interface FilterTabsProps {
    tabs: Tab[];
    activeTab: Tab;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
    id: string;
    placeholder?: string;
    className?: string;
    onChangeLoginMethod?: () => void;
    switchText?: string;
    toggleVisibility?: () => void;
    isVisible?: boolean;
    error?: string;
}

export interface ButtonProps {
    text: string | React.ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    form?: string;
    className?: string;
    onClick?: () => void;
}
