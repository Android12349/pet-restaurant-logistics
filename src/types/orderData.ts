export interface Client {
    id: string;
    name: string;
    age: number;
}

export interface Order {
    id: string;
    client_id: string;
    dish: string;
    quantity: number;
}
