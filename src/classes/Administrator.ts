import { parseOrderFile } from "../services/parsers/orderParser";
import type { Client, Order } from "../types/orderData";
import { Waiter } from "./Waiter";


export class Administrator {
    private currentClientsCount: number = 0;

    constructor(private waiter: Waiter, private maxCapacity: number) {}
    
    // Проверка возможности пустить клиентов
    private canLetInMoreClients(amount: number): boolean {
        return this.currentClientsCount + amount <= this.maxCapacity;
    }

    // Впустить клиентов
    private AddClientCount(amount: number): void {
        this.currentClientsCount += amount;
    }

    // Выпустить клиента
    private decrementClientCount(): void {
        if (this.currentClientsCount > 0) {
            this.currentClientsCount -= 1;
        } else {
            console.log("Ошибка. Клиентов не может быть меньше 0!")
        }
    }

    // Соотнесение заказов к клиенту
    private correlateOrdersToClient(clientId: string, orders: Order[]): Order[] {
        const clientOrders: Order[] = [];
        for (const order of orders) {
            if (order.client_id === clientId) {
                clientOrders.push(order);
            }
        }
        return clientOrders;
    }
    
    // Обработать заказ
    private operateOrder(clients: Client[], orders: Order[]): void {
        for (const client of clients) {
            const clientOrders = this.correlateOrdersToClient(client.id, orders);
            this.waiter.operateOrderFromAdministrator(client, clientOrders)
            this.decrementClientCount();
        }
    }

    // Принять заказ
    acceptOrder(fileName: string): void {
        const { clients, orders } = parseOrderFile(fileName);
        const clientsAmount = clients.length;

        if (this.canLetInMoreClients(clientsAmount)) {
            this.AddClientCount(clientsAmount);
            console.log("Ваш заказ принят, ожидайте!");
            this.operateOrder(clients, orders);
            console.log("Заказ закрыт!")
        } else {
            console.log("Извините, мест нет, приходите позже.");
        }
    }
}
