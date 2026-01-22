import { parseOrderFile } from "../services/parsers/orderParser";


export class Administrator {
    constructor(private max_capacity: number, private current_clients: number = 0) {}
    
    private canLetInMoreClients(amount: number): boolean {
        return this.current_clients + amount <= this.max_capacity;
    }

    private AddClientCount(amount: number): void {
        this.current_clients += amount;
    }

    private decrementClientCount(): void {
        this.current_clients -= 1;
    }

    public acceptOrder(fileName: string): string {
        const { clients, orders } = parseOrderFile(fileName);
        const clientsAmount = clients.length;

        if (this.canLetInMoreClients(clientsAmount)) {
            this.AddClientCount(clientsAmount);
            return "Ваш заказ принят, ожидайте!";
        } else {
            return "Извините, мест нет, приходите позже.";
        }
    }
}
