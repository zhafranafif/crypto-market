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

export interface CryptoCardProps {
    name?: string;
    symbol: string;
    image?: string;
    price_idr: string;
    change_percent: string;
    isPositive: boolean;
    hot?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}

export interface CryptoListProps {
    searchQuery: string;
    tabQuery: string;
    selectedId?: string;
    onSelect?: (crypto: ICrypto) => void;
}
