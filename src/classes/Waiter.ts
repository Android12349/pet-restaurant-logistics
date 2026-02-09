import type { Client, Order } from "../types/orderData";
import type { category, Dish } from "../types/dishData";
import type { Kitchen } from "./Kitchen";
import { createResponseForClient } from "../services/parsers/createResponseForClient";


export class Waiter {
    private orderCounter: number = 0;
    constructor(private recipeBook: Dish[], private kitchen: Kitchen) {}
    
    private checkAgeReqForTheDish(clientAge: number, dishCategory: category): boolean {
        return dishCategory === "regular" || clientAge >= 18;
    }

    private getDishByName(dishName: string): Dish | undefined {
        return this.recipeBook.find(dish => dish.name === dishName);
    }

    // Обработка заказа от администратора по клиенту
    operateOrderFromAdministrator(client: Client, orders: Order[]): void {
        const orderForKitchen: Record<string, number> = {};
        for (const order of orders) {
            const dish = this.getDishByName(order.dish);
            if (!dish) {
                console.log(`Блюда '${order.dish}' не существует.`);
                continue;
            }
            if (!this.checkAgeReqForTheDish(client.age, dish.category)) {
                console.log(`Клиенту '${client.name}' нельзя заказывать блюдо '${dish.name}', малой еще`);
                continue
            }
            orderForKitchen[dish.name] = order.quantity;
        }
        const dishes = this.kitchen.cookOrderFromWaiter(orderForKitchen);
        this.orderCounter += 1;
        createResponseForClient(dishes, client.id, this.orderCounter);
    }
}