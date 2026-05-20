import Image from "next/image";
import Fire from "../../public/fire.svg"
import CryptoIcon from "../../public/crypto-icon.png";
import type { CryptoCardProps } from "@/types/crypto";
export default function CryptoCard({
    name,
    symbol,
    image,
    price_idr,
    change_percent,
    isPositive,
    hot,
    isSelected,
    onClick
}: CryptoCardProps) {
    return (
        <div
            className={`max-w-86.25 flex justify-between items-center rounded-md p-2 hover:cursor-pointer ${
                isSelected ? "bg-primary text-white" : "bg-[#D4D4D4]"
            }`}
            onClick={onClick}
            role="button"
            aria-pressed={isSelected}
        >
            <div className="flex gap-2 items-center">
            {image ? <Image src={image} alt={symbol} width={40} height={40}/>
            : <Image src={CryptoIcon} alt={symbol} width={40} height={40} />}
            <div className="flex flex-col gap-1.5">
                <h1 className="text-base font-bold flex gap-1">{symbol} <span>{hot && <Image src={Fire} alt="Hot" width={16} height={16} />}</span></h1>
                <p>{name}</p>
            </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <p className={`text-sm font-medium p-1 rounded-sm ${isPositive ? "text-green-500 bg-background" : "text-red-500 bg-background"}`}>
                    {change_percent}
                </p>
                <h1 className="text-base font-medium">{price_idr}</h1>
            </div>
        </div>
    )
}