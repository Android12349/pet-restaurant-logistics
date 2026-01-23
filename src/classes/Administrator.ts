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
        if (this.current_clients > 0) {
            this.current_clients -= 1;
        } else {
            console.log("Ошибка. Клиентов не может быть меньше 0!")
        }
    }

    public acceptOrder(fileName: string): string {
        const { clients, orders } = parseOrderFile(fileName);
        const clientsAmount = clients.length;

        if (this.canLetInMoreClients(clientsAmount)) {
            this.AddClientCount(clientsAmount);
            return `Ваш заказ принят, ожидайте! Текущая загруженность: ${this.current_clients}`;
        } else {
            return "Извините, мест нет, приходите позже.";
        }
    }
}
