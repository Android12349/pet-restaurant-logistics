export interface Ingredient {
    name: string;
}

export interface Dish {
    name: string;
    category: "regular" | "18+";
    ingredients: Map<Ingredient, number>;
}
