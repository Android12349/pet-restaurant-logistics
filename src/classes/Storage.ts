import type { Ingredient } from "../types/dishData";


export class Storage {
    private ingredients: Record<Ingredient, number> = {} as Record<Ingredient, number>;

    // Проверяет, есть ли ингредиент на складе
    private checkIngredientExists(ingredient: Ingredient): boolean {
        return ingredient in this.ingredients;
    }

    // Геттер
    private getIngredientQuantity(ingredient: Ingredient): number {
        return this.ingredients[ingredient];
    }

    // Сеттер
    private setIngredientQuantity(ingredient: Ingredient, quantity: number): void {
        this.ingredients[ingredient] = quantity;
    }

    // Добавляет ингредиент на склад, если его там еще нет
    addIngredient(ingredient: Ingredient, quantity: number): void {
        const existence = this.checkIngredientExists(ingredient);
        if (!existence) {
            this.setIngredientQuantity(ingredient, quantity);
            console.log(`Склад успешно добавил ингредиент '${ingredient}'.`);        
        } else {
            console.log(`Ошибка: ингредиент '${ingredient}' уже есть на складе.`);
        }
    }

    // Пополняет количество ингредиента на складе на определенное значение
    restockIngredient(ingredient: Ingredient, quantity: number): void {
        const existence = this.checkIngredientExists(ingredient);
        if (existence) {
            const currentQuantity = this.getIngredientQuantity(ingredient);
            this.setIngredientQuantity(ingredient, currentQuantity + quantity);
            console.log(`Склад успешно пополнен ингредиентом '${ingredient}'.`);
        } else {
            console.log(`Ошибка: ингредиент '${ingredient}' не найден на складе.`);        
        }
    }

    // Проверяет, достаточно ли ингредиента на складе
    checkIngredientAvailability(ingredient: Ingredient, requiredQuantity: number): boolean | undefined {
        const existence = this.checkIngredientExists(ingredient);
        if (existence) {
            const currentQuantity = this.getIngredientQuantity(ingredient);
            return currentQuantity >= requiredQuantity;
        }
    }

    // Выдает определенное количество ингредиента со склада
    takeIngredient(ingredient: Ingredient, quantity: number): void {
        const existence = this.checkIngredientExists(ingredient);
        if (existence) {
            const currentQuantity = this.getIngredientQuantity(ingredient);
            this.setIngredientQuantity(ingredient, currentQuantity - quantity);
            console.log(`Склад успешно выдал ингредиент '${ingredient}'.`);
        } else {
            console.log(`Ошибка: ингредиент '${ingredient}' не найден на складе.`);        
        }
    }
}
