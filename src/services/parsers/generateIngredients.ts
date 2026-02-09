import * as fs from 'fs';
import * as path from 'path';
import { parseIngredients } from "./ingredientsFileParser";
import { ingredientsFile } from "../../constants";

const ingredients = parseIngredients(ingredientsFile);

const output = 
`// Не трогать, файл сгенерирован автоматически!
export const ingredientsList = ${JSON.stringify(ingredients, null, 2)} as const;
`;

const outPath = path.join(__dirname, "../types/ingredients.ts");
fs.writeFileSync(outPath, output);
