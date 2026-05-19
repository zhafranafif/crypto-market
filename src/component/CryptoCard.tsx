import Image from "next/image";

export interface ICrypto {
    id: string;
    name?: string;
    symbol: string;
    image?: string;
    price_idr: string;
    change_percent: string;
    isPositive: boolean;
    hot: boolean;
    isFavorite: boolean;
    type: string;
}

export interface CryptoCardProps  {
    name?: string;
    symbol: string;
    image?: string;
    price_idr: string;
    change_percent: string;
    isPositive: boolean;
}
export default function CryptoCard({
    name,
    symbol,
    image,
    price_idr,
    change_percent,
    isPositive,
}: CryptoCardProps) {
    return (
        <div className="max-w-86.25 flex justify-between items-center bg-[#D4D4D4] p-2 rounded-md">
            <div className="flex gap-2 items-center">
            {image && <Image src={image} alt={symbol} width={40} height={40}/>}
            <div className="flex flex-col gap-0.5">
                <h1>{symbol}</h1>
                <p>{name}</p>
            </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <p className={`text-sm font-medium p-1 rounded-sm ${isPositive ? "text-green-500 bg-background" : "text-red-500"}`}>
                    {change_percent}%
                </p>
                <h1 className="text-base font-medium">{price_idr}</h1>
            </div>
        </div>
    )
}