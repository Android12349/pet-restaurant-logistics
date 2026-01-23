import type { Ingredient } from "../types/dishData";


export class Storage {
    private ingredients: Map<Ingredient, number> = new Map();

    private ingredientExists(ingredient: Ingredient): Ingredient | false{
        for (let key of this.ingredients.keys()) {
            if (key.name === ingredient.name) {
                return key;
            }
        }
        return false;
    }

    public addIngredient(ingredient: Ingredient, quantity: number): void {
        const findKey = this.ingredientExists(ingredient);
        if (findKey === false) {
            this.ingredients.set(ingredient, quantity);
            console.log(`Ингредиент '${ingredient.name}' добавлен на склад.`);        
        } else {
            console.log(`Ошибка: ингредиент '${ingredient.name}' уже есть на складе.`);
        }
    }

    public restockIngredient(ingredient: Ingredient, quantity: number): void {
        const findKey = this.ingredientExists(ingredient);
        if (findKey !== false) {
            const currentQuantity = this.ingredients.get(findKey) || 0;
            this.ingredients.set(findKey, currentQuantity + quantity);
            console.log(`Текущее количество ингредиента '${ingredient.name}': ${this.ingredients.get(findKey)}.`);
        } else {
            console.log(`Ошибка: ингредиент '${ingredient.name}' не найден на складе.`);        
        }
    }
}
