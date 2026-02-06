import { ingredientsList } from "./ingredients";

export type Ingredient = typeof ingredientsList[number];

type category = "regular" | "18+";

export interface Dish {
    name: string;
    category: category;
    ingredients: Record<Ingredient, number>;
}
