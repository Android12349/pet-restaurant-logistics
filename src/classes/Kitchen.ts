import { Storage } from "./Storage";
import type { Dish } from "../types/dishData";

export class Kitchen {
    private recipeBook: Dish[] = [];

    constructor(private storage: Storage) {}

    addRecipe(dish: Dish): void {
        if (this.checkDishExistence(dish.name)) {
            this.recipeBook.push(dish);
        }
    }

    private checkDishExistence(dishName: string): boolean {
        for (const dish of this.recipeBook) {
            if (dish.name === dishName) {
                return true;
            }
        }
        return false;
    }

    private getDishByName(dishName: string): Dish | undefined {
        return this.recipeBook.find(dish => dish.name === dishName);
    }

    private checkIngredients(dish: Dish, dish_amount: number): boolean {
        for (const [ingredient, quantity] of dish.ingredients) {
            const available = this.storage.checkIngredientAvailability(ingredient, quantity * dish_amount);
            if (!available) {
                return false;
            }
        }
        return true;
    }

    private cookDish(dish: Dish): string {
        for (const [ingredient, quantity] of dish.ingredients) {
            this.storage.takeIngredient(ingredient, quantity);
        }
        console.log(`Кухня успешно приготовила блюдо '${dish.name}'.`);
        return dish.name;
    }

    recieveOrderFromWaiter(order: Record<string, number>): string[] {
        const preparedDishes: string[] = [];
        for (const dishName in order) {
            const quantity = order[dishName] || 0;
            if (this.checkDishExistence(dishName)) {
                const dish = this.getDishByName(dishName);
                if (dish && this.checkIngredients(dish, quantity)) {
                    for (let i = 0; i < quantity; i++) {
                        const preparedDish = this.cookDish(dish);
                        preparedDishes.push(preparedDish);
                    }
                } else {
                    console.log(`Ошибка: недостаточно ингредиентов для приготовления блюда '${dishName}'.`);
                }
            } else {
                console.log(`Блюда '${dishName}' не существует.`);
            }
        }
        return preparedDishes;
    }
}
