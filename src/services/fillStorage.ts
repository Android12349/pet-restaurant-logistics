import { ingredientsList } from "../types/ingredients";
import { restockAmount } from "../constants";
import { Storage } from "../classes/Storage";

export function fillStorage(storage: Storage): void {
    ingredientsList.forEach(ingredient => storage.addIngredient(ingredient, restockAmount));
}
