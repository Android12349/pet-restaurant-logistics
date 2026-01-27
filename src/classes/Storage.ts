import type { Ingredient } from "../types/dishData";


export class Storage {
    private ingredients: Map<Ingredient, number> = new Map();

    // Проверяет, есть ли ингредиент на складе
    private ingredientExists(ingredient: Ingredient): Ingredient | void {
        for (let key of this.ingredients.keys()) {
            if (key.name === ingredient.name) {
                return key;
            }
        }
    }

    // Геттер
    private getIngredientQuantity(ingredient: Ingredient): number | void {
        const foundKey = this.ingredientExists(ingredient);
        return foundKey ? this.ingredients.get(foundKey) : undefined;
    }

    // Сеттер
    private setIngredientQuantity(ingredient: Ingredient, quantity: number): void {
        this.ingredients.set(ingredient, quantity);
    }

    // Добавляет ингредиент на склад, если его там еще нет
    addIngredient(ingredient: Ingredient, quantity: number): void {
        const foundKey = this.ingredientExists(ingredient);
        if (foundKey) {
            this.setIngredientQuantity(foundKey, quantity);
            console.log(`Склад успешно добавил ингредиент '${ingredient.name}'.`);        
        } else {
            console.log(`Ошибка: ингредиент '${ingredient.name}' уже есть на складе.`);
        }
    }

    // Пополняет количество ингредиента на складе на определенное значение
    restockIngredient(ingredient: Ingredient, quantity: number): void {
        const foundKey = this.ingredientExists(ingredient);
        if (foundKey) {
            const currentQuantity = this.getIngredientQuantity(foundKey) || 0;
            this.setIngredientQuantity(foundKey, currentQuantity + quantity);
            console.log(`Склад успешно пополнен ингредиентом '${ingredient.name}'.`);
        } else {
            console.log(`Ошибка: ингредиент '${ingredient.name}' не найден на складе.`);        
        }
    }

    // Проверяет, достаточно ли ингредиента на складе
    checkIngredientAvailability(ingredient: Ingredient, requiredQuantity: number): boolean {
        const foundKey = this.ingredientExists(ingredient);
        if (foundKey) {
            const currentQuantity = this.getIngredientQuantity(foundKey) || 0;
            return currentQuantity >= requiredQuantity;
        } else {
            return false;
        }
    }

    // Выдает определенное количество ингредиента со склада
    takeIngredient(ingredient: Ingredient, quantity: number): void {
        const foundKey = this.ingredientExists(ingredient);
        if (foundKey) {
            const currentQuantity = this.getIngredientQuantity(foundKey) || 0;
            this.setIngredientQuantity(foundKey, currentQuantity - quantity);
            console.log(`Склад успешно выдал ингредиент '${ingredient.name}'.`);
        } else {
            console.log(`Ошибка: ингредиент '${ingredient.name}' не найден на складе.`);        
        }
    }
}
