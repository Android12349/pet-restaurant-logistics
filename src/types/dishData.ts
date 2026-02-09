import { ingredientsList } from "./ingredients";

export type Ingredient = typeof ingredientsList[number];

export type category = "regular" | "18+";

export interface Dish {
    name: string;
    category: category;
    ingredients: Record<Ingredient, number>;
}
