import CryptoCard, { ICrypto } from "@/component/CryptoCard";
import FilterTabs, { Tab } from "@/component/FilterTabs";
import SearchInput from "@/component/SearchInput";

const TABS: Tab[] = ["All", "Cryptocurrency", "Favorites"];

const data: ICrypto[] = [
        {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "BITC",
            image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
            price_idr: "IDR 1.356.230.675,00",
            change_percent: "+0,53%",
            isPositive: true,
            hot: true,
            isFavorite: true,
            type: "cryptocurrency"
        },
        {
            id: "ethereum",
            name: "Ethereum",
            symbol: "ETHE",
            image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
            price_idr: "IDR 37.405.865,00",
            change_percent: "+0,46%",
            isPositive: true,
            hot: false,
            isFavorite: true,
            type: "cryptocurrency"
        },
        {
            id: "tether",
            symbol: "TETH",
            price_idr: "IDR 17.722,27",
            change_percent: "+0,22%",
            isPositive: true,
            hot: true,
            isFavorite: true,
            type: "cryptocurrency"
        },
        {
            id: "binancecoin",
            symbol: "BINA",
            price_idr: "IDR 11.335.249,00",
            change_percent: "+0,80%",
            isPositive: true,
            hot: true,
            isFavorite: true,
            type: "cryptocurrency"
        },
        {
            id: "solana",
            symbol: "SOLA",
            price_idr: "IDR 1.496.260,00",
            change_percent: "+0,87%",
            isPositive: true,
            hot: true,
            isFavorite: true,
            type: "cryptocurrency"
        }
    ];

export default function Dashboard() {
    return (
        <div className="w-full min-h-screen flex">
            <div className="w-max-[379px] flex flex-col bg-[#F5F7FC] p-4">
                <h1 className="text-2xl font-medium px-2">Market</h1>
                <div className="p-2">
                <SearchInput />
                </div>
                <FilterTabs tabs={TABS} activeTab={TABS[0]} />
                <div className="flex flex-col gap-2 mt-4">
                {data.map((crypto) => (
                    <CryptoCard 
                    key={crypto.id}
                    name={crypto.name}
                    symbol={crypto.symbol}
                    image={crypto.image}
                    price_idr={crypto.price_idr}
                    change_percent={crypto.change_percent}
                    isPositive={crypto.isPositive}
                    />
                ))}
                </div>
            </div>
            <div className="w-[80%] flex flex-col">
                <h1>John Johnson</h1>
            </div>
        </div>
    )
}