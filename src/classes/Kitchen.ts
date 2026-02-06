import { Storage } from "./Storage";
import type { Dish, Ingredient } from "../types/dishData";

export class Kitchen {
    private recipeBook: Dish[] = [];
    private cookedAmount: number = 0;

    constructor(private storage: Storage) {}

    // Проверка существования блюда в книге рецептов
    private checkDishExistence(dishName: string): boolean {
        return this.recipeBook.some(dish => dish.name === dishName);
    }

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
    private checkCanCookDish(dish: Dish, dish_amount: number): boolean {
        for (const ingredient in dish.ingredients) {
            const quantity = dish.ingredients[ingredient as Ingredient];
            if (!this.storage.checkIngredientAvailability(ingredient as Ingredient, quantity * dish_amount)) {
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
        const result: string[] = [];
        for (let i = 0; i < quantity; i++) {
            result.push(this.serveDish(dish));
            this.incrementCookedAmount();
            if (this.checkCookedAmountLimit()) {
                this.restockStorage();
            }
        }
        return result;
    }

    // Добавление блюда в книгу рецептов
    addRecipe(dish: Dish): void {
        if (this.checkDishExistence(dish.name)) {
            this.recipeBook.push(dish);
        }
    }

    // Оркестратор
    cookOrderFromWaiter(order: Record<string, number>): string[] {
        const preparedDishes: string[] = [];
        for (const dishName in order) {
            const quantity = order[dishName] || 0;
            if (!this.checkDishExistence(dishName)) {
                console.log(`Блюда '${dishName}' не существует.`);
                continue;
            }
            const dish = this.getDishByName(dishName);
            if (!dish) continue;
            if (!this.checkCanCookDish(dish, quantity)) {
                console.log(`Ошибка: недостаточно ингредиентов для приготовления блюда '${dishName}'.`);
                continue;
            }
            preparedDishes.push(...this.serveDishNTimes(dish, quantity));
        }
        return preparedDishes;
    }
}
