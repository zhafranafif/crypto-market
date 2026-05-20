"use client";
import { useEffect, useState } from "react";
import CryptoCard from "./CryptoCard";
import type { CryptoListProps, ICrypto } from "@/types/crypto";
import { getCryptocurrencies } from "@/app/service/crypto-market.service";
import Loading from "./Loading";


export default function CryptoList({
    searchQuery,
    tabQuery,
    selectedId,
    onSelect
}: CryptoListProps) {
    const [cryptos, setCryptos] = useState<ICrypto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchCryptos() {
            try {
                const response = await getCryptocurrencies(signal);
                setCryptos(response.data);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }
                if (error instanceof Error && error.message.includes("aborted")) {
                    return;
                }
            } finally {
                setLoading(false);
            }
        }

        fetchCryptos();

        return () => {
            controller.abort();
        };
    }, []);

    const hasTabData =
        tabQuery === "all" ||
        tabQuery === "favorites" ||
        cryptos.some((crypto) => crypto.type === tabQuery);

    const filteredCryptos = cryptos.filter((crypto: ICrypto) => {
        const cryptoName = crypto.name ?? "";
        const matchesSearch = cryptoName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = crypto.type === tabQuery || (tabQuery === "favorites" && crypto.isFavorite) || tabQuery === "all";
        return matchesSearch && matchesTab;
    });

    return (
            <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-screen pr-2 
            [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full">
                {loading ? (
                    <Loading text="Please wait..." />
                ) : (
                    <>
                        {filteredCryptos && filteredCryptos.map((crypto: ICrypto) => (
                            <CryptoCard 
                            key={crypto.id}
                            name={crypto.name}
                            symbol={crypto.symbol}
                            image={crypto.image}
                            price_idr={crypto.price_idr}
                            change_percent={crypto.change_percent}
                            isPositive={crypto.isPositive}
                            hot={crypto.hot}
                            isSelected={crypto.id === selectedId}
                            onClick={() => onSelect?.(crypto)}
                            />
                        ))}
                        {filteredCryptos.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">
                                {hasTabData ? (
                                    <>We couldn&apos;t find <span>&apos;{searchQuery}&apos;</span>. Try searching with a different keyword.</>
                                ) : (
                                    <>No data available for this tab yet.</>
                                )}
                            </p>
                        )}
                    </>
                )}
            </div>
    )
}