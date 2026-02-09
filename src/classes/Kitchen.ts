import { Storage } from "./Storage";
import type { Dish, Ingredient } from "../types/dishData";

export class Kitchen {
    private cookedAmount: number = 0;

    constructor(private storage: Storage, private recipeBook: Dish[]) {}

    // Инкремент количества приготовленных блюд
    private incrementCookedAmount(): void {
        this.cookedAmount++;
    }

    // Проверка достигания лимита приготовленных блюд
    private checkCookedAmountLimit(): boolean {
        return this.cookedAmount >= 8;
    }

    // Сброс счетчика приготовленных блюд
    private resetCookedAmount(): void {
        this.cookedAmount = 0;
    }

    // Пополнение склада
    private restockStorage(): void {
        const allIngredients = this.storage.getAllIngredientsNames();
        for (const ingredient of allIngredients) {
            this.storage.restockIngredient(ingredient, 10);
        }
        this.resetCookedAmount();
    }

    // Геттер блюда
    private getDishByName(dishName: string): Dish | undefined {
        return this.recipeBook.find(dish => dish.name === dishName);
    }

    // Проверка наличия ингредиентов для приготовления блюда
    private checkCanCookDish(dish: Dish, dishAmount: number): boolean {
        for (const ingredient in dish.ingredients) {
            const quantity = dish.ingredients[ingredient as Ingredient];
            if (!this.storage.checkIngredientAvailability(ingredient as Ingredient, quantity * dishAmount)) {
                return false;
            }
        }
        return true;
    }

    // Приготовление блюда (расход ингредиентов)
    private cookDish(dish: Dish): void {
        for (const ingredient in dish.ingredients) {
            const quantity = dish.ingredients[ingredient as Ingredient];
            this.storage.takeIngredient(ingredient as Ingredient, quantity);
        }
    }

    // Подача блюда
    private serveDish(dish: Dish): string {
        this.cookDish(dish);
        return dish.name;
    }

    // Подача блюда нужное количество раз
    private serveDishNTimes(dish: Dish, quantity: number): string[] {
        const dishes: string[] = [];
        for (let i = 0; i < quantity; i++) {
            dishes.push(this.serveDish(dish));
            this.incrementCookedAmount();
            if (this.checkCookedAmountLimit()) {
                this.restockStorage();
            }
        }
        return dishes;
    }

    // Оркестратор: приготовление заказа от официанта
    cookOrderFromWaiter(order: Record<string, number>): string[] {
        const preparedDishes: string[] = [];
        for (const dishName in order) {
            const quantity = order[dishName] || 0;
            const dish = this.getDishByName(dishName);
            if (!dish) {
                console.log(`Блюда '${dishName}' не существует.`);
                continue;
            }
            if (!this.checkCanCookDish(dish, quantity)) {
                console.log(`Ошибка: недостаточно ингредиентов для приготовления блюда '${dishName}'.`);
                continue;
            }
            preparedDishes.push(...this.serveDishNTimes(dish, quantity));
        }
        return preparedDishes;
    }
}
