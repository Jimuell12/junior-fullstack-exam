
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