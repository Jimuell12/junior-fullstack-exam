
export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface ItemDetailsProps {
    params: { id: string };
}

export type ItemCardProps = {
    item: Item;
    onClick: () => void;
};

export type SearchProps = {
    search: string;
    onSearchChange: (search: string) => void;
};